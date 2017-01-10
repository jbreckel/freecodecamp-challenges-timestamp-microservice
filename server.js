const express = require('express')
const moment = require('moment')

moment.locale('en')

const PORT = 8080
const format = 'MMMM D, YYYY'
const app = express()

app.get('/', (req, res) => {
  res.status(200).send(`
<!doctype html>
<html lang="en">
    <head>
        <title>Timestamp microservice</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container">
            <h1 class="header">
                API Basejump: Timestamp microservice
            </h1>
            <blockquote>
                User stories:
                <ul>1) I can pass a string as a parameter, and it will check to see whether that string 
                contains either a unix timestamp or a natural language date (example: January 1, 2016)</ul>
                <ul>2) If it does, it returns both the Unix timestamp and the natural language form of that date.</ul>
                <ul>3) If it does not contain a date or Unix timestamp, it returns null for those properties.</ul>
            </blockquote>
            <h3>Example usage:</h3>
            <a href="https://camper-api-project-jbreckel.c9users.io/December%2015,%202015">
              <code>https://camper-api-project-jbreckel.c9users.io/December%2015,%202015</code>
            </a>
            <br>
            <a href="https://camper-api-project-jbreckel.c9users.io/1450137600">
              <code>https://camper-api-project-jbreckel.c9users.io/1450137600</code>
            </a>
            <h3>Example output:</h3>
            <pre>
  {
    "unix": 1450137600,
    "natural": "December 15, 2015"
  }
            </pre>
        </div>
    </body>
</html>`)
})

app.use((req, res, next) => {
  const dateObj = { "unix": null, "natural": null }
  const path = decodeURIComponent(req.path).replace('/','')
  try {
    let date = moment.unix(Number(path))
    if ( !date.isValid() ) {
      date = moment(path, format)
    }
    dateObj.unix = date.unix()
    dateObj.natural = date.format(format)
  } finally {
    res.send(dateObj)
  }
})

app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`Running on port: ${PORT}`)
})
