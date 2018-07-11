const mongoose = require('mongoose');

// Basic order schema to get user info. Does not ask for credit card information, as that doesn't seem secure to store.
// I opted to make my cart an array of item references and quantity, rather than store quantity in the item schema.
const orderSchema = mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	phone: {type: Number, required: true},
	shippingAddress: {type: String, required: true},
	billingAddress: {type: String, required: true},
	price: {type: Number, required: true},
	cart: [{
		items: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
		quantity: {type: Number, required: true}
	}]
});

mongoose.model('Order', orderSchema);