import { Splide } from "@splidejs/splide";

export function initSplide(){
   if (window.innerWidth >= 1024){
    var splide = new Splide( '.splide', {
        type: 'loop',
        perPage: 1,
        autoplay: true,
        });
        
        splide.mount();
   }
   else {
    document.querySelector('.splide').remove()
   }
}