import React, {useState, useEffect, useContext} from 'react';
import { Redirect } from 'react-router-dom'

import UserContext from './../UserContext';

import {Container, Form, Button, Row, Col} from 'react-bootstrap';


export default function Login(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	/*destructure context object*/
	const {user, setUser} = useContext(UserContext);

	useEffect( () => {
		if(email !== '' && password !== ''){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [email, password]);

	function login(e){
		e.preventDefault();

		// alert('Login Successful');
		fetch('https://pacific-brook-27223.herokuapp.com/api/users/login', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result) //{access: token}

			if(typeof result.access !== "undefined"){
				//what should we do with the access token?
				localStorage.setItem('token', result.access)
				userDetails(result.access)
			}
		})

		const userDetails = (token) => {
			fetch('https://pacific-brook-27223.herokuapp.com/api/users/details',{
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then(result => result.json())
			.then(result => {
				console.log(result) //whole user object or document

				setUser({
					id: result._id,
					isAdmin: result.isAdmin
				});
			})
		}

		setEmail('');
		setPassword('');
	}

	return(
		(user.id !== null) ? 

			<Redirect to="/" />

		: 
		<Row className="mt-5 justify-content-center">
			<Col xs={8} md={5} className="d-flex align-items-center border rounded">
				<Container className="m-5">
					<h1 className="mb-4 text-center">Login</h1>
					<Form onSubmit={ (e) => login(e) }>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" value={email}
							onChange={(e)=> setEmail(e.target.value) }/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" value={password}
							onChange={(e)=> setPassword(e.target.value) }/>
						</Form.Group>
						<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
							<Button className="mt-4 container-fluid" size="lg" variant="dark" type="submit" disabled={isDisabled}>Login</Button>
						</div>
					</Form>
				</Container>
			</Col>
		</Row>
	)
}