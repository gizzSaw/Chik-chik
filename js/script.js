const API_URL = 'https://round-reflective-uncle.glitch.me/api'

/*
Доступные методы:
GET /api - получить список услуг
GET /api?service={n} - получить список барберов
GET /api?spec={n} - получить список месяца работы барбера
GET /api?spec={n}&month={n} - получить список дней работы барбера
GET /api?spec={n}&month={n}&day={n} - получить список свободных часов барбера
POST /api/order - оформить заказ
*/

const addPreload = (elem) => {
    elem.classList.add('preload')
}

const removePreload = (elem) => {
    elem.classList.remove('preload')
}

const startSlider = () => { 
    const sliderItems = document.querySelectorAll('.slider__item')
    const sliderList = document.querySelector('.slider__list')
    const btnPrevSlide = document.querySelector('.slider__arrow_left')
    const btnNextSlide = document.querySelector('.slider__arrow_right')
    
    let activeSlide = 1
    let position = 0

    const checkSlider = () => {
        if ((activeSlide + 2 === sliderItems.length && 
            document.documentElement.offsetWidth > 560) ||
            activeSlide === sliderItems.length) {
            btnNextSlide.style.display = 'none'
        } else {
            btnNextSlide.style.display = ''
        }

        if (activeSlide === 1) {
            btnPrevSlide.style.display = 'none'
        } else {
            btnPrevSlide.style.display = ''
        }
    }

    checkSlider()

    const nextSlide = () => {
        sliderItems[activeSlide]?.classList.remove('slider__item_active')
        position = -sliderItems[0].clientWidth * activeSlide
        sliderList.style.transform = `translateX(${position}px)`
        activeSlide += 1
        sliderItems[activeSlide]?.classList.add('slider__item_active')
        checkSlider()
    }

    const prevSlide = () => {
        sliderItems[activeSlide]?.classList.remove('slider__item_active')
        position = -sliderItems[0].clientWidth * (activeSlide - 2)
        sliderList.style.transform = `translateX(${position}px)`
        activeSlide -= 1
        sliderItems[activeSlide]?.classList.add('slider__item_active')
        checkSlider()
    }

    btnPrevSlide.addEventListener('click', prevSlide)
    btnNextSlide.addEventListener('click', nextSlide)

    window.addEventListener('resize', () => {
        if (activeSlide + 2 > sliderItems.length &&
            document.documentElement.offsetWidth > 560) {
            activeSlide = sliderItems.length - 2
            sliderItems[activeSlide]?.classList.add('slider__item_active')
        }

        position = -sliderItems[0].clientWidth * (activeSlide - 1)
        sliderList.style.transform = `translateX(${position}px)`
        checkSlider()
    })
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

const renderPrice = (wrapper, data) => {
    data.forEach(item => {
        const priceItem = document.createElement('li')
        priceItem.classList.add('price__item')

        priceItem.innerHTML = `
            <span>${item.name}</span>
            <span class="price__item-count">${item.price}</span>
        `
        wrapper.append(priceItem)
    })

    

    /* 
    <li class="price__item">
        <span>Стрижка ножницами</span>
        <span class="price__item-count">2500 руб</span>
    </li>
    */
}

const renderService = (wrapper, data) => {
    
}

const initService = () => {
    const priceList = document.querySelector('.price__list')
    const reserveFieldsetService = document.querySelector('.reserve__fieldset_service')
    priceList.textContent = ''
    addPreload(priceList)

    reserveFieldsetService.innerHTML = `<legend class="reserve__legend">Услуга</legend>`
    addPreload(reserveFieldsetService)

    fetch(API_URL)
        .then(response =>  response.json())
        .then(data => {
            renderPrice(priceList, data)
            removePreload(priceList)
            return data
        })
        .then(data => {
            renderService(reserveFieldsetService, data)
            removePreload(reserveFieldsetService)
        })
    
    
}

const init = () => {
    initSlider()
    initService()
}

window.addEventListener('DOMContentLoaded', init)
