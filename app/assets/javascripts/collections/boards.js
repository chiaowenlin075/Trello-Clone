TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: "/api/boards",
  model: TrelloClone.Models.Board,

  getOrFetch: function(id){
    var widget = this.get(id);
    if(widget){
      widget.fetch();
    } else {
      widget = new TrelloClone.Models.Board({ id: id });
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
