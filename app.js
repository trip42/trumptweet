const request = require('request')
const express = require('express')
const app = express()
const port = 3000

let data = {
  cases: 0,
  deaths: 0
}

app.use(express.static('static'))
app.get( '/', (req, res) => {
  res.send(`
<!doctype html>
<html>
<head>
  <title>Nothing is shut down</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>

<div class="container">
<img alt="" src="https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_reasonably_small.jpg">
  <div class="name">Donald J. Trump</div>
  <div class="handle">@realDonaldTrump</div>
  <div class="tweet">So last year 37,000 Americans died from the common Flu. It averages between 27,000 and 70,000 per year. Nothing is shut down, life &amp; the economy go on. At this moment there are <strong>${data.cases}</strong> confirmed cases of CoronaVirus, with <strong>${data.deaths}</strong> deaths. Think about that!</div>
  <div class="date">10:47 AM · Mar 9, 2020</div>
</div>

</body>
</html>
  `)

} )

const updateData = () => {
  request( {
    method: 'GET',
    uri: 'https://www.worldometers.info/coronavirus/country/us/',
  }, ( err, res, body ) => {
      if ( body ) {
        data.cases = body.match(/<h1>Coronavirus Cases:<\/h1> <div class="maincounter-number"> <span style="color:#aaa">([0-9,]+) <\/span>/)[1]
        data.deaths = body.match(/<h1>Deaths:<\/h1> <div class="maincounter-number"> <span>([0-9,]+)<\/span>/)[1]
        console.log( data.cases, data.deaths )
      } else {
        console.log( err, res, body )
      }
  } )
}

updateData()
setInterval( updateData, 1000 * 60 * 5)

app.listen( port, () => console.log(`Trump Tweet listening on port ${port}`))
