const button = document.getElementById('submit')
const reset = document.getElementById('reset')
const name = document.getElementById('name')
const price = document.getElementById('price')
const description = document.getElementById('description')
const imgs = document.getElementById('productImg')
const discount = document.getElementById('discount')

const errorName = document.getElementById('error-name')
const errorPrice = document.getElementById('error-price')
const errorDescription = document.getElementById('error-description')
const errorImgs = document.getElementById('error-imgs')
const errorDiscount = document.getElementById('error-discount')

let errors = {
   name: true,
   price: true,
}

button.addEventListener('click', e => {
   if(Object.values(errors).includes(true)) {
      e.preventDefault()
   } else {
      e.submit()
   }
})

reset.addEventListener('click', e => {
   errors = {
      name: true,
      price: true,
   }
   errorName.classList.add('hide')
   errorPrice.classList.add('hide')
   errorDescription.classList.add('hide')
   errorImgs.classList.add('hide')
   errorDiscount.classList.add('hide')
})

name.addEventListener('input', e => {
   if(e.target.value.length >= 5 && e.target.value.length <= 45) {
      errors.name = false
      errorName.classList.add('hide')
      return
   }
   errors.name = true
   errorName.innerText = 'Product name must be of at least 5 characters and max 45'
   errorName.classList.remove('hide')
})

price.addEventListener('input', e => {
   if(e.target.value > 0) {
      errors.price = false
      errorPrice.classList.add('hide')
      return
   }
   errors.price = true
   errorPrice.innerText = 'Price must be an integer value'
   errorPrice.classList.remove('hide')
})

description.addEventListener('input', e => {
   if(e.target.value.length >= 20) {
      errors.description = false
      errorDescription.classList.add('hide')
      return
   }
   errors.description = true
   errorDescription.innerText = 'Description must be of at least 20 characters'
   errorDescription.classList.remove('hide')
})

imgs.addEventListener('input', e => {
   const acceptedExt = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp']
   let imageAreValid = true
   for(i=0; i<e.target.files.length; i++) {
      if(!acceptedExt.includes(e.target.files[i].type)) imageAreValid = false
   }
   if(imageAreValid) {
      errors.imgs = false
      errorImgs.classList.add('hide')
      return
   }
   errors.imgs = true
   errorImgs.innerText = 'You have to upload an image with the following extensions: .jpg, .png, .jpeg or .webp'
   errorImgs.classList.remove('hide')
})

discount.addEventListener('input', e => {
   if(parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 100) {
      errors.discount = false
      errorDiscount.classList.add('hide')
      return
   }
   errors.discount = true
   errorDiscount.innerText = 'Must be a numeric value between 0 and 100'
   errorDiscount.classList.remove('hide')
})