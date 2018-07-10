const mongoose = require('mongoose');

//using mongoose models
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