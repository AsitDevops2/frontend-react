import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userActions } from '../../../_actions';
import React, { Component } from 'react';

class UserList extends React.Component {
    constructor(props) {
        super(props);       
        this.deleteRecord = this.deleteRecord.bind(this);
    }

    componentDidMount() {
        let loggedUser = JSON.parse(localStorage.getItem('user'));

        if(loggedUser.role=="super_admin")
            this.props.getAll();
        else
            this.props.getByParent(loggedUser.id);
    }


    deleteRecord(id) {
        if (confirm('Sure want to delete?') && id != null)
            this.props.deleteRecord(id);
    }
    render() {
        let users={items:[]};

        if(this.props.users != null && this.props.users.items != null){
            users = this.props.users;
        } 
        return (
            <div className="container">
                <br />
                <h2 style={{ margin: 'auto'}}>USER DATA</h2><br />
                    <div classname="col-md-4 form-group" style={{ marginLeft: 'auto', marginRight: '15px' }}>
                        <Link to="/addUser" className="btn btn-primary" >Add User</Link>
                    </div>
                <br/>
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
                        {users.items.map((user, id) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.firstName + ' ' + user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.addr1}</td>
                                        <td>{user.city}</td>
                                        <td>{user.dept}</td>
                                        <td>
                                            <Link to={{ pathname: `/editPage/${user.id}` }}  style={{ marginLeft: '7px' }}><FontAwesomeIcon style={{color:'#4CAF50'}} icon={faEdit} size="lg" /></Link>
                                            <Link  onClick={() => this.deleteRecord(user.id)} style={{marginLeft: '10px' }}><FontAwesomeIcon style={{color:'#d9534f'}} icon={faTrashAlt} size="lg" /></Link>
                                            {/* <button style={{height:'35px',width:'40px'}} to={{pathname: `/editPage/${user.id}`}} className="btn btn-success"><FontAwesomeIcon icon={faEdit}/></button> 
                                            <button style={{height:'35px',width:'40px',marginLeft:'5px'}} onClick={()=>this.deleteRecord(user.id)} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt}/></button> */}
                                        </td>
                                    </tr>
                                )

                        })}
                    </tbody>
                </table>
                <br />
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
