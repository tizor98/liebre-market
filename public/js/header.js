const burger = document.querySelector('.header-burguer-menu')
const nav = document.querySelector('.header-mobile-nav')
const shoppingMobile = document.getElementById('shopping-mobile')
const shoppingWeb = document.getElementById('shopping-web')

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