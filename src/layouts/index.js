import React from "react";
import Link from "gatsby-link";

const ListLink = props =>
	<li style={{ display: `inline-block`, marginLeft: `1rem`, backgroundColor: `thistle` }}>
		<Link to={props.to}>
			{props.children}
		</Link>
	</li>

export default ({ children }) => (
	<div style={{ margin: `0 auto`, maxWidth: 1500, padding: `1.25rem 1rem` }}>
		<header style={{ marginBottom: `1.5rem` }}>
			<Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
				<h3 style={{ display: `inline` }}>Logo</h3>
			</Link>
			<ul style={{ listStyle: `none`, float: `right` }}>
				<ListLink to="/checkout/">Checkout</ListLink> 
				<ListLink to="/cart/">Cart</ListLink> 
			</ul>
		</header>
		<div style={{ backgroundColor: `white`, border: `solid`, padding: `1rem 4rem`, height: `80vh`}}>
			{children()}
		</div>
	</div>
);