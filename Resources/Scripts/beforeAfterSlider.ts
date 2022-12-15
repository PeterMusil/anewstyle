export function initBeforeAfterSlider() {
    const baSlider = document.querySelector('#baSlider') as HTMLDivElement
    const baSliderInput = document.querySelector('input[type=range]') as HTMLInputElement
    baSlider.style.setProperty('--ba-position', `${baSliderInput.value}%`);
    baSlider.style.setProperty('--ba-inline-size', `${baSlider.clientWidth}px`);

     baSliderInput.addEventListener('input', (e) => {
        let input = e.target as HTMLInputElement
        baSlider.style.setProperty('--ba-position', `${input.value}%`);
        baSlider.style.setProperty('--ba-inline-size', `${baSlider.clientWidth}px`);
    })
}   