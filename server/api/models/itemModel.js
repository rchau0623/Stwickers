const mongoose = require('mongoose');

//using mongoose models
const itemSchema = mongoose.Schema({
	name: {type: String, required: true},
	picture: {type: String, required: true},
	price: {type: Number, required: true},
	// quantity: {type: Number, required: true},
});

mongoose.model('Item', itemSchema);