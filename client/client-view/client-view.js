import './client-view.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { DeviceData } from '../../imports/api/collections.js';

Template.dataListComponent.onCreated(function(){
    Meteor.subscribe('deviceData');
});

Template.dataListComponent.helpers({
    dataSet: function(){
        var test = DeviceData.find();
        // var test = "dust";
        console.log(test);
        return test;
    },

    counter: function(arg){
        // return DeviceData.find({}).count() - arg;
    },

    resultRendered: function(id){
        console.log("rendered result",id);
        return "";
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
        })
    },

    'click #add': function(){
        console.log("add clickd");
        var msg = {
            value: 321,
            timeSent: Date.now()
        };
        Meteor.call( 'addData', msg.value, msg.timeSent, ( error, data ) => {
            if ( error ) {
                console.log( error );
            }
            console.log(data);
        });
    }
});
