import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Label,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import { formatInDollars } from '../shared/utilities';

// eslint-disable-next-line react/prop-types
function CustomLabel({ viewBox, value1, value2 }) {
  // eslint-disable-next-line react/prop-types
  const { cx, cy } = viewBox;
  return (
    <>
      <text x={cx} y={cy - 7} textAnchor="middle" dominantBaseline="central">
        <tspan
          style={{
            fontWeight: 500,
            fontSize: '16px',
            fill: '#042765',
            fontFamily: 'Graphik',
            lineHeight: '24px',
          }}
        >
          {value1}
        </tspan>
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" dominantBaseline="central">
        <tspan
          style={{
            fontSize: '10px',
            fill: '#042765',
            fontFamily: 'Graphik',
            lineHeight: '14px',
          }}
        >
          {value2}
        </tspan>
      </text>
    </>
  );
}

export default function MonthlyExpensesChart({ expenses, totalMonthlyExpenses }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={expenses}
          dataKey="value"
          innerRadius={60}
          outerRadius={90}
        >
          <Label position="center" content={<CustomLabel value1={formatInDollars(totalMonthlyExpenses)} value2="Monthly Expenses" />} />
          {expenses.map((expense) => (
            <Cell key={expense.text.replaceAll(' ', '_')} stroke={expense.color} fill={expense.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

MonthlyExpensesChart.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
  totalMonthlyExpenses: PropTypes.number.isRequired,
};
