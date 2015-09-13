TrelloClone.Views.BoardForm = Backbone.CompositeView.extend({
  tagName: "form",
  className: "board-form",
  template: JST['boards/board_form'],

  events:{
    "click button.submit": "submit"
  },

  render: function(){
    this.$el.html(this.template());
    this.$("input").focus();
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var input = this.$el.serializeJSON();

    this.model.save(input.board, {
      success: function(model){
        Backbone.history.navigate("/boards/" + model.escape('id'), { trigger: true });
      }.bind(this),
      error: function(model, resp){
        var error = JSON.parse(resp.responseText).join(", ");
        var $error = $("<strong>").html(error);
        this.$el.prepend($error);
      }.bind(this)
    });
  }

});
