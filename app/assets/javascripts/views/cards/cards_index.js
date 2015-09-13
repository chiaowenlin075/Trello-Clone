TrelloClone.Views.CardsIndex = Backbone.View.extend({
  template: JST['cards/index'],

  events: {
    "click button.add-card": "addCardForm",
    "click button.submit": "submitCardForm"
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
  },

  addCardForm: function(event){
    event.preventDefault();
    var addCardButton = $(event.currentTarget).addClass("hide");
    var $input = $("<textarea>").addClass("new-card-title");
    var $button = $("<button class='submit'>Add</button>");
    this.$el.append($input, $button);
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
        this.$(".new-card-title").remove();
        this.$("button.submit").remove();
        this.$(".add-card").removeClass("hide");
      }.bind(this),
      error: function(model, resp){
        var error = JSON.parse(resp.responseText).join(", ");
        var $error = $("<strong>").html(error);
        $error.insertBefore(this.$(".new-card-title"));
      }.bind(this)
    });
  }

});
