var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('site', { title: 'm',breadcrumb:[{title:"网站导航",path:"/site"}]});
});

module.exports = router;
