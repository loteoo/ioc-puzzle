const falso = require('@ngneat/falso')
const fs = require('fs')

// Create array of 1000 random users
const users = Array.from(Array(1000).keys()).map((i) => ({
  id: i + 1,
  firstName: falso.randFirstName(),
  lastName: falso.randLastName(),
  email: falso.randEmail(),
  city: falso.randCity(),
  createdAt: falso.randPastDate(),
}))

// Write array to static JSON file
fs.writeFileSync('./public/users.json', JSON.stringify(users, null, 2), 'utf8')


console.log(`${users.length} fake users created successfully!`)