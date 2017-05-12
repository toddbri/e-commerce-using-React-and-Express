import * as actions from './home.action'
// import * as Redux from 'redux';
import React from 'react';
import * as ReactRedux from 'react-redux';
import {Link} from 'react-router';
class component extends React.Component {

  componentDidMount(){
    console.log("did mount for home");
    this.props.getProducts();
    // this.props.fetchPage(this.props.params.data1);

  }

componentWillReceiveProps(newProps){
    console.log("willrecieveProps-home");
    // console.log('newProps: ' + newProps.params.data1);
    // if (newProps.params.data1 !== this.props.params.data1){
    //   this.props.ActionByName(newProps.params.data1);
    // }

  }

  render() {
    console.log("in Home render");
    console.log('products: ', this.props.products);

    let producthtml = this.props.products.map((item, idx) => <div key={idx} className="singleItemContainer">
        <div className="productName">{item.product_name}</div>
        <Link to={'/donut/' + item.product_id}><img alt="productImage" className="donutImage" src={'/images/' + item.image_url}/></Link>
        <div className="itemPrice">$ {parseFloat(item.product_price).toFixed(2)}</div>
        <button onClick={this.props.addItemToCart(item.product_id)} className="addToCartButton">Add to Cart</button>

        </div>);
    let noPage = null;
    // let editinghtml = null;
    let noteditinghtml = null;
    // if (this.props.pageInfo) { html = wikiLinkify(this.props.pageInfo.content) };

    // let editButton = this.props.pageInfo ? <button className="editButton" onClick={() => this.props.toggleEdit()}>Edit</button>
    //                                       : null;


    // let noPage = this.props.doesntExist ? <div className="pageNotFoundContainer">
    //                                         <div className="pageNotFound">Sorry but we couldn't find a page for {this.props.params.title}</div>
    //                                         <div className="createNewTopic">Click
    //                                           <button onClick={() => this.props.createPage(this.props.params.title)}
    //                                                   className="createButton">here</button> to create this page
    //                                         </div>
    //                                       </div>
    //                                     :null;

    // let editinghtml = (this.props.editing && !this.props.doesntExist )? (
    //             <div>
    //               <div className="title">{this.props.pageInfo.title}</div>
    //               <div className="contentContainer">
    //
    //                 <textarea className="content" onChange={(event) => this.props.updateContent(event)} value={this.props.pageInfo.content} ></textarea>
    //
    //               </div>
    //               <button className="saveButton" onClick={()=>this.props.updatePage(this.props.pageInfo)}>Save</button>
    //             </div> )
    //             : null;
    //
    // let noteditinghtml = (!this.props.editing && !this.props.doesntExist) ?
    //                   <div>
    //                     {this.props.pageInfo && this.props.pageInfo.title ?
    //                       <div>
    //                         <div className="title">{this.props.pageInfo.title}</div>
    //                         <div className="contentContainer">
    //                           <div dangerouslySetInnerHTML={{__html: html}} className="content"></div>
    //                         </div>
    //                     </div>
    //                     :null}
    //                     {editButton} </div>
    //                     :null ;

    return (<div>
              {noPage}
              {producthtml}
              {noteditinghtml}
            </div>);


  }

}

const Container = ReactRedux.connect(
    state => state.Home,
    actions


)(component);

export default Container;

//Home Container
