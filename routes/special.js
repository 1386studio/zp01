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
		res.render('special', {name:req.query.title, title: `专题—"${req.query.title}"` ,breadcrumb:[{title:`专题—"${req.query.title}"`,path:`/special?title=${req.query.title}`}],miltoparticles:res1.data});
	}))
});
module.exports = router;
