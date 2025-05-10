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
    totalOrders: Order[];
}

const AdminDashboard = ({ loading, totalOrders }: AdminDashboard) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [metrics, setMetrics] = useState([
        { label: "Total Revenue", value: "$0", percentage: 0 },
        { label: "Orders", value: "0", percentage: 0 },
        { label: "Customers", value: "0", percentage: 0 },
    ]);
    const [filter, setFilter] = useState("this_year");
    const API = process.env.NEXT_PUBLIC_API_BASE_URL;
    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await fetch(`${API}/analytics/?range=${filter}`, {
                    credentials: "include",
                });
                const data = await response.json();

                const formatted = [
                    {
                        label: "Total Revenue",
                        value: `$${data.totalRevenue.toLocaleString()}`,
                        percentage: data.revenueChange,
                    },
                    {
                        label: "Orders",
                        value: `${data.orderCount}`,
                        percentage: data.orderChange,
                    },
                    {
                        label: "Customers",
                        value: `${data.customerCount}`,
                        percentage: data.customerChange,
                    },
                ];

                setMetrics(formatted);
            } catch (error) {
                console.error("Error fetching metrics", error);
            }
        };

        fetchMetrics();
    }, [filter]);
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
                    // style={{ borderRadius: '50%' }}
                    />
                </Box>
            </Box>
            <Box
                sx={
                    {
                        // margin: "2rem",
                        // background: "#fff",
                        // padding: "2rem",
                        // borderRadius: "1rem",
                    }
                }
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
                        // background: "#fff",
                        // padding: "2rem",
                        // borderRadius: "1rem",
                    }}
                >
                    {/* <AnalyticCard data={[
                        { label: "Total Revenue", value: "₦1,200,000", percentage: 12 },
                        { label: "Orders", value: "256", percentage: -8 },
                        { label: "Customers", value: "182", percentage: 4.5 },
                    ]} /> */}
                    <AnalyticCard data={metrics} />
                </Box>
                <Box
                    sx={{
                        margin: "2rem",

                        // padding: "2rem",
                    }}
                >
                    <DashboardCharts />
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
                        <OrderTable orders={totalOrders || []} loading={loading} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
