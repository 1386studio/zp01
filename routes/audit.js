var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('audit', { title: '监察审计',breadcrumb:[{title:"监察审计",path:"/audit"}]});
});

module.exports = router;
