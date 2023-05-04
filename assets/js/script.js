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

// окно заказа
const order = document.createElement('div');
order.classList.add('order-container');
order.innerHTML = `
<div class="order-container">
    <form action="" method="POST" id="orederForm">
        <h3>Choose burger</h3>
        <ul>
            <li>
                <img src="./assets/img/Design.png" alt="1/4 Pound Cheese">
                <label>1/4 Pound Cheese</label>
                <input type="checkbox" name="cheese" id="cheese">
            </li>
            <li>
                <img src="./assets/img/Design.png" alt="Big Burger">
                <label>Big Burger</label>
                <input type="checkbox" name="big" id="big">
            </li>
            <li>
                <img src="./assets/img/Design.png" alt="Pure Bacon">
                <label>Pure Bacon</label>
                <input type="checkbox" name="bacon" id="bacon">
            </li>
        </ul>
        <input type="submit" id="formBtn" value="Close">
    </form>
</div>`
order.style.display = 'none';
document.body.appendChild(order);
formBtn.addEventListener('click', (e)=>pushOrder(e));
orederForm.addEventListener('change', ()=>{
    const {cheese, big, bacon} = orederForm;
    if( cheese.checked || big.checked || bacon.checked  ) {
        formBtn.value = 'Order'
    }
    else {
        formBtn.value = 'Close'
    }
});
const orederBtns = document.getElementsByClassName('order-button');
console.log(orederBtns);
for( let i=0; i < orederBtns.length; i++ ){
    orederBtns[i].addEventListener('click', ()=>showOrderWindow())
}
function showOrderWindow(){
    order.style.display === 'block'
        ? order.style.display = 'none'
        : order.style.display = 'block'
    ;
}

function pushOrder(e){
    e.preventDefault()
    const {cheese, big, bacon} = orederForm;
    const orederText = 
    `Order: ${cheese.checked ? '1/4 Pound Cheese ' : ''} ${big.checked ? 'Big Burger ' : ''}${bacon.checked ? 'Pure Bacon ' : ''}
    `
    if( cheese.checked || big.checked || bacon.checked  ) {
        cheese.checked = false;
        big.checked = false;
        bacon.checked = false;
        formBtn.value = 'Close'
        console.log(orederText.length > 8 ? orederText : '');
    }
    order.style.display = 'none';
}