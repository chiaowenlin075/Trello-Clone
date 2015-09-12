json.extract!(board, :id, :title, :user_id)

if show_lists
  json.lists board.lists do |list|
    json.partial!("api/lists/list", list: list)
  end
end
