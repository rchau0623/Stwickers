import React, { Component } from "react";
import styles from "./base.module.css";
import Link from "gatsby-link";

// This is the same way items are displayed on the store front, but modified to include buttosn to delete, and update the price based on the number in the form.
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

		<div className={styles.cart}>
			<form onSubmit={props.handleSubmit} style={{ display: `block` }}>
				Quantity: <input type="text" value={props.quantity} onChange={props.handleChange} style={{ textAlign: `center`, width: `50px`}} />
				<input type="submit" value="Update" className={styles.buttons} />
			</form>
			<button className={styles.buttons} onClick={props.deleteItem}>Delete</button>

		</div>
	</div>
);

export default class Cart extends Component {
	constructor (props) {
		super(props)
		this.state = {
			cart:[],
		}
	}

	// This sets our state by pulling from the cart in sessionStorage
	componentDidMount () {
		this.setState({cart: JSON.parse(sessionStorage.getItem("cart"))})
	}

	// This deletes the item from the cart, removing it both from sessionStorage and state.
	deleteItem (id) {
		document.querySelector(".error").innerHTML = "";
		let cart = this.state.cart;
		cart = cart.filter(item => item.item._id !== id);
		const x = JSON.stringify(cart);
		sessionStorage.setItem("cart", x);
		// If the cart is empty, I remove their ability to press checkout, as well as the displayed total. I also give them a message.
		if (cart.length == 0) {
			document.querySelector(".checkout").innerHTML = "";
		}
		this.setState({ cart: (!Array.isArray(cart) || !cart.length) ? "Nothing here!" : cart });
	}

	handleChange (type, event) {
		// Here I set the quantity of an item to the quantity given in the form. This does not change the cart in sessionStorage
		// in case there is an error, or they don't intend to press update.
		document.querySelector(".error").innerHTML = "";

		let cart = this.state.cart;
		
		cart.find(item => item.item._id === type).quantity = event.target.value;
		this.setState({cart: cart})
	}

	handleSubmit (event) {
		event.preventDefault();
		let cart = this.state.cart;
		// Once a user submits, I validate that the submitted information is a positive number. If it is not, I reset the item to it's previous quantity
		// from sessionStorage. If on unsubmitted form is invalid, it will reset all other unsubmitted forms to their quantity in sessionStorage.
		cart.forEach(function(item) {
			if (item.quantity < 0) {
				document.querySelector(".error").innerHTML = "";
				const errmsg = document.createElement("p");
				errmsg.innerHTML = "Negative quantity? Don't be silly.";
				document.querySelector(".error").appendChild(errmsg);
				item.quantity = JSON.parse(sessionStorage.getItem("cart")).find(key => key.item._id === item.item._id).quantity;
			} else if (isNaN(item.quantity)) {
				document.querySelector(".error").innerHTML = "";
				const errmsg = document.createElement("p");
				errmsg.innerHTML = "Please insert a valid number!";
				document.querySelector(".error").appendChild(errmsg);
				item.quantity = JSON.parse(sessionStorage.getItem("cart")).find(key => key.item._id === item.item._id).quantity;
			} else if (item.quantity > 0 && !isNaN(item.quantity)) {
				item.quantity = Number(item.quantity);
			}
		});
		// Here I remove all items in that cart that have 0 quantity.
		cart = cart.filter(item => Number(item.quantity) !== 0);

		// If there's nothing in the cart, I remove the total, as well as the button that brings you to checkout.
		if (cart.length == 0) {
			document.querySelector(".checkout").innerHTML = "";
		}
		this.setState({cart: cart});
		sessionStorage.setItem("cart", JSON.stringify(cart));
	}

	// I use this function to calculate the total price of the item in your cart, as you are changing their quantity, and place them into sessionStorage
	calculate () {
		const x = JSON.parse(sessionStorage.getItem("cart"));
		const total = x.reduce((total, item) => total + (item.quantity * item.item.price), 0).toFixed(2);
		sessionStorage.setItem("total", total);
		return total;
	}

	render () {
		// If the cart doesn't exit, we create it.
		let x = sessionStorage.getItem("cart");
		sessionStorage.setItem("cart", (x == null) ? JSON.stringify([]) : x);
		x =  this.state.cart;
		// If there's nothing in the cart, I render a message that lets the user know.
		const items = (!Array.isArray(x) || !x.length) ? "Nothing here!": x.map((item, i) => (
			<Item
				key={i}
				name={item.item.name}
				picture={item.item.picture}
				price={item.item.price}
				quantity={item.quantity}
				deleteItem = {this.deleteItem.bind(this, item.item._id)}
				handleSubmit = {this.handleSubmit.bind(this)}
				handleChange = {this.handleChange.bind(this, item.item._id)}
			/>
		)); 

		// This is the html that displays the total, as well as a link to checkout.
		const hide = (sessionStorage.getItem("total") <= 0) ? "" : (
				<div>
					Total = {this.calculate()}
					<div style={{ display: `inline-block`, marginLeft: `1rem`}}>
						<Link to="/checkout/">Checkout?</Link>
					</div>
				</div>
			);

		return (
			<div>
				<div className="stuff">{items}</div>
				<div className="checkout" style={{textAlign: `right`}}>
					{hide}
				</div>
			</div>
		)
	}
}