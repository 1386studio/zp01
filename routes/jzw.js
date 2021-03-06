var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('../common');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.query.page = req.query.page ? req.query.page : 1;
  req.query.class = req.query.class ? req.query.class : 'dbzq';
  axios
	.all([
    axios.get(`${config.api_server}/articles?type=1&class=${req.query.class}&_sort=crawl_time:desc&_limit=3`),
    axios.get(`${config.api_server}/articles?type=0&class=${req.query.class}&_sort=crawl_time:desc&_start=${(req.query.page-1)*10}&_limit=10`),
    axios.get(`${config.api_server}/articles?type=2&class=${req.query.class}&_sort=crawl_time:desc&_limit=10`),
    axios.get(`${config.api_server}/articles?type=3&class=${req.query.class}&_sort=crawl_time:desc&_limit=10`),
    axios.get(`${config.api_server}/milcolumn`)
  ])
	.then(axios.spread((res1,res2,res3,res4,res5)=>{
		res.render('jzw', { title: '军内动态' ,col_class:req.query.class,breadcrumb:[{title:"军内动态",path:"/jzw"}],top:res1.data,list:res2.data,recommend:res3.data,last:res4.data,cols:res5.data,curr:req.query.page});
	}))
});
router.get('/detail', function(req, res, next) {
  axios
	.all([
    axios.get(`${config.api_server}/articles/${req.query._id}`)
  ])
	.then(axios.spread((res1)=>{
    axios
    .all([
      axios.get(`${config.api_server}/articles?type=2&class=${res1.data.class}&_sort=crawl_time:desc&_limit=10`),
      axios.get(`${config.api_server}/articles?type=3&class=${res1.data.class}&_sort=crawl_time:desc&_limit=10`)
    ])
	  .then(axios.spread((res2,res3)=>{
		  res.render('detail_article', { title: '军内动态' ,breadcrumb:[{title:"军内动态",path:"/jzw"}],article:res1.data,top:res2.data,hot:res3.data});
    }));
  }));
});
module.exports = router;
