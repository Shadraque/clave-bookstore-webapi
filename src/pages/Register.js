import React, {useState, useEffect, useContext} from 'react';

/*react router dom*/
import { useHistory, Redirect } from 'react-router-dom';

/*react-bootstrap components*/
import {Container, Form, Button, Row, Col} from 'react-bootstrap';

/*context*/
import UserContext from './../UserContext';

/*sweetalert*/
import Swal from 'sweetalert2';



export default function Register(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	const {user} = useContext(UserContext)

	let history = useHistory();

	useEffect( () => {
		if(email !== '' && password !== '' && verifyPassword !== '' && password === verifyPassword){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [email, password, verifyPassword]);


	function register(e){
		e.preventDefault();

		// alert('Registration Successful, you may now log in');
		fetch('https://pacific-brook-27223.herokuapp.com/api/users/checkEmail', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then( result => result.json())
		.then( result => {
			// console.log(result)	//boolean

			if(result === true){
				// alert("User already exist")
				Swal.fire({
					title: 'Duplicate email found',
					icon: 'error',
					text: 'Please choose another email'
				})
			} else {
				//what to do when user/email still not existing?

				fetch('https://pacific-brook-27223.herokuapp.com/api/users/register', {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
				.then( result => result.json())
				.then( result => {
					//console.log(result)	//boolean

					if(result === true){

						Swal.fire({
							title: "Registration Successful",
							icon: "success",
							text: "Welcome to Course Booking"
						})

						history.push('/login');

					} else {
						Swal.fire({
							title: 'Something went wrong',
							icon: 'error',
							text: 'Please try again'
						})
					}
				})

			}
		})

		setEmail('');
		setPassword('');
		setVerifyPassword('');
	}

	return(
		(user.id !== null) ?

			<Redirect to="/" />

		:
		<Row className="mt-5 justify-content-center">
			<Col xs={8} md={5} className="d-flex align-items-center border rounded">
				<Container className="m-5">
					<h1 className="mb-4 text-center">Register</h1>
					<Form onSubmit={(e)=> register(e)}>

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

						<Form.Group className="mb-3" controlId="formVerifyPassword">
							<Form.Label>Verify Password</Form.Label>
							<Form.Control type="password" placeholder="Verify Password"  value={verifyPassword}
							onChange={(e)=> setVerifyPassword(e.target.value)}/>
						</Form.Group>
						<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
							<Button className="mt-4 container-fluid" size="lg" variant="dark" type="submit" disabled={isDisabled}>Submit</Button>
						</div>
					</Form>
				</Container>
			</Col>
		</Row>
	)
}