import React, {useState, useEffect} from 'react';

import {Container, Jumbotron, Row, Col} from 'react-bootstrap';

import Product from './Product';

export default function UserView({productData}){

	// console.log(productData)

	const [products, setProducts] = useState([])

	useEffect( () => {
		const productsArr = productData.map((product) => {
			// console.log(product)
			if(product.isActive === true){
				return <Product key={product._id} productProp={product}/>
			} else {
				return null
			}
		})
		setProducts(productsArr)
	}, [productData])

	return(
		<Container fluid className="p-0 m-0">
				<Jumbotron fluid className="text-center">
					<h1 class="display-4">Books</h1>
					<p class="lead">that are only Twilight novels by Stephenie Meyer</p>
				</Jumbotron>
				<Row className="justify-content-center">
					<Col xs={6} md={8} className="d-flex justify-content-between flex-wrap">
						{products}
					</Col>
				</Row>
			</Container>

	)
}