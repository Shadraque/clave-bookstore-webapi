import React, {useState, useEffect} from 'react';

import {Row, Col, Card, Button} from 'react-bootstrap';

import {Link} from 'react-router-dom';

export default function Product({productProp}){
	console.log(productProp)

	const {name, description, price, _id} = productProp


	return(

        	<div className="d-inline-flex my-5">
				<Card style={{ width: '20rem' }} >
					<Card.Header className="text-center">
						<h4 className="mt-1">
							{name}
						</h4>
					</Card.Header>
					<Card.Body>
						<p>{description}</p>
					</Card.Body>
					<Card.Footer className="text-center">
						<h5>Price: Php {price}</h5>

						<Link className="btn btn-dark mt-2 container fluid" to={`/products/${_id}`}>
							Details
						</Link>
					</Card.Footer>
					
				</Card>
			</div>

	)
}

