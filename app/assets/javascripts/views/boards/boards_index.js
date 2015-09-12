TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  className: "boards-index",
  template: JST['boards/index'],

  initialize: function(options){
    this.listenTo(this.collection, "sync add remove", this.render);
    this.listenTo(this.collection, "add", this.addBoard);
  },

  // CompositeView not working.....dont know why lol
  addBoard: function(board){
    var boardItemView = new TrelloClone.Views.BoardsIndexItem({
      model: board
    });

    this.addSubview(".board-list", boardItemView, false);
  },

  render: function(){
    var content = this.template({ boards: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    this.collection.each(function(model){
      var view = new TrelloClone.Views.BoardsIndexItem({ model: model });
      this.$(".board-list").append(view.render().$el);
    }.bind(this));
    return this;
  }

});
