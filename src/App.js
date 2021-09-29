import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserContext from './UserContext';

import AppNavbar from './components/AppNavbar';
import Home from './pages/Home'
import Products from './pages/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import ErrorPage from './components/ErrorPage';
import SpecificProduct from './pages/SpecificProduct';
import AddProduct from './pages/AddProduct';

export default function App(){

	const [user, setUser] = useState(
		{
			id: null,
			isAdmin: null
		}
	);

	const unsetUser = () => {
		localStorage.clear();
		setUser({
			id: null,
			isAdmin: null
		})
	}

	useEffect( () => {
		let token = localStorage.getItem('token');
		fetch('https://pacific-brook-27223.herokuapp.com/api/users/details', {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result) //object/ document of a user

			if(typeof result._id !== "undefined"){
				setUser({
					id: result._id,
					isAdmin: result.isAdmin
				})
			} else {
				setUser({
					id: null,
					isAdmin: null
				})
			}
		})
	}, [])

	return( 

	<UserContext.Provider value={{user, setUser, unsetUser}}> 
		<BrowserRouter>
			<AppNavbar/>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/products" component={Products} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/products/:productId" component={SpecificProduct} />
				<Route exact path="/addProduct" component={AddProduct} />
				<Route component={ErrorPage} />
			</Switch>
		</BrowserRouter>
	</UserContext.Provider>
	)
}