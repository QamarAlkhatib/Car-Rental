
let myForm = document.getElementById("myForm");
let table = document.getElementById("table");

let userData = [];

function rentCar(cName, cModel) {
    this.cName = cName;
    this.cModel = cModel;
    let cPrice = 0;
    userData.push(this);
    this.price = [];

    this.orderImg = [];
    console.log(this.price);
    saveToLocalStorage();
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
  
rentCar.prototype.randPrice = function () {
    for(let i = 0; i< userData.price; i++){
        this.price.push(Math.floor(this.cPrice[i])); 
    }
}


let imgEl = document.getElementById('img');
let detEl = document.getElementById('det');

rentCar.prototype.render = function () {
    for (let i = 0; i < userData.length; i++) {
        let tdEl = document.createElement('td');
        tdEl.textContent = `${this.orderImg[i]}`;
        imgEl.appendChild(tdEl);

        let tdEl2 = document.createElement('td');
        tdEl2.textContent = ` Customer name: ${this.CustomerName[i]} Car Model ${this.carModel[i]} Price: ${this.price[i]}`;

    }

    readFromLocalStorage();


}


myForm.addEventListener('submit', submitOrder);

function submitOrder(event) {
    event.preventDefault();

    let cName = event.target.cNames.value;
    let cModel = event.target.cModels.value;

    let newOrder = new rentCar(cName, cModel);
    newOrder.render();
    


}



function saveToLocalStorage() {
    let stringObj = JSON.stringify(userData);
    localStorage.setItem('key', stringObj);
}

function readFromLocalStorage() {
    let normalObj = localStorage.getItem('key');
    let obj = JSON.parse(normalObj);

    if (normalObj) {
        for (let i = 0; i < normalObj.length; i++) {
            new rentCar(normalObj[i].cName, normalObj[i].carModel);
            userData[i].render();
        }

    }
}