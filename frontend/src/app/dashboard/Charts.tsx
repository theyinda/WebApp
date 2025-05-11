// components/DashboardCharts.js
'use client';

import { Box } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useRef, useState } from 'react';

import { Doughnut, Line, } from 'react-chartjs-2';

// Register necessary chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// Plugin to scale hovered arc in place
// const growHoverPlugin = {
//     id: 'growHover',
//     afterEvent(chart, args) {
//         const { event } = args;
//         const activeElement = chart.getElementsAtEventForMode(
//             event,
//             'nearest',
//             { intersect: true },
//             false
//         );

//         chart.data.datasets[0]._hoveredIndex = activeElement.length ? activeElement[0].index : null;
//         chart.update();
//     },
//     beforeDatasetDraw(chart, args) {
//         const { ctx, data } = chart;
//         const dataset = data.datasets[args.index];
//         const meta = chart.getDatasetMeta(args.index);

//         if (!meta || !meta.data) return;

//         const hoveredIndex = dataset._hoveredIndex;

//         meta.data.forEach((arc, index) => {
//             const scale = index === hoveredIndex ? 1.08 : 1;
//             arc.outerRadius = arc.outerRadius * scale;
//         });
//     },
// };

// ChartJS.register(growHoverPlugin);



const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
        const { width, height, ctx } = chart;
        ctx.restore();
        const fontSize = (height / 150).toFixed(2);
        ctx.font = `bold ${fontSize * 16}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#1E3A8A'; // blue color
        ctx.fillText('Total Orders', width / 2, height / 2 - 10);
        ctx.font = `bold ${fontSize * 18}px sans-serif`;
        ctx.fillText('10,000', width / 2, height / 2 + 15);
        ctx.save();
    }
};


export default function DashboardCharts({ data }) {
    const chartRef = useRef(null);
    // const [pieData, setPieData] = useState({});
    const [total, setTotal] = useState(0);
    console.log(data, 'chart data')

    // const productCategories = data.map((item) => item.productCategory || []);
    // const uniqueCategories = [...new Set(productCategories)];

    const categoryTotals = {};

    data.forEach(item => {
        const category = item.productCategory || 'Uncategorized';
        const price = item.price || 0; // Or item.price depending on your field

        if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
        }

        categoryTotals[category] += price;
    });
    // 2. Extract unique categories and corresponding totals
    const uniqueCategories = Object.keys(categoryTotals);
    const categoryPrices = Object.values(categoryTotals);
    console.log(categoryPrices, 'categoryPrices')
    const totalPrice = categoryPrices.reduce((acc, price) => acc + price, 0);
    console.log(totalPrice);
    console.log(uniqueCategories.length,
        categoryPrices.length,


        'godx oo')
    const maxAmount = Math.max(...categoryPrices);

    let FINAL_MAX_PRODUCT_PRICE: number;
    if (maxAmount <= 10) {
        FINAL_MAX_PRODUCT_PRICE = 12;
    } else if (maxAmount <= 100) {
        FINAL_MAX_PRODUCT_PRICE = maxAmount + 50;
    } else if (maxAmount <= 1000) {
        FINAL_MAX_PRODUCT_PRICE = maxAmount + 100;
    } else {
        FINAL_MAX_PRODUCT_PRICE = maxAmount + 200;
    }

    function generateColors(count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const hue = Math.floor((360 / count) * i); // spread hues evenly
            colors.push(`hsl(${hue}, 70%, 60%)`); // nice saturation and lightness
        }
        return colors;
    }

    const backgroundColor = generateColors(uniqueCategories.length);
    const monthlyRevenue = new Array(12).fill(0);

    data.forEach(item => {
        const date = new Date(item.orderDate); // assuming item.date is like "2025-05-10"
        const month = date.getMonth(); // 0 = Jan, 11 = Dec
        const price = Number(item.price) || 0;
        monthlyRevenue[month] += price;
    });
    console.log(monthlyRevenue, 'monthlyRevenue')

    // Line chart config
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Monthly Revenue ($)',
                data: monthlyRevenue,
                borderColor: '#2563EB',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Revenue over time',
                align: 'start', // Align to the left
                color: '#64748B', // Deep blue
                font: {
                    size: 15,
                    weight: 700,
                    family: 'Arial',
                },
                padding: {
                    bottom: 40,
                },
            },
            tooltip: {
                // position: 'point',
                caretSize: 0,
                backgroundColor: '#555B68',
                titleColor: '#fff',
                border: '1px solid #0F172A33',
                boxShadow: "0px 20px 40px 0px #0F172A26",

                // bodyColor: 'red',
                borderColor: '#0F172A33',
                borderWidth: 1,
                titleFont: { weight: 700, size: 12 },
                bodyFont: { weight: 700, size: 12 },
                padding: 10,
                cornerRadius: 4,
                callbacks: {
                    label: (context) => {
                        const value = context.parsed.y;
                        return `$${value.toLocaleString()}`; // tooltip text
                    },
                },
            },
        },
        elements: {
            point: {
                radius: 5,
                hoverRadius: 7,
                backgroundColor: '#fff',
                borderColor: '#fff',
                borderWidth: 0,
                hoverBackgroundColor: '#2563EB',
                hoverBorderColor: '#fff',
                hoverBorderWidth: 6,
            },
            line: {
                tension: 0.3,
                borderWidth: 2,
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                min: 0,
                max: 200000,
                ticks: {
                    drawTicks: false,
                    stepSize: 10000,
                    callback: (value) => `${value / 1000}K`,
                },

                // title: {
                //     display: true,
                //     text: 'Amount ($)',
                // },
                grid: {
                    drawOnChartArea: true,
                    drawTicks: false,
                    drawBorder: false,
                    // borderColor: 'red', 
                    // borderWidth: 20,
                    // display: false,
                    color: '#F1F5F9', // Change to your preferred horizontal line color

                },
            },
            x: {
                grid: {
                    drawOnChartArea: false, // Remove vertical lines
                    drawTicks: false,
                    display: false,
                    drawBorder: false,
                },
                // ticks: {
                //     callback: () => '', // Removes X-axis label values
                // },
                // title: {
                //     display: true,
                //     text: 'Month',
                // },
            },
        },
    };
    // Pie chart config
    const pieData = {
        labels: uniqueCategories,
        datasets: [
            {
                label: 'Product Sales by Category',
                data: categoryPrices,
                backgroundColor,
                hoverOffset: 50, // Expands on hover
                borderWidth: 2,
                borderColor: '#fff'
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
                align: 'end',
                labels: {
                    color: '#1E3A8A',
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: 'Orders by categories',
                align: 'start',
                color: '#64748B',
                font: {
                    size: 15,
                    weight: 700,
                    family: 'Arial',
                },
                padding: {
                    bottom: 40,
                },
            },
            tooltip: {
                backgroundColor: '#ffffff',
                borderColor: '#1E3A8A',
                borderWidth: 1,
                titleColor: '#1E3A8A',
                bodyColor: '#1E3A8A',
                caretSize: 0, // removes tooltip pointer
                padding: 10,
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label;
                        const value = tooltipItem.raw;
                        const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${percentage}%`;
                    }
                }
            },
            hover: {
                mode: 'nearest',
                animationDuration: 400,
            },
            animation: {
                animateRotate: true,
                animateScale: true,
            },
        },
    };



    return (
        <Box style={{ display: 'flex', gap: '2rem', width: '100%', alignItems: 'center' }}>
            <Box sx={{
                height: '300px', width: '60%',
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "1rem",
            }}>
                <Line data={lineData} options={lineOptions} />
            </Box>
            <Box sx={{
                height: '300px', width: '40%',
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "1rem",
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem' }}>
                    <div style={{ position: 'relative', width: '250px', height: '250px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Doughnut ref={chartRef} data={pieData} options={pieOptions} />

                        <div style={{
                            position: 'absolute',
                            top: '60%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}>
                            Total<br />
                            {totalPrice as number}
                        </div>
                    </div>

                    <ul style={{ listStyle: 'disc', paddingLeft: '1.2rem', margin: 0 }}>
                        {/* {pieData?.labels.map((label, index) => (
                            <li key={label} style={{ color: '#64748B', marginBottom: '0.5rem', fontWeight: 600, fontSize: '12px', }}>
                                {label}
                            </li>
                        ))} */}
                        {pieData?.labels.map((label, index) => (
                            <li
                                key={label}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '0.5rem',
                                    fontWeight: 600,
                                    fontSize: '12px',
                                    color: '#64748B', // Label text color
                                }}
                            >
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: pieData.datasets[0].backgroundColor[index],
                                        marginRight: '8px',
                                    }}
                                ></span>
                                {label}
                            </li>
                        ))}

                    </ul>
                </div>
            </Box>
        </Box>
    );
}
