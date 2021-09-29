import React, {useState, useEffect, useContext} from 'react';

import {Container} from 'react-bootstrap';


import AdminView from './../components/AdminView.js';
import UserView from './../components/UserView.js';
import GuestView from './../components/GuestView.js';

import UserContext from './../UserContext';

export default function Products(){

	const [products, setProducts] = useState([]);
	const [productsG, setProductsG] = useState([]);

	const {user} = useContext(UserContext);

	const fetchData = () => {
		let token = localStorage.getItem('token')

		fetch('https://pacific-brook-27223.herokuapp.com/api/products/all',{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {

			setProducts(result)
		})
		.then(fetch('https://pacific-brook-27223.herokuapp.com/api/products/g/all',{
			method: "GET"
		})
		.then(resultG => resultG.json())
		.then(resultG => {

			setProductsG(resultG)
		}))

	}

	useEffect( () => {
		fetchData()
	}, [])

	return(
		<Container fluid className="p-0 m-0">
			{ (user.id !== null) ? 
        		(user.isAdmin === true) ?
					<AdminView productData={products} fetchData={fetchData}/>
        		:
					<UserView productData={products} />
    		:
				(
					<GuestView productData={productsG}/>
				)
			}
			
		</Container>
	)
}
