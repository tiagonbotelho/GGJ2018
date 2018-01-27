
// call company.generateUsers(x)
// where x is the number of users you want
// access company.player for { name: "...", department, "...", title: { level: 0..4, title: "..." }}

company = {}
window.company = company


var names = [
  "James",
  "John",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Thomas",
  "Charles",
  "Christopher",
  "Daniel",
  "Matthew",
  "Anthony",
  "Donald",
  "Mark",
  "Paul",
  "Steven",
  "Andrew",
  "Kenneth",
  "George",
  "Joshua",
  "Kevin",
  "Brian",
  "Edward",
  "Ronald",
  "Timothy",
  "Jason",
  "Jeffrey",
  "Ryan",
  "Gary",
  "Jacob",
  "Nicholas",
  "Eric",
  "Stephen",
  "Jonathan",
  "Larry",
  "Justin",
  "Scott",
  "Frank",
  "Brandon",
  "Raymond",
  "Gregory",
  "Benjamin",
  "Samuel",
  "Patrick",
  "Alexander",
  "Jack",
  "Dennis",
  "Jerry",
  "Tyler",
  "Aaron",
  "Henry",
  "Douglas",
  "Jose",
  "Peter",
  "Adam",
  "Zachary",
  "Nathan",
  "Walter",
  "Harold",
  "Kyle",
  "Carl",
  "Arthur",
  "Gerald",
  "Roger",
  "Keith",
  "Jeremy",
  "Terry",
  "Lawrence",
  "Sean",
  "Christian",
  "Albert",
  "Joe",
  "Ethan",
  "Austin",
  "Jesse",
  "Willie",
  "Billy",
  "Bryan",
  "Bruce",
  "Jordan",
  "Ralph",
  "Roy",
  "Noah",
  "Dylan",
  "Eugene",
  "Wayne",
  "Alan",
  "Juan",
  "Louis",
  "Russell",
  "Gabriel",
  "Randy",
  "Philip",
  "Harry",
  "Vincent",
  "Bobby",
  "Johnny",
  "Logan",
  "Mary",
  "Patricia",
  "Jennifer",
  "Elizabeth",
  "Linda",
  "Barbara",
  "Susan",
  "Jessica",
  "Margaret",
  "Sarah",
  "Karen",
  "Nancy",
  "Betty",
  "Lisa",
  "Dorothy",
  "Sandra",
  "Ashley",
  "Kimberly",
  "Donna",
  "Carol",
  "Michelle",
  "Emily",
  "Amanda",
  "Helen",
  "Melissa",
  "Deborah",
  "Stephanie",
  "Laura",
  "Rebecca",
  "Sharon",
  "Cynthia",
  "Kathleen",
  "Amy",
  "Shirley",
  "Anna",
  "Angela",
  "Ruth",
  "Brenda",
  "Pamela",
  "Nicole",
  "Katherine",
  "Virginia",
  "Catherine",
  "Christine",
  "Samantha",
  "Debra",
  "Janet",
  "Rachel",
  "Carolyn",
  "Emma",
  "Maria",
  "Heather",
  "Diane",
  "Julie",
  "Joyce",
  "Evelyn",
  "Frances",
  "Joan",
  "Christina",
  "Kelly",
  "Victoria",
  "Lauren",
  "Martha",
  "Judith",
  "Cheryl",
  "Megan",
  "Andrea",
  "Ann",
  "Alice",
  "Jean",
  "Doris",
  "Jacqueline",
  "Kathryn",
  "Hannah",
  "Olivia",
  "Gloria",
  "Marie",
  "Teresa",
  "Sara",
  "Janice",
  "Julia",
  "Grace",
  "Judy",
  "Theresa",
  "Rose",
  "Beverly",
  "Denise",
  "Marilyn",
  "Amber",
  "Madison",
  "Danielle",
  "Brittany",
  "Diana",
  "Abigail",
  "Jane",
  "Natalie",
  "Lori",
  "Tiffany",
  "Alexis",
  "Kayla"
]

var departments =[
  "Sales",
  "Marketing",
  "IT",
  "Support",
  "Operations",
  "HR"
]

var titles = [
  // level 0
  ["Associate", "Assistant"],
  ["Intern", "Junior"],
  // player should start on level 2 as a manager
  ["Director", "Team Lead", "Manager"],
  ["Vice President", "Director", "Senior Manager"],
  // level 4
  ["Senior Vice President", "Department Head", "Senior Director"]
]

company.departments = departments

company.player = { level: 2, title: "Manager" }

company.getRandomName = function() {
  var i = Math.floor(Math.random() * Math.floor(names.length))
  return names[i]
}

company.getRandomDepartment = function() {
  var i = Math.floor(Math.random() * Math.floor(departments.length))
  return departments[i]
}

company.getRandomTitle = function() {
  var i = Math.floor(Math.random() * Math.floor(titles.length))
  var j = Math.floor(Math.random() * Math.floor(titles[i].length))
  return { level: i, title: titles[i][j] }
}

company.generateUsers = function(x) {
  var users = []

  for(var i = 0; i < x; i++) {
    users.push({
      name: company.getRandomName(),
      department: company.getRandomDepartment(),
      title: company.getRandomTitle
    })
  }

  return users
}
