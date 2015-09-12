TrelloClone.Views.CardsIndex = Backbone.View.extend({
  template: JST['cards/index'],

  events: {
    "click button.add-card": "addCardForm",
    "click button.create-new-card": "submitCardForm"
  },

  initialize: function(options){
    this.listenTo(this.collection, "remove", this.render);
    this.listenTo(this.collection, "add", this.addCard);
    this.list = options.list;
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.collection.each(function(card){
      var view = new TrelloClone.Views.CardsIndexItem({
        model: card,
        list: this.list
      });
      this.$(".cards-index").append(view.render().$el);
    }.bind(this));

    return this;
  },

  addCard: function(model){
    var view = new TrelloClone.Views.CardsIndexItem({ model: model });
    this.$(".cards-index").append(view.render().$el);
    this.$(".add-card").removeClass("hide");
    this.$(".new-card-form").addClass("hide");
  },

  addCardForm: function(event){
    event.preventDefault();
    var addCardButton = $(event.currentTarget).addClass("hide");
    var $input = $("<input type='text'>").addClass("new-card-title");
    var $button = $("<button>Add</button>").addClass("create-new-card");
    this.$(".new-card-form").append($input, $button);
    $input.focus();
  },

  submitCardForm: function(event){
    event.preventDefault();
    var newCard = new TrelloClone.Models.Card();
    newCard.save({
      title: $(".new-card-title").val(),
      list_id: this.list.escape('id')
    }, {
      success: function(model){
        this.collection.add(model);
        this.$(".new-card-form").empty();
        this.$("button.add-card").removeClass("hide");
      }.bind(this),
      error: function(model, resp){
        var error = JSON.parse(resp.responseText).join(", ");
        var $error = $("<strong>").html(error);
        this.$(".new-card-form").prepend($error, "<br>");
      }.bind(this)
    });
  }

});
