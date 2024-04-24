<script>
  let rates = {};
  let amount1 = 1;
  let currency1 = 'USD';
  let currency2 = 'RUB';
  let amount2 = 0;

  async function fetchRates() {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`);
    const data = await res.json();
    rates = data.rates;
    calculate();
  }

  function calculate() {
    amount2 = (amount1 * (rates[currency2] || 0)).toFixed(2);
  }

  function recalculate(value, base) {
    if (base === 1) {
      amount1 = value;
      calculate();
    } else {
      amount2 = value;
      amount1 = (amount2 / (rates[currency2] || 1)).toFixed(2);
    }
  }

  $: fetchRates(), currency1, currency2;
</script>

<main>
  <div>
    <input type="number" bind:value={amount1} on:input={() => recalculate(amount1, 1)} />
    <select bind:value={currency1}>
      <option value="USD">USD</option>
      <option value="RUB">RUB</option>

    </select>
  </div>
  <div>
    <input type="number" bind:value={amount2} on:input={() => recalculate(amount2, 2)} />
    <select bind:value={currency2}>
      <option value="USD">USD</option>
      <option value="RUB">RUB</option>

    </select>
  </div>
</main>