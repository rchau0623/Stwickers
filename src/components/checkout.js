import React, { Component } from "react";

// This just contains all the forms, so that instead of creating each one, I can create them all in one fell swoop with an array containing the necessary information.
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

	// Here I get their cart and it's total price from sessionStorage
	componentDidMount () {
		this.setState({cart: JSON.parse(sessionStorage.getItem("cart")), price: sessionStorage.getItem("total")});
	}

	// I set the current state to the information they have included in the form.
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

	// This is the post request to the API. It sets the body of the post to have the same basic shape of the mongo Order schema. There it will be
	// validated and prepped to be saved into the mongo database.
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
			// Here we get our response from the API. If the order was saved to the database, we get 200 and a thank you message.
			// We then reset sessionStorage in preparation for the next order.
			if (response.status === 200) {
				document.querySelector(".sub").innerHTML = "Thank you for your order!";
				sessionStorage.setItem("cart", JSON.stringify([]));
				sessionStorage.setItem("total", 0);
			} else if (response.status === 400) {
				document.querySelector(".error").innerHTML = "Error: Missing information!"; // This is an error for if a form is left blank.
			} else if (response.status === 422) {
				document.querySelector(".error").innerHTML = "Error: Phone number must be a number!"; // This is an error that the phone number is not a simple number.
			}
		});

		this.setState({cart: JSON.parse(sessionStorage.getItem("cart")), price: sessionStorage.getItem("total")});
	}

	// This submits their order to the API via a post request. After the post request is sent, the state is refreshed to have nothing.
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

		// Labels array to be used with the Form html at the top.
		const labels = [{label: "Name", value: this.state.name, type: "name"},
			{label: "Email", value: this.state.email, type: "email"},
			{label: "Phone Number", value: this.state.phone, type: "phone"},
			{label: "Shipping Address", value: this.state.shipping, type: "shipping"},
			{label: "BillingAddress", value: this.state.billing, type: "billing"},
		];

		// If the cart doesn't exit, we create it.
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

		const total =  "Your total is: $" + sessionStorage.getItem("total");

		// If a user has no items, we do not show them the form and do not allow them to submit anything.
		const submit = (!Array.isArray(x) || !x.length) ? "Pick up some items first!": (
			<div>
				{total}
				<form onSubmit={this.handleSubmit.bind(this)}>
					{forms}
					<input type='submit' value='Confirm Order' />
				</form>
			</div>
		);

		return (
			<div className="sub">
				{submit}
			</div>
		)
	}
}