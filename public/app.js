Image = Backbone.Model.extend({});
Images = Backbone.Collection.extend({model: Image});

ImageList = Backbone.View.extend({
  tagName: "ul",
  
  initialize: function() {
    _.bindAll(this, 'render', 'addOne');
    this.collection.on("reset", this.render);
    this.collection.on("add", this.addOne);
  },
  
  render: function() {
    this.addAll();
    return this;
  },
  
  addAll: function() {
    this.collection.each(this.addOne);
  },
  
  addOne: function(model) {
    var view = new ImageListItem({model: model});
    this.$el.prepend(view.render().el);
  }
});

ImageListItem = Backbone.View.extend({
  tagName: "li",

  render: function() {
    this.el.innerHTML = this.template(this.model.toJSON());
    return this;
  },
  
  template: _.template("<img src=\"<%= href %>\">")
});

images = new Images;
imageList = new ImageList({collection: images});

$(function() {
  $("#app").append(imageList.$el);
  
  images.reset([
    {href: "http://mikecane.files.wordpress.com/2007/03/kitten.jpg"},
    {href: "http://2.bp.blogspot.com/_i2c_9pu-z7U/TRuZmhddnCI/AAAAAAAAAbU/l_PJB04fLU8/s1600/Sidebox-Kitten-Thinks-R.jpg"}
  ]);
});