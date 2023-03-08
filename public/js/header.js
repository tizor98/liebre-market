const burger = document.querySelector('.header-burguer-menu')
const nav = document.querySelector('.header-mobile-nav')
const shoppingMobile = document.getElementById('shopping-mobile')
const shoppingWeb = document.getElementById('shopping-web')

const quantity = Object.values(JSON.parse(localStorage.getItem('cart')) || {}).reduce((sum, current) => sum + current, 0)
shoppingWeb.childNodes.item(0).setAttribute('value', quantity)
shoppingWeb.childNodes.item(0).setAttribute('value', quantity)

burger.addEventListener('click', () => {
   if(burger.classList.contains('deactivate')) {
      burger.classList.add('rotate-back')
      setTimeout( _ => {
         burger.classList.remove('rotate-back')
      }, 751)
   }
   nav.classList.toggle('deactivate')
   burger.classList.toggle('deactivate')
})

shoppingMobile.addEventListener('click', async e => {
   e.preventDefault()
   await sendCartInfo()
   window.location.href = '/users/cart'
})

shoppingWeb.addEventListener('click', async e => {
   e.preventDefault()
   await sendCartInfo()
   window.location.href = '/users/cart'
})

shoppingWeb.addEventListener('input', e => {
   const quantity = Object.values(JSON.parse(localStorage.getItem('cart')) || {}).reduce((sum, current) => sum + current, 0)
   shoppingWeb.childNodes.item(0).setAttribute('value', quantity)
   shoppingMobile.childNodes.item(0).setAttribute('value', quantity)
})

shoppingWeb.dispatchEvent(new Event('input'))

async function sendCartInfo() {
   await fetch('/api/users/cart', {
      method: 'post',
      headers: {
         "Content-Type": "application/json",
      },
      credentials: 'same-origin',
      body: localStorage.getItem('cart'),
   })
}