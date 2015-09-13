TrelloClone.Views.ListForm = Backbone.View.extend({
  template: JST["lists/list_form"],
  tagName: "form",
  className: "list-form",

  events: {
    "click button": "submit"
  },

  initialize: function(options){
    this.collection = options.collection;
    this.board = options.board;
  },

  render: function(){
    var content = this.template({ list: this.model, board: this.board });
    this.$el.html(content);
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var input = this.$el.serializeJSON();

    this.model.save(input.list, {
      success: function(model){
        this.collection.add(model);
        this.model = new TrelloClone.Models.List();
      }.bind(this),
      error: function(model, resp){
        var error = JSON.parse(resp.responseText).join(", ");
        var $error = $("<strong>").html(error);
        this.$el.prepend($error, "<br>");
      }.bind(this)
    });
  }

});
