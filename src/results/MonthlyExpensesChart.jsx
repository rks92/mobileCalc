/* eslint-disable react/prop-types */
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Label,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';
import { formatInDollars } from '../shared/utilities';

function CustomTooltip({ payload }) {
  if (payload.length === 0) {
    return null;
  }
  const data = payload[0].payload;
  return (
    <div style={{
      background: '#FAFCFF',
      borderRadius: '3px',
      padding: '10px',
      boxShadow: `
           0 2.8px 2.2px rgba(0, 0, 0, 0.034),
           0 6.7px 5.3px rgba(0, 0, 0, 0.048),
           0 12.5px 10px rgba(0, 0, 0, 0.06),
           0 22.3px 17.9px rgba(0, 0, 0, 0.072),
           0 41.8px 33.4px rgba(0, 0, 0, 0.086),
           0 100px 80px rgba(0, 0, 0, 0.12)
          `,
    }}
    >
      <div style={{
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'Graphik',
        color: data.color,
      }}
      >
        {`${data.text}: `}
      </div>
      <div style={{
        fontSize: '14px',
        fontFamily: 'Graphik',
        fontWeight: '500',
        color: data.color,
      }}
      >
        {formatInDollars(data.value)}
      </div>
    </div>
  );
}

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

function MonthlyExpensesChart({ expenses, totalMonthlyExpenses }) {
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
        <Tooltip content={<CustomTooltip />} />
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

export default React.memo(
  MonthlyExpensesChart,
  (prevProps, nextProps) => prevProps.totalMonthlyExpenses === nextProps.totalMonthlyExpenses,
);
