import crypto from 'crypto'

const referenceCode = 'Product_for_text' + new Date().toISOString()
const sigString = process.env.PU_API_KEY.concat("~", process.env.PU_MERCHANT_ID.concat('~', referenceCode + '~100~USD'))
const signature = crypto.createHash('md5').update(sigString).digest('hex')

const deviceSessionId = crypto.createHash('md5').update(crypto.randomBytes(16).toString() + new Date().toISOString()).digest('hex')

export default {
   language: "en",
   command: "SUBMIT_TRANSACTION",
   merchant: {
      "apiKey": process.env.PU_API_KEY,
      "apiLogin": process.env.PU_API_LOGIN
   },
   transaction: {
      order: {
         accountId: process.env.PU_ACCOUNT_ID,
         referenceCode: referenceCode,
         description: "Payment test description",
         language: "en",
         signature: signature,
         additionalValues: {
            TX_VALUE: {
               value: 100,
               currency: "USD"
         },
            TX_TAX: {
               value: 15,
               currency: "USD"
         },
            TX_TAX_RETURN_BASE: {
               value: 0,
               currency: "USD"
         }
         },
         buyer: {
            merchantBuyerId: "1",
            fullName: "First name and second buyer name",
            emailAddress: "buyer_test@test.com",
            contactPhone: "7563126",
            dniNumber: "123456789",
            shippingAddress: {
               street1: "calle 100",
               street2: "5555487",
               city: "Medellin",
               state: "Antioquia",
               country: "CO",
               postalCode: "000000",
               phone: "7563126"
            }
         },
         shippingAddress: {
            street1: "calle 100",
            street2: "5555487",
            city: "Medellin",
            state: "Antioquia",
            country: "CO",
            postalCode: "0000000",
            phone: "7563126"
         }
      },
      payer: {
         merchantPayerId: "1",
         fullName: "First name and second payer name",
         emailAddress: "payer_test@test.com",
         contactPhone: "7563126",
         dniNumber: "5415668464654",
         billingAddress: {
            street1: "calle 93",
            street2: "125544",
            city: "Bogota",
            state: "Bogota DC",
            country: "CO",
            postalCode: "000000",
            phone: "7563126"
         }
      },
      creditCard: {
         number: "4037997623271984",
         securityCode: "777",
         expirationDate: "2030/05",
         name: "APPROVED"
      },
      extraParameters: {
         INSTALLMENTS_NUMBER: 1
      },
      type: "AUTHORIZATION_AND_CAPTURE",
      paymentMethod: "VISA",
      paymentCountry: "CO",
      deviceSessionId: deviceSessionId,
      ipAddress: "127.0.0.1",
      cookie: "pt1t38347bs6jc9ruv2ecpv7o2",
      userAgent: "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
   },
   test: true
}