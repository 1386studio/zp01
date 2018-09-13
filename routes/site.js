var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('../common');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios
  .all([
    axios.get(`${config.api_server}/unittype`)
  ])
	.then(axios.spread((res1)=>{
		res.render('site', { title: 'm',breadcrumb:[{title:"网站导航",path:"/site"}],units:res1.data});
	}));
});

module.exports = router;
