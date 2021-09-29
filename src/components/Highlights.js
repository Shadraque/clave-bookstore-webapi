import React, {useState, useEffect} from 'react';

import {Container} from 'react-bootstrap';

import Featured from './../components/Featured.js';

export default function Highlights(){
	
	const [productsG, setProductsG] = useState([]);

	const fetchData = () => {

		fetch('https://pacific-brook-27223.herokuapp.com/api/products/g/all',{
			method: "GET"
		})
		.then(resultG => resultG.json())
		.then(resultG => {

			setProductsG(resultG)
		})

	}

	useEffect( () => {
		fetchData()
	}, [])

	return(
		<Container>
			<Featured productData={productsG}/>
		</Container>
	)
}
