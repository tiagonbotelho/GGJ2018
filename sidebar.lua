local vector = require "vector"

local sidebar = {}

local fonts = require "fonts"
local colors = require "colors"

local WIDTH = 200
local COMPANY_NAME = "Transmission Inc."
local TEXT_MARGIN_LEFT = 10

function sidebar.load()
  sidebar.pos = vector(0, 0)
  sidebar.width = WIDTH
  sidebar.height = love.graphics.getHeight()
end

function sidebar.draw()
  sidebar.draw_component(sidebar, colors.purple)

  sidebar.write_content()
end

function sidebar.draw_component(object, color)
  love.graphics.setColor(color.red, color.green, color.blue)
  love.graphics.rectangle("fill",
    object.pos.x,
    object.pos.y,
    object.width,
    object.height)
end

function sidebar.write_content()
  local company_title_pos = vector(10, 10)

  love.graphics.setFont(fonts.lato_black)
  love.graphics.setColor(colors.white.red, colors.white.green, colors.white.blue)
  love.graphics.print(COMPANY_NAME, TEXT_MARGIN_LEFT, company_title_pos.y)

  love.graphics.setColor(colors.green.red, colors.green.green, colors.green.blue)
  love.graphics.circle("fill", TEXT_MARGIN_LEFT + 10, company_title_pos.y + 30, 5)

  -- this is where we set the name of the user
  love.graphics.setFont(fonts.lato_regular)
  love.graphics.setColor(colors.light_purple.red, colors.light_purple.green, colors.light_purple.blue)
  love.graphics.print("username", TEXT_MARGIN_LEFT + 20, company_title_pos.y + 20)

  love.graphics.setFont(fonts.lato_bold)
  love.graphics.setColor(colors.light_purple.red, colors.light_purple.green, colors.light_purple.blue)
  love.graphics.print("Channels", TEXT_MARGIN_LEFT, company_title_pos.y + 70)
end

return sidebar
