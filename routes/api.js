var express = require('express');
var router = express.Router();
var Comments = require('../models/comment');
var Links = require('../models/link');

router.get('/url', function (req, res, next) {
    const order = req.query.order || "recent";
    let data = {comments: []};
    
    res.json(data);
});

router.get('/url/:url', function (req, res, next) {
    const url = req.params.url;

    Comments.find

    let data = {};

    
    res.json(data);
});

module.exports = router;
