'use strict';

// Week 3 Day 1: 
/* 
- constructor function for objects (name, path) :)
- algorithm to random generate 3 unique products from img directory :)
- upon click, generate three new products to pick from
in constructor, define property to hold number of times product been clicked and update when clicked :)
- control 25 rounds of clicking, stop clicking ability after 25 :)
- view report of results of each image's clicks + views :) 
*/

// global array for inserted products to choose from
var displayArray = [];

var productsConsidered = [];


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
  }
  this.productViews = function () {
    this.viewed++;
  }

  // keep track of considered products in an array
  this.addToConsidered = function () {
    productsConsidered.push(this);
  }
}


// empty array for storing products
var productStorage = [];

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

// obtain 3 products and render them to HTML
function get3RandomProductsAndRender() {

  // set/reset temp array to empty
  displayArray = [];

  // push 3 products at random into temporary array 3 times
  while (displayArray.length < 3) {

    // index of product array, returns random 0-19
    var storageIndex = Math.floor(Math.random() * productStorage.length);

    // make sure array to display images from doesn't contain newly inserted object 
    if (!displayArray.includes(productStorage[storageIndex])) {
      displayArray.push(productStorage[storageIndex]);
    }
  }

  // display temporary array's object's 3 image paths in HTML
  var placeholder0 = document.getElementById('choice-0');
  var placeholder1 = document.getElementById('choice-1');
  var placeholder2 = document.getElementById('choice-2');

  function productViewCount() {
    placeholder0.src = displayArray[0].path;
    displayArray[0].productViews();
    placeholder1.src = displayArray[1].path;
    displayArray[1].productViews();
    placeholder2.src = displayArray[2].path;
    displayArray[2].productViews();
  }
  productViewCount();
}

get3RandomProductsAndRender();

// render totals as unordered
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


// global counter for max number of choices
var totalClicks = 0;
const MAX_CLICKS = 25;

// upon clicking an image, increment clicks and add to considered list only for the clicked product, then reset with 3 new products
function clickManager(event) {
  totalClicks++;
  if (totalClicks < MAX_CLICKS) {
    var displayArrayIndex;

    if (event.target.id === 'choice-0') {
      displayArrayIndex = 0;
    }
    else if (event.target.id === 'choice-1') {
      displayArrayIndex = 1;
    }
    else if (event.target.id === 'choice-2') {
      displayArrayIndex = 2;
    }

    var product = displayArray[displayArrayIndex];
    console.log(product);

    if (product.clicked === 0) {
      product.addToConsidered();
      console.log(productsConsidered);
    }
    console.log(productStorage);

    product.productClicks();
    console.log(product.clicked);

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

var placeholder0 = document.getElementById('choice-0');
var placeholder1 = document.getElementById('choice-1');
var placeholder2 = document.getElementById('choice-2');

placeholder0.addEventListener('click', clickManager);
placeholder1.addEventListener('click', clickManager);
placeholder2.addEventListener('click', clickManager);