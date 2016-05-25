var mongoose = require('mongoose');


var CounterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 1000 }
});

var CounterModel = mongoose.model('CounterModel', CounterSchema);

module.exports = CounterModel;