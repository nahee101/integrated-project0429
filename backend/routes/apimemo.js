var express = require('express');
var router = express.Router();
const memos = require('../memo.json');
let count = memos.length;

/* 메모리스트를 보내주는 주소 */
router.get('/', function(req, res, next) {
    console.log(memos);
    res.send(memos);
});

/* id 값을 통해 메모 구분 + 노출(상관없기 때문에 get 형식 사용) */
/*1개의 메모만 보냄*/
router.get('/:id', function(req, res, next) {
    //params id 값에는 memo의 id라는 조건하에 코드 작성함
    //id 값을 통해서는 하나의 메모를 찾거나(find), 걸러낸다(filter)
    const id = req.params.id;

    const m = memos.filter( (memo) => memo.id == id);

    console.log(m[0]);
    res.send(m[0]);
});

//post로 받아온 값을 memos에 추가(push)
router.post('/writeform', function(req, res, next) {
    //axios로 받아왔다는 조건하에 body.data를 가져올 수 있음
    const memo = req.body.data;
    count++;
    const m = {
        id: count,
        title: memo.title,
        memo: memo.memo,
        writer: '익명'
    };
    memos.push(m);
    res.send('ok');
})

//form사용
router.post("/writeform/form", function (req, res, next) {
    // form 태그를 통해 받아옴 (data 사용 X, 바로 body)
    const memo = req.body;
    count++;
    const m = {
        id: count,
        title: memo.title,
        memo: memo.memo,
        writer: "익명",
    };
    memos.push(m);
    res.redirect("/");
});

//메모의 id 값을 주소로 받아와서  삭제
router.delete('/:id', function(req, res, next) {
    const id = req.params.id;
    //memo.id 값을 통해 memos의 인덱스를 찾아서 삭제함
    // >> findindex()를 이용해서 조건에 맞는 index 값 찾을 수 있다!
    const i = memos.findIndex((memo) => memo.id == id);

    memos.splice(i, 1);

    console.log(memos);
    res.send(memos);
});

//put을 통해 받아온 값을 수정한다: body의 data로 받아옴
router.put('/update', function(req, res, next) {
    const memo = req.body.data.memo;
    console.log(memo);

    //메모의 인덱스를 찾아서 값을 할당
    //title과 memo의 값이 바뀌었기 때문에 id 값으로 찾아야 함
    const i = memos.findIndex((m) => memo.id == m.id);
    memos[i] = memo;
    res.send('ok');
})

module.exports = router;