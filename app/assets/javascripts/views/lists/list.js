TrelloClone.Views.List = Backbone.View.extend({
  tagName: "li",
  className: "list-item",
  template: JST['lists/list'],

  events: {
    "click h4.list-title": "edit",
    "blur .edit-area input": "saveTitle"
  },

  initialize: function(){
    this.listenTo(this.model, "sync destroy change:[title]", this.render);
  },

  render: function(){
    var content = this.template({ list: this.model });
    this.$el.html(content);

    var cardIndexView = new TrelloClone.Views.CardsIndex({
      collection: this.model.cards(),
      list: this.model
    });
    this.$(".cards").html(cardIndexView.render().$el);
    return this;
  },

  edit: function(event){
    event.preventDefault();
    var titleTag = $(event.currentTarget).addClass("hide");
    var $input = $("<input type='text' value='" + titleTag.text() + "'>");
    this.$(".edit-area").html($input);
    $input.focus();
  },

  saveTitle: function(event){
    event.preventDefault();
    var input = $(event.currentTarget).val();

    this.model.save({ title: input },{
      success: function(model){
        this.$(".edit-area").empty();
        this.$("h4").removeClass("hide");
      }.bind(this),
      error: function(model, resp){
        var error = JSON.parse(resp.responseText).join(", ");
        var $error = $("<strong>").html(error);
        this.$(".edit-area").prepend($error, "<br>");
      }.bind(this)
    });
  }

});
