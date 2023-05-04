const showIngredientsLinks = document.getElementsByClassName('burger-link');
navIngredient.addEventListener('click', () => scrollIntoView('ingredients'));
navStory.addEventListener('click', () => scrollIntoView('story'));
navBurgers.addEventListener('click', () => scrollIntoView('burgers'));
navLocation.addEventListener('click', () => scrollIntoView('location'));
subNavIngredient.addEventListener('click', () => scrollIntoView('ingredients'));
subNavStory.addEventListener('click', () => scrollIntoView('story'));
subNavBurgers.addEventListener('click', () => scrollIntoView('burgers'));
subNavLocation.addEventListener('click', () => scrollIntoView('location'));
btnIngredient.addEventListener('click', () => scrollIntoView('ingredients'));

// плавная прокрутка
function scrollIntoView(el){
  const element = document.querySelector(`.${el}`);
  element.scrollIntoView({
    block: "start",
    behavior: "smooth",
  });
};

// Переключение Details/Reduce у карточки бургера
for(let i = 0; i<showIngredientsLinks.length; i++){
  showIngredientsLinks[i].addEventListener('click', ({target})=>{
    const parenetChildren = target.parentElement.parentElement.children;
    const { bIngridients, bIngredientLink } = parenetChildren;
    if (bIngridients.style.maxHeight == '' || 
        bIngridients.style.maxHeight == '0px'
    ) {
          bIngridients.style.maxHeight = `${bIngridients.children[0].clientHeight}px`;
          bIngredientLink.children[0].innerText = 'Reduce';
    } else {
          bIngridients.style.maxHeight = `0px`;
          bIngredientLink.children[0].innerText = 'Details';
    }
  });
}

// добавление класса приоткрытии меню
const toggleButton = document.querySelector('.toggle-menu');
const navBar = document.querySelector('.nav-bar');
const header = document.querySelector('header');
toggleButton.addEventListener('click', function () {
	navBar.classList.toggle('toggle');
	header.classList.toggle('toggle');
});

// слайдер ингридиентов
const ele = document.querySelector('.swiper-wrapper');
ele.addEventListener('mousedown', (e) => {
    mouseDownHandler(e)
})

let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseDownHandler = function (e) {
    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';
    pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        x: e.clientX,
        y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};
const mouseMoveHandler = function (e) {
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
};
const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');
};