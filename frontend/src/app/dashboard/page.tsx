
"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminDashboard from "./admin/page";
import CustomerDashboard from "./customer/page";
import { Order } from "@/interfaces/order";
import { ErrorHandler } from "@/helper/Handler";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


const Dashboard = () => {

    const API = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [orders, setOrders] = useState<Order[] | null>([])
    const [totalOrders, setTotalOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [filter] = useState("this_year");
    const user = useSelector((state: RootState) => state.auth.user)
    console.log(user, 'userGod')
    const userId = user?.id


    // fetch order then filter out 
    const fetchOrders = async () => {
        try {
            setLoading(true)
            if (user?.id) {
                const response = await fetch(`${API}/orders/?range=${filter}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                console.log(response, 'response')
                const data = await response.json()
                console.log(data?.data, 'data')
                console.log(user?.id, 'userId')
                // Filter out orders based on userId
                const getUser = Array.isArray(data?.data)
                    ? data?.data.filter((order: Order) => order?.customerId === userId)
                    : [];
                setTotalOrders(data?.data)
                // console.log(totalOrders, 'totalOrderss')
                setOrders(getUser); // Correctly set the filtered orders
            }

        } catch (error) {
            console.log(error, 'error')
            ErrorHandler({ message: "Error Fetching Orders" });
        } finally {
            setLoading(false)
        }

    }

    console.log(user, 'user-dashboard')


    useEffect(() => {
        fetchOrders()

    }, [userId])

    return (
        <Box
            sx={{ padding: {}, backgroundColor: "" }}
        >

            {user?.role === 'ADMIN' ? (<AdminDashboard loading={loading} />) : (<CustomerDashboard orders={orders || []} loading={loading} totalOrders={totalOrders} />)}


        </Box>
    );
};

export default Dashboard;
