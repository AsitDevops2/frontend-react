import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { faEdit,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "react-js-pagination";
import { productActions } from '../../../_actions';


import React, { Component } from 'react';

// let products = [{id:"1",name:"Android Tv",brand:"Sony",description:"Sony tv with smart features",quantity:"100",price:"120000",category:"Electronics",supplier:"Shradha"},
//                 {id:"2",name:"Smart TV",brand:"Redmi",description:"Redmi tv with smart features",quantity:"200",price:"80000",category:"Electronics",supplier:"Shradha"},
//                 {id:"3",name:"Washing Machine",brand:"Whirpool",description:"None",quantity:"100",price:"35000",category:"Electronics",supplier:"Neeta"}];

class ProductList extends React.Component {
    
    constructor(props) {
        super(props);

        // this.state = {
        //     activePage: 1
        //   };
        this.deleteRecord = this.deleteRecord.bind(this);
    }
   
   
    componentDidMount() {
        this.props.getAll();
        // console.log(this.props.getAll());
    }

    deleteRecord(id) {
        if( confirm('Sure want to delete?')&&id != null)
        this.props.deleteRecord(id); 
        window.location.reload ();   
    }

    // handlePageChange(pageNumber) {
    //     console.log(`active page is ${pageNumber}`);
    //     this.setState({activePage: pageNumber});
    //   }

    render() {
        let products={items:[]};
        if(this.props.products != null && this.props.products.items != null){
            products = this.props.products;
        } 
        return (
            <div className="container">
                <center><h2>Product List</h2></center>

                <Link to="/addProduct" className="btn btn-primary">Add Product</Link><br/><br/>
                <table className="table table-bordered">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>                
                <tbody>
                    {products.items.map((product, index) => {
                        
                        return(
                            <tr key={index+1}>
                                <td>{index+1}</td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>    
                                <td>{product.category}</td>
                                
                                <td>
                                <Link to={{pathname: `/editProduct/${product._id}`}} className="btn btn-success" style={{marginLeft: '10px'}}><FontAwesomeIcon icon={faEdit}/></Link> 
                                <button  className="btn btn-danger" onClick={()=>this.deleteRecord(product._id)} style={{marginLeft: '10px'}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                
                                </td>
                            </tr>
                            
                        )
                         
                        
            })}

                </tbody>
                </table> 
                {/* <div>
                <Pagination className="btn btn-dark"
                activePage={this.state.activePage}
                itemsCountPerPage={5}
                totalItemsCount={20}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
                />
            </div> */}
            {/* <TablePagination
    type="full"
    page={1}
    pageLength={5}
    totalRecords={15}
    onPageChange={({ page, pageLength }) => {
        this.setState({ page, pageLength })
    }}
    prevPageRenderer={() => <i className="fa fa-angle-left" />}
    nextPageRenderer={() => <i className="fa fa-angle-right" />}
/> */}
                </div>
        )
    }
}

function mapState(state) {
    const { authentication } = state;
     const { products } = state;
    return { products };
}


const actionCreators = {
    getAll: productActions.getAll,
    deleteRecord: productActions.delete
}

const connectedProductList = connect(mapState, actionCreators)(ProductList);
export { connectedProductList as ProductList };
// export {ProductList}
