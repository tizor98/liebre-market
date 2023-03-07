const button = document.querySelector(".add-to-cart")
const done = document.querySelector(".done")

const productIdRegex = /^.*\/(\d+)$/
const productId = productIdRegex.exec(window.location.pathname)[1]

let added = false
button.addEventListener('click',() => {
   if(added){
      done.style.transform = "translate(-110%) skew(-40deg)"
      removeFromCart(productId)
      shoppingWeb.dispatchEvent(new Event('input'))
      added = false
   }
   else{
      done.style.transform = "translate(0px)"
      addToCart(productId)
      shoppingWeb.dispatchEvent(new Event('input'))
      added = true
   }
})

function addToCart(id) {

   if(!localStorage.getItem('cart')) {
      const newCart = {}
      newCart[id] = 1
      localStorage.setItem('cart', JSON.stringify(newCart))
      return
   }

   const currentCart = JSON.parse(localStorage.getItem('cart'))

   if(currentCart[id]) {
      currentCart[id]++
   } else {
      currentCart[id] = 1
   }

   localStorage.setItem('cart', JSON.stringify(currentCart))
}

function removeFromCart(id) {

   if(!localStorage.getItem('cart')) return

   const currentCart = JSON.parse(localStorage.getItem('cart'))

   if(!currentCart[id]) return

   if(currentCart[id] <= 1) {
      delete currentCart[id]
      localStorage.setItem('cart', JSON.stringify(currentCart))
      return
   }

   currentCart[id]--
   localStorage.setItem('cart', JSON.stringify(currentCart))

}