var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('data', { title: '数据共享', breadcrumb:[{title:"数据共享",path:"/data"}] });
});

module.exports = router;
