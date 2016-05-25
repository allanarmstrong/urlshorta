var mongoose = require('mongoose');
var counter = require('./CounterModel');


var URLSchema = new mongoose.Schema({
	url: String,
	code: {type: Number, default: 1000}
});

URLSchema.pre('save', function(next) {
	var url = this;
	counter.findByIdAndUpdate({_id: "urlID"}, {$inc: {seq: 1 }}, function(err, counter) { 
		if (err)
			return next(err);
		url.code = counter.seq;
		next();
	});
});

var URLModel = mongoose.model("URLModel", URLSchema);
module.exports  = URLModel;