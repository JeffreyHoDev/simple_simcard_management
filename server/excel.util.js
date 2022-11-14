const { getJsDateFromExcel } = require("excel-date-to-js");
let xlsx = require('xlsx')

let workbook = xlsx.readFile('./template.xlsx')
let sheet_name_list = workbook.SheetNames;
let data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

let insertData = async() => {
    await Promise.all(data.map(async(item, index) => {
        console.log("Insert Data Index " + index + "started")
        // let activation = await getJsDateFromExcel(item.activatedate)
        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        }

        function formatDate(date) {
            return [
              date.getFullYear(),
              padTo2Digits(date.getMonth() + 1),
              padTo2Digits(date.getDate()),
            ].join('-');
          }

        let activationDate = new Date(item.activatedate)
        let expirationDate = new Date(item.expirydate)

        let activateDateString = formatDate(activationDate)
        let expiryDateString = formatDate(expirationDate)

        console.log(activateDateString)
        console.log(expiryDateString)

        try {
            let response = await fetch("http://165.232.167.132:9960/batch", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    simcard: item.simno,
                    customer: item.customer,
                    project: item.project,
                    activateDate: activateDateString,
                    expiryDate: expiryDateString,
                    vehiclePlate: item.vehicleplate
                })
            })

            let returnData = await response.json()
            console.log(returnData)
            console.log("Insert Data Index " + index + "ended")
        }catch(err){
            console.log(err)
        }
    }))

}

insertData()
