// APIs
const express = require('express');
const Posts = require("../schemas/posts");

const crypto = require('crypto'); // import crypto

const router = express.Router();  // making router

router.get("/posts", async (req, res, next) => {
    try {
        const posts = await Posts.find({ }).sort("-postId");  // find from query. sort as goodsId
    
        res.json({ posts: posts });  // jsonify
    } catch (err) {
        console.error(err);
    
        next(err);
    }
  });

router.get("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    posts = await Posts.findOne({ postId: postId });

    res.json({ detail: posts });
});

router.post('/posts', async(req, res) => {
    const title = req.body.title;
    const date = new Date(req.body.date);
    const name = req.body.name;
    let password = req.body.password;
    password = crypto.createHmac('sha256', password).update('hashhashhash!').digest('hex');
    const content = req.body.content;

    // console.log("post:", title, date, name, content);

    let newPostId = 1;

    // let count = Posts.countDocuments((err, count) => count);  // how to return count!?!?!?

    try {
        last = await Posts.find({}).sort({postId:-1}).limit(1);
        newPostId = last[0].postId + 1;
    } catch(err) {
        newPostId = 1;
    }

     await Posts.create({ postId: newPostId, title: title, date: new Date(), name: name, password: password, post: content });

    res.send({ result: "success" });
})

router.put('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    const title = req.body.title;
    const date = new Date(req.body.date);
    const name = req.body.name;
    const content = req.body.content;

    const isGoodInPost = await Posts.find( {postId} );

    if (isGoodInPost.length) {
        await Posts.updateOne({ postId }, {$set: {title: title, date: new Date(), name: name, post: content }}); 
    }

    res.send({ result: "success" });
})

router.delete('/posts/:postId', async (req, res) => {
    const { postId } = req.params;

    const isGoodInPost = await Posts.find( {postId} );

    if (isGoodInPost.length > 0) {
        await Posts.deleteOne({ postId });
    }

    res.send({ result: "success" });
})

router.get('/isValid', (req, res) => {
    let p1 = req.query.password1;
    let p2 = crypto.createHmac('sha256', req.query.password2).update('hashhashhash!').digest('hex');

    res.send({ result: "success", valid: p1 == p2 ? true : false })
})

module.exports = router;