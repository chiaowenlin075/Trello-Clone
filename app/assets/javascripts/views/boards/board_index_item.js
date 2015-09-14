TrelloClone.Views.BoardsIndexItem = Backbone.View.extend({
  tagName: "li",
  className: "boards-list-item",
  template: JST['boards/index_item'],

  events: {
    "click .icon-setting": "showDeleteButton",
    "click .delete-board": "deleteBoard"
  },

  initialize: function(){
    this.listenTo(this.model, "sync destroy", this.render);
  },

  render: function(){
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  },

  showDeleteButton: function(event){
    if (!$(event.target).is(".icon-setting")) { return };
    event.preventDefault();
    event.stopPropagation();
    var deleteButton = $("<button class='delete-board'>Delete Board</button>");
    this.$el.append(deleteButton);
    // debugger
    // this.$(".icon-setting")
  },

  deleteBoard: function(event){
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },



});
