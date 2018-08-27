const express = require('express');
const app = express();

const ROUTERS = {
    USER_DETAIL: '/user/:userID'
}

app.listen(3000,
    () => console.log(`NodeJS server started: <http://127.0.0.1:3000>`)
);

app.get('/helo', (req, res) => {
    res.send(`hello user`);
});

//////////////////////////////////////////////

app.use(ROUTERS.USER_DETAIL, (req, res, next) => {

    const userID = req.params.userID;

    // nếu userID chứa ký tự không phải là số
    if (/[^0-9\-]/.test(userID)) {
        let result = renderRes(200, 'userID phải là 1 số nguyên');
        return res.status(200).send(result);
    }

    if (parseInt(userID) < 1) {
        let result = renderRes(200, 'userID phải lớn hơn 1');
        return res.status(200).send(result);
    }

    if (parseInt(userID) > 100) {
        let result = renderRes(200, 'userID phải nhỏ hơn 100');
        return res.status(200).send(result);
    }

    req.userName = 'Duc Thuan';
    next();
});

app.get(ROUTERS.USER_DETAIL, (req, res) => {
    const userName = req.userName;
    let result = renderRes(200, `userID hợp lệ => userName ${userName}`);
    res.status(200).send(result);
});

app.use((req, res) => {
    let result = renderRes(404, `page not found`);
    res.status(404).send(result);
})

/**
 * Sử dụng middleware để kiểm tra giá trị id truyền vào trên link: /user/:userID
 * - Nếu là số và nhỏ hơn 1 thì trả ra lỗi
 * - Nếu không phải là số thì trả ra lỗi
 * - Nếu là số và lớn hơn 1000 thì trả ra lỗi
 */

var renderRes = (code = 200, msg = '') => {
    return { code, msg };
}