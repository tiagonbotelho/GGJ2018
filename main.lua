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

function love.mousepressed(x, y, button)
  if button == 1 then
    main_window.check_mousepress(x, y)
  end
end

function love.textinput(text)
  if main_window.text_area.active then
    main_window.append_text_to_text_area(text)
  end
end

function love.keyreleased(key, code)
  if main_window.text_area.active then
    if key == "return" then
      main_window.handle_return()
      -- send message
    elseif key == "backspace" then
      main_window.handle_backspace()
    elseif key == "space" then
      main_window.append_text_to_text_area(" ")
    end
  end
end

function love.quit()
  print("Thanks for playing! Come back soon!")
end

