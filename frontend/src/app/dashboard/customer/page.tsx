/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { ErrorHandler } from "@/helper/Handler";
import { RootState } from "@/redux/store";
import OrderForm from "./OrderForm";
import OrderTable from "../OrderTable";
import { formattedDate } from "@/helper/date";
import { Order } from "@/interfaces/order";
import Header from "@/components/Header";

const CustomerDashboard = () => {
    const [openModal, setOpenModal] = useState(false);

    const user = useSelector((state: RootState) => state.auth.user);
    const API = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [orders, setOrders] = useState<Order[]>([]);
    const [totalOrders, setTotalOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filter] = useState("this_year");
    const userId = user?.id;

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const fetchOrders = async () => {
        try {
            setLoading(true);
            if (user?.id) {
                const response = await fetch(`${API}/api/orders/?range=${filter}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                const getUser = Array.isArray(data?.data)
                    ? data?.data.filter((order: Order) => order?.customerId === userId)
                    : [];
                setTotalOrders(data?.data);

                setOrders(getUser);
            }
        } catch (error) {
            console.log(error, "error");
            ErrorHandler({ message: "Error Fetching Orders" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [userId]);

    return (
        <Box>
            <Header />
            <Box
                sx={{
                    margin: "2rem",
                    background: "#fff",
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
                    {user?.role === "CUSTOMER" && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenModal(true)}
                            sx={{
                                background: "#2563EB",
                                fontWeight: 500,
                                fontSize: "16px",
                                lineHeight: "140%",
                                letterSpacing: "0.%",
                                color: "#fff",
                                textTransform: "none",
                            }}
                        >
                            Create an Order
                        </Button>
                    )}
                </Box>

                <Box>
                    <OrderTable orders={orders} loading={loading} />

                    <OrderForm
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        handleModalClose={handleModalClose}
                        categories={totalOrders}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default CustomerDashboard;
