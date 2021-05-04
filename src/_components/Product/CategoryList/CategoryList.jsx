import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { faEdit,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categoryActions } from '../../../_actions';


import React, { Component } from 'react';

// let products = [{description:"Sony tv with smart features",name:"Electronics"},
//                 {description:"Redmi tv with smart features",name:"Electronics"},
//                 {description:"None",name:"Mobiles"}];

class CategoryList extends React.Component {
    
    constructor(props) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);
    }
   
   
    componentDidMount() {
        let loggedUser = JSON.parse(localStorage.getItem('user'));
        if(loggedUser.role=="super_admin")
            this.props.getAll();
        else
            this.props.getByUser(loggedUser.id);
    }

    deleteCategory(id) {
        if (confirm('Sure want to delete?') && id != null)
            this.props.deleteCategory(id);
            window.location.reload();
    }

    render() {
        let categories={items:[]};
        if(this.props.categories != null && this.props.categories.items != null){
            categories = this.props.categories;
        } 
        return (
            <div className="container">
                <center><h2>Category List</h2></center>

                <Link to="/addCategory" className="btn btn-primary">Add Category</Link><br/><br/>
                <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th style={{textAlign:'center'}}>Action</th>
                </tr>
                </thead>                
                <tbody>
                    {categories.items.map((category, index) => {
                        
                        return(
                            <tr key={category.id}>
                                <td>{category.name}</td>   
                                <td>{category.description}</td>
                                <td>
                                    <Link onClick={() => this.deleteCategory(category._id)} style={{ marginLeft: '45%'}}><FontAwesomeIcon style={{color:'#d9534f'}} icon={faTrashAlt} size="lg"/></Link>
                                    {/* <button style={{height:'35px',width:'40px',marginLeft:'5px'}} onClick={()=>this.this.deleteCategory(category._id)} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt}/></button> */}
                                </td>
                            </tr>                            
                        )                      
            })}

                </tbody>
                </table> 
                </div>
        )
    }
}


function mapState(state) {
    const { authentication } = state;
     const { categories } = state;
    return { categories };
}


const actionCreators = {
    getAll: categoryActions.getAllCategory,
    getByUser:categoryActions.getCategoryByUser,
    deleteCategory:categoryActions.deleteCategory
}

const connectedCategoryList = connect(mapState, actionCreators)(CategoryList);
export { connectedCategoryList as CategoryList };