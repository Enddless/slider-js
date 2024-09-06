/*объявляем массив изображений*/
let images = [{
    url: "images/img1.png",
    title: "Заголовок слайда 1",
    description: "Описание 1.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    btnText: "Текст кнопки 1",
}, {
    url: "images/img2.png",
    title: "Заголовок слайда 2",
    description: "Описание2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    btnText: "Текст кнопки 2",
}, {
    url: "images/img3.png",
    title: "Заголовок слайда 3",
    description: "Описание3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    btnText: "Текст кнопки 3",
},
{
    url: "images/img4.png",
    title: "Заголовок слайда 4",
    description: "Описание4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    btnText: "Текст кнопки 4",
},
{
    url: "images/img5.png",
    title: "Заголовок слайда 5",
    description: "Описание5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    btnText: "Текст кнопки 5",
},
{
    url: "images/img6.png",
    title: "Заголовок слайда 6",
    description: "Описание6. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    btnText: "Текст кнопки 6",
},
{
    url: "images/img7.png",
    title: "Заголовок слайда 7",
    description: "Описание7. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    btnText: "Текст кнопки 7",
}

];

function Slider() {
    if (!images || !images.length) return;

    /*ищу блоки для заголовков, описаний, изображений, точек, стрелок-переключателей*/
    let sliderTitle = document.querySelector(".slider__blocktitle");
    let sliderDescription = document.querySelector(".slider__blockdescription");
    let sliderPhoto = document.querySelector(".slider__photo");
    let sliderDots = document.querySelector(".slider__dots");
    let sliderBtnText = document.querySelector(".slider__blockbutton");

    let sliderArrows = document.querySelector(".slider__chevron");



    initImages();
    initArrows();
    initAutoplay();

    /*инициализация галереи изображений*/
    function initImages() {
        /*для каждого изображения в массиве создаю 
        блок с изображением, блок с точкой
        с соответствующими классами активности для нулевых элементов массива*/
        images.map((image, index) => {
            /* заголовки */
            let title = `<h1 
                class="slider__title number${index} ${index === 0 && "active"}">${image.title}</h1>`;
            sliderTitle.innerHTML += title;
            /* описания */
            let description = ` <p 
                class="slider__description number${index} ${index === 0 && "active"}">${image.description}</p>`;
            sliderDescription.innerHTML += description;

            /* текст на кнопках */
            let text = ` <button 
                class="slider__button btn btn--primary number${index} ${index === 0 && "active"}">
                <a href="#">${image.btnText}</a>
                </button>`;
            sliderBtnText.innerHTML += text;

            /* изображения */
            let imageDiv = `
                <img src="${image.url}" alt="${image.title}"
                data-index="${index}" 
                class="slider__slide  number${index} ${index === 0 && "active"}">`;
            sliderPhoto.innerHTML += imageDiv;

            /* точки */
            let dot = `<div 
                data-index="${index}"
                class="slider__dot number${index} ${index === 0 && "active"}">
                </div>`;
            sliderDots.innerHTML += dot;
            sliderDots.querySelectorAll(".slider__dot").forEach(dot => {
                dot.addEventListener("click", function () {
                    moveSlider(this.dataset.index);
                    sliderDots.querySelector(".active").classList.remove("active");
                    this.classList.add("active");
                })
            })
        })

    }

    function initArrows() {
        let foundArrows = sliderArrows.querySelectorAll(".slider__arrow");
        foundArrows.forEach(arrow => {
            arrow.addEventListener("click", function () {
                let currentNumber = +sliderPhoto.querySelector(".active").dataset.index;
                let nextNumber;

                /*если это левая стрелка*/
                if (arrow.classList.contains("slider__arrow--left")) {
                    nextNumber = currentNumber === 0 ? images.length - 1 : currentNumber - 1;

                } else {
                    nextNumber = currentNumber === images.length - 1 ? 0 : currentNumber + 1;
                }
                moveSlider(nextNumber);
            })
        })


    }

    //меняем классы у слайдера, точек, подписей
    function moveSlider(num) {
        sliderTitle.querySelector(".active").classList.remove("active");
        sliderTitle.querySelector(".number" + num).classList.add("active");

        sliderDescription.querySelector(".active").classList.remove("active");
        sliderDescription.querySelector(".number" + num).classList.add("active");

        sliderPhoto.querySelector(".active").classList.remove("active");
        sliderPhoto.querySelector(".number" + num).classList.add("active");

        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".number" + num).classList.add("active");

        sliderBtnText.querySelector(".active").classList.remove("active");
        sliderBtnText.querySelector(".number" + num).classList.add("active");
    }

    function initAutoplay() {
        setInterval(() => {
            let curNumber = +sliderPhoto.querySelector(".active").dataset.index;
            let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
            moveSlider(nextNumber);
        }, 5000)
    }


}



/*функция перелистывания*/
if (/Mobile|Tablet/i.test(navigator.userAgent)) {
    // запуск скрипта только для мобильных устройств
    function swipe() {
        let sliderPhoto = document.querySelector(".slider__photo");
        let startX, endX;

        sliderPhoto.querySelectorAll(".slider__slide").forEach( slide => {
            slide.addEventListener("touchstart", function (event) {
                startX = event.touches[0].clientX;
            });
    
            slide.addEventListener("touchmove", function (event) {
                endX = event.touches[0].clientX;
            });
    
            slide.addEventListener("touchend", function () {
                if (startX - endX > 50) {
                    // перелистываем вправо
                } else if (endX - startX > 50) {
                    // перелистываем влево
                }
            });
        })

        
    }
}


document.addEventListener("DOMContentLoaded", Slider);
document.addEventListener("DOMContentLoaded", swipe);