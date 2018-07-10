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
	if (req.body.name === '' || req.body.email === '' || req.body.phone === '' || req.body.shippingAddress === '' || req.body.billingAddress === '' || req.body.price === '') { //} || req.body.items === '') {
		res.json({error: 'Error: missing information'});
	} else { 
		const body = {
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			shippingAddress: req.body.shippingAddress,
			billingAddress: req.body.billingAddress,
			price: req.body.price,
			cart: req.body.cart,
		};
		const order = new Order(body);

		order.save((err, result) => {
			res.status(200).send(result);
		});
	}
});

module.exports = router;