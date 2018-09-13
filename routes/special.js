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
    axios.get(`${config.api_server}/miltoparticles?_sort=recommend_time:desc&_limit=1`)
  ])
	.then(axios.spread((res1)=>{
		res.render('special', {name:req.query.title, title: `专题—"${req.query.title}"` ,breadcrumb:[{title:`专题—"${req.query.title}"`,path:`/special?title=${req.query.title}`}],miltoparticles:res1.data});
	}))
});
module.exports = router;
