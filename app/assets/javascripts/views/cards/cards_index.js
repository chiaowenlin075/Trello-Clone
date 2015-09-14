TrelloClone.Views.CardsIndex = Backbone.CompositeView.extend({
  template: JST['cards/index'],

  events: {
    "click button.add-card": "addCardForm",
    "click button.submit": "submitCardForm"
  },

  // add cards 18 times....(total 9 cards), any better way?
  initialize: function(options){
    this.list = options.list;
    this.listenTo(this.collection, "remove", this.render);
    this.listenTo(this.collection, "add", this.addCard);
    this.addCards(this.collection);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  addCards: function(models){
    models.each(this.addCard.bind(this));
  },

  addCard: function(model){
    var view = new TrelloClone.Views.CardsIndexItem({
      model: model,
      list: this.list
    });
    this.addSubview(".cards-index", view);
  },

  addCardForm: function(event){
    event.preventDefault();
    event.stopPropagation();
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
