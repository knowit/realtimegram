MyView = Backbone.View.extend({
	initialize: function() {
		this.model.bind('change', this.render, this);
	},
	render: function() {
		this.$el.text(this.model.get('text'));
	}
});
var myModel = new Backbone.Model;
newView = new MyView({
	model: myModel
});
$('body').append(newView.el);
myModel.set({
	text: 'hello world!'
});
