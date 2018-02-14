import React from 'react';
import { render } from 'react-dom';

import './styles.css';

const RENT = 3793;
const LOAN = 2070000;
const TAX = 1.44;
const STEP = 100000;

const sell = {
  min: 2400000,
  max: 3600000
};
const buy = {
  min: 4000000,
  max: 5000000
};

const calcAmmort = (buy, newLoan) => {
  const percentage = newLoan / buy;
  if (percentage >= 0.75) {
    return newLoan * 0.02 / 12;
  }
  if (percentage >= 0.5) {
    return newLoan * 0.01 / 12;
  }
  return 0;
};

const calcCost = (buy, sell) => {
  const newLoan = buy - (sell - LOAN);
  const ammort = calcAmmort(buy, newLoan);
  const tax = newLoan * (TAX / 100) / 12;
  return Math.round(ammort + RENT + tax * 0.7);
};

const data = [];

const columns = [''];
for (let i = sell.min; i <= sell.max; i = i + STEP) {
  columns.push(i);
}

const rows = [];
for (let i = buy.min; i <= buy.max; i = i + STEP) {
  rows.push(i);
}

for (let i = buy.min; i <= buy.max; i = i + STEP) {
  const row = [];
  for (let j = sell.min; j <= sell.max; j = j + STEP) {
    row.push(calcCost(i, j));
  }
  data.push(row);
}

const App = () => (
  <div>
    <table>
      <thead>
        <tr>{columns.map(a => <th key={a}>{a}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td style={{ fontWeight: 'bold' }}>{rows[i]}</td>
            {row.map(rowD => <td key={rowD}>{rowD}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

render(<App />, document.getElementById('root'));
