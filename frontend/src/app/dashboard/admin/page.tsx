/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import OrderTable from "../OrderTable";
import { formattedDate } from "@/helper/date";
import DashboardCharts from "../Charts";
import { Order } from "@/interfaces/order";
import AnalyticCard from "./AnalyticCard";
import FilterDropdown from "./FilterComponent";

interface AdminDashboard {
    loading: boolean;
    // totalOrders: Order[];
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
            setLoading(true)
            try {
                const [metricsRes, ordersRes] = await Promise.all([
                    fetch(`${API}/analytics/?range=${filter}`, { credentials: "include" }),
                    fetch(`${API}/orders/?range=${filter}`, { credentials: "include" }),
                ]);

                const metricsData = await metricsRes.json();
                const ordersData = await ordersRes.json();


                console.log(ordersData.data, 'ordersDataLayo')

                setOrders(ordersData.data || []); // Assuming it's an array of Order objects

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
                setLoading(false)
            }
        };

        fetchMetricsAndOrders();
    }, [filter]);


    // useEffect(() => {
    //     const fetchMetrics = async () => {
    //         try {
    //             const response = await fetch(`${API}/analytics/?range=${filter}`, {
    //                 credentials: "include",
    //             });
    //             const data = await response.json();

    //             const formatted = [
    //                 {
    //                     label: "Total Revenue",
    //                     value: `$${data.totalRevenue.toLocaleString()}`,
    //                     percentage: 59,
    //                 },
    //                 {
    //                     label: "Orders",
    //                     value: `${data.orderCount}`,
    //                     percentage: 9,
    //                 },
    //                 {
    //                     label: "Customers",
    //                     value: `${data.customerCount}`,
    //                     percentage: 59,
    //                 },
    //             ];

    //             setMetrics(formatted);
    //         } catch (error) {
    //             console.error("Error fetching metrics", error);
    //         }
    //     };

    //     fetchMetrics();
    // }, [filter]);
    return (
        <Box sx={{ padding: "0!important", margin: "0!imporant" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    background: "#fff",
                    pr: "3rem",
                }}
            >
                <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <Box sx={{ maxWidth: "40px" }}>
                        <Image
                            src={"/notification.png"}
                            width={16}
                            height={18}
                            alt="profile"
                            style={{ width: "100%" }}
                        />
                    </Box>

                    <Image
                        src={"/profile.png"}
                        width={48}
                        height={48}
                        alt="profile"
                        style={{ borderRadius: "50%" }}
                    />
                    <Image
                        src={"/arrow.png"}
                        width={8}
                        height={4}
                        alt="profile"
                    />
                </Box>
            </Box>
            <Box
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: "2rem",

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
                    <Box>
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
