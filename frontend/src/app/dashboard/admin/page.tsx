/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import OrderTable from "../OrderTable";
import { formattedDate } from "@/helper/date";
import DashboardCharts from "../Charts";
import { Order } from "@/interfaces/order";
import AnalyticCard from "./AnalyticCard";
import FilterDropdown from "./FilterComponent";
import Header from "@/components/Header";

interface AdminDashboard {
    loading: boolean;
}

const AdminDashboard = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [metrics, setMetrics] = useState([
        { label: "Total Revenue", value: "$0", percentage: 0 },
        { label: "Orders", value: "0", percentage: 0 },
        { label: "Customers", value: "0", percentage: 0 },
    ]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("this_year");
    const [orders, setOrders] = useState<Order[]>([]);
    const API = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchMetricsAndOrders = async () => {
            setLoading(true);
            try {
                const [metricsRes, ordersRes] = await Promise.all([
                    fetch(`${API}/api/analytics/?range=${filter}`, {
                        credentials: "include",
                    }),
                    fetch(`${API}/api/orders/?range=${filter}`, {
                        credentials: "include",
                    }),
                ]);

                const metricsData = await metricsRes.json();
                const ordersData = await ordersRes.json();

                setOrders(ordersData.data || []);

                const formatted = [
                    {
                        label: "Total Revenue",
                        value: `$${metricsData.totalRevenue.toLocaleString()}`,
                        percentage: 59,
                    },
                    {
                        label: "Orders",
                        value: `${metricsData.orderCount}`,
                        percentage: 9,
                    },
                    {
                        label: "Customers",
                        value: `${metricsData.customerCount}`,
                        percentage: 59,
                    },
                ];

                setMetrics(formatted);
            } catch (error) {
                console.error("Error fetching metrics or orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMetricsAndOrders();
    }, [filter]);

    return (
        <Box>
            <Header />
            <Box>
                <Box
                    sx={{
                        display: { xs: "block", md: "flex" },

                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "2rem",
                        borderRadius: "1rem",
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "1.5rem",
                                lineHeight: "125%",
                                fontWeight: 700,
                                color: "#0F172A",
                                pb: ".5rem",
                            }}
                        >
                            {`Welcome, ${user?.name || ""}`}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                lineHeight: "160%",
                                fontWeight: 400,
                                color: "#64748B",
                            }}
                        >
                            {formattedDate}
                        </Typography>
                    </Box>
                    <Box sx={{ marginTop: { xs: "2rem", md: "0" } }}>
                        {" "}
                        <FilterDropdown filter={filter} setFilter={setFilter} />
                    </Box>
                </Box>

                <Box
                    sx={{
                        margin: "3rem 0",
                        padding: "2rem",
                    }}
                >
                    <AnalyticCard data={metrics} />
                </Box>
                <Box
                    sx={{
                        margin: "2rem",
                    }}
                >
                    <DashboardCharts data={orders || []} />
                </Box>

                <Box
                    sx={{
                        margin: "2rem",
                        background: "#fff",
                        padding: "2rem",
                        borderRadius: "1rem",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: "2rem",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                lineHeight: "160%",
                                fontWeight: 700,
                                color: "#64748B",
                            }}
                        >
                            Orders
                        </Typography>
                    </Box>

                    <Box sx={{ background: "#fff" }}>
                        <OrderTable orders={orders || []} loading={loading} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
