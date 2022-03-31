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
  ResponsiveContainer, Legend,
} from 'recharts';

export default function CashFlowChart({ data, breakEven }) {
  const tickFormatter = (value) => (new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(value));

  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        {payload.map((entry) => {
          const getRectWithColor = (color, marginLeft = '0') => (
            <div style={{
              width: '10px', height: '10px', borderRadius: '2px', background: color, marginLeft,
            }}
            />
          );

          const doubleRect = (
            <>
              {getRectWithColor('#B3D1FF')}
              {getRectWithColor('#0066FF')}
            </>
          );
          const labelColor = entry.dataKey === 'netCumulativeCashReturn'
            ? '#0066FF'
            : entry.color;

          const icon = entry.dataKey === 'netCumulativeCashReturn'
            ? doubleRect
            : getRectWithColor(entry.color, '12px');

          return (
            <div
              style={{
                fontSize: '10px',
                color: labelColor,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={entry.value}
            >
              {icon}
              <div style={{ marginLeft: '3px' }}>{entry.value}</div>
            </div>
          );
        })}
      </div>
    );
  };

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
          name="Net Cumulative Cash Flow"
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
          name="Net Operating Income"
          yAxisId="right"
          dot={false}
          type="monotone"
          strokeWidth={2}
          dataKey="netOperatingIncome"
          stroke="#ECAF00"
        />
        <Line
          name="Cash Flow Before Taxes"
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
        <Legend height={25} content={renderLegend} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
