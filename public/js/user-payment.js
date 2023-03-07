const button = document.getElementById('submit')
const type = document.getElementById('type')
const ccn = document.getElementById('ccn')
const cce = document.getElementById('cce')
const cvv = document.getElementById('cvv')
const email = document.getElementById('email')
const name = document.getElementById('name')
const dni = document.getElementById('dni')
const address = document.getElementById('address')

const cartPayment = document.getElementById('cart-payment')
const cartInfo = document.getElementById('cart-info')
const cartBuyButton = document.getElementById('cart-buy')
const cartFormProducts = document.getElementById('cart-form-product-info')

const errorType = document.getElementById('error-type')
const errorCcn = document.getElementById('error-ccn')
const errorCvv = document.getElementById('error-cvv')

const errorEmail = document.getElementById('error-email')
const errorName = document.getElementById('error-name')
const errorDni = document.getElementById('error-dni')
const errorAddress = document.getElementById('error-address')

const errors = {
   dni: true,
   type: true,
   ccn: true,
}

cartBuyButton.addEventListener('click', () => {
   cartInfo.classList.remove('cart-article-overall')
   cartInfo.classList.add('hide')
   cartPayment.classList.add('cart-article-overall')
   cartPayment.classList.remove('hide')
})

button.addEventListener('click', e => {
   type.dispatchEvent(new Event('input'))
   ccn.dispatchEvent(new Event('input'))
   dni.dispatchEvent(new Event('input'))
   cvv.dispatchEvent(new Event('input'))

   if(Object.values(errors).includes(true)) {
      e.preventDefault()
   }

   cartFormProducts.value = localStorage.getItem('cart')
})

type.addEventListener('input', e => {
   if(e.target.value === 'cc' || e.target.value === 'dc') {
      errors.type = false
      errorType.classList.add('hide')
      return
   }
   errors.type = true
   errorType.innerText = 'You must select one card type'
   errorType.classList.remove('hide')
})

ccn.addEventListener('input', e => {
   const isValid = checkLuhn(e.target.value) && parseInt(e.target.value) >= 0
   if(isValid) {
      errors.ccn = false
      errorCcn.classList.add('hide')
      return
   }
   errors.ccn = true
   errorCcn.innerText = 'You must introduce a valid credit card number'
   errorCcn.classList.remove('hide')
})

cce.addEventListener('keyup', formatExpiration)

cvv.addEventListener('input', e => {
   if(e.target.value.length === 3) {
      errors.cvv = false
      errorCvv.classList.add('hide')
      return
   }
   errors.cvv = true
   errorCvv.innerText = 'CVV must be a 3-digit number'
   errorCvv.classList.remove('hide')
})


function checkLuhn(cardNo) {
   const nDigits = cardNo.length

   let digitSum = 0
   let isSecond = false
   for (let i=nDigits-1; i>=0; i--) {

      let d = cardNo[i].charCodeAt(0) - '0'.charCodeAt(0)

      if (isSecond === true) d = d * 2

      // We add two digits to handle
      // cases that make two digits
      // after doubling
      digitSum += parseInt(String(d / 10), 10)
      digitSum += d % 10

      isSecond = !isSecond
   }
   return digitSum % 10 == 0
}

function formatExpiration(e) {
   e.target.value = e.target.value
      .replace(/^([1-9]\/|[2-9])$/g, '0$1/') // 3 > 03/
      .replace(/^(0[1-9]|1[0-2])$/g, '$1/') // 11 > 11/
      .replace(/^([0-1])([3-9])$/g, '0$1/$2') // 13 > 01/3
      .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2') // 141 > 01/41
      .replace(/^(0+)\/|0+$/g, '0') // 0/ > 0 and 00 > 0
      .replace(/[^\d\/]|^\/*$/g, '') // To allow only digits and `/`
      .replace(/\/\//g, '/') // Prevent entering more than 1 `/`
      .replace(/^[2-9][0-9]\/\d\d|1[3-9]\/\d\d/g, '')
}

email.addEventListener('input', e => {
   const formatEmail = /[\w\._\+]{5,50}@\w+\.\w{2,6}(\.\w{2})?/
   const isValid = formatEmail.test(e.target.value)
   if(isValid) {
      errors.email = false
      errorEmail.classList.add('hide')
      return
   }
   errors.email = true
   errorEmail.innerText = 'Enter a valid email address'
   errorEmail.classList.remove('hide')
})

name.addEventListener('input', e => {
   if(e.target.value.length > 4 && e.target.value.length < 96) {
      errors.name = false
      errorName.classList.add('hide')
      return
   }
   errors.name = true
   errorName.innerText = 'At least 4 characters and max 95'
   errorName.classList.remove('hide')
})

dni.addEventListener('input', e => {
   const formatSpaces = /.*\s.*/
   const isValid = !formatSpaces.test(e.target.value) && e.target.value.length >= 6 && e.target.value.length <= 51
   if(isValid) {
      errors.dni = false
      errorDni.classList.add('hide')
      return
   }
   errors.dni = true
   errorDni.innerText = 'At least 6 characters and max 50 without spaces'
   errorDni.classList.remove('hide')
})

address.addEventListener('input', e => {
   if(e.target.value.length > 4 && e.target.value.length < 50) {
      errors.address = false
      errorAddress.classList.add('hide')
      return
   }
   errors.address = true
   errorAddress.innerText = 'At least 4 characters and max 50'
   errorAddress.classList.remove('hide')
})