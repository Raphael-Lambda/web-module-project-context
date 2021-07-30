import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import ProductContext from './contexts/ProductContext';
import CartContext from './contexts/CartContext';

function App() {
	const [products] = useState(data);
	const local = JSON.parse(localStorage.getItem('lambdaCart') || '[]')
	const [cart, setCart] = useState(local);
	// localStorage.setItem('lambdaCart', cart)

	const addItem = item => {
		setCart([ ...cart, item])
		localStorage.setItem('lambdaCart', JSON.stringify([ ...cart, item]))
	};

	const removeItem = id => {
		setCart(cart.filter(item => item.id !== id))
		localStorage.setItem('lambdaCart', JSON.stringify(cart.filter(item => item.id !== id)))
	}

	return (
		
			<div className="App">
				<CartContext.Provider value={{cart}}>
					<Navigation />
				</CartContext.Provider>

				{/* Routes */}
				<ProductContext.Provider value={{products, addItem}}>
					<Route exact path="/">
						<Products />
					</Route>
				</ProductContext.Provider>
				<CartContext.Provider value={{cart, removeItem}}>
					<Route path="/cart">
						<ShoppingCart />
					</Route>
				</CartContext.Provider>
			</div>
	);
}

export default App;
