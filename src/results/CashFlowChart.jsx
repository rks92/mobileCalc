/* eslint-disable react/prop-types */
import React from 'react';
import {
  Bar,
  CartesianGrid,
  Cell,
  Line,
  XAxis,
  YAxis,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

export default function CashFlowChart({ data }) {
  const tickFormatter = (value) => (new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(value));

  return (
    <ResponsiveContainer height={230}>
      <ComposedChart
        data={data}
      >
        <CartesianGrid vertical={false} strokeDasharray="3" stroke="#CDD4E0" />
        <YAxis
          width={40} // Hack to get all the available space
          axisLine={false}
          tickLine={false}
          tickFormatter={tickFormatter}
          tick={{ fill: '#687DA3', fontSize: '10px' }}
        />
        <XAxis
          axisLine={false}
          tickLine={false}
          tick={false}
          padding={{ left: 10, right: 10 }}
        />
        <ReferenceLine y={0} stroke="#B4BED1" />
        <Bar
          dataKey="netCumulativeCashReturn"
          fill="#82ca9d"
          radius={[1.5, 1.5, 0, 0]}
        >
          {data.map((year) => (
            <Cell
              key={year}
              fill={year.netCumulativeCashReturn > 0 ? '#0066FF' : '#B3D1FF'}
            />
          ))}
        </Bar>
        <Line
          dot={false}
          type="monotone"
          strokeWidth={2}
          dataKey="netOperatingIncome"
          stroke="#8FBF87"
        />
        <Line
          dot={false}
          type="monotone"
          strokeWidth={2}
          dataKey="cashFlowBeforeTaxes"
          stroke="#ECAF00"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
