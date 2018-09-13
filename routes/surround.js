var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('../common');

/* GET home page. */
router.get('/', function(req, res, next) {
	let dbname = '';
	switch(req.query.title)
	{
    case '南海问题':
			dbname = 'Speicalnanhai';
			break;
		case '朝鲜半岛':
			dbname = 'Speicalkorea';
			break;
		case '中印方向':
			dbname = 'Speicalzhongyin';
			break;
		case '东海问题':
			dbname = 'Speicaldonghai';
			break;
    default:
	}
  axios
	.all([
		axios.get(`${config.api_server}/${dbname}`),
		axios.get(`${config.api_server}/Speicaltime?speicalname=${dbname}`)
  ])
	.then(axios.spread((res1,res2)=>{
		res.render('surround', {name:req.query.title, title: `周边—"${req.query.title}"` ,breadcrumb:[{title:`周边—"${req.query.title}"`,path:`/surround?title=${req.query.title}`}],cols:res1.data,timeline:res2.data});
	}))
});
router.get('/detail', function(req, res, next) {
  axios
	.all([
		axios.get(`${config.api_server}/Speicalarticle/${req.query._id}`)
  ])
	.then(axios.spread((res1)=>{
		let dbname = '';
		switch(res1.data.speicaltime.speicalname)
		{
			case 'Speicalnanhai':
				dbname = '南海问题';
				break;
			case 'Speicalkorea':
				dbname = '朝鲜半岛';
				break;
			case 'Speicalzhongyin':
				dbname = '中印方向';
				break;
			case 'Speicaldonghai':
				dbname = '东海问题';
				break;
			default:
		}
		res.render('detail_special', {name:req.query.title, title: `周边—"${dbname}"` ,breadcrumb:[{title:`周边—"${dbname}"`,path:`/surround?title=${dbname}`}],article:res1.data,top:[],hot:[]});
	}))
});
module.exports = router;
