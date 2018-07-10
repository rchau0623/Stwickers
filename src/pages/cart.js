import React from "react";
import Container from "../components/container";
import Cart from "../components/cart";

export default () => (
	<Container>
		<h1>Cart!</h1>
		<div className="error" style={{ color : `red` }}></div>
		<Cart />
	</Container>
);