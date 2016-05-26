Meteor.publish('deviceData', function tasksPublication() {
  return DeviceData.find({}, {sort: {createdAt: -1}, limit: 10});
});
