import React, { useEffect, useState } from "react";
import CurrencyDropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorite")) || ["INR", "USD"]
  );

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log("error fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  console.log(currencies);

  const currenciesConvert = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("error fetching", error);
    } finally {
      setConverting(false);
    }
  };

  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorite];

    if (favorite.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }
    setFavorite(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-zinc-800 rounded-lg shadow-2xl shadow-gray-900">
      <h2 className="mb-5 text-2xl font-semibold text-gray-500">
        Currency Convertor
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          favorite={favorite}
          currencies={currencies}
          currency={fromCurrency}
          title="From"
          setCurrency={setFromCurrency}
          handleFavorite={handleFavorite}
        />
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-green-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>

        <CurrencyDropdown
          favorite={favorite}
          currencies={currencies}
          currency={toCurrency}
          title="To"
          setCurrency={setToCurrency}
          handleFavorite={handleFavorite}
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-500"
        >
          Amount
        </label>
        <input
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          type="number"
          className="w-full p-2 border-green-300 bg-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={currenciesConvert}
          className={`bg-indigo-600 px-8 py-2 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
            ${converting ? "animate-pulse" : " "}`}
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 text-right text-lg font-medium text-green-700">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConvertor;
