// JS for listings index page: filter slider, tax toggle, and category filter

document.addEventListener("DOMContentLoaded", function () {
  // Filter slider arrows
  const filterSlider = document.getElementById("filterSlider");
  const leftArrow = document.getElementById("leftArrow");
  const rightArrow = document.getElementById("rightArrow");
  const scrollAmount = 120;

  function updateArrows() {
    leftArrow.disabled = filterSlider.scrollLeft <= 0;
    rightArrow.disabled =
      filterSlider.scrollLeft + filterSlider.offsetWidth >=
      filterSlider.scrollWidth - 2;
  }

  rightArrow.addEventListener("click", () => {
    filterSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
  leftArrow.addEventListener("click", () => {
    filterSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
  filterSlider.addEventListener("scroll", updateArrows);
  window.addEventListener("resize", updateArrows);
  updateArrows();

  // Taxes toggle logic: show tax in each listing
  const taxSwitch = document.getElementById("switchCheckDefault");
  const priceElements = document.querySelectorAll(".price");
  const taxAmountElements = document.querySelectorAll(".tax-amount");
  const TAX_RATE = 0.13;

  function showTaxInListings() {
    priceElements.forEach((el, idx) => {
      const price = parseFloat(el.getAttribute("data-price"));
      const taxEl = taxAmountElements[idx];
      if (taxSwitch.checked) {
        const total = price + price * TAX_RATE;
        taxEl.innerHTML = `<br>Total after tax: <b>&#8377; ${total.toLocaleString(
          "en-NP",
          { maximumFractionDigits: 2 }
        )}</b> / night`;
        taxEl.style.display = "inline";
      } else {
        taxEl.innerHTML = "";
        taxEl.style.display = "none";
      }
    });
  }
  taxSwitch.addEventListener("change", showTaxInListings);

  // Filter by clicking icon
  const filterDivs = document.querySelectorAll(".filter");
  const categoryMap = [
    "Trending",
    "Rooms",
    "Iconic Cities",
    "Mountains",
    "Castle",
    "Arctics",
    "Camping",
    "Farms",
    "Hotels",
    "Beach",
    "Nature",
    "Winter",
    "Lake",
    "Apartment",
    "House",
    "Breakfast",
  ];
  filterDivs.forEach((div, idx) => {
    div.addEventListener("click", () => {
      document.getElementById("categorySelect").value = categoryMap[idx];
      document.getElementById("categoryFilterForm").submit();
    });
  });
});
