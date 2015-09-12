TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST["cards/card_form"],
  tagName: "form",
  className: "card-form",

  events: {
    "click label": "showEditArea",
    "click button.update-card-info": "update"
  },

  initialize: function(options){
    this.collection = options.collection;
    this.list = options.list;
  },

  render: function(){
    var content = this.template({ card: this.model, list: this.list });
    this.$el.html(content);
    return this;
  },

  showEditArea: function(event){
    event.preventDefault();
    $(event.currentTarget).toggleClass("hide");
    this.$("textarea").toggleClass("hide");
    this.$("update-card-info").toggleClass("hide");
  },

  update: function(event){
    event.preventDefault();
    var input = this.$el.serializeJSON();
    this.model.save(input.card, {
      success: function(model){
        this.$("label").toggleClass("hide");
        this.$("textarea").toggleClass("hide");
        this.$("update-card-info").toggleClass("hide");
      }.bind(this)
    });
  }

});
