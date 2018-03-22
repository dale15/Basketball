var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
server.lastPlayderID = 0;
server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});
io.on('connection',function(socket){
    // socket.on('newplayer',function(){
        // socket.player = {
            // id: server.lastPlayderID++,
            // x: randomInt(100,400),
            // y: randomInt(100,400)
        // };
		
        // socket.emit('allplayers',getAllPlayers());
        // console.log(getAllPlayers());
		// socket.broadcast.emit('newplayer',socket.player);

        // socket.on('click',function(data){
            // console.log('click to '+data.x+', '+data.y);
            // socket.player.x = data.x;
            // socket.player.y = data.y;
            // io.emit('move',socket.player);
        // });

        // socket.on('disconnect',function(){
            // io.emit('remove',socket.player.id);
        // });
    // });
    socket.on('test',function(score){
        //console.log(score);	
    });
	
	socket.on('room', function(room) {
        socket.join(room);
		console.log(room);
		socket.on('location',function(data){
            //console.log('click to '+data.end);
			io.sockets.in(room).emit('message', {start:data.start,end:data.end});
			
        });
		
    });
});