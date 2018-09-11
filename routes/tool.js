var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tool', { title: 'm',breadcrumb:[{title:"辅助工具",path:"/tool"}]});
});

module.exports = router;
