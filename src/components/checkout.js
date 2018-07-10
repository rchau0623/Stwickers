import React, { Component } from "react";

export default class Cart extends Component {
	constructor (props) {
		super(props)
		this.state = {
			cart:[],
		}
	}

	async componentDidMount () {
		this.setState({cart: JSON.parse(sessionStorage.getItem("cart"))})
	}

	async postOrder() {
		await fetch("http://localhost:080/api/checkout", {
			body: JSON.stringify(),
			method: "POST",
			headers: {
				"user-agent": "Mozilla/4.0 ",
				"content-type": "application/json"
			}
		})
	}

	handleChange (type, event) {
		let cart = this.state.cart;
		if (Number.target.value >= 0) {
			cart.find(item => item.item === type).quantity = Number(event.target.value);
		} else {
			const errmsg = document.createElement("p");
			errmsg.innerHTML = "Negative quantity?";
			document.querySelector(".error").appendChild(errmsg);
		}
		this.setState({cart: cart})
	}

	handleSubmit (event) {
		event.preventDefault();
		let cart = this.state.cart;
		cart = cart.filter(item => item.quantity !== 0);
		this.setState({cart: cart});
		sessionStorage.setItem("cart", JSON.stringify(cart));
	}

	render () {
		return (
			<div class="row">
				<div class="col-75">
					<div class="container">
						<form action="/action_page.php">

							<div class="row">
								<div class="col-50">
									<h3>Billing Address</h3>
									<label for="fname"><i class="fa fa-user"></i> Full Name</label>
									<input type="text" id="fname" name="firstname" placeholder="John M. Doe" />
									<label for="email"><i class="fa fa-envelope"></i> Email</label>
									<input type="text" id="email" name="email" placeholder="john@example.com" />
									<label for="adr"><i class="fa fa-address-card-o"></i> Address</label>
									<input type="text" id="adr" name="address" placeholder="542 W. 15th Street" />
									<label for="city"><i class="fa fa-institution"></i> City</label>
									<input type="text" id="city" name="city" placeholder="New York" />

									<div class="row">
										<div class="col-50">
											<label for="state">State</label>
											<input type="text" id="state" name="state" placeholder="NY" />
										</div>
										<div class="col-50">
											<label for="zip">Zip</label>
											<input type="text" id="zip" name="zip" placeholder="10001" />
										</div>
									</div>
								</div>

								<div class="col-50">
									<h3>Payment</h3>
									<label for="cname">Name on Card</label>
									<input type="text" id="cname" name="cardname" placeholder="John More Doe" />
									<label for="ccnum">Credit card number</label>
									<input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
									<label for="expmonth">Exp Month</label>
									<input type="text" id="expmonth" name="expmonth" placeholder="September" />

									<div class="row">
										<div class="col-50">
											<label for="expyear">Exp Year</label>
											<input type="text" id="expyear" name="expyear" placeholder="2018" />
										</div>
										<div class="col-50">
											<label for="cvv">CVV</label>
											<input type="text" id="cvv" name="cvv" placeholder="352" />
										</div>
									</div>
								</div>

							</div>
							<label>
								<input type="checkbox" checked="checked" name="sameadr" /> Shipping address same as billing
							</label>
							<input type="submit" value="Continue to checkout" class="btn" />
						</form>
					</div>
				</div>
			</div>
		)
	}
}