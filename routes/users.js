var express = require('express');
var router = express.Router();

const users = require('../biz/users')

router.post('/add', function(req, resp, next) {
  users.login(req,resp);
});

module.exports = router;
