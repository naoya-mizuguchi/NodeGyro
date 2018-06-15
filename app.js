// S01. 必要なモジュールを読み込む
var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');

// S02. HTTPサーバを生成する
var server = http.createServer(function(req, res) {
  var url = req.url;
  if (req.url == "/"){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
  } else if (req.url == "/game/three.min.js"){
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.end(fs.readFileSync(__dirname + '/game/three.min.js', 'utf-8')); 
  }  else if (req.url == "/game/enchant.min.js"){
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.end(fs.readFileSync(__dirname + '/game/enchant.min.js', 'utf-8'));  
  } else {
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.end(fs.readFileSync(__dirname + url));
  }
}).listen(3000); // ポート競合の場合は値を変更

// S03. HTTPサーバにソケットをひも付ける（WebSocket有効化）
var io = socketio.listen(server);

// S04. connectionイベント・データを受信する
// TODO
io.sockets.on('connection', function(socket) {
  socket.on('client_to_server_broadcast', function(data) {
    // S06. server_to_clientイベント・データを送信する
    // console.log(data.position);
    socket.broadcast.emit('server_to_client', {position: data.position});
  });
  
socket.on('client_to_server_broadcast_rotation', function(data) {
    // console.log(data.rotation);
    socket.broadcast.emit('server_to_client_rotation', {rotation: data.rotation});
  });
});

