import React from 'react'

/*react-bootstrap component*/
import Container from 'react-bootstrap/Container'

/*components*/
import Banner from './../components/Banner';
import Highlights from './../components/Highlights';

export default function Home(){

	return(
		<Container fluid>
			<Banner/> 
			<Highlights/>
		</Container>
	)
}