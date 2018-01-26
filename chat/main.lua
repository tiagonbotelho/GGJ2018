
_G.inspect = require('inspect')

local scenarios = require('scenarios')

function love.load()

end

function love.update(dt)
  if love.keyboard.isDown('escape') then
    love.event.quit()
  end
end

function love.draw()

end
