import React, {useState, useEffect, Fragment} from 'react'

import {Container, Table, Button, Modal, Form} from 'react-bootstrap'

import Swal from 'sweetalert2';



export default function AdminView(props){

	const { productData, fetchData } = props;
	console.log(productData)

	const [productId, setProductId] = useState('');
	const [products, setProducts] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const [showEdit, setShowEdit] = useState(false);
	const [showAdd, setShowAdd] = useState(false);

	let token = localStorage.getItem('token');

	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);



	const openEdit = (productId) => {
		fetch(`https://pacific-brook-27223.herokuapp.com/api/products/${productId}`,{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			setProductId(result._id);
			setName(result.name);
			setDescription(result.description);
			setPrice(result.price)
		})

		setShowEdit(true);
	}

	const closeEdit = () => {

		setShowEdit(false);
		setName("")
		setDescription("")
		setPrice(0)
	}

	useEffect( () => {
		const productsArr = productData.map( (product) => {
			console.log(product)
			return(
				<tr key={product._id}>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td>
						{
							(product.isActive === true) ?
								<span>Available</span>
							:
								<span>Unavailable</span>
						}
					</td>
					<td>
						<Fragment>
							<Button variant="secondary" size="sm" className="container-fluid mb-1"
							onClick={ ()=> openEdit(product._id) }>
								Update
							</Button>
							
						</Fragment>

						{
							(product.featured === false) ?
								<Button variant="dark" size="sm" className="container-fluid mb-1"
								onClick={()=> featureToggle(product._id, product.featured)}>
									Not featured
								</Button>
							:
								
								<Button variant="success" size="sm" className="container-fluid mb-1"
								onClick={ () => unfeatureToggle(product._id, product.featured)}>
									Featured
								</Button>
								
						}

						{
							(product.isActive === true) ?
								<Button variant="success" size="sm" className="container-fluid mb-1"
								onClick={()=> archiveToggle(product._id, product.isActive)}>
									Active
								</Button>
							:
								
								<Button variant="dark" size="sm" className="container-fluid mb-1"
								onClick={ () => unarchiveToggle(product._id, product.isActive)}>
									Inactive
								</Button>
								
						}


						<Fragment>
							<Button variant="danger" size="sm" className="container-fluid mb-1"
							onClick={ () => deleteToggle(product._id)}>
								Delete
							</Button>
						</Fragment>
					</td>
				</tr>
			)
		})

		setProducts(productsArr)
	}, [productData])

	/*edit product function*/
	const editProduct = (e, productId) => {

		e.preventDefault()

		fetch(`https://pacific-brook-27223.herokuapp.com/api/products/${productId}/edit`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result) //updated product document

			fetchData()

			if(typeof result !== "undefined"){
				// alert("success")

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully updated!"
				})

				closeEdit();
			} else {

				fetchData()

				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Something went wrong!"
				})
			}
		})
	}

	/*action product*/
	const archiveToggle = (productId, isActive) => {

		fetch(`https://pacific-brook-27223.herokuapp.com/api/products/${productId}/archive`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			fetchData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully archived!"
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again"
				})
			}
		})
	}

	const unarchiveToggle = (productId, isActive) => {
		fetch(`https://pacific-brook-27223.herokuapp.com/api/products/${productId}/unarchive`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			fetchData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully unarchived!"
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again"
				})
			}
		})
	}

	const featureToggle = (productId, featured) => {

		fetch(`https://pacific-brook-27223.herokuapp.com/api/products/${productId}/feature`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				featured: featured
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			fetchData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully featured"
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again"
				})
			}
		})
	}

	const unfeatureToggle = (productId, featured) => {
		fetch(`https://pacific-brook-27223.herokuapp.com/api/products/${productId}/unfeature`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				featured: featured
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			fetchData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully unfeatured"
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again"
				})
			}
		})
	}

	const deleteToggle = (productId) => {
		fetch(`https://pacific-brook-27223.herokuapp.com/api/products/${productId}/delete`, {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			fetchData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully archived/unarchived"
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again"
				})
			}
		})
	}

	const addProduct = (e) => {
		e.preventDefault()
		fetch('https://pacific-brook-27223.herokuapp.com/api/products/addProduct', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			if(result === true){
				fetchData()

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully added"
				})

				setName("")
				setDescription("")
				setPrice(0)

				closeAdd();

			} else {
				fetchData();

				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Something went wrong"
				})
			}
		})
	}

	return(
		<Container className="mt-5">
			<div>
				<h2 className="text-center">Admin Dashboard</h2>
				<div className="d-flex justify-content-end mb-2">
					<Button variant="dark" onClick={openAdd}>Add New Book</Button>
				</div>
			</div>
			<Table className="table table-bordered table-hover table-dark">
				<thead>
					<tr className="text-center">
						<th>Title</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{/*display the products*/}
					{products}
				</tbody>
			</Table>
		{/*Edit Product Modal*/}
			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={ (e) => editProduct(e, productId) }>
					<Modal.Header>
						<Modal.Title className="font-weight-bold">Edit Book Details</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="productName">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={name}
								onChange={ (e)=> setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="productDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								value={description}
								onChange={ (e)=> setDescription(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="productPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								value={price}
								onChange={ (e)=> setPrice(e.target.value)}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="dark" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		{/*Add Product Modal*/}
		<Modal show={showAdd} onHide={closeAdd}>
			<Form onSubmit={ (e) => addProduct(e) }>
				<Modal.Header>
					<Modal.Title className="font-weight-bold">Add New Book</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group productId="productName">
						<Form.Label>Title</Form.Label>
						<Form.Control 
							type="text"
							value={name}
							onChange={(e)=> setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group productId="productDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="text"
							value={description}
							onChange={(e)=> setDescription(e.target.value)}
						/>
					</Form.Group>
					<Form.Group productId="productPrice">
						<Form.Label>Price</Form.Label>
						<Form.Control 
							type="number"
							value={price}
							onChange={(e)=> setPrice(e.target.value)}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeAdd}>Close</Button>
					<Button variant="dark" type="submit">Submit</Button>
				</Modal.Footer>
			</Form>
		</Modal>
		</Container>
	)
}