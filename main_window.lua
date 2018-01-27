local vector = require "vector"
local sidebar = require "sidebar"
local main_window = {}

local fonts = require "fonts"
local colors = require "colors"

local TEXT_AREA_MARGIN = 30

function main_window.load()
  main_window.pos = vector(sidebar.width, 0)
  main_window.width = love.graphics.getWidth() - sidebar.width
  main_window.height = love.graphics.getHeight()
  main_window.text_area = {
    pos = vector(sidebar.width + TEXT_AREA_MARGIN, love.graphics.getHeight() - 75),
    active = false,
    width = main_window.width - TEXT_AREA_MARGIN * 2,
    height = 50,
    rx = 10,
    ry = 10,
    text = ""
  }
end

function main_window.draw()
  love.graphics.setColor(colors.white.red, colors.white.green, colors.white.blue)
  love.graphics.rectangle("fill",
    main_window.pos.x,
    main_window.pos.y,
    main_window.width,
    main_window.height)

  main_window.draw_text_area()
end

function main_window.draw_text_area()
  local text_area = main_window.text_area

  love.graphics.setColor(colors.gray.red, colors.gray.green, colors.gray.blue)
  love.graphics.rectangle("line",
    text_area.pos.x,
    text_area.pos.y,
    text_area.width,
    text_area.height,
    text_area.rx,
    text_area.ry)

  love.graphics.setFont(fonts.lato_regular_increased)
  love.graphics.setColor(colors.black.red, colors.black.green, colors.black.blue)
  love.graphics.print(main_window.text_area.text, main_window.text_area.pos.x + 10, main_window.text_area.pos.y + 15)
end

function main_window.check_mousepress(x, y)
  local width_pos_x = main_window.text_area.pos.x + main_window.text_area.width
  local height_pos_y = main_window.text_area.pos.y + main_window.text_area.height

  if x >= main_window.text_area.pos.x and x <= width_pos_x and y >= main_window.text_area.pos.y and y <= height_pos_y then
    main_window.text_area.active = true
    main_window.append_text_to_text_area("|")
  else
    main_window.text_area.active = false
  end
end

function main_window.handle_backspace()
  if string.find(main_window.text_area.text, '|') then
    main_window.remove_last_character(main_window.text_area.text)
  end

  main_window.remove_last_character(main_window.text_area.text)
  main_window.add_caret()
end

function main_window.handle_return()
  local text = main_window.text_area.text
  main_window.remove_last_character(text)

  main_window.clear_text()

  main_window.add_new_message(text)
end

function main_window.add_new_message()

end

-- helpers

function main_window.append_text_to_text_area(text)
  if string.find(main_window.text_area.text, '|') then
    main_window.remove_last_character(main_window.text_area.text)
  end

  main_window.text_area.text = main_window.text_area.text .. text

  if text ~= "|" then
    main_window.add_caret()
  end
end

function main_window.clear_text()
  main_window.text_area.text = "|"
end

function main_window.remove_last_character(text)
  text = text:sub(1, -2)
end

function main_window.add_caret()
  main_window.text_area.text = main_window.text_area.text .. "|"
end

return main_window
