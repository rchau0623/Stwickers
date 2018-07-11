import React from "react";
import Link from "gatsby-link";

// This is from the gatsby tutorial! I wasn't sure how to get the links to not have that weird white background.
const ListLink = props =>
	<li style={{ display: `inline-block`, marginLeft: `1rem`, backgroundColor: `thistle` }}>
		<Link to={props.to}>
			{props.children}
		</Link>
	</li>

// This format is basically also from the gatsby tutorial, but I added a thistle background and a black border to match the sample image given in the README.md
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