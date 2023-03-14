const button = document.getElementById('submit')
const email = document.getElementById('email')
const password = document.getElementById('password')

const errorEmail = document.getElementById('error-email')
const errorPassword = document.getElementById('error-password')

const errors = {}

button.addEventListener('click', e => {
   email.dispatchEvent(new Event('input'))
   password.dispatchEvent(new Event('input'))
   if(Object.values(errors).includes(true)) {
      e.preventDefault()
   }
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

password.addEventListener('input', e => {
   if(e.target.value.length >= 8) {
      errors.password = false
      errorPassword.classList.add('hide')
      return
   }
   errors.password = true
   errorPassword.innerText = 'At least 8 characters'
   errorPassword.classList.remove('hide')
})