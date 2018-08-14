# Hướng dẫn tạo project với NODEJS

* Tạo thư mục chứa project
```sh
mkdir my-project
```

* Di chuyển vào trong thư mục vừa tạo
```sh
cd my-project
```

* Khởi tạo 1 project Node (npm: Node Project Manager)
```sh
npm init
```

* Cập nhật các thông tin cần thiết cho dự án như: name, version ... Bạn chỉ cần Enter cho tới bước cuối cùng và gõ [yes] -> Enter để hoàn thành quá trình.

* Cài đặt Node với 2 package cần thiết [experss, mysql]. (--save là để source node_modules lưa tại thư mục project hiện tại thay vì lưu trên máy tính)
```sh
npm install express mysql --save
```

* Mở file `package.json` lên để xem thông tin của project.

Thêm thuộc tính `start` vào trong `scripts` ở file `package.json`
```js
"scripts": {
  "start": "node index.js",    
}
```

Như vậy thì có thể chạy lệnh
```sh
npm start
```

# Chú thích về cài đặt version package

 syntax | Ý Nghĩa
------------ | -------------
 `*` | install package phiên bản mới nhất.
 `~1.5.2` | install package phiên bản từ 1.5.0 đến 1.6.0 (1.5.x)
 `^1.0.5` | install package version từ 1.0.5 đến <1.1.0
 `>0.10.0` | install package version phải lớn hơn 0.10.0


# Cài đặt và sử dụng socket.io

* Cài đặt: 
```sh
npm install socket.io --save
```

* Ví dụ sử dụng socket tạo ứng dụng chat realtime

file `app.js`:
```js
const port = 1202;
const hostname = '127.0.0.1';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(server);

let usersOnline = 0;

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

// io connect
io.on('connection', function (socket) {
    usersOnline++;

    // chat message
    socket.on('chat message', (msg) => io.emit('chat message', msg));

    // disconnect
    socket.on('disconnect', () => usersOnline--);    
});

http.listen(port, hostname, () => console.log(`Listener on http:${hostname}:${port}`));
```

file `public/index.html`:
```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Socket.IO chat</title>
    <style>
        * {margin: 0;padding: 0;box-sizing: border-box;}
        body {font: 13px Helvetica, Arial;}
        form {background: #000;padding: 3px;position: fixed;bottom: 0;width: 100%;}
        form input {border: 0;padding: 10px;width: 90%;margin-right: .5%;}
        form button {width: 9%;background: rgb(130, 224, 255);border: none;padding: 10px;}
        #messages {list-style-type: none;margin: 0;padding: 0;}
        #messages li {padding: 5px 10px;}
        #messages li:nth-child(odd) {background: #eee;}
    </style>
</head>
<body>
    <ul id="messages"></ul>
    <form action="/" method="GET">
        <input id="m" autocomplete="off" />
        <button>Send</button>
    </form>

    <script src="/socket.io/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>

    <script>
        $(function () {
            var socket = io();

            $('form').submit(function () {
                socket.emit('chat message', $('#m').val());
                $('#m').val('');
                return !1;
            });

            socket.on('chat message', function (msg) {
                $('#messages').append($('<li>').text(msg));
            });

        });
    </script>
</body>
</html>
```