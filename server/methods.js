import { DeviceData, Events } from '../imports/api/collections'
// import { Meteor } from 'meteor/meteor';

Meteor.methods({
    helloMeteor(arg, arg2){
        console.log(arg);
		console.log(arg2);
        return "Thank you very much";
    },

    registerEvent(message){
        console.log("new msg from: " + message.client_id + " : "+ message.msg_id +": " + message.timestamp);
        try {
            let documentId = Events.insert(message);
            return "Event inserted"
        } catch( exception ) {
            console.log(exception);
            return exception;
        }
    },

    findData(){
        return DeviceData.find({});
    },

    addData(value, timestamp){
		var now = Date.now();
		// var prev = Date.parse(timestamp);

        var newData = {
			value: value,
			reachedServer: now,
            sentFromGateway: timestamp,
        };
        try {
            var documentId = DeviceData.insert( newData );
            return documentId;
        } catch( exception ) {
			console.log(exception);
            return exception;
        }
    },

	resetDb(){
		try {
			var documentId = DeviceData.remove({});
			return documentId;
		} catch( exception ) {
			return exception;
		}
	}
});
