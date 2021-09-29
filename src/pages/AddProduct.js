import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import UserContext from '../UserContext';

import Swal from 'sweetalert2'

export default function AddProduct(){

	const { user } = useContext(UserContext);
	const history = useHistory();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [isActive, setIsActive] = useState(true);

	let token = localStorage.getItem('token')


	useEffect(()=>{

		if(name !== '' && description !== '' && price !== 0){
			setIsActive(true);
		}else{
			setIsActive(false);
		}

	}, [name, description, price]);


	function addProduct(e){

		e.preventDefault();

		fetch('https://pacific-brook-27223.herokuapp.com/api/products/addProduct', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);

			if(data === true){

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Couse successfully added"
				})

				history.push('/products');

			} else {

				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Please try again"
				})

			}
		})

		setName('');
		setDescription('');
		setPrice(0);

	};


	return(

		<Row className="mt-5 justify-content-center">
			<Col xs={8} md={5} className="d-flex align-items-center border rounded">
				<Container className="m-5">
					<h1 className="mb-4 text-center">Add a Book</h1>
					<Form onSubmit={ e => addProduct(e)}>
						<Form.Group>
							<Form.Label>Book Title:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter book title"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Book Description:</Form.Label>
							<Form.Control 
								as="textarea"
								rows={3}
								type="text"
								placeholder="Enter book description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Price:</Form.Label>
							<Form.Control
								type="number"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</Form.Group>
						<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
						{ 
							(isActive === true) ? 
								<Button className="mt-4 container-fluid" size="lg" type="submit" variant="dark">Submit</Button>
							:
								<Button className="mt-4 container-fluid" size="lg" type="submit" variant="dark" disabled>Submit</Button>
						}
						</div>
					</Form>
				</Container>
			</Col>			
		</Row>
	)
}