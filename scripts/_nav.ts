export function initNav(){
    const menu = document.querySelector('.menu')
    const burger = document.querySelector('#menuBtn')
    const body = document.body
    const navItems = document.querySelectorAll('.menu > li > a')

    burger.addEventListener('click', ()=> {
        menu.classList.toggle('menu--open');
        body.classList.toggle('overflow-hidden');
    })

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('menu--open');
            body.classList.remove('overflow-hidden');
        })
    })
}