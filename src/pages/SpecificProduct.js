import React, {useContext, useEffect, useState} from 'react';

import UserContext from './../UserContext';

import {Link, useParams, useHistory} from 'react-router-dom';

import {Container, Card, Button} from 'react-bootstrap';

import Swal from 'sweetalert2';


export default function SpecificProduct(){

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0)

	const { user } = useContext(UserContext);

	const { productId } = useParams();

	let token = localStorage.getItem('token')

	let history = useHistory();

	useEffect( () => {
		fetch(`https://pacific-brook-27223.herokuapp.com/api/products/g/${productId}`,
			{
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			}
		)
		.then(result => result.json())
		.then(result => {
			console.log(result)

			setName(result.name);
			setDescription(result.description);
			setPrice(result.price);
		})
	}, [])

	const alert = () => {
				Swal.fire({
					title: "",
					icon: "warning",
					text: "This button has no buy function." 
				})
		}

	return(
		<Container className="my-5 ">
			<Card>
				<Card.Header className="text-center">
					<h4 className="mt-1">
						{name}
					</h4>
				</Card.Header>
				<Card.Body>
					<Card.Text>
						{description}
					</Card.Text>
				</Card.Body>
				<Card.Footer className="text-center">
					<h6>Price: Php {price}</h6>
					{
						(user.id !== null) ?
								<Button className="btn btn-dark mt-2 container fluid"
								onClick={ () => alert() }

								> Add To Cart</Button>
							:
								<Link className="btn btn-dark mt-2 container fluid" to="/login">Login To Buy</Link>
					}
				</Card.Footer>
			</Card>
		</Container>
	)
}