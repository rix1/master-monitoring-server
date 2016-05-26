import { Mongo } from 'meteor/mongo';


export const DeviceData = new Mongo.Collection("device_data");

// db.device_data.insert({ value: "Hello world!", createdAt: new Date() });

export const Events = new Mongo.Collection('events');

if(Meteor.isServer){
	Meteor.publish('deviceData', function devicePublication() {
		return DeviceData.find({}, {sort: {createdAt: -1}, limit: 10});
		// return "Gunnar";
	});
}
