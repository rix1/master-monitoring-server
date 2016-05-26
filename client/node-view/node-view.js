// import { serialport } from 'serialport';
// import { timesync } from 'timesync';
// import { io } from 'socketio';

// const SerialPort = serialport.SerialPort;
const deviceManufacturer = 'SEGGER';
const timeSyncServer = 'http://10.24.20.161:8081';

Template.nodeView.onCreated(function () {
	console.log("template created");
	//
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

	var socket1 = io('http://10.24.20.161:8081');

	var ts = timesync.create({
		server: socket1,
		interval: 5000
	});

	Meteor.setInterval(function () {
		var now = new Date(ts.now());
		console.log(ts.now());
	}, 1000);
});
