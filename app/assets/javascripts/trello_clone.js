window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var boards = new TrelloClone.Collections.Boards();
    boards.fetch({ reset: true });
    // var boardsIndex = new TrelloClone.Views.BoardsIndex({ collection: boards });
    // $("header").prepend(boardsIndex.render().$el);
    var router = new TrelloClone.Routers.Router({
      boards: boards,
      $rootEl: $(".backdrop")
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
