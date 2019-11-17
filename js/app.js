'use strict';

var PRODUCT_DATA = 'productData';
var productsConsidered = [];
var productStorage = [];
var totalClicks = 0;
const MAX_CLICKS = 25;
var displayArray = [];
var storageIndex;
const MAX_DISPLAY_LENGTH = 3;

// constructor for products
function Product(name, path) {
  this.name = name;
  this.path = path;
  this.clicked = 0;
  this.viewed = 0;

  // increment clicked vs. viewed products
  // local storage
  this.productClicks = function () {
    this.clicked++;
  };
  this.productViews = function () {
    this.viewed++;
  };

  // keep track of considered products in an array
  this.addToConsidered = function () {
    productsConsidered.push(this);
  };

  // load data from local storage
  this.loadData = function (data) {
    this.clicked = data.clicked;
    this.viewed = data.viewed;
  };
}

// if no local storage, create new products
if (localStorage.getItem(PRODUCT_DATA) === null) {

  var Bag = new Product('Bag', './img/bag.jpg');
  var Banana = new Product('Banana', './img/banana.jpg');
  var Bathroom = new Product('Bathroom', './img/bathroom.jpg');
  var Boots = new Product('Boots', './img/boots.jpg');
  var Breakfast = new Product('Breakfast', './img/breakfast.jpg');
  var Bubblegum = new Product('Bubblegum', './img/bubblegum.jpg');
  var Chair = new Product('Chair', './img/chair.jpg');
  var Cthulhu = new Product('Cthulhu', './img/cthulhu.jpg');
  var DogDuck = new Product('Dog Duck', './img/dog-duck.jpg');
  var Dragon = new Product('Dragon', './img/dragon.jpg');
  var Pen = new Product('Pen', './img/pen.jpg');
  var PetSweep = new Product('Pet Sweep', './img/pet-sweep.jpg');
  var Scissors = new Product('Scissors', './img/scissors.jpg');
  var Shark = new Product('Shark', './img/shark.jpg');
  var Sweep = new Product('Sweep', './img/sweep.png');
  var Tauntaun = new Product('Tauntaun', './img/tauntaun.jpg');
  var Unicorn = new Product('Unicorn', './img/unicorn.jpg');
  var Usb = new Product('Usb', './img/usb.gif');
  var WaterCan = new Product('Water Can', './img/water-can.jpg');
  var WineGlass = new Product('Wine Glass', './img/wine-glass.jpg');
  productStorage.push(Bag);
  productStorage.push(Banana);
  productStorage.push(Bathroom);
  productStorage.push(Boots);
  productStorage.push(Breakfast);
  productStorage.push(Bubblegum);
  productStorage.push(Chair);
  productStorage.push(Cthulhu);
  productStorage.push(DogDuck);
  productStorage.push(Dragon);
  productStorage.push(Pen);
  productStorage.push(PetSweep);
  productStorage.push(Scissors);
  productStorage.push(Shark);
  productStorage.push(Sweep);
  productStorage.push(Tauntaun);
  productStorage.push(Unicorn);
  productStorage.push(Usb);
  productStorage.push(WaterCan);
  productStorage.push(WineGlass);
}

else { // else load past data
  var jsonData = localStorage.getItem(PRODUCT_DATA);
  var data = JSON.parse(jsonData);

  for (var i = 0; i < data.length; i++) {
    var newProduct = new Product('', '');
    newProduct.loadData(data[i]);
    productStorage.push(newProduct); // fix
  }
}

// random product generator
var randomProduct = function () {
  return Math.floor(Math.random() * productStorage.length);
};

function updateViews() {
  displayArray[0].productViews();
  displayArray[1].productViews();
  displayArray[2].productViews();
}

// render 3 images in HTML
function productView() {
  var placeholder0 = document.getElementById('choice-0');
  var placeholder1 = document.getElementById('choice-1');
  var placeholder2 = document.getElementById('choice-2');
  placeholder0.src = displayArray[0].path;
  placeholder1.src = displayArray[1].path;
  placeholder2.src = displayArray[2].path;

  updateViews();
}

// obtain 3 products and render them to HTML
function get3RandomProductsAndRender() {

  // if display array full
  if (displayArray.length !== 0) {

    // copy display array into comparison array
    var comparisonArray = [];

    for (var displayIndex = 0; displayIndex < MAX_DISPLAY_LENGTH; displayIndex++) {
      comparisonArray.push(displayArray[displayIndex]);
    }

    // clear current display array
    displayArray = [];

    // while display array length less than 3
    while (displayArray.length < MAX_DISPLAY_LENGTH) {

      // new index for random product
      storageIndex = randomProduct();

      // iterate over comparison array
      for (var compareIndex = 0; compareIndex < MAX_DISPLAY_LENGTH; compareIndex++) {

        // generate random product until unique product found
        while (productStorage[storageIndex] === comparisonArray[compareIndex]) {
          storageIndex = randomProduct();
        }
      }

      // make sure array to display images from doesn't contain newly inserted object
      if (!displayArray.includes(productStorage[storageIndex])) {
        displayArray.push(productStorage[storageIndex]);
      }
    }
  }

  else { // if array not full (first time starting page), start fresh

    // push 3 products at random into temporary array 3 times
    while (displayArray.length < MAX_DISPLAY_LENGTH) {

      storageIndex = randomProduct();

      if (!displayArray.includes(productStorage[storageIndex])) {
        displayArray.push(productStorage[storageIndex]);
      }
    }
  }

  productView();
}

// render totals as an unordered list
function renderTotals(domReferenceResults, productsConsidered) {
  var headerList = document.createElement('h3');
  headerList.textContent = 'Results';
  domReferenceResults.append(headerList);

  var ul = document.createElement('ul');

  for (var storageIndex = 0; storageIndex < productsConsidered.length; storageIndex++) {
    var li = document.createElement('li');

    li.textContent = `${productsConsidered[storageIndex].name} had ${productsConsidered[storageIndex].clicked} votes and was shown ${productsConsidered[storageIndex].viewed} times.`;

    ul.append(li);
  }

  domReferenceResults.append(ul);
}

function createChart() {
  // input data into chart variables
  var productChartArray = [];
  var votesChartArray = [];
  var viewsChartArray = [];

  for (var i = 0; i < productsConsidered.length; i++) {
    productChartArray.push(productsConsidered[i].name);
    votesChartArray.push(productsConsidered[i].clicked);
    viewsChartArray.push(productsConsidered[i].viewed);
  }

  var context = document.getElementById('myChart').getContext('2d');
  var productChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: productChartArray,
      datasets: [
        {
          label: 'Product Clicks',
          data: votesChartArray,
          backgroundColor: 'rgb(255,35,42)',
          borderColor: 'rgb(255,35,42)',
        },
        {
          label: 'Product Views',
          data: viewsChartArray,
          backgroundColor: 'rgb(0,40,255)',
          borderColor: 'rgb(0,40,255)',
        }
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            }
          },
        ],
      }
    },
  });
}

// upon clicking an image, increment clicks and add to considered list only for the clicked product, then reset with 3 new products
function clickManager(event) {
  totalClicks++;

  if (totalClicks < MAX_CLICKS) { // check for 25 max choices
    var displayIndex;

    if (event.target.id === 'choice-0') {
      displayIndex = 0;
    }
    else if (event.target.id === 'choice-1') {
      displayIndex = 1;
    }
    else if (event.target.id === 'choice-2') {
      displayIndex = 2;
    }

    var product = displayArray[displayIndex];

    if (product.clicked === 0) {
      product.addToConsidered();
    }

    product.productClicks();
  }

  else {
    // stop clicking ability
    placeholder0.removeEventListener('click', clickManager);
    placeholder1.removeEventListener('click', clickManager);
    placeholder2.removeEventListener('click', clickManager);

    // make chart
    createChart();

    function saveProductDataToLocalStorage() {
      var jsonData = JSON.stringify(productStorage);
      localStorage.setItem(PRODUCT_DATA, jsonData);
    }

    // save to local storage
    saveProductDataToLocalStorage();

    // show total product clicks vs. views
    var domReferenceResults = document.getElementById('results');
    renderTotals(domReferenceResults, productsConsidered);
  }

  get3RandomProductsAndRender();
}

get3RandomProductsAndRender();

var placeholder0 = document.getElementById('choice-0');
var placeholder1 = document.getElementById('choice-1');
var placeholder2 = document.getElementById('choice-2');

placeholder0.addEventListener('click', clickManager);
placeholder1.addEventListener('click', clickManager);
placeholder2.addEventListener('click', clickManager);
