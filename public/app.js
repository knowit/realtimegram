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

  window.images = new Images;
  var uploadForm = new UploadForm().render();
  var imageList = new ImageList({collection: images});

  $(function() {
    $("#app").append(uploadForm.$el).append(imageList.$el);

    var socket = io.connect('http://localhost');
    socket.on('img', function(path) {
      console.log(path);
      images.add({
        href: path
      });
    });
  });
}(jQuery, Backbone, _));
