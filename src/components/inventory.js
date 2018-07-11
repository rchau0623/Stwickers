import React, { Component } from "react";
import styles from "./base.module.css";

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

	async componentDidMount () {
		const items = await fetch("http://localhost:8080/api/inventory").then(res => res.json());
		this.setState({inventory: items});
	}

	calculate () {
		const x = JSON.parse(sessionStorage.getItem("cart"));
		console.log(x);
		const total = x.reduce((total, item) => total + (item.quantity * item.item.price), 0).toFixed(2);
		sessionStorage.setItem("total", total);
		return total;
	}

	addToLocal (props) {
		document.querySelector(".error").innerHTML = "";

		const x = JSON.parse(sessionStorage.getItem("cart"));
		let cart = (!Array.isArray(x) || !x.length) ? [] : x;

		if (!cart.some(items => props._id === items.item._id)) {
			cart.push({item: props, quantity: 1});
		} else {
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