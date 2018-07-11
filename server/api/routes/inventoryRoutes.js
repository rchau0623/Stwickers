require('../models/itemModel');
require('../models/orderModel');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = mongoose.model('Item');
const Order = mongoose.model('Order')

// Connecting and setting the name of the mongo db to klyxx.
mongoose.connect('mongodb://localhost:27017/klyxx', { useNewUrlParser: true });

router.get('/inventory', (req, res) => {
	// Here, it's possible to filter the results, say alphabetically or by price, if a drop down form on the store page is created.
	// I did not create one because I was using 4 items in testing.
	const sort = {};
	Item.find({}).sort(sort).exec((err, result) => {
		// This will send back the entire inventory. Can be tested by going to http://localhost:8080/api/inventory
		res.json(result);
	});
});

router.post('/checkout', (req, res) => {
	if (req.body.name === '' || req.body.email === '' || req.body.shippingAddress === '' || req.body.billingAddress === '') { // Validating for empty forms.
		res.status(400).send({error: "Error: missing information"});
	} else if (typeof req.body.phone != Number) { // Validating that the phone nmber is a number.
		// I couldn't figure out how to get the error I am sending in this, or the line above. I opted to use different status codes to tell the front end
		// what the error is as a temporary fix for this.
		res.status(422).send({error: "Error: phone number must be a number"});
	} else { 
		const body = {
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			shippingAddress: req.body.shipping,
			billingAddress: req.body.billing,
			cart: req.body.cart,
			price: req.body.price,
		};

		// Changing the cart to be references to items instead of having them embedded. They are embedded while in gatsby to more 
		// easily render the items when they go from the store to the cart.
		body.cart.forEach(function(item) {
			item.item = item.item._id;
		});

		const order = new Order(body);
		order.save((err, result) => {
			if (err) { 
				res.status(400).send(err);
			} else {
				res.status(200).send(result);
			}
		});
	}
});

module.exports = router;