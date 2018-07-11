import React, { Component } from "react";

const Form = props => (
	<div>
		<label style={{display: `block`, margin: `1rem`}}>
			{props.label}: <input type="text" value={props.value} onChange={props.handleChange} />
		</label>
	</div>
);

export default class CheckOut extends Component {
	constructor (props) {
		super(props)
		this.state = {
			name: "",
			email: "",
			phone: "",
			shipping: "",
			billing: "",
			cart: [],
			price: 0,
		}
	}

	componentDidMount () {
		this.setState({cart: JSON.parse(sessionStorage.getItem("cart")), price: sessionStorage.getItem("total")});
	}

	handleChange (type, event) {
		if (type === 'name') {
			this.setState({name: event.target.value})
		} else if (type === 'email') {
			this.setState({email: event.target.value})
		} else if (type === 'phone') {
			this.setState({phone: event.target.value})
		} else if (type === 'shipping') {
			this.setState({shipping: event.target.value})
		} else if (type === 'billing') {
			this.setState({billing: event.target.value})
		} 
	}

	async postOrder(name, email, phone, shipping, billing, cart, price) {
		document.querySelector(".error").innerHTML = "";

		await fetch("http://localhost:8080/api/checkout", {
			body: JSON.stringify({name, email, phone, shipping, billing, cart, price}),
			method: "POST",
			headers: {
				"user-agent": "Mozilla/4.0 ",
				"content-type": "application/json"
			}
		}).then(function(response) {
			if (response.status === 200) {
				document.querySelector(".sub").innerHTML = "Thank you for your order!";
				sessionStorage.setItem("cart", JSON.stringify([]));
				sessionStorage.setItem("total", 0);
			} else if (response.status === 400) {
				document.querySelector(".error").innerHTML = "Error: Missing information!";
			} else if (response.stats === 422) {
				document.querySelector(".error").innerHTML = "Error: Phone number must be a number!";
			}
		});

		this.setState({cart: JSON.parse(sessionStorage.getItem("cart")), price: sessionStorage.getItem("total")});
	}

	handleSubmit (event) {
		event.preventDefault();
		this.postOrder(this.state.name, this.state.email, this.state.phone, this.state.shipping, this.state.billing, this.state.cart, this.state.price);
		this.setState({
			name: "",
			email: "",
			phone: "",
			shipping: "",
			billing: "",
			cart: [],
			price: 0,
		});
	}

	render () {

		const labels = [{label: "Name", value: this.state.name, type: "name"},
			{label: "Email", value: this.state.email, type: "email"},
			{label: "Phone Number", value: this.state.phone, type: "phone"},
			{label: "Shipping Address", value: this.state.shipping, type: "shipping"},
			{label: "BillingAddress", value: this.state.billing, type: "billing"},
		];

		let x = sessionStorage.getItem("cart");
		sessionStorage.setItem("cart", (x == null) ? JSON.stringify([]) : x);
		x =  this.state.cart;
		
		const forms = labels.map((item, i) => (
			<Form
				key={i}
				label={item.label}
				value={item.value}
				handleChange={this.handleChange.bind(this, item.type)}
			/>
		)); 

		const submit = (!Array.isArray(x) || !x.length) ? "Pick up some items first!": (
			<form onSubmit={this.handleSubmit.bind(this)}>
				{forms}
				<input type='submit' value='Submit' />
			</form>
		);

		return (
			<div className="sub">
				{submit}
			</div>
		)
	}
}