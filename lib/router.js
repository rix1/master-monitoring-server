Router.configure({
	layoutTemplate: 'main'
})

Router.route('/', function () {
  this.render('clientView');
});

Router.route('/node', function () {
  this.render('nodeView');
});
