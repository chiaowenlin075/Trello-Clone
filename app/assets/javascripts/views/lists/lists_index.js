TrelloClone.Views.ListsIndex = Backbone.View.extend({
  template: JST['lists/index'],

  events: {
    "click button.add-list": "addListForm"
    // "blur form.list-form": "notSavedList"
  },

  initialize: function(options){
    this.listenTo(this.collection, "remove", this.render);
    this.listenTo(this.collection, "add", this.addList);
    this.board = options.board;
  },

  render: function(){
    this.$el.html(this.template());
    this.collection.each(function(list){
      var view = new TrelloClone.Views.List({ model: list });
      this.$(".lists-index").append(view.render().$el);
    }.bind(this));

    return this;
  },

  // only render the new added list, need to fix!
  addList: function(model){
    var view = new TrelloClone.Views.List({ model: model });
    this.$(".lists-index").append(view.render().$el);
    this.$(".add-list").removeClass("hide");
    this.$(".new-list-form").addClass("hide");
  },

  newListForm: function(){
    this._newListForm = this._newListForm || new TrelloClone.Views.ListForm({
      model: new TrelloClone.Models.List(),
      collection: this.collection,
      board: this.board
    });

    this.$(".new-list-form").html(this._newListForm.render().$el);
    return this._newListForm;
  },

  addListForm: function(event){
    event.preventDefault();
    this.$(".add-list").addClass("hide");  // hide: display: none
    this.$(".new-list-form").removeClass("hide");
    this.newListForm().$("input[type=text]").focus();
  }

  // notSavedList: function(event){
  //   event.preventDefault();
  // }

});
