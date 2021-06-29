const express = require('express');
const app = express();
const port = 3000

const connect = require('./schemas');
connect();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public'));

app.use((req, res, next) => {
    next();
})

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/detail', (req, res) => {
    let postId = req.query.postId;

    res.render('detail', {postId});
})

app.get('/makepost', (req, res) => {
    let postId = req.query.postId;

    res.render('makepost', {postId});
})

app.get('/submit', (req, res) => {
    let postId = req.query.postId;

    res.render('makepost', {postId});
})

// Making API
const postsRouter = require('./routers/posts');
app.use('/api', [postsRouter]);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})



/*
1. 폴더 구조 만들어놓기
2. 파일 쓰는것들 만들어놓기(index.js, index.ejs)
3. schema 구조 만들기
4. db연결되는지확인
5. api 써야되는거 routers/index.js 에 다 만들어놓기
    5-1. index: GET
    5-2. detail: GET(postId)
    5-3. makePost:
        5-3-1 (CREATE): POST(title, name, (date), password, contents)
        5-3-2 (MODIFY): GET, PUT(title, name, (date), password, content)
6. ejs -> ajax만들기
*/
