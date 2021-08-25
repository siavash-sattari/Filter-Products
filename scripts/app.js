import {products} from "./products.js";

const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products-content");
const btns = document.querySelectorAll(".btn");

let allProductsdata = [];

const filters = {
  searchItems: "",
  productType: "",
};

function getProductaData() {
  return products;
}

document.addEventListener("DOMContentLoaded", () => {
  allProductsdata = getProductaData();
  renderProducts(allProductsdata, filters);
});

function renderProducts(products, filters) {
  let filteredProducts = products.filter((p) => {
    return p.title.toLowerCase().includes(filters.searchItems.toLowerCase());
  });

  filteredProducts = filteredProducts.filter((p) => {
    return p.class.includes(filters.productType);
  });

  productsDOM.innerHTML = "";
  filteredProducts.forEach((item, index) => {
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("product");
    productsDiv.innerHTML = `
    <a href="#" class="p-${item.id}"><img src=${item.image} alt="p-${index + 1}" /></a>
    <div class="product-desc">
      <p class="product-title">${item.title}</p>
      <p class="product-price">$ ${item.price}</p>
    </div>`;
    productsDOM.appendChild(productsDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProductsdata, filters);
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    // console.log(filter);
    filters.productType = filter;
    renderProducts(allProductsdata, filters);
  });
});
