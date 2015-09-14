TrelloClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.boards = options.boards;
  },

  routes: {
    "": "boardIndex",
    "boards/new": "boardNew",
    "boards/:id": "boardShow",
    "boards/:id/edit": "boardEdit"
  },

  // need another board index for drop down menu
  boardIndex: function(){
    var view = new TrelloClone.Views.BoardsIndex({
      collection: this.boards
    });
    this._swapView(view);
  },

  boardNew: function(){
    var model = new TrelloClone.Models.Board();
    var view = new TrelloClone.Views.BoardForm({ model: model });
    this._swapView(view);
  },

  boardShow:  function(id){
    var model = this.boards.getOrFetch(id);
    var view = new TrelloClone.Views.Board({ model: model });
    this._swapView(view);
  },

  boardEdit: function(id){
    var model = this.boards.getOrFetch(id);
    var view = new TrelloClone.Views.BoardForm({ model: model });
    this._swapView(view);
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.find("#main").html(view.render().$el);
    if (view instanceof TrelloClone.Views.BoardsIndex){
      $("body").addClass("white-back");
    } else {
      $("body").removeClass("white-back");
    }
  }
});
