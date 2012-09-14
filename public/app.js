(function($, Backbone, _) {
  var Image = Backbone.Model.extend({
    initialize: function() {
      this.id = this.get('href');
    }
  });

  var Images = Backbone.Collection.extend({
    model: Image,

    comparator: function(model) {
      return model.get('date');
    }
  });

  var ImageList = Backbone.View.extend({
    tagName: "ul",
    className: 'images',

    initialize: function() {
      _.bindAll(this, 'render', 'addOne');
      this.collection.on("reset", this.render);
      this.collection.on("add", this.addOne);
    },

    render: function() {
      this.$el.empty();
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

    events: {
      "click": "showAlert"
    },

    initialize: function() {
      this.model.on("change", this.render, this);
    },

    render: function() {
      this.$el.empty().append(this.template(this.model.toJSON()));
      return this;
    },

    showAlert: function() {
      window.open("/images/" + this.model.get("href"));
    }
  });

  var UploadForm = Backbone.View.extend({
    template: _.template($('#formTemplate').html()),

    className: 'formcontainer',

    events: {
      'click #formtoggler': 'toggleForm'
    },

    initialize: function() {
      this.visible = false;
      _.bindAll(this, 'render');
    },

    toggleForm: function(e) {
      this.visible = !this.visible;
      $(e.target).html(this.visible ? "Hide form" : "Show form");
      this.$el.find('form').fadeToggle();
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
    socket.on('img', function(img) {
      images.add(img);
    });
  });
}(jQuery, Backbone, _));
