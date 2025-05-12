"use client";

import { Box, Typography } from "@mui/material";
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
} from "chart.js";
import { useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Doughnut, Line } from "react-chartjs-2";


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


export default function DashboardCharts({ data, loading }) {
    const chartRef = useRef(null);

    const categoryTotals = {};

    data.forEach((item) => {
        const category = item.productCategory || "Uncategorized";
        const price = item.price || 0;

        if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
        }

        categoryTotals[category] += price;
    });

    const uniqueCategories = Object.keys(categoryTotals);
    const categoryPrices = Object.values(categoryTotals).map(Number);

    const totalPrice = categoryPrices.reduce((acc, price) => acc + price, 0);

    function generateColors(count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const hue = Math.floor((360 / count) * i);
            colors.push(`hsl(${hue}, 70%, 60%)`);
        }
        return colors;
    }

    const backgroundColor = generateColors(uniqueCategories.length);
    const monthlyRevenue = new Array(12).fill(0);

    data.forEach((item) => {
        const date = new Date(item.orderDate);
        const month = date.getMonth();
        const price = Number(item.price) || 0;
        monthlyRevenue[month] += price;
    });

    const lineData = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Monthly Revenue ($)",
                data: monthlyRevenue,
                borderColor: "#2563EB",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
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
                text: "Revenue over time",
                align: "start" as const,
                color: "#64748B",
                font: {
                    size: 15,
                    weight: 700,
                    family: "Arial",
                },
                padding: {
                    bottom: 40,
                },
            },
            tooltip: {
                caretSize: 0,
                backgroundColor: "#555B68",
                titleColor: "#fff",
                border: "1px solid #0F172A33",
                boxShadow: "0px 20px 40px 0px #0F172A26",

                borderColor: "#0F172A33",
                borderWidth: 1,
                titleFont: { weight: 700, size: 12 },
                bodyFont: { weight: 700, size: 12 },
                padding: 10,
                cornerRadius: 4,
                callbacks: {
                    label: (context) => {
                        const value = context.parsed.y;
                        return `$${value.toLocaleString()}`;
                    },
                },
            },
        },
        elements: {
            point: {
                radius: 5,
                hoverRadius: 7,
                backgroundColor: "#fff",
                borderColor: "#fff",
                borderWidth: 0,
                hoverBackgroundColor: "#2563EB",
                hoverBorderColor: "#fff",
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

                grid: {
                    drawOnChartArea: true,
                    drawTicks: false,
                    drawBorder: false,
                    color: "#F1F5F9",
                },
            },
            x: {
                grid: {
                    drawOnChartArea: false,
                    drawTicks: false,
                    display: false,
                    drawBorder: false,
                },
            },
        },
    };

    const pieData = {
        labels: uniqueCategories,
        datasets: [
            {
                label: "Product Sales by Category",
                data: categoryPrices,
                backgroundColor,
                hoverOffset: 50, // Expands on hover
                borderWidth: 2,
                borderColor: "#fff",
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        cutout: "70%",
        plugins: {
            legend: {
                display: false,
                position: "bottom" as const,
                align: "end" as const,
                labels: {
                    color: "#1E3A8A",
                    font: {
                        size: 12,
                    },
                },
            },
            title: {
                display: true,
                text: "Orders by categories",
                align: "start" as const,
                color: "#64748B",
                font: {
                    size: 15,
                    weight: 700,
                    family: "Arial",
                },
                padding: {
                    bottom: 40,
                },
            },
            tooltip: {
                backgroundColor: "#ffffff",
                borderColor: "#1E3A8A",
                borderWidth: 1,
                titleColor: "#1E3A8A",
                bodyColor: "#1E3A8A",
                caretSize: 0,
                padding: 10,
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label;
                        const value = tooltipItem.raw;
                        const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${percentage}%`;
                    },
                },
            },
            hover: {
                mode: "nearest",
                animationDuration: 400,
            },
            animation: {
                animateRotate: true,
                animateScale: true,
            },
        },
    };

    return (
        <Box
            sx={{
                display: { xs: "block", lg: "flex" },
                gap: "2rem",
                width: "100%",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    height: "300px",
                    width: { xs: "100%", lg: "60%" },
                    background: "#fff",
                    padding: "1.5rem",
                    borderRadius: "1rem",
                    marginBottom: { xs: "2rem", lg: "0" },
                }}
            >
                <Line data={lineData} options={lineOptions} />
            </Box>
            <Box
                sx={{
                    height: "300px",
                    width: { xs: "100%", lg: "40%" },
                    background: "#fff",
                    padding: "1.5rem",
                    borderRadius: "1rem",
                }}
            >
                {loading ? (
                    <CircularProgress size={40} sx={{ color: "#2563EB", my: 2 }} />
                ) : pieData.datasets[0].data.length < 1 ? (<Typography sx={{
                    fontSize: '1rem',
                    lineHeight: '150%',
                    fontWeight: 600,
                    padding: '20px'
                }}>No Data Available</Typography>) : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            gap: "1rem",
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: "250px",
                                height: "250px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Doughnut ref={chartRef} data={pieData} options={pieOptions} />
                            {totalPrice > 0 && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "60%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                    }}
                                >
                                    Total
                                    <br />
                                    {totalPrice as number}
                                </Box>
                            )}
                        </Box>
                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            <ul
                                style={{ listStyle: "disc", paddingLeft: "1.2rem", margin: 0 }}
                            >
                                {pieData?.labels.map((label, index) => (
                                    <li
                                        key={label}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: "0.5rem",
                                            fontWeight: 600,
                                            fontSize: "12px",
                                            color: "#64748B",
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "inline-block",
                                                width: "10px",
                                                height: "10px",
                                                borderRadius: "50%",
                                                backgroundColor:
                                                    pieData.datasets[0].backgroundColor[index],
                                                marginRight: "8px",
                                            }}
                                        ></span>
                                        {label}
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
