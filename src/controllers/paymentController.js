import makePayment from "../middlewares/makePayment.js"
import axios from "axios"

// Controller
export default {

   async makePayment(req, res) {

      const request = makePayment
      const response = await axios.post('https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi', request, {
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
            
      res.json(response.data)

   }

}