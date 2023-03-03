const button = document.getElementById('submit')
const reset = document.getElementById('reset')
const email = document.getElementById('email')
const name = document.getElementById('name')
const surname = document.getElementById('surname')
const dni = document.getElementById('dni')
const address = document.getElementById('address')
const birthday = document.getElementById('birthday')
const country = document.getElementById('country_id')
const img = document.getElementById('img_profile')

const errorEmail = document.getElementById('error-email')
const errorName = document.getElementById('error-name')
const errorSurname = document.getElementById('error-surname')
const errorDni = document.getElementById('error-dni')
const errorAddress = document.getElementById('error-address')
const errorBirthday = document.getElementById('error-birthday')
const errorCountry = document.getElementById('error-country')
const errorImg = document.getElementById('error-img')

const errors = {
}

button.addEventListener('click', e => {
   if(Object.values(errors).includes(true)) {
      e.preventDefault()
   } else {
      e.submit()
   }
})

reset.addEventListener('click', e => {
   errors.email = false
   errors.name = false
   errors.surname = false
   errors.dni = false
   errors.address = false
   errors.birthday = false
   errors.country = false
   errors.img = false
   errorEmail.classList.add('hide')
   errorName.classList.add('hide')
   errorSurname.classList.add('hide')
   errorDni.classList.add('hide')
   errorAddress.classList.add('hide')
   errorBirthday.classList.add('hide')
   errorCountry.classList.add('hide')
   errorImg.classList.add('hide')
})

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
   if(e.target.value.length > 4 && e.target.value.length < 50) {
      errors.name = false
      errorName.classList.add('hide')
      return
   }
   errors.name = true
   errorName.innerText = 'At least 4 characters and max 50'
   errorName.classList.remove('hide')
})

surname.addEventListener('input', e => {
   if(e.target.value.length > 4 && e.target.value.length < 50) {
      errors.surname = false
      errorSurname.classList.add('hide')
      return
   }
   errors.surname = true
   errorSurname.innerText = 'At least 4 characters and max 50'
   errorSurname.classList.remove('hide')
})

dni.addEventListener('input', e => {
   const formatSpaces = /.*\s.*/
   const isValid = !formatSpaces.test(e.target.value) && e.target.value.length > 6
   if(isValid) {
      errors.dni = false
      errorDni.classList.add('hide')
      return
   }
   errors.dni = true
   errorDni.innerText = 'At least 6 characters without spaces'
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

birthday.addEventListener('input', e => {
   const today = new Date()
   const clientDate = new Date(e.target.value)
   const timeDiff = today.getTime() - clientDate.getTime() // Result is in milliseconds
   const diffYears = Math.ceil((timeDiff / (1000 * 3600 * 24)) /365)
   if(diffYears > 18) {
      errors.birthday = false
      errorBirthday.classList.add('hide')
      return
   }
   errors.birthday = true
   errorBirthday.innerText = 'Must be a correct date, you must have al least 18 years'
   errorBirthday.classList.remove('hide')
})

country.addEventListener('input', e => {
   if(parseInt(e.target.value) >= 0) {
      errors.country = false
      errorCountry.classList.add('hide')
      return
   }
   errors.country = true
   errorCountry.innerText = 'You must select a valid country'
   errorCountry.classList.remove('hide')
})

img.addEventListener('input', e => {
   const extname = /.*(\.\w+)/
   const match = extname.exec(e.target.value)[1]
   const isValid = ['.jpg', '.png', '.jpeg', '.webp'].includes(match)
   if(isValid) {
      errors.img = false
      errorImg.classList.add('hide')
      return
   }
   errors.img = true
   errorImg.innerText = 'Image file must be of type: .jpg, .png, .jpeg, or .webp'
   errorImg.classList.remove('hide')
})