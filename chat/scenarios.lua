
local company = require('company')

-- banter

-- scenarios: WR from senior in same department
--               from senior in another department
--               from junior in another department

-- scenario begin: sender, greeting, target, request, ...

local greetings = {
  '', 'Hi ',  'Hey ',  'Hiya ',  'So ',
  '', 'Hi ',  'hey ',  'hiya ',  'so ',
      'hi, ', 'hey, ', 'hiya, ', 'so, '
}

-- targets

local requests = {
  ''
}


function create_scenario(player)
  local sender = company.get_sender(player.layer - 1)
  local greeting = greetings[math.random(1, #greetings)]

  -- targets: 2% chance it's @all or @here :P
  --          6% chance it's @player_department
  --          15% chance it's player
  --          10% chance to at more people

  print(sender.username .. ': ' .. greeting)
end


for i = 1, 3 do
  create_scenario(company.player)
end

