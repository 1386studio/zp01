var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('../common');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios
	.all([
    axios.get(`${config.api_server}/miltoparticles?_sort=recommend_time:desc&_limit=1`)
  ])
	.then(axios.spread((res1)=>{
		res.render('surround', {name:req.query.title, title: `周边—"${req.query.title}"` ,breadcrumb:[{title:`周边—"${req.query.title}"`,path:`/surround?title=${req.query.title}`}],miltoparticles:res1.data});
	}))
});
module.exports = router;
