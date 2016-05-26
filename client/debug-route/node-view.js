const timesync = require('timesync');
const io = require('socket.io-client');

const deviceManufacturer = 'SEGGER';
const timeSyncServer = '129.241.103.248:8081';

Template.nodeView.onCreated(function () {
	console.log("THIS ROUTE IS ONLY FOR DEBUGGING");

	// function getPort(callback){
	// 	serialport.list(function (err, ports) {
	// 		ports.forEach(function(port) {
	// 			// If we find the correct device, connect.
	// 			if(port.manufacturer === deviceManufacturer){
	// 				connectToPort(port.comName);
	// 			}
	// 		});
	// 	});
	// }
	//
	// function connectToPort(portName){
	// 	console.log(`Listening on port ${portName}....`);
	// 	var port = new SerialPort(portName, {
	// 		parser: serialport.parsers.readline('\n')
	// 	});
	// 	port.on('data', function (data) {
	// 		console.log('Data: ' + data);
	// 	});
	// }
});


Template.nodeView.onRendered(function () {
	console.log("template rendered");

	let socket1 = io(timeSyncServer);

	let ts = timesync.create({
		server: socket1,
		interval: 5000
	});

	Meteor.setInterval(function () {
		// let now = new Date(ts.now());
		console.log(ts.now());
	}, 1000);
});
