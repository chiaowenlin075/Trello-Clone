TrelloClone.Views.BoardsIndexItem = Backbone.View.extend({
  tagName: "li",
  className: "boards-list-item",
  template: JST['boards/index_item'],

  events: {
    // "click button.delete-board": "deleteBoard"
  },

  initialize: function(){
    this.listenTo(this.model, "sync destroy", this.render);
  },

  render: function(){
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  }

  // deleteBoard: function(event){
  //   event.preventDefault();
  //   this.model.destroy();
  //   this.remove();
  // },

});
