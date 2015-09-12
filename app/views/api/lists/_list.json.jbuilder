json.extract!(list, :id, :title, :board_id, :ord)

json.cards list.cards do |card|
  json.partial!("api/cards/card", card: card)
end
