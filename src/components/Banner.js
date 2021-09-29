import React from 'react';

import {Container, Row, Col, Jumbotron} from 'react-bootstrap';

import {Link} from 'react-router-dom';

export default function Banner(){

	return(

		<Container fluid className="p-0 m-0">
			<Row>
				<Col className="p-0 m-0">
					<Jumbotron fluid className="text-center">
					  <h1 class="display-4">Welcome To The Bookstore</h1>
					  <p class="lead">that only contains Twilight novels by Stephenie Meyer</p>
					  <Link className="btn btn-dark mt-4" variant="dark" to="/products">Check Out All Books</Link>
					</Jumbotron>
				</Col>
			</Row>
		</Container>
	)
}