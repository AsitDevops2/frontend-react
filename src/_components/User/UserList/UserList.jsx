import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userActions } from '../../../_actions';
import Pagination from "react-js-pagination";
import React, { Component } from 'react';

class UserList extends React.Component {
    constructor(props) {
        super(props);  
        this.state= {
            activePage:1,
            total:0,
            data: [],
            serachTxt:"" ,
            filterData:[]
        }     
        this.deleteRecord = this.deleteRecord.bind(this);
    }

    componentDidMount() {
        let loggedUser = JSON.parse(localStorage.getItem('user'));

        if(loggedUser.role=="super_admin")
            this.props.getAll();
        else
            this.props.getByParent(loggedUser.id);
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.users && nextProps.users.items && nextProps.users.items !== this.state.data) {
          let len = nextProps.users.items.length;
         let  arr=JSON.parse(JSON.stringify(nextProps.users.items)); 
            this.setState({ data: arr.slice(0,5),total:len});
        }
      }

    handlePageChange(pageNumber) { 
        console.log(`active page is ${pageNumber}`);
        let len = this.state.filterData.length;
        let  arr= len ? JSON.parse(JSON.stringify(this.state.filterData)):JSON.parse(JSON.stringify(this.props.users.items)); 

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


    deleteRecord(id) {
        if (confirm('Sure want to delete?') && id != null)
            this.props.deleteRecord(id);
    }
    render() {
        // let users={items:[]};

        // if(this.props.users != null && this.props.users.items != null){
        //     users = this.props.users;
        // } 
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                <br />
                <h2>USER DATA</h2><br />
                    <div classname="form-group">
                        <Link to="/addUser" className="btn btn-primary" >Add User</Link>
                    </div>
                <br/>
                </div>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No.</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((user, index) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.firstName + ' ' + user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.addr1}</td>
                                        <td>{user.city}</td>
                                        <td>{user.dept}</td>
                                        <td>
                                            <div className="row">
                                            <Link to={{ pathname: `/editPage/${user.id}` }} className="col-md-4 col-xs-6" style={{marginLeft:'5px',color:'#4CAF50'}}><FontAwesomeIcon icon={faEdit} size="lg" /></Link>
                                            <Link  onClick={() => this.deleteRecord(user.id)} className="col-md-4 col-xs-6" style={{color:'#d9534f'}}><FontAwesomeIcon icon={faTrashAlt} size="lg" /></Link>
                                            </div>
                                            {/* <button style={{height:'35px',width:'40px'}} to={{pathname: `/editPage/${user.id}`}} className="btn btn-success"><FontAwesomeIcon icon={faEdit}/></button> 
                                            <button style={{height:'35px',width:'40px',marginLeft:'5px'}} onClick={()=>this.deleteRecord(user.id)} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt}/></button> */}
                                        </td>
                                    </tr>
                                )

                        })}
                    </tbody>
                </table>
                <br />
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
    const { users } = state;
    return { users };
}


const actionCreators = {
    getAll: userActions.getAll,
    deleteRecord: userActions.delete,
    getByParent: userActions.getByParent
}

const connectedUserList = connect(mapState, actionCreators)(UserList);
export { connectedUserList as UserList };
