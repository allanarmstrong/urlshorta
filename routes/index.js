var express = require('express');
var router = express.Router();
var URLModel = require('../models/URLModel');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'URL Shorta' });
});

router.get('/short/:url*', function(req, res, next) {
	var url = req.url.slice(7);
	if (isValidUrl(url)) {
		//HACKYSACK.
		var newUrl = new URLModel({url: url});
		newUrl.save(function(err) {
			if (err) {
				console.log(err)
				res.json({error: "There was an error processing the URL"});
			}
			else 
				res.json({url: newUrl.url, code: newUrl.code});
		});
	} else {
		res.json({error: "Invalid URL"});
	}
});

router.get('/:code', function(req, res, next) {
	var code = req.params.code;

	URLModel.findOne({code: code}, function(err, url) {
		if (err || url === null) {
			res.json({error: "Cannot find URLID"});
		} else {
			res.redirect(url.url);
		}
	})
});

var isValidUrl = function(url) {
	var re = /^((https?:\/\/)(w{3})\.)?(\S+)\.([a-zA-Z]{2,})/g;
	if (re.test(url))
		return true;
	return false;
}

module.exports = router;
