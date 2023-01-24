const addPreload = (elem) => {
    elem.classList.add('preload')
}

const removePreload = (elem) => {
    elem.classList.remove('preload')
}

const startSlider = () => { 
    const sliderItems = document.querySelectorAll('.slider__item')
    let activeSlider = 1
    console.log('sliderItems', sliderItems, 'activeSlider ', activeSlider)
}


const initSlider = () => {
    const slider = document.querySelector('.slider')
    const sliderContainer = document.querySelector('.slider__container')
    
    sliderContainer.style.display = 'none'
    addPreload(slider)
    
    window.addEventListener('load', () => {
        sliderContainer.style.display = ''
        removePreload(slider)
        startSlider()
    })
}

window.addEventListener('DOMContentLoaded', initSlider)

// 30-30

console.log('30')