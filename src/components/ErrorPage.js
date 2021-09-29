import React from 'react';

import {Container, Row, Col, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function ErrorPage(){

	return(
		<Container fluid>
			<Row>
				<Col className="px-0">
					<Jumbotron fluid className="px-3">
					  <h1>404 - Not Found</h1>
					  <p>The page you are looking for cannot be found</p>
					  <p>Click here to go <Link to="/">Back Home</Link></p>
					  {/*<Nav.Link as={NavLink} to="/">Back Home</Nav.Link>*/}
					</Jumbotron>
				</Col>
			</Row>
		</Container>
	)
}