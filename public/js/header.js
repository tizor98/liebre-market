const burger = document.querySelector('.header-burguer-menu')
const nav = document.querySelector('.header-mobile-nav')

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