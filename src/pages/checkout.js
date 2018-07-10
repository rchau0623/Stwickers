import React from "react";
import Container from "../components/container";
import Checkout from "../components/checkout";

export default () => (
	<Container>
		<h1>Checkout?</h1>
		<div className="error" style={{ color : `red` }}></div>
		<Checkout />
	</Container>
);