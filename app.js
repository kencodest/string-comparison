/* Creating API*/
const express = require('express')
const bodyParser = require('body-parser')
const utils = require('./utils')
const app = express()
const port = 3000

/* parse application/json */
app.use(bodyParser.json())


app.post('/api/compare', (req, res) => {
  const data = req.body;
  if(!data["DataSet1"] || !data["DataSet2"]){
    res.json({ error:"Datasets required for operation"})
  };

  let grade = utils.grading(data["DataSet1"], data["DataSet2"]) ;
  res.json(grade)
})

app.listen(port, () => {
  console.log(`live listening on port http://localhost:${port}`)
})