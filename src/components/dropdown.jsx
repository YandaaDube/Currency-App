import React from 'react';

const CurrencyDropdown = ({ currencies, selectedCurrency, onChange, label }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <select
        value={selectedCurrency}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded w-full"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
