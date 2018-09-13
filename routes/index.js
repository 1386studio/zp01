var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('../common');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios
	.all([
    axios.get(`${config.api_server}/toparticles?_sort=recommend_time:desc&_limit=1`),
    axios.get(`${config.api_server}/miltoparticles?_sort=recommend_time:desc&_limit=1`),
    axios.get(`${config.api_server}/pictoparticles?_sort=recommend_time:desc&_limit=1`),
    axios.get(`${config.api_server}/wxtoparticles?_sort=recommend_time:desc&_limit=1`),
    axios.get(`${config.api_server}/topwebsites?_sort=recommend_time:desc&_limit=1`),
    axios.get(`${config.api_server}/appwebsites?_sort=recommend_time:desc&_limit=1`)
  ])
	.then(axios.spread((res1,res2,res3,res4,res5,res6)=>{
		res.render('index', { title: '首页' ,breadcrumb:[],toparticles:res1.data,miltoparticles:res2.data,pictoparticles:res3.data,wxtoparticles:res4.data,topwebsites:res5.data,appwebsites:res6.data});
	}))
});

module.exports = router;
