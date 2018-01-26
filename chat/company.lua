
-- load names

local file = io.open("names/male.txt", "r")
local male_names = {}

for line in file:lines() do
  table.insert(male_names, line);
end

local file = io.open("names/female.txt", "r")
local female_names = {}

for line in file:lines() do
  table.insert(female_names, line);
end

local file = io.open("names/surname.txt", "r")
local surnames = {}

for line in file:lines() do
  table.insert(surnames, line);
end


-- titles

local titles = {
  { 'Senior VP of', 'Head of', 'Senior Director of'},
  { 'VP of', 'Director', 'xSenior Manager' },
  { 'Director', 'xTeam Lead', 'xManager', 'xExecutive'},
  { 'xAssociate', 'Assistant'},
  { 'xIntern', 'Junior' }
}

local departments = { 'Sales', 'Marketing', 'IT', 'Support', 'Operations', 'HR'}


-- generate company employees

local company = {}

math.randomseed(os.time())

-- local layers = math.random(5, 6)
local layers = 5

print(layers)

for i = 1, layers do
  local members = math.floor(math.random(10, 20) * i / layers * 1.5)

  print(members)

  local layer = {}

  for j = 1, members do
    local gender = math.random(1, 2)

    local first_name = nil

    if gender == 1 then
      first_name = female_names[math.random(1, #female_names)]
    else
      first_name = male_names[math.random(1, #male_names)]
    end

    last_name = surnames[math.random(1, #surnames)]
    local title = titles[i][math.random(1, #titles[i])]
    local department = departments[math.random(1, #departments)]

    if string.sub(title, 1, 1) == 'x' then
      title = department .. ' ' .. string.sub(title, 2)
    elseif title == 'Junior' then
      title = title .. ' ' .. department .. ' Associate'
    else
      title = title .. ' ' .. department
    end

    table.insert(layer, {
      username = string.lower(first_name),
      first_name = first_name,
      last_name = last_name,
      department = department,
      title = title
    })

    -- debug
    -- print(first_name .. ' ' .. last_name .. ', ' .. title)
  end

  table.insert(company, layer)
end


return company
