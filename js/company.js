
function Company(size) {
  this.size = size
}

Company.prototype.names = [
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

Company.prototype.departments =[
  "Sales",
  "Marketing",
  "IT",
  "Support",
  "Operations",
  "HR"
]

Company.prototype.titles = [
  // level 0
  ["Associate", "Assistant"],
  ["Intern", "Junior"],
  // player should start on level 2 as a manager
  ["Director", "Team Lead", "Manager"],
  ["Vice President", "Director", "Senior Manager"],
  // level 4
  ["Senior Vice President", "Department Head", "Senior Director"]
]

Company.prototype.generate = function() {
  this.player = { name: this.getRandomName(), title: { level: 2, title: "Manager" }}

  this.users = {}

  for(var i = 0; i < this.size; i++) {
    var name = this.getRandomName()

    this.users[name] = {
      name: name,
      department: this.getRandomDepartment(),
      title: this.getRandomTitle()
    }
  }
}

Company.prototype.getRandomName = function() {
  var i = Math.floor(Math.random() * Math.floor(this.names.length))
  return this.names[i]
}

Company.prototype.getRandomDepartment = function() {
  var i = Math.floor(Math.random() * Math.floor(this.departments.length))
  return this.departments[i]
}

Company.prototype.getRandomTitle = function() {
  var i = Math.floor(Math.random() * Math.floor(this.titles.length))
  var j = Math.floor(Math.random() * Math.floor(this.titles[i].length))
  return { level: i, title: this.titles[i][j] }
}

Company.prototype.getRandomUser = function() {
  var keys = Object.keys(this.users);
  var name = keys[Math.floor(Math.random() * Math.floor(Object.keys(this.users).length))]
  return this.users[name]
}

Company.prototype.getDepartmentSeniorRandomUser = function(department) {
  var possible = []

  for (var k in this.users) {
    var user = this.users[k]
    if(user.department == department) {
      if(user.title.level >= this.player.title.level) {
        possible.push(user)
      }
    }
  }

  return possible[Math.floor(Math.random() * Math.floor(possible.length))]
}

Company.prototype.getDepartmentJuniorRandomUser = function(department) {
  var possible = []

  for (var k in this.users) {
    var user = this.users[k]
    if(user.department == department) {
      if(user.title.level <= this.player.title.level) {
        possible.push(user)
      }
    }
  }

  return possible[Math.floor(Math.random() * Math.floor(possible.length))]
}
