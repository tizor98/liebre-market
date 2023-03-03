const button = document.getElementById('submit')
const type = document.getElementById('type')
const ccn = document.getElementById('ccn')
const cce = document.getElementById('cce')
const cvv = document.getElementById('cvv')

const errorType = document.getElementById('error-type')
const errorCcn = document.getElementById('error-ccn')
const errorCvv = document.getElementById('error-cvv')

const errors = {
   type: true,
   ccn: true,
}

button.addEventListener('click', e => {
   if(Object.values(errors).includes(true)) {
      if(errors.type) {
         errorType.innerText = 'You must select one card type'
         errorType.classList.remove('hide')
      }
      e.preventDefault()
   } else {
      e.submit()
   }
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
   errors.type = true
   errorCcn.innerText = 'You must introduce a valid credit card number'
   errorCcn.classList.remove('hide')
})

cce.addEventListener('keyup', formatExpiration)

cvv.addEventListener('input', e => {
   if(e.target.value.length >= 3) {
      errors.cvv = false
      errorCvv.classList.add('hide')
      return
   }
   errors.type = true
   errorCvv.innerText = 'Must be a 3-digit number'
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