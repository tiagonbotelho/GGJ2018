local vector = require "vector"
local sidebar = require "sidebar"
local main_window = {}

function main_window.load()
  main_window.pos = vector(sidebar.width, 0)
  main_window.width = love.graphics.getWidth() - sidebar.width
  main_window.height = love.graphics.getHeight()
  main_window.colors = { red = 255, green = 255, blue = 255 }
end

function main_window.draw()
  love.graphics.setColor(main_window.colors.red, main_window.colors.green, main_window.colors.blue)
  love.graphics.rectangle("fill",
    main_window.pos.x,
    main_window.pos.y,
    main_window.width,
    main_window.height)

  main_window.draw_text_area()
end

function main_window.draw_text_area()

end

return main_window
