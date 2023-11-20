import React from "react";
import type { AxisOptions } from "react-charts";
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

interface LineData {
    date: Date;
    value: number;
}

interface LineProps {
  label?: string
  series: LineData[]
}

export default function Line({ label, series }: LineProps) {
  const data = [{
    label,
    data: series
  }]

  const primaryAxis = React.useMemo(
    (): AxisOptions<LineData> => ({
      getValue: (data: LineData) => new Date(data.date),
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    (): AxisOptions<LineData>[] => [
      {
        getValue: (data: LineData) => data.value,
      },
    ],
    [] 
  )

  return (
    // @ts-expect-error
    <Chart
      options={{ 
        data,
        primaryAxis,
        secondaryAxes,
      }}
    />
  );
}
