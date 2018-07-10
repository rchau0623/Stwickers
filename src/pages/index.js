import React from "react";
import Container from "../components/container";
import Inventory from "../components/inventory";

export default () => (
	<Container>
		<h1>Welcome.</h1>
		<div className="error" style={{ color : `red` }}></div>
		<Inventory />
	</Container>
);