TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST["cards/card_form"],
  className: "card-form",

  events: {
    "click label": "showEditArea",
    "submit form": "update",
    "click .close": "closeForm"
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
    this.$("label").toggleClass("hide");
    this.$("textarea").toggleClass("hide").focus();
    this.$(".submit").toggleClass("hide");
  },

  update: function(event){
    event.preventDefault();
    var input = $(event.currentTarget).serializeJSON();
    this.model.save(input.card, {
      success: function(model){
        this.remove();
      }.bind(this)
    });
  },

  closeForm: function(event){
    event.preventDefault();
    this.remove();
  }

});
