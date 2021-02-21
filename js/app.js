'use strict';

console.log('Hello World');

//Global Variables
let totalClicks = 0;
let clicksAllowed = 25;
let imageCount = 6;
let allProducts = [];


let pieChart = document.getElementById('pieChart').getContext('2d');
let ctx = document.getElementById('barChart').getContext('2d');
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let imageOneElement = document.querySelector('section img:first-child');
let imageTwoElement = document.querySelector('section img:nth-child(2)');
let imageThreeElement = document.querySelector('section img:nth-child(3)');
// let imageFourElement = document.querySelector('section img:nth-child(4)');
// let imageFiveElement = document.querySelector('section img:nth-child(5)');
// let imageSixElement = document.querySelector('section img:nth-child(6)');


function Products(name, fileExt = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExt}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

let retrieveProducts = localStorage.getItem('products');

if (retrieveProducts) {
  let parsedProducts = JSON.parse(retrieveProducts);
  allProducts = parsedProducts;
} else {
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
}

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}
let productsToDisplay = [];

// function imgAssignment(imageElement, imageIndex)
// imageElement.src = allProducts[imageIndex].src;
// imageElement.title = allProducts[imageIndex].name;
// allProducts[imageIndexx].views++;

function renderProducts() {
  while (productsToDisplay.length < imageCount) {
    let indexArray = getRandomIndex();
    while (!productsToDisplay.includes(indexArray)) {
      // indexArray = getRandomIndex(allProducts.length);
      productsToDisplay.unshift(indexArray);
    }
  }

  // console.log(productsToDisplay);

  let ProductsOneIndex = productsToDisplay.pop();
  let ProductsTwoIndex = productsToDisplay.pop();
  let ProductsThreeIndex = productsToDisplay.pop();
  // let ProductsFourIndex = productsToDisplay.pop();
  // let ProductsFiveIndex = productsToDisplay.pop();
  // let ProductsSixIndex = productsToDisplay.pop();


  // console.log(ProductsOneElement);


  // imgAssignment(ProductsOneElement, imageOneElement);
  // imgAssignment(ProductsTwoElement, imageTwoElement);
  // imgAssignment(ProductsThreeElement, imageThreeElement);


  imageOneElement.src = allProducts[ProductsOneIndex].src;
  imageOneElement.title = allProducts[ProductsOneIndex].name;
  allProducts[ProductsOneIndex].views++;

  imageTwoElement.src = allProducts[ProductsTwoIndex].src;
  imageTwoElement.title = allProducts[ProductsTwoIndex].name;
  allProducts[ProductsTwoIndex].views++;

  imageThreeElement.src = allProducts[ProductsThreeIndex].src;
  imageThreeElement.title = allProducts[ProductsThreeIndex].name;
  allProducts[ProductsThreeIndex].views++;

  //   imageFourElement.src = allProducts[ProductsFourIndex].src;
  //   imageFourElement.title = allProducts[ProductsFourIndex].name;
  //   allProducts[ProductsFourIndex].views++;

  //   imageFiveElement.src = allProducts[ProductsFiveIndex].src;
  //   imageFiveElement.title = allProducts[ProductsFiveIndex].name;
  //   allProducts[ProductsFiveIndex].views++;

  //   imageSixElement.src = allProducts[ProductsSixIndex].src;
  //   imageSixElement.title = allProducts[ProductsSixIndex].name;
  //   allProducts[ProductsSixIndex].views++;

}

// function renderResults() {
//   let myList = document.querySelector('ul');
//   for (let i = 0; i < allProducts.length; i++) {
//     let li = document.createElement('li');
//     li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes, and was seen ${allProducts[i].views} times.`;
//     myList.appendChild(li);
//   }
// }

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
    let stringifiedProducts = JSON.stringify(allProducts);
    localStorage.setItem('products', stringifiedProducts);
    renderChart();
  }
}



function handleButtonClick(event) {
  if (totalClicks === clicksAllowed) {
    renderPieChart();

  }
}

renderProducts();

function renderChart() {
  let productNames = [];
  let productViews = [];
  let productClicks = [];
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes',
        data: productClicks,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 3
      },
      {
        label: 'Views',
        data: productViews,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function renderPieChart() {
  let productNames = [];
  let productViews = [];
  let productClicks = [];
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }

  var myPieChart = new Chart(pieChart, {
    type: 'pie',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Pie Chart Results',
        backgroundColor: ['cadetblue', 'black', 'grey', 'rgba(54, 162, 235, 0.2)', '#c45850', 'green', '#8e5ea2', '#3cba9f', 'rgba(75, 192, 192, 1)', 'bisque', '#3e95cd', 'rgba(54, 162, 235, 1)', 'navyblue', '#e8c3b9', 'rgba(75, 192, 192, 0.2)', '#3e95cd', 'black', '#3cba9f', '#e8c3b9', '#c45850'],
        data: productClicks
      }]
    },
    options: {
      title: {
        display: true,
        text: 'See results in a pie chart!'
      }
    }
  });
}

myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick);