var express = require('express');
var router = express.Router();

const user = require('../biz/user')
/* GET users listing. */
router.get('/login', function(req, resp, next) {
  user.  login(req,resp);
});

module.exports = router;
