
/* jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const db = pgp({
  database: 'ecommerce'
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/products', (req, resp, next) => {
  db.any('select * from products join manufacturers on products.manufacturer_id = manufacturers.manufacturer_id')
    .then(products => resp.json(products))
    .catch(next);
});

app.get('/api/product/:id', (req, resp, next) => {
  db.any('select * from products join manufacturers on products.manufacturer_id = manufacturers.manufacturer_id where product_id = $1', req.params.id)
    .then(product => {
      if (product.length === 1){
          resp.json(product);
      } else {
          resp.status(404);
          let message = {message: "product not found"};
          resp.json(message);
      }

    })
    .catch(next);
});
// API for user to create a new account
app.post('/api/user/signup', (req,resp,next) => {
  console.log('entering signup api');
  let user = req.body;
  let password = req.body.password;

  bcrypt.hash(password, 10)
  .then(encryptedPassword =>  {
    return db.one(`insert into users (user_id, username, email, first_name, last_name, address1, address2, city, state, zip_code, password)
                  values (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning user_id`,
                  [user.username, user.email, user.first_name, user.last_name, user.address1, user.address2, user.city, user.state, user.zip_code, encryptedPassword]);
    }
  
  )
  .then(id => resp.json(id))
  .catch(err => {
       if (err.message === 'duplicate key value violates unique constraint "users_username_key"'){
         resp.status(409);
         resp.json({message: 'username already exists'});
       } else {
         console.log("unknown error: ", err);
         throw err;
       }

  })

  .catch(next);

});
// api for use to login
app.post('/api/user/login', (req, resp, next) => {
  console.log('entering login api');
  var username = req.body.username;
  var password = req.body.password;

  db.one(`select user_id, password as encryptedpassword, username, first_name, last_name FROM users WHERE username ilike $1`, username)
  .then(results => {
    return Promise.all([results, bcrypt.compare(password, results.encryptedpassword)])
    })
  .then(args => {

    let results = args[0];
    let matched = args[1];

    if (matched) {
      console.log("passwords matched: " + matched);
      let token = uuid.v4();
      let loginData = {username: username, first_name: results.first_name, last_name: results.last_name, auth_token: token };
       return Promise.all([loginData, db.none(`insert into tokens (user_id, user_token) VALUES ($1, $2)`, [results.user_id, token])]);

    } else if (!matched){
      let errMessage = {message: 'password is incorrect'};
      throw errMessage;
    }

  })
  .then(args  => resp.json(args[0]))
  .catch(err => {
    console.log('error: ', err);
    if (err.message === 'No data returned from the query.') {
      let errMessage = {message: 'login failed'};
      resp.status(401);
      resp.json(errMessage);
    } else if (err.message === 'password is incorrect'){
      let errMessage = {message: 'login failed'};
      resp.status(401);
      resp.json(errMessage);
    } else {
      throw err;
    }n  })
  .catch(next);
});

app.post('/api/shopping_cart', (req,resp,next) => {
  console.log('entering shopping_cart api');
  console.log('token: ' + req.body.user_token);
  console.log('product_id: ' + req.body.product_id);
  db.one(`select user_id FROM tokens WHERE user_token = $1`, req.body.user_token)
  .then( user => {
    console.log("id returned: " , user);
    return db.one(`insert into shoppingcart (shoppingcart_id, user_id, product_id) VALUES (default, $1, $2) returning shoppingcart_id`, [user.user_id, req.body.product_id]);
  })
  .then(result => {
      console.log('shopping cart insert result: ', result);
      resp.json({id: result.shoppingcart_id});
  } )
  .catch(err => {
    console.log("error: ", err);
    if (err.message === 'No data returned from the query.') {
        console.log('user_id was not found for user_token sent');
        let errMessage = {message: 'user not authenticated'};
        resp.status(401);
        resp.json(errMessage);
    } else if (err.message === 'insert or update on table "shoppingcart" violates foreign key constraint "shoppingcart_product_id_fkey"'){
      console.log('shopping cart insert failed: ', err.message);
      let errMessage = {message: 'invalid product_id'};
      resp.status(404);
      resp.json(errMessage);
    } else {
      throw err;
    }
  })
  .catch(next);

});
// api for listing items in user shopping cart
app.post('/api/shopping_cart_items', (req, resp, next) => {

  db.one(`select user_id FROM tokens WHERE user_token = $1`, req.body.user_token)
  .then( user => db.any(`select * FROM shoppingcart join products on shoppingcart.product_id = products.product_id where user_id = $1`, user.user_id))
  .then(results => resp.json(results))
  .catch(err => {
    console.log("error: ", err);
    if (err.message === 'No data returned from the query.') {
        console.log('user_id was not found for user_token sent');
        let errMessage = {message: 'user not authenticated'};
        resp.status(401);
        resp.json(errMessage);
    } else if (err.message === 'insert or update on table "shoppingcart" violates foreign key constraint "shoppingcart_product_id_fkey"'){
      console.log('shopping cart insert failed: ', err.message);
      let errMessage = {message: 'invalid product_id'};
      resp.status(404);
      resp.json(errMessage);
    } else {
      throw err;
    }
  })
  .catch(next);

});

// api to allow user to checkout with items in shopping cart
app.post('/api/shopping_cart/checkout', (req, resp, next) => {

  db.one(`select user_id FROM tokens WHERE user_token = $1`, req.body.user_token)
  .then( user => Promise.all([user.user_id, db.any(`select * FROM shoppingcart join products on shoppingcart.product_id = products.product_id where user_id = $1`, user.user_id) ] ))
  .then( args => {

      let userid = args[0];
      let items = args[1];
       if (items.length > 0 ){
        shoppingCartsItems = items;
        return Promise.all([ userid, items, db.one(`insert into purchases (purchase_id, user_id) VALUES (default, $1) returning purchase_id`, userid)]);
      } else {
        throw {message: "no items in shopping cart"};
      }
  } )
  .then (args => {
    let userid = args[0];
    let items = args[1];
    let purchaseID = args[2].purchase_id;

    let arrPurchases = [userid];
    items.forEach(item => arrPurchases.push(db.one(`insert into purchased_products (id, purchase_id, product_id) VALUES (default, $1, $2) returning id`, [purchaseID, item.product_id])));

    return Promise.all(arrPurchases);

  })
  .then(args => db.none(`delete from shoppingcart WHERE user_id = $1`, args[0]))
  .then(() => resp.json({message: 'purchase complete'}))
  .catch(err => {
    console.log("error: ", err);
    if (err.message === 'No data returned from the query.') {
        console.log('user_id was not found for user_token sent');
        let errMessage = {message: 'user not authenticated'};
        resp.status(401);
        resp.json(errMessage);
    } else if (err.message === 'insert or update on table "shoppingcart" violates foreign key constraint "shoppingcart_product_id_fkey"'){
      console.log('shopping cart insert failed: ', err.message);
      let errMessage = {message: 'invalid product_id'};
      resp.status(404);
      resp.json(errMessage);
    } else if (err.message === 'no items in shopping cart'){
      console.log('nothing was in the shopping cart');
      resp.status(404);
      resp.json(err);
    } else {
      throw err;
    }
  })
  .catch(next);
});

app.use((err, req, resp, next) => {
  resp.status(500);
  resp.json({
    error: err.message,
    stack: err.stack.split('\n')
  });
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
