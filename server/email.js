"use strict";
const nodemailer = require("nodemailer");
const knex = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'Reunion1994!',
        database : 'sim_card'
    }
});

// async..await is not allowed in global scope, must use a wrapper
async function emailHandler(data) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: "jeffreyhodev@gmail.com", // generated ethereal user
      pass: "wlbggxhwgdpgmlec", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'jeffreyhodev@gmail.com', // sender address
    to: "kahwaitnts@gmail.com, jeffreyhodev@gmail.com", // list of receivers
    subject: "Sim Expiry Reminder", // Subject line
    text: "Sim Expiry Reminder", // plain text body
    html: `
    The following Sim card(s) is expiring soon.
    ${
        data.map(item => {
            return `<div><div>ID: ${item.id}</div><div>Project: ${item.project}</div><div>Customer: ${item.customer}</div><div>Expiry Date: ${item.expirydate}</div></div>`
        })
    }
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  
}

// main().catch(console.error);

const checkExpirySoonCard = async() => {
    let padToTwoDigits = (date) => {
        return String(date).padStart(2, '0')
    }
    let today = new Date();
    let todayString = `${today.getFullYear()}-${padToTwoDigits(today.getMonth()+1)}-${padToTwoDigits(today.getDate())}`

    let endString = `${today.getFullYear()}-${padToTwoDigits(today.getMonth()+2)}-${padToTwoDigits(today.getDate())}`
    console.log(endString)

    knex('sim_card_record').whereBetween("expirydate",[todayString, endString])
    .then(response => {
        if(response.length !== 0){
            emailHandler(response).catch(console.error)
        }else {
            console.log("No expiring data in one month")
        }
    })
    .catch(err => console.log(err))
}
checkExpirySoonCard()