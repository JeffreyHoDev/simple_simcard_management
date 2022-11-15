require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cron = require('node-cron');
const checkExpirySoonCard = require('./email.js')
const knex = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : process.env.DEV_DB_PASSWORD,
        database : 'sim_card'
    }
});


const app = express()
const port = 9960
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"))
app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)

app.get('/getRecord', (req, res) => {
    knex.select().table('sim_card_record')
    .then(response => res.json(response))
    .catch(error => res.json(error))
})

app.post('/getLoginInfo', (req, res) => {
    const { username, password } = req.body
    knex('users').where({
        username,
        password
    })
    .then(response => {
        if(response.length === 0) {
            res.json(0)
        }else {
            res.json(response)
        }
    })
    .catch(error => res.json(error))
})

app.post('/update', (req,res) => {
    const { id, simcard, customer, project, activateDate, vehiclePlate, expiryDate, status } = req.body
    knex('sim_card_record').where({id: id})
    .update({
        simno: simcard,
        customer: customer,
        project: project,
        activatedate: activateDate,
        vehicleplate: vehiclePlate,
        expirydate: expiryDate,
        status: status
    })
    .then(response => res.json(response))
    .catch(err => console.log(err))
})

app.post('/insertRecord', (req, res) => {
    const { simcard, customer, project, activateDate, vehiclePlate, expiryLength, status } = req.body
    const expiryDate = new Date(activateDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + parseInt(expiryLength))
    knex('sim_card_record').insert({
        simno: simcard,
        customer: customer,
        project: project,
        activatedate: activateDate,
        expirydate: expiryDate,
        vehicleplate: vehiclePlate,
        status: status
    })
    .then(response => res.json(response))
    .catch(error => res.json(error))

})

cron.schedule('0 9 * * *', () => {
    checkExpirySoonCard.checkExpirySoonCard()
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


