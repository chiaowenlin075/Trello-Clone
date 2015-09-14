TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  className: "boards-index group",
  template: JST['boards/index'],

  events: {
    "click button.add-board": "addBoardForm",
    "blur form.board-form": "bluredBoardForm"
  },

  initialize: function(options){
    this.listenTo(this.collection, "reset", this.addBoards);
    this.listenTo(this.collection, "sync remove", this.render);
    this.listenTo(this.collection, "add", this.addBoard); // you set { reset: true }, so no 'add' events happen when fetching datas
    this.addBoards(this.collection);
  },

  // addBoards to selector when all collections fetched!
  addBoards: function(models){
    models.each(this.addBoard.bind(this));
  },

  addBoard: function(board){
    var boardItemView = new TrelloClone.Views.BoardsIndexItem({
      model: board
    });

    $(".add-board").removeClass("hide");
    this.$(".board-form").remove();
    this.addSubview(".board-list", boardItemView, true);
  },

  render: function(){
    var content = this.template({ boards: this.collection });
    this.$el.html(content);
    this.attachSubviews(true);
    return this;
  },

  addBoardForm: function(event){
    event.preventDefault();
    $(event.currentTarget).addClass("hide");
    var boardForm = new TrelloClone.Views.BoardForm({
      model: new TrelloClone.Models.Board()
    });

    this.$(".new-board").append(boardForm.render().$el);
    this.$(".board-form input").focus();
  },

  bluredBoardForm: function(event){
    if (event.relatedTarget === $(event.currentTarget).find(".submit")[0]) {
      return;
    }
    event.preventDefault();
    this.$(".add-board").removeClass("hide");
    this.$(".board-form").remove();
  }

});
