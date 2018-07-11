import React, { Component } from "react";
import styles from "./base.module.css";
import Link from "gatsby-link";

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

	componentDidMount () {
		this.setState({cart: JSON.parse(sessionStorage.getItem("cart"))})
	}

	deleteItem (id) {
		document.querySelector(".error").innerHTML = "";
		let cart = this.state.cart;
		cart = cart.filter(item => item.item._id !== id);
		const x = JSON.stringify(cart);
		sessionStorage.setItem("cart", x);
		if (cart.length == 0) {
			document.querySelector(".checkout").innerHTML = "";
		}
		this.setState({ cart: (!Array.isArray(cart) || !cart.length) ? "Nothing here!" : cart });
	}

	handleChange (type, event) {
		document.querySelector(".error").innerHTML = "";

		let cart = this.state.cart;
		
		cart.find(item => item.item._id === type).quantity = event.target.value;
		this.setState({cart: cart})
	}

	handleSubmit (event) {
		event.preventDefault();
		let cart = this.state.cart;
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
		cart = cart.filter(item => Number(item.quantity) !== 0);
		if (cart.length == 0) {
			document.querySelector(".checkout").innerHTML = "";
		}
		this.setState({cart: cart});
		sessionStorage.setItem("cart", JSON.stringify(cart));
	}

	calculate () {
		const x = JSON.parse(sessionStorage.getItem("cart"));
		const total = x.reduce((total, item) => total + (item.quantity * item.item.price), 0).toFixed(2);
		sessionStorage.setItem("total", total);
		return total;
	}

	render () {
		let x = sessionStorage.getItem("cart");
		sessionStorage.setItem("cart", (x == null) ? JSON.stringify([]) : x);
		x =  this.state.cart;
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