TrelloClone.Views.Board = Backbone.View.extend({
  className: "board-detail",
  template: JST['boards/board_show'],

  initialize: function(){
    this.listenTo(this.model, "sync destroy change:[title]", this.render);
  },

  render: function(){
    var content = this.template({ board: this.model });
    this.$el.html(content);
    var view = new TrelloClone.Views.ListsIndex({
      collection: this.model.lists(),
      board: this.model 
    });
    this.$(".lists").html(view.render().$el);
    return this;
  }

});
