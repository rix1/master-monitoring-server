import { Meteor } from 'meteor/meteor'

import {Events, DeviceData} from '../imports/api/collections.js';


Meteor.startup(function(){
	console.log("Meteor server started. Inserting something in db.");

	try {
		let documentId = Events.insert({key: "first object"});
		console.log(documentId);
		documentId = DeviceData.insert({key: "first object"});
		console.log(documentId);
	} catch( exception ) {
		console.log(exception);
		return exception;
	}

})
