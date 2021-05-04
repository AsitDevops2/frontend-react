import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { faEdit,faTrashAlt, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "react-js-pagination";
import { productActions } from '../../../_actions';
import { blockInvalidChar } from "../../BlockCharacter";


class ProductList extends React.Component {
    
    
    constructor(props) {
        
        super(props);
        this.state= {
            activePage:1,
            total:0,
            data: [],
            serachTxt:"" ,
            filterData:[],
            filterObj: {name:'',brand:'',price:'',quantity:'',category:''},
            show: false     
        };
        this.deleteRecord = this.deleteRecord.bind(this);
        this.filterData = this.filterData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.columnSearch = this.columnSearch.bind(this);
        this.displayBlock = this.displayBlock.bind(this);
    }   
   
    componentDidMount() {
        let loggedUser = JSON.parse(localStorage.getItem('user'));
        if(loggedUser.role=="super_admin")
            this.props.getAll();
        else
            this.props.getAllByParent(loggedUser.id);
    }

    displayBlock(){
        this.setState((currentState) => ({show: !currentState.show}));
    } 

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.products && nextProps.products.items && nextProps.products.items !== this.state.data) {
          let len = nextProps.products.items.length;
         let  arr=JSON.parse(JSON.stringify(nextProps.products.items)); 
            this.setState({ data: arr.slice(0,5),total:len});
        }
      }

    handlePageChange(pageNumber) { 
        console.log(`active page is ${pageNumber}`);
        let len = this.state.filterData.length;
        let  arr= len ? JSON.parse(JSON.stringify(this.state.filterData)):JSON.parse(JSON.stringify(this.props.products.items)); 

         if(pageNumber > 1){
            let start=  (pageNumber-1)*5;
            let end= start+5;
            let data = arr.filter((row,index)=>{
                return index >= start && index < end;
            })
            this.setState({activePage: pageNumber,data:data});
            }else{           
            this.setState({activePage: pageNumber,data: arr.slice(0, 5)});
         }       
          
    }

    filterData(e) {
        let text = e.target.value.toLowerCase();
        let arr = JSON.parse(JSON.stringify(this.props.products.items));
        if (text.length>=1) {
             let data = arr.filter(obj =>{
               return obj.name.toLowerCase().includes(text) || obj.brand.toLowerCase().includes(text) || obj.category.toLowerCase().includes(text) ||
                obj.price.toString().includes(text) || obj.quantity.toString().includes(text) ;
            });
            let flitArr=JSON.parse(JSON.stringify(data));
            flitArr=flitArr.slice(0,5);

            this.setState({data:flitArr,activePage:1,total:data.length,filterData:data});
        }
        else {
            this.setState({ data: arr.slice(0, 5), activePage: 1,total:arr.length,filterData:[] });
        }

    }
    handleChange(event) {
        const { name, value } = event.target;
        const { filterObj } = this.state;
        this.setState({
            filterObj: {
                ...filterObj,
                [name]: value
            }
        });
    }
    columnSearch(event){
        const { filterObj } = this.state;
        let arr = JSON.parse(JSON.stringify(this.props.products.items));
        if (filterObj.name.length>=1 || filterObj.brand.length>=1 || filterObj.quantity.length>=1 || filterObj.price.length>=1 || filterObj.category.length>=1) {
        let data = arr.filter(obj => {
               return ((obj.name.toLowerCase().includes(filterObj.name.toLowerCase())) && (obj.brand.toLowerCase().includes(filterObj.brand.toLowerCase())) &&
               (obj.quantity.toString().toLowerCase().includes(filterObj.quantity.toLowerCase())) && (obj.price.toString().toLowerCase().includes(filterObj.price.toLowerCase())) &&
               (obj.category.toLowerCase().includes(filterObj.category.toLowerCase())))
            });
            let flitArr=JSON.parse(JSON.stringify(data));
            flitArr=flitArr.slice(0,5);

            this.setState({data:flitArr,activePage:1,total:data.length,filterData:data});
        }else{
            this.setState({ data: arr.slice(0, 5), activePage: 1,total:arr.length,filterData:[] });
        }
      
    }

    deleteRecord(id) {
        if( confirm('Sure want to delete?')&&id != null)
        this.props.deleteRecord(id); 
        window.location.reload();   
    }

    render() {
        return (
            <div className="container">
               <h2>Product List</h2><br/>
                <div className="row">
                <div classname="col-md-8 form-group" style={{marginLeft:'15px',width:'30%'}}>
                <input type="text" name="searchValue" placeholder="Search" className="form-control" 
                onKeyUp={this.filterData}></input><br/>
                </div>
                <div classname="col-md-4 form-group" style={{marginLeft:'auto',marginRight:'15px'}}>
                <Link to="/addProduct" className="btn btn-primary">Add Product</Link>
                </div>                
                </div>
                <table className="table table-bordered">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th style={{width:'12%'}}>Actions<FontAwesomeIcon icon={faFilter} style={{marginLeft:'5px'}} onClick={this.displayBlock}/></th>
                </tr>
                
                {this.state.show && <tr>
                    {/* <table className="table"> */}
                        {/* <thead> */}
                        {/* <tr> */}
                             <th></th>
                            <th><input type="text" className="form-control" value={this.state.filterObj.name} name="name" placeholder="Name" onChange={this.handleChange} onKeyUp={this.columnSearch}></input></th>
                            <th><input type="text" className="form-control" value={this.state.filterObj.brand} name="brand"  placeholder="Brand" onChange={this.handleChange} onKeyUp={this.columnSearch}></input></th>
                            <th><input type="text" className="form-control" value={this.state.filterObj.quantity} name="quantity"  placeholder="Quantity" onChange={this.handleChange} onKeyUp={this.columnSearch} onKeyDown={blockInvalidChar}></input></th>
                            <th><input type="text" className="form-control" value={this.state.filterObj.price} name="price"  placeholder="Price" onChange={this.handleChange} onKeyUp={this.columnSearch} onKeyDown={blockInvalidChar}></input></th>
                            <th><input type="text" className="form-control" value={this.state.filterObj.category} name="category"  placeholder="Category" onChange={this.handleChange} onKeyUp={this.columnSearch}></input></th>
                            <th></th>
                        {/* </tr> */}
                        {/* </thead> */}
                    {/* </table> */}
                </tr>}        
        
                </thead>      
                <tbody>
                    {this.state.data.map((product, index) => {
                        
                        return(
                            <tr key={index+1}>
                                <td>{(this.state.activePage-1)*5+(index+1)}</td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>    
                                <td>{product.category}</td>
                                
                                <td>
                                <Link style={{marginLeft:'10px'}} to={{pathname: `/editProduct/${product._id}`}}><FontAwesomeIcon style={{color:'#4CAF50'}} icon={faEdit} size="lg"/></Link> 
                                <Link style={{marginLeft:'10px'}} onClick={()=>this.deleteRecord(product._id)} ><FontAwesomeIcon style={{color:'#d9534f'}} icon={faTrashAlt} size="lg"/></Link>
                                {/* <button style={{height:'35px',width:'40px'}} to={{pathname: `/editProduct/${product._id}`}} className="btn btn-success"><FontAwesomeIcon icon={faEdit}/></button> 
                                <button style={{height:'35px',width:'40px',marginLeft:'5px'}} onClick={()=>this.deleteRecord(product._id)} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt}/></button> */}
                                </td>
                            </tr>
                            
                        )
                         
                        
            })}

                </tbody>
                </table>

                <Pagination

                activePage={this.state.activePage}

                itemsCountPerPage={5}
                
                totalItemsCount={this.state.total}

                pageRangeDisplayed={5}

                itemClass="page-item"
                
                linkClass="page-link"

                onChange={this.handlePageChange.bind(this)}/>

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
    getAllByParent: productActions.getAllByParent,
    deleteRecord: productActions.delete
}

const connectedProductList = connect(mapState, actionCreators)(ProductList);
export { connectedProductList as ProductList };
