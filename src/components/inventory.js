import React, { Component } from "react";
import styles from "./base.module.css";

// This is from the gatsby tutorial that created an about page. I repurposed it to display my items. A modified version is also used in my cart to display items there.
const Item = props => (
	<div className={styles.item}>
		<img src={props.picture} className={styles.picture} alt="" />
		<div className={styles.info}>
			<h2 className={styles.name}>
			{props.name}
			</h2>
			<p className={styles.price}>
				{props.price}
			</p>
		</div>
		<div className={styles.button}>
			<button onClick={props.addToLocal}>Add to Cart</button>
		</div>
	</div>
);

export default class Inventory extends Component {
	constructor (props) {
		super(props)
		this.state = {
			inventory:[],
		}
	}

	// Here I use fetch to get data from the API, and give it to the state.
	async componentDidMount () {
		const items = await fetch("http://localhost:8080/api/inventory").then(res => res.json());
		this.setState({inventory: items});
	}

	// I use this function to calculate the total price of the items you are placing into your cart as you add them, and place them into sessionStorage
	calculate () {
		const x = JSON.parse(sessionStorage.getItem("cart"));
		const total = x.reduce((total, item) => total + (item.quantity * item.item.price), 0).toFixed(2);
		sessionStorage.setItem("total", total);
		return total;
	}

	// This function was created for the "Add to Cart" button. It adds one instance of any given item into sessionStorage, which can be used to later
	// render the cart. 
	addToLocal (props) {
		document.querySelector(".error").innerHTML = "";

		// If the cart doesn't exit, we create it.
		const x = JSON.parse(sessionStorage.getItem("cart"));
		let cart = (!Array.isArray(x) || !x.length) ? [] : x;

		if (!cart.some(items => props._id === items.item._id)) {
			cart.push({item: props, quantity: 1});
		} else {
			// I only wanted the user to be able to store one instance of any item, because adding an item to a cart lacks feedback currently.
			// With the error message below, it confirms that the item is in the cart and lets the user know how to change it's quantity.
			// I opted not to use a simple "Added to cart!" message, as I figured that that message would persist on that page unless
			// a person left the page and went back, negating feedback for subsequent items.
			const errmsg = document.createElement("p");
			errmsg.innerHTML = "This item is already in your cart! Please change desired quantity in the cart";
			document.querySelector(".error").appendChild(errmsg);
		}
		
		sessionStorage.setItem("cart", JSON.stringify(cart));
		this.calculate();
	}


	render () {

		const items = this.state.inventory.map((item) => (
			<Item
				key={item._id}
				name={item.name}
				picture={item.picture}
				price={item.price}
				addToLocal={this.addToLocal.bind(this, item)}
			/>
		));

		return (
			<div>{items}</div>
		)
	}
}