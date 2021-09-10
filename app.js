'use strict';

let userData = [];
let myForm = document.getElementById("myForm");
let table = document.getElementById("table");
myForm.addEventListener('submit', submitOrder);
let thId = document.getElementById('elements');

function rentCar(cName, cModel,price) {
    this.cName = cName;
    this.cModel = cModel;
    this.price = price;
    this.logoImg = `img/${cModel}.png`;
    userData.push(this);
    
}


rentCar.prototype.randPrice = function () {
    let min = Math.ceil(1000);
    let max = Math.floor(10000);
    this.price = Math.floor(Math.random() * (max - min + 1) + min);
}


function submitOrder(event) {
    event.preventDefault();

    let cName = event.target.fname.value;
    let cModel = event.target.cars.value;

    let newOrder = new rentCar(cName, cModel);
    
    newOrder.randPrice();
    newOrder.render();
    saveToLocalStorage();
    myForm.removeEventListener('submit', submitOrder);
}

rentCar.prototype.render = function () {
    let trEl = document.createElement('tr');
    table.appendChild(trEl);

    let tdEl = document.createElement('td');
    let imgEl = document.createElement('img');
    imgEl.setAttribute('src', this.logoImg);
   
    tdEl.appendChild(imgEl);
    trEl.appendChild(tdEl);

    let desElm = document.createElement('td');
    desElm.innerHTML = `Customer Name: ${this.cName} <br> Car Model:  ${this.cModel} <br> Price: ${this.price}`;
    trEl.appendChild(desElm);

}


function saveToLocalStorage() {
    let stringObj = JSON.stringify(userData);
    localStorage.setItem('key', stringObj);
}

function readFromLocalStorage() {
    let data = localStorage.getItem('key');
    let normalObj = JSON.parse(data);
    
    if (normalObj) {
        for (let i = 0; i < normalObj.length; i++) {
            new rentCar(normalObj[i].cName, normalObj[i].cModel, normalObj[i].price);
            userData[i].render();
        }
       
    }
}

readFromLocalStorage();