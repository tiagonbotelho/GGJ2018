local vector = require "vector"

local sidebar = {}

local fonts = require "fonts"

local WIDTH = 200
local COMPANY_NAME = "Transmission Inc."
local TEXT_MARGIN_LEFT = 10

local light_purple = { red = 171, green = 155, blue = 169 }

function sidebar.load()
  sidebar.pos = vector(0, 0)
  sidebar.width = WIDTH
  sidebar.height = love.graphics.getHeight()
  sidebar.colors = { red = 77, green = 57, blue = 75 }
end

function sidebar.draw()
  sidebar.draw_component(sidebar)

  sidebar.write_content()
end

function sidebar.draw_component(object)
  love.graphics.setColor(object.colors.red, object.colors.green, object.colors.blue)
  love.graphics.rectangle("fill",
    object.pos.x,
    object.pos.y,
    object.width,
    object.height)
end

function sidebar.write_content()
  local company_title_pos = vector(10, 10)

  love.graphics.setFont(fonts.lato_black)
  love.graphics.setColor(255, 255, 255)
  love.graphics.print(COMPANY_NAME, TEXT_MARGIN_LEFT, company_title_pos.y)

  love.graphics.setColor(76, 150, 137)
  love.graphics.circle("fill", TEXT_MARGIN_LEFT + 10, company_title_pos.y + 30, 5)

  -- this is where we set the name of the user
  love.graphics.setFont(fonts.lato_regular)
  love.graphics.setColor(light_purple.red, light_purple.green, light_purple.blue)
  love.graphics.print("username", TEXT_MARGIN_LEFT + 20, company_title_pos.y + 20)

  love.graphics.setFont(fonts.lato_bold)
  love.graphics.setColor(light_purple.red, light_purple.green, light_purple.blue)
  love.graphics.print("Channels", TEXT_MARGIN_LEFT, company_title_pos.y + 70)
end

return sidebar
