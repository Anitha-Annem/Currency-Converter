const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

// Load currency list
const currencies = ["USD", "EUR", "INR", "GBP", "JPY", "CAD", "AUD", "SGD", "CNY"];

currencies.forEach(code => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = option2.value = code;
  option1.textContent = option2.textContent = code;
  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

// Convert button click
convertBtn.addEventListener("click", async () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = parseFloat(amount.value);

  if (isNaN(amt) || amt <= 0) {
    result.textContent = "Please enter a valid amount!";
    return;
  }

  const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amt * rate).toFixed(2);

    result.textContent = `${amt} ${from} = ${converted} ${to}`;
  } catch (error) {
    result.textContent = "Error fetching exchange rates!";
  }
});
