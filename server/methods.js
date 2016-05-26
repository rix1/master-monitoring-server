Meteor.methods({
    helloMeteor(arg, arg2){
        console.log(arg);
		console.log(arg2);
        return "Thank you very much";
    },

    registerEvent(message){
        console.log(message);

        // Message format: {
            // _id: 'auow8bWhwoEZZBYuW',
            // msgid: '170',
            // timestamp: 1464280159989,
            // eventtype: 'send',
            // clinetid: 'ble_node'
        //}

        try {
            let documentId = Events.insert(message);
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
		var prev = Date.parse(timestamp);
		var timeDiff = now - prev;
		// console.log("Prev: " + prev + " now: "+ now + " diff: "+ timeDiff);

        var newData = {
			value: value,
			timeSent: timestamp,
			createdAt: now,
			diff: timeDiff
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
