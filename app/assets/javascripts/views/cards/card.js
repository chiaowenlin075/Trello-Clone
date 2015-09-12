TrelloClone.Views.Card = Backbone.View.extend({
  template: JST['cards/card'],

  render: function(){
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  }

});
