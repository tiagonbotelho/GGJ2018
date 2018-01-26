local vector = require "vector"
local sidebar = require "sidebar"
local main_window = require "main_window"

function love.load()
  sidebar.load()
  main_window.load()
end

function love.update(dt)
end

function love.draw()
  sidebar.draw()
  main_window.draw()
end

function love.keyreleased(key, code)
end

function love.quit()
  print("Thanks for playing! Come back soon!")
end

