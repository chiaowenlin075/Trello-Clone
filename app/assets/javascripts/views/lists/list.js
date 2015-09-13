TrelloClone.Views.List = Backbone.View.extend({
  tagName: "li",
  className: "list-item",
  template: JST['lists/list'],

  events: {
    "click h4.list-title": "edit",
    "blur .list-form input": "saveTitle"
  },

  initialize: function(options){
    this.listenTo(this.model, "sync destroy change:[title]", this.render);
    this.board = options.board;
  },

  render: function(){
    var content = this.template({ list: this.model });
    this.$el.html(content);

    var cardIndexView = new TrelloClone.Views.CardsIndex({
      collection: this.model.cards(),
      list: this.model
    });
    this.$el.append(cardIndexView.render().$el);
    return this;
  },

  edit: function(event){
    event.preventDefault();
    $(event.currentTarget).addClass("hide");
    var listForm = new TrelloClone.Views.ListForm({
      model: this.model,
      board: this.board
    })
    this.$el.prepend(listForm.render().$el);
    listForm.$("input").focus();
  },

  saveTitle: function(event){
    event.preventDefault();
    var input = $(event.currentTarget).serializeJSON().list;

    this.model.save(input,{
      success: function(model){
        this.$(".list-form").remove();
        this.$("h4").removeClass("hide");
      }.bind(this),
      error: function(model, resp){
        var error = JSON.parse(resp.responseText).join(", ");
        var $error = $("<strong>").html(error);
        this.$(".list-form").prepend($error);
      }.bind(this)
    });
  }

});
