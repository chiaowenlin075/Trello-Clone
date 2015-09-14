TrelloClone.Views.CardsIndexItem = Backbone.View.extend({
  tagName: "li",
  className: "cards-list-item",
  template: JST['cards/index_item'],

  events: {
    "click .to-card-detail": "cardShow"
  },

  initialize: function(options){
    this.list = options.list;
  },

  render: function(){
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  },

  cardShow: function(){
    var cardView = new TrelloClone.Views.CardForm({
      model: this.model,
      list: this.list
    });

    $("body").append(cardView.render().$el);
  }

});
