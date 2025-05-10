"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import OrderForm from "./OrderForm";
import OrderTable from "../OrderTable";
import { formattedDate } from "@/helper/date";
import { Order } from "@/interfaces/order";

interface CustomerDashboard {
    orders: Order[];
    loading: boolean;
    totalOrders: Order[]
}

const CustomerDashboard = ({ orders, loading, totalOrders }: CustomerDashboard) => {
    const [openModal, setOpenModal] = useState(false);

    const handleModalClose = () => {
        setOpenModal(false);
    };
    const user = useSelector((state: RootState) => state.auth.user);

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
