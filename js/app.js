'use strict';

console.log('Hello World');

//Global Variables
let totalClicks = 0;
let clicksAllowed = 5;
let allProducts = [];
let ProductsToDisplay = [];


let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let imageOneElement = document.querySelector('section img:first-child');
let imageTwoElement = document.querySelector('section img:nth-child(2)');
let imageThreeElement = document.querySelector('section img:nth-child(3)');

function Products(name, fileExt = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExt}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

new Products('sweep', 'png');
new Products('bag');
new Products('banana');
new Products('bathroom');
new Products('boots');
new Products('breakfast');
new Products('bubblegum');
new Products('chair');
new Products('cthulhu');
new Products('dog-duck');
new Products('dragon');
new Products('pen');
new Products('pet-sweep');
new Products('scissors');
new Products('shark');
new Products('tauntaun');
new Products('unicorn');
new Products('usb', 'gif');
new Products('water-can');
new Products('wine-glass');

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {

  while (ProductsToDisplay.length < 3) {
    let indexArray = getRandomIndex(allProducts.length);
    while (ProductsToDisplay.includes(indexArray)) {
      indexArray = getRandomIndex(allProducts.length);
    }
    ProductsToDisplay.push(indexArray);
  }

  // console.log(ProductsToDisplay);

  let ProductsOneIndex = ProductsToDisplay.shift();
  let ProductsTwoIndex = ProductsToDisplay.shift();
  let ProductsThreeIndex = ProductsToDisplay.shift();

  // console.log(ProductsOneElement);

  imageOneElement.src = allProducts[ProductsOneIndex].src;
  imageOneElement.title = allProducts[ProductsOneIndex].name;
  allProducts[ProductsOneIndex].views++;

  imageTwoElement.src = allProducts[ProductsTwoIndex].src;
  imageTwoElement.title = allProducts[ProductsTwoIndex].name;
  allProducts[ProductsTwoIndex].views++;

  imageThreeElement.src = allProducts[ProductsThreeIndex].src;
  imageThreeElement.title = allProducts[ProductsThreeIndex].name;
  allProducts[ProductsThreeIndex].views++;
}

function renderResults() {
  let myList = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes, and was seen ${allProducts[i].views} times.`;
    myList.appendChild(li);
  }
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  totalClicks++;
  let ProductsClicked = event.target.title;

  for (let i = 0; i < allProducts.length; i++) {
    if (ProductsClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }
  renderProducts();
  if (totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    // renderResults();
  }
}

function handleButtonClick(event) {
  if (totalClicks === clicksAllowed) {
    renderResults();
  }
}

renderProducts();

myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick);

