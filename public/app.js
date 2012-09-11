(function($, Backbone, _) {
  var Image = Backbone.Model.extend({});
  var Images = Backbone.Collection.extend({model: Image});

  var ImageList = Backbone.View.extend({
    tagName: "ul",
    className: 'images',

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

  var ImageListItem = Backbone.View.extend({
    template: _.template($('#imageTemplate').html()),

    tagName: "li",
    className: 'image',

    render: function() {
      this.$el.empty().append(this.template(this.model.toJSON()));
      return this;
    }
  });

  var UploadForm = Backbone.View.extend({
    template: _.template($('#formTemplate').html()),
    className: 'formcontainer',
    events: {
      'click #formtoggler': 'showForm'
    },
    showForm: function(e) {
      this.$el.find('form').fadeIn();
    },
    initialize: function() {
      _.bindAll(this, 'render');
    },
    render: function() {
      this.$el.empty().append(this.template({}));
      return this;
    }
  });

  var images = new Images;
  var uploadForm = new UploadForm().render();
  var imageList = new ImageList({collection: images});

  $(function() {
    $("#app").append(uploadForm.$el).append(imageList.$el);

    images.reset([
      {href: "http://mikecane.files.wordpress.com/2007/03/kitten.jpg"},
      {href: "http://2.bp.blogspot.com/_i2c_9pu-z7U/TRuZmhddnCI/AAAAAAAAAbU/l_PJB04fLU8/s1600/Sidebox-Kitten-Thinks-R.jpg"}
    ]);
  });
}(jQuery, Backbone, _));
