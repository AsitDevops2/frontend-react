import config from 'config';
import { authHeader } from '../_helpers';

export const productService = {
    addProduct,
    getAll,
    getAllByParent,
    getById,
    updateProduct,
    delete: _delete,
    getChartData:getChartData
    // addCategory,
    // getAllCategory
   // editUser
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.invUrl}/product/list`, requestOptions).then(handleResponse);
}


function getAllByParent(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.invUrl}/product/list/byParent/${id}`,requestOptions).then(handleResponse);
}


function addProduct(product) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };
    return fetch(`${config.invUrl}/product/add`, requestOptions).then(handleResponse);
}

function updateProduct(product) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };
 
    return fetch(`${config.invUrl}/product/updateProduct/${product._id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.invUrl}/product/delete/${id}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.invUrl}/product/byId/${id}`, requestOptions).then(handleResponse);
}

function getChartData() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.invUrl}/product/charts`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        //console.log(data);
        //if (!response.ok) {
            if (data.status === 401 || data.status === 400 || !response.ok) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            // const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
        //}
           console.log(data);
        return data;
    });
}