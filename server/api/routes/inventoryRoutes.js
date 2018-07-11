require('../models/itemModel');
require('../models/orderModel');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = mongoose.model('Item');
const Order = mongoose.model('Order')

mongoose.connect('mongodb://localhost:27017/klyxx', { useNewUrlParser: true });

router.get('/inventory', (req, res) => {
	const sort = {};
	// if (req.query.location !== undefined) { sort['location'] = req.query.location; }
	// if (req.query.cuisine !== undefined) { sort['cuisine'] = req.query.cuisine; }  
	Item.find({}).sort(sort).exec((err, result) => {
		res.json(result);
	});
});

router.post('/checkout', (req, res) => {
	if (req.body.name === '' || req.body.email === '' || req.body.shippingAddress === '' || req.body.billingAddress === '') {
		res.status(400).send({error: "Error: missing information"});
	} else if (typeof req.body.phone != Number) {
		res.status(400).send({error: "Error: phone number must be a number"});
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