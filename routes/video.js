var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('../common');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios
	.all([
    axios.get(`${config.api_server}/articles?type=1&class=${req.query.class}&_sort=crawl_time:desc&_limit=3`),
    axios.get(`${config.api_server}/articles?type=0&class=${req.query.class}&_sort=crawl_time:desc&_limit=10`),
    axios.get(`${config.api_server}/articles?type=2&class=${req.query.class}&_sort=crawl_time:desc&_limit=10`),
    axios.get(`${config.api_server}/articles?type=3&class=${req.query.class}&_sort=crawl_time:desc&_limit=10`),
    axios.get(`${config.api_server}/milcolumn`)
  ])
	.then(axios.spread((res1,res2,res3,res4,res5)=>{
		res.render('video', { title: '军事视频',breadcrumb:[{title:"军事视频",path:"/video"}],top:res1.data,list:res2.data,recommend:res3.data,last:res4.data,cols:res5.data});
	}));
});
router.get('/detail', function(req, res, next) {
  axios
	.all([
    axios.get(`${config.api_server}/articles/${req.query._id}`),
    axios.get(`${config.api_server}/articles?type=2&class=${req.query.class}&_sort=crawl_time:desc&_limit=10`),
    axios.get(`${config.api_server}/articles?type=3&class=${req.query.class}&_sort=crawl_time:desc&_limit=10`)
  ])
	.then(axios.spread((res1,res2,res3)=>{
		res.render('detail_video', { title: '军事视频' ,breadcrumb:[{title:"军事视频",path:"/video"}],article:res1.data,top:res2.data,hot:res3.data});
	}))
});
module.exports = router;
