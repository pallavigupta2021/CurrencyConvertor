import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";
const CurrencyDropdown = ({
  currencies,
  currency,
  title,
  setCurrency,
  favorite,
  handleFavorite = "",
}) => {
  const isFavorite = (curr) => favorite.includes(curr);

  return (
    <div>
      <label
        className="text-sm block font-medium text-gray-600"
        htmlFor={title}
      >
        {title}
      </label>
      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border-green-300 bg-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {favorite.map((currency) => {
            return (
              <option className="bg-gray-200" value={currency} key={currency}>
                {currency}
              </option>
            );
          })}

          <hr />
          {currencies
            .filter((c) => !favorite.includes(c))
            .map((currency) => {
              return (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
        </select>
        <button
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
          onClick={() => handleFavorite(currency)}
        >
          {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};
export default CurrencyDropdown;
