// Didn't use composite view due to using "insertBefore"
TrelloClone.Views.ListsIndex = Backbone.CompositeView.extend({
  template: JST['lists/index'],

  initialize: function(options){
    this.listenTo(this.collection, "remove", this.render);
    this.listenTo(this.collection, "add", this.addList);
    this.board = options.board;
    this.collection.each(this.addList.bind(this));
  },

  events: {
    "click button.add-list": "addListForm",
    "blur form.list-form": "notSavedList",
    "mousedown li.list-item": "isDragging",
    "mouseup li.list-item": "doneDragging"
  },


  render: function(){
    this.$el.html(this.template());
    this.attachSubviews();
    this.addDragging();
    return this;
  },

  // only render the new added list, need to fix!
  addList: function(model){
    var view = new TrelloClone.Views.List({ model: model, board: this.board });
    this.addSubview(".lists-index", view);
    this.$(".add-list").removeClass("hide");
    this.$(".list-form").addClass("hide");
  },

  newListForm: function(){
    this._newListForm = this._newListForm || new TrelloClone.Views.ListForm({
      model: new TrelloClone.Models.List(),
      collection: this.collection,
      board: this.board
    });

    this.$(".new-list").append(this._newListForm.render().$el);
    return this._newListForm;
  },

  addListForm: function(event){
    event.preventDefault();
    this.$(".add-list").addClass("hide");  // hide: display: none
    this.$(".list-form").removeClass("hide");
    this.newListForm().$("input[type=text]").focus();
  },

  notSavedList: function(event){
  // don't want to trigger event if clicked 'save'
    if (event.relatedTarget === $(event.currentTarget).find(".submit")[0]) {
      return;
    }
    event.preventDefault();
    this.$(".add-list").removeClass("hide");
    this.$(".list-form").addClass("hide");
  },

  addDragging: function(){
    this.$("#sortable").sortable();
    this.$("#sortable").disableSelection();
  },

  isDragging: function(event){
    event.preventDefault();
    $(event.currentTarget).addClass("is-dragging");

  },

  doneDragging: function(event){
    event.preventDefault();
    $(event.currentTarget).removeClass("is-dragging");
    var old
    // use setTimeout to make sure the 'mouseup' event is finished
    setTimeout(function(){
      this.$("li.list-item").each(function(li){
        
      })
      debugger
    }.bind(this), 0);
  }

});
