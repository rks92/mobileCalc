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
  ResponsiveContainer, Legend, Tooltip,
} from 'recharts';
import { formatInDollars } from '../shared/utilities';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto',
        gridTemplateRows: 'auto',
        gridTemplateAreas: `
           "header"
           "row-0" 
           "row-1"
           "row-2"
          `,
        gap: '10px',
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
          gridArea: 'header',
          color: '#0A4296',
          fontSize: '14px',
          fontWeight: '600',
          fontFamily: 'Graphik',
          textAlign: 'center',
        }}
        >
          {`Year ${label}`}
        </div>
        {
            payload.map((field, index) => {
              let labelColor = field.color;

              if (field.dataKey === 'netCumulativeCashReturn') {
                labelColor = field.value > 0 ? '#0066FF' : '#B3D1FF';
              }

              return (
                <div
                  key={field.dataKey}
                  style={{
                    gridArea: `row-${index}`,
                  }}
                >
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    fontFamily: 'Graphik',
                    color: labelColor,
                  }}
                  >
                    {`${field.name}: `}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontFamily: 'Graphik',
                    fontWeight: '500',
                    color: field.value > 0 ? '#042765' : '#E24916',
                  }}
                  >
                    {formatInDollars(field.value)}
                  </div>
                </div>
              );
            })
          }
      </div>
    );
  }
  return null;
}

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
        <Tooltip content={<CustomTooltip />} />
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
