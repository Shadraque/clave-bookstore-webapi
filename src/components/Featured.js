import React, {useState, useEffect} from 'react';

import {Container} from 'react-bootstrap';

import Product from './Product';

export default function GuestView({productData}){

	const [products, setProducts] = useState([])

	useEffect( () => {

		const productsArr = productData.map((product) => {
			if(product.isActive === true && product.featured === true){
				return <Product key={product._id} productProp={product}/>
			} else {
				return null
			}
		})
		setProducts(productsArr)
        console.log(productsArr)
	}, [productData])

	return(
		<Container className="d-flex justify-content-between flex-wrap">
			{products}
		</Container>
	)
}