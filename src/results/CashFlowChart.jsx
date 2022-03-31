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

export default function CashFlowChart({ data, breakEven }) {
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
          orientation="left"
          yAxisId="left"
          width={40} // Hack to get all the available space
          axisLine={false}
          tickLine={false}
          tickFormatter={tickFormatter}
          tick={{ fill: '#687DA3', fontSize: '10px' }}
        />
        <YAxis
          orientation="right"
          yAxisId="right"
          width={40} // Hack to get all the available space
          axisLine={false}
          tickLine={false}
          tickFormatter={tickFormatter}
          tick={{ fill: '#687DA3', fontSize: '10px' }}
        />
        <XAxis
          dataKey="year"
          axisLine={false}
          tickLine={false}
          tick={false}
          padding={{ left: 10, right: 10 }}
        />
        <ReferenceLine yAxisId="left" y={0} stroke="#B4BED1" />
        <Bar
          yAxisId="left"
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
          yAxisId="right"
          dot={false}
          type="monotone"
          strokeWidth={2}
          dataKey="netOperatingIncome"
          stroke="#ECAF00"
        />
        <Line
          yAxisId="right"
          dot={false}
          type="monotone"
          strokeWidth={2}
          dataKey="cashFlowBeforeTaxes"
          stroke="#8FBF87"
        />
        <ReferenceLine
          yAxisId="right"
          x={breakEven}
          stroke="red"
          label={{
            value: 'break even',
            angle: -90,
            position: 'center',
            fontSize: '10px',
            fontWeight: 400,
            color: '#042765',
            dx: -10,
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
