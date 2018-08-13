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

* Mở file package.json lên để xem thông tin của project.

# Cài đặt và sử dụng socket.io

* Cài đặt: 
```sh
npm install socket.io --save
```

* Sử dụng (express không thể lắng nghe được socket nên cần sử dụng http)
```js
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// io connect
io.on('connection', (socket) => {
  socket.emit('greet', { hello: 'Hey there browser!' });
  socket.on('respond', (data) => {
    console.log(data);
  });
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

// router
server.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});

```