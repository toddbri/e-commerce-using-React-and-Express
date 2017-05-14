
/* jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./config/config.js');
const stripePackage = require('stripe');
const stripe = stripePackage(config.stripeSecret);
const db = pgp({
  database: 'ecommerce'
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/products', (req, resp, next) => {
  db.any('select * from products')
    .then(products => resp.json(products))
    .catch(next);
});

app.get('/api/product/:id', (req, resp, next) => {
db.any('select * from products where product_id = $1', req.params.id)
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
  let user = req.body;
  let password = req.body.password;

  bcrypt.hash(password, 10)
  .then(encryptedPassword =>  {

    console.log('creating user: ', user);
    return db.one(`insert into users (user_id, username, email, first_name, last_name, address1, address2, city, state, zip_code, password)
                  values (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning user_id`,
                  [user.username, user.email, user.first_name, user.last_name, user.address1, user.address2, user.city, user.state, user.zip_code, encryptedPassword]);
    }

  )
  .then(id => {
      let token = uuid.v4();
      console.log('user_id: ', id.user_id);
      console.log("token is: ", token);
      return db.one(`insert into tokens (user_id, user_token) VALUES ($1, $2) returning user_token`, [id.user_id, token]);

  })
  .then(results => resp.json({auth_token: results.user_token}))
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
  let username = req.body.username;
  let password = req.body.password;

  db.one(`select user_id, password as encryptedpassword, username, email, first_name, last_name, address1, address2, city, state, zip_code FROM users WHERE username ilike $1`, username)
  .then(results => {
    return Promise.all([results, bcrypt.compare(password, results.encryptedpassword)])
    })
  .then(args => {

    let results = args[0];
    let matched = args[1];

    if (matched) {
      let token = uuid.v4();
      let loginData = {username: username, first_name: results.first_name, last_name: results.last_name, auth_token: token, email: results.email, address1: results.address1, address2: results.address2, city: results.city, state: results.state, zip_code: results.zip_code };
       return Promise.all([loginData, db.none(`insert into tokens (user_id, user_token) VALUES ($1, $2)`, [results.user_id, token])]);

    } else if (!matched){
      let errMessage = {message: 'password is incorrect'};
      throw errMessage;
    }

  })
  .then(args  => {console.log('going to respond');resp.json(args[0])})
  .catch(err => {
    console.log('handing error during login: ', err);
    if (err.message === 'No data returned from the query.') {
      let errMessage = {message: 'login failed'};
      resp.status(401);
      resp.json(errMessage);
    } else if (err.message === 'password is incorrect') {
      let errMessage = {message: 'login failed'};
      resp.status(401);
      resp.json(errMessage);
    } else {
      console.log("something bad happened");
      throw err;
     }
  })
  .catch(next);
});


//api to allow user to add items to the shopping cart

app.post('/api/shopping_cart', (req,resp,next) => {

  db.one(`select user_id FROM tokens WHERE user_token = $1`, req.body.user_token)
  .then( user => {
    if (req.body.product_id === -1 ){
      return [user];
    }
    return Promise.all([user, db.one(`insert into shoppingcart (shoppingcart_id, user_id, product_id) VALUES (default, $1, $2) returning shoppingcart_id`, [user.user_id, req.body.product_id])])
  })
  .then(results => {
      let user_id = results[0].user_id;
      return db.one('select count(product_id) from shoppingcart where user_id = $1', [user_id]);

  })
  .then(result => {
      resp.json({shoppingCartCount: result.count});
  } )
  .catch(err => {
    console.log("error: ", err);
    if (err.message === 'No data returned from the query.') {
        let errMessage = {message: 'user not authenticated'};
        resp.status(401);
        resp.json(errMessage);
    } else if (err.message === 'insert or update on table "shoppingcart" violates foreign key constraint "shoppingcart_product_id_fkey"'){
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
  console.log('shopping_cart_items');
  db.one(`select user_id FROM tokens WHERE user_token = $1`, req.body.user_token)
  .then( user => db.any(`select count(shoppingcart.product_id) as quantity, product_name, product_price, (count(shoppingcart.product_id)* product_price) as extended
                        FROM shoppingcart join products on shoppingcart.product_id = products.product_id where user_id = $1 group by shoppingcart.product_id, product_name,
                        product_price order by quantity desc`, user.user_id))
  .then(results => resp.json(results))
  .catch(err => {
    console.log("error: ", err);
    if (err.message === 'No data returned from the query.') {
        let errMessage = {message: 'user not authenticated'};
        resp.status(401);
        resp.json(errMessage);
    } else if (err.message === 'insert or update on table "shoppingcart" violates foreign key constraint "shoppingcart_product_id_fkey"'){
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
app.post('/api/checkout', (req, resp, next) => {
  console.log('in api/checkout');
  console.log('token sent: ', req.body.user_token);
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
        let errMessage = {message: 'user not authenticated'};
        resp.status(401);
        resp.json(errMessage);
    } else if (err.message === 'insert or update on table "shoppingcart" violates foreign key constraint "shoppingcart_product_id_fkey"'){
      let errMessage = {message: 'invalid product_id'};
      resp.status(404);
      resp.json(errMessage);
    } else if (err.message === 'no items in shopping cart'){
      resp.status(404);
      resp.json(err);
    } else {
      throw err;
    }
  })
  .catch(next);
});

// Click Submit payment button
app.post('/api/pay', (req, resp, next) => {
    console.log('starting api/pay');
    let stripeToken = req.body.stripeToken;
    let email = req.body.email;
    let amount = req.body.amount;
    console.log(stripeToken, email, amount);
    stripe.customers.create({
            email: email
        })
        .then(customer => {
          console.log('customer: ', customer);
            return stripe.customers.createSource(customer.id, {
                source: stripeToken
            });
        })
        .then(source => {
          console.log('source: ', source);
            return stripe.charges.create({
                amount: amount,
                currency: 'usd',
                customer: source.customer,
                description: 'Test Charge'
            });
        })
        .then(charge => {
          console.log('charge: ', charge);
            console.log(charge);
        })
        .catch(err => {
            console.log(err.message);
        })
    resp.json({message: "purchase successful"});
})

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
