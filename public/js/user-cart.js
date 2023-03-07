const data = JSON.parse(localStorage.getItem('cart'))

const totalProducts = document.getElementById('cart-total-products')
const totalBefore = document.getElementById('cart-total-before')
const totalDiscount = document.getElementById('cart-total-discount')
const totalAfter = document.getElementById('cart-total-after')

const products = {}
const buttonsMinus = {}
const buttonsPlus = {}
const quantities = {}
const prices = {}
const discounts = {}
const productTotal = {}

const quantitiesOverall = {}
const linesOverall = {}
const pricesOverall = {}

const formatter = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD'
})

Object.keys(data).forEach(id => {
   products[id] = document.getElementById(id)
   buttonsMinus[id] = document.getElementById(`${id}-button-minus`)
   buttonsPlus[id] = document.getElementById(`${id}-button-plus`)
   quantities[id] = document.getElementById(`${id}-quantity`)
   prices[id] = document.getElementById(`${id}-price`)
   discounts[id] = document.getElementById(`${id}-discount`)
   productTotal[id] = document.getElementById(`${id}-total`)

   quantitiesOverall[id] = document.getElementById(`${id}-quantity-overall`)
   linesOverall[id] = document.getElementById(`${id}-line-overall`)
   pricesOverall[id] = document.getElementById(`${id}-price-overall`)

   buttonsMinus[id].addEventListener('click', e => {
      removeOneFromCart(id)
   })
   buttonsPlus[id].addEventListener('click', e => {
      addOneToCart(id)
   })
})

function removeOneFromCart(id) {

   if(!localStorage.getItem('cart')) return

   const currentCart = JSON.parse(localStorage.getItem('cart'))

   if(!currentCart[id]) {
      products[id].remove()
      linesOverall[id].remove()
      shoppingWeb.dispatchEvent(new Event('input'))
      return
   }

   if(currentCart[id] <= 1) {
      totalProducts.innerText = String(parseInt(totalProducts.innerText) - 1)
      currentCart[id]--
      updateCartInfo(id, currentCart);
      delete currentCart[id]
      products[id].remove()
      linesOverall[id].remove()
      localStorage.setItem('cart', JSON.stringify(currentCart))
      shoppingWeb.dispatchEvent(new Event('input'))
      return
   }

   currentCart[id]--
   totalProducts.innerText = String(parseInt(totalProducts.innerText) - 1)
   updateCartInfo(id, currentCart);

   localStorage.setItem('cart', JSON.stringify(currentCart))
   shoppingWeb.dispatchEvent(new Event('input'))

}

function addOneToCart(id) {

   if(!localStorage.getItem('cart')) return

   const currentCart = JSON.parse(localStorage.getItem('cart'))

   if(!currentCart[id]) return;

   currentCart[id]++
   totalProducts.innerText = String(parseInt(totalProducts.innerText) + 1)
   updateCartInfo(id, currentCart)

   localStorage.setItem('cart', JSON.stringify(currentCart))
   shoppingWeb.dispatchEvent(new Event('input'))

}

function updateCartInfo(id, currentCart) {
   quantities[id].innerText = currentCart[id]
   quantitiesOverall[id].innerText = currentCart[id]
   productTotal[id].innerText = formatter.format((currentCart[id] * parseInt(prices[id].innerText)))
   pricesOverall[id].innerText = formatter.format((currentCart[id] * parseInt(prices[id].innerText)))
   totalBefore.innerText = formatter.format(Object.keys(currentCart).reduce((acum, cv) => acum + (currentCart[cv] * parseInt(prices[cv].innerText)), 0))
   totalDiscount.innerText = formatter.format(Object.keys(currentCart).reduce((acum, cv) => acum + (currentCart[cv] * parseInt(prices[cv].innerText) * (parseInt(discounts[cv].innerText) / 100)), 0))
   totalAfter.innerText = formatter.format(Object.keys(currentCart).reduce((acum, cv) => acum + (currentCart[cv] * parseInt(prices[cv].innerText) * (1 - (parseInt(discounts[cv].innerText) / 100))), 0))
}