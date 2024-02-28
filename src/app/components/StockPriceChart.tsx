"use client"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
    Tooltip
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FC, useEffect, useState } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
    Tooltip
);

interface StockPriceChartProps {
    symbolValue: string;
}

export const StockPriceChart: FC<StockPriceChartProps> = ({ symbolValue}) => {
    const [chartData, setChartData] = useState<ChartData<'bar'> | null>(null);
    const [chartOptions, setChartOptions] = useState<ChartOptions<'bar'> | null>(null);
    useEffect(() => {
        const fetchChartData = async () => {
            const chartResponse = await fetch(`/api/chart?query=${symbolValue}`);
            const chartData = await chartResponse.json();
            const chartDataForBar: ChartData<'bar'> = {
                labels: [],
                datasets: [
                    {
                        label: 'Stock opening prices in the last 50 days',
                        data: [],
                        borderColor: 'rgb(53,160,120)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ]
            };
            Object.keys(chartData).forEach((key) => {
                chartDataForBar.labels?.push(key);
                chartDataForBar.datasets[0].data.push(chartData[key]["1. open"])
            });

            setChartData(chartDataForBar);
            setChartOptions({
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Stock price chart'
                    },
                },
                maintainAspectRatio: false,
                responsive: true,
            });
        };
        fetchChartData();
    }, [symbolValue]);

    return (
        <div className="w-1/2 h-1/2 m-auto bg-white">
            {chartData && chartOptions && <Bar data={chartData} options={chartOptions} width="100px" height="50px" />}
        </div>
    )
}