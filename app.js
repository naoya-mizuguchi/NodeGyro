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
    console.log(data.position);
    socket.broadcast.emit('server_to_client', {position: data.position});
  })
  
  // var name;
  // // S05. client_to_serverイベント・データを受信する
  // socket.on('client_to_server', function(data) {
  //   // S06. server_to_clientイベント・データを送信する
  //   io.sockets.emit('server_to_client', {
  //     value: data.value
  //   });
  // });
  // // S07. client_to_server_broadcastイベント・データを受信し、送信元以外に送信する
  // socket.on('client_to_server_broadcast', function(data) {
  //   socket.broadcast.emit('server_to_client', {
  //     value: data.value
  //   });
  // });
  // // S08. client_to_server_personalイベント・データを受信し、送信元だけに送信する
  // socket.on('client_to_server_personal', function(data) {
  //   var id = socket.id;
  //   name = data.value;
  //   var personalMessage = "あなたは、" + name + "さんとして入室しました。"
  //   io.to(id).emit('server_to_client', {
  //     value: personalMessage
  //   })
  // });
  // // S09. disconnectイベントを受信し、退出メッセージを送信する
  // socket.on('disconnect', function() {
  //   if (name == 'undefined') {
  //     console.log("未入室のまま、どこかへ去っていきました。");
  //   } else {
  //     var endMessage = name + "さんが退出しました。"
  //     io.sockets.emit('server_to_client', {
  //       value: endMessage
  //     });
  //   }
  // });
  //
});
