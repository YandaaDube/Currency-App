import { useEffect, useState } from "react";
import CurrencyDropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Fetch currency list on mount
  useEffect(() => {
    fetch("https://api.frankfurter.app/currencies")
      .then((res) => res.json())
      .then((data) => {
        const currencyList = Object.keys(data);
        setCurrencies(currencyList);
        console.log("Currencies loaded:", currencyList);
      });
  }, []);

  // Fetch conversion whenever input changes
  useEffect(() => {
    if (fromCurrency === toCurrency || !amount) {
      setConvertedAmount(amount);
      return;
    }

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setConvertedAmount(data.rates[toCurrency]);
      });
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="bg-white shadow-md p-8 rounded-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6">Currency Converter</h1>

      <div className="mb-4">
        <label className="block mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <CurrencyDropdown
        currencies={currencies}
        selectedCurrency={fromCurrency}
        onChange={setFromCurrency}
        label="From"
      />

      <button
        onClick={swapCurrencies}
        className="w-full flex justify-center items-center gap-2 my-4 text-blue-500"
      >
        <HiArrowsRightLeft size={20} />
        Swap
      </button>

      <CurrencyDropdown
        currencies={currencies}
        selectedCurrency={toCurrency}
        onChange={setToCurrency}
        label="To"
      />

      {convertedAmount !== null && (
        <div className="mt-6 text-lg font-medium">   
          {amount} {fromCurrency} ={" "}
          <span className="text-green-600">{convertedAmount}</span> {toCurrency}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
