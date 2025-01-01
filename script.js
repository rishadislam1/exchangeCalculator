let currencyOne = document.getElementById("currency-one");
let amountOne = document.getElementById("amount-one");
let currencyTwo = document.getElementById("currency-two");
let amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");
const dollarten = document.getElementById("dollarten");
const dollartwenty = document.getElementById("dollartwenty");
const dollarthirty = document.getElementById("dollarthirty");

// Function to set currencyOne value and calculate
function setCurrencyAndCalculate(value) {
    
    amountOne.value = value; // Update the currencyOne value
  console.log(amountOne)
  calculate(); // Trigger calculation
}

// Add event listeners to buttons
dollarten.addEventListener("click", (e) => {
   
  setCurrencyAndCalculate(10);
});

dollartwenty.addEventListener("click", () => {
  setCurrencyAndCalculate(20);
});

dollarthirty.addEventListener("click", () => {
  setCurrencyAndCalculate(30);
});

function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const currentRate = data.rates[currency_two];
      rate.innerText = `1 ${currency_one} = ${currentRate} ${currency_two}`;
      amountTwo.value = (amountOne.value * currentRate).toFixed(2);
    });
}

currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const storedValue = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = storedValue;
  calculate();
});

// Initial calculation
calculate();
