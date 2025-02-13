let container = document.getElementById("container");
let btncontain = document.getElementById("btncontain");
async function getData(){
    try {
        let response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error(`HTTP Request : ${response.statusText}`);
        }
        let result = await response.json();
        localStorage.setItem("products", JSON.stringify(result));
        createButton();
        displayData();
    } catch (err) {
        console.error(err);
    }
}
function createButton() {
    btncontain.innerHTML = ``;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.length !== 0) {
        let result = Array.from(new Set(products.map(obj => obj.category)));
        result.forEach(ele => {
            let button = document.createElement("button");
            button.className = "buttons";
            button.textContent = ele;
            button.addEventListener("click", () => {
                filterData(ele);
            })
            btncontain.appendChild(button);
        })
    }
}
function filterData(category) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.length !== 0) {
        let result = products.filter(obj => obj.category === category);
        displayData(result);
    }
}
function displayData(filterProducts) {
    container.innerHTML = ``;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (filterProducts !== undefined) {
        products = filterProducts;
    }
    if (products.length === 0) {
        container.innerHTML = "No data Available";
    } else {
        products.forEach(arr => {
            let item = document.createElement("div");
            item.innerHTML = `
                <p>${arr.id}</p>
                <p class="type">${arr.category}</p>
                <img src="${arr.image}"></img>
                <p class="title">${arr.title}</p>
                <p class="price">$${arr.price}</p>
                <p class="rating">Rating ${arr.rating.rate}</p>
                <button> BUY NOW </button>
            `;
            container.appendChild(item);
        })
    }
}


window.onload = getData;
