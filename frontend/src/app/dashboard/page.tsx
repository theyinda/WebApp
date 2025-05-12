"use client";
import { Box } from "@mui/material";
import React from "react";
import AdminDashboard from "./admin/page";
import CustomerDashboard from "./customer/page";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Dashboard = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <Box>
            {user?.role === "ADMIN" ? <AdminDashboard /> : <CustomerDashboard />}
        </Box>
    );
};

export default Dashboard;
