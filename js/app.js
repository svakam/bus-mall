'use strict';

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

  // push product into a product array to call from
  productStorage.push(this);

  // increment clicked vs. viewed products
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
}

// declaration of products
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

// random product generator
var randomProduct = function () {
  return Math.floor(Math.random() * productStorage.length);
};

// render 3 images in HTML
function productView() {
  var placeholder0 = document.getElementById('choice-0');
  var placeholder1 = document.getElementById('choice-1');
  var placeholder2 = document.getElementById('choice-2');
  placeholder0.src = displayArray[0].path;
  placeholder1.src = displayArray[1].path;
  placeholder2.src = displayArray[2].path;
  displayArray[0].productViews();
  displayArray[1].productViews();
  displayArray[2].productViews();
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