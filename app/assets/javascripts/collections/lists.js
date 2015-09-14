TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: "/api/lists",
  model: TrelloClone.Models.List,

  initialize: function(options){
    this.board = options.board;
  },

  getOrFetch: function(id){
    var widget = this.get(id);
    if(widget){
      widget.fetch();
    } else {
      widget = new TrelloClone.Models.List({ id: id });
      this.add(widget);
      widget.fetch({
        error: function(){
          this.remove(widget);
        }.bind(this)
      });
    }

    return widget;
  }

});
