import './client-view.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Events, DeviceData } from '../../imports/api/collections.js';

const timesync = require('timesync');
const io = require('socket.io-client');

const timeSyncServer = '129.241.103.248:8081';

let socket1 = io(timeSyncServer);

let syncedTime = timesync.create({
    server: socket1,
    interval: 5000
});


(function() {
    var initializing = true;
    DeviceData.find().observeChanges({
        added: function(id, doc) {
            if (!initializing) {
                console.log();
                console.log(doc);
                let data = {
                    "msg_id" : doc.value,
                    "timestamp" : syncedTime.now(),
                    "eventtype" : "receive",
                    "clinet_id" : Meteor.default_connection._lastSessionId
                }

                Meteor.call('registerEvent', data, (error, data) =>{
                    if(error){
                        console.log(error);
                    };
                    console.log(data);
                })
            }
        }
    });
    initializing = false;
})();

Template.dataListComponent.onCreated(function(){
    Meteor.subscribe('deviceData');
    this.state = new ReactiveDict();
});

Template.dataListComponent.onRendered(function(){
    const instance = this;
})

Template.dataListComponent.helpers({
    dataSet: function(){
        var test = DeviceData.find({}, {sort: {reachedServer: -1}});
        return test;
    },

    counter: function(arg){
        return DeviceData.find({}).count() - arg;
    },

    timeFormat(duration){
        var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    },

    currentDiff(timestamp){
        var now = Date.now();
        var prev = Date.parse(timestamp);
        var timeDiff = now - prev;
        return timeDiff;
    }
});

Template.body.helpers({
    count: function(){
        // return DeviceData.find({}).count();
    }
});

Template.debug.events({

    'click #reset': () => {
        console.log("reset clicked");
        Meteor.call('resetDb', (error, data) =>{
            if(error){
                console.log(error);
            };
            console.log("DB deleted " + data + " items");
            console.log(data);
        })
    },

    'click #add': function(){
        console.log("add clickd");
        var msg = {
            value: Math.floor(Math.random()*10),
            timeSent: Date.now()
        };
        Meteor.call( 'addData', msg.value, msg.timeSent, ( error, data ) => {
            if ( error ) {
                console.log( error );
            }
        });
    }
});
