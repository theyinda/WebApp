"use client";
import React, { useEffect, useState } from "react";
import {
    Box,
    Menu,
    MenuItem,
    IconButton,
    TablePagination,
    Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Checkbox,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Order } from "@/interfaces/order";
import CircularProgress from "@mui/material/CircularProgress";
import EditOrderForm from "./customer/EditOrderForm";
import { ErrorHandler, SuccessHandler } from "@/helper/Handler";

interface OrderTableProps {
    orders: Order[];
    loading: boolean;
}

const OrderTable = ({ orders, loading }: OrderTableProps) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [customers, setCustomers] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

    const handleSelectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const allIds = orders.map((order) => order.id);
            setSelectedRows(allIds as string[]);
        } else {
            setSelectedRows([]);
        }
    };

    const handleRowSelect = (
        event: React.ChangeEvent<HTMLInputElement>,
        rowId: string
    ) => {
        if (event.target.checked) {
            setSelectedRows([...selectedRows, rowId]);
        } else {
            setSelectedRows(selectedRows.filter((id) => id !== rowId));
        }
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleDeleteOrder = async () => {
        try {
            const res = await fetch(`${API}/api/orders/${selectedOrder?.id}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                SuccessHandler({
                    message: "Order Deleted Successfully!",
                });
                setOpenModal(false);
            } else {
                const errorData = await res.json();
                console.log(errorData, "error");
                ErrorHandler({
                    message: errorData.message || "Could not delete order.",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            console.log(error, "error");
            ErrorHandler({ message: "Could not delete order" });
        }
    };
    const sortedOrders = [...orders]?.sort((a, b) => {
        const dateA = new Date(a.orderDate).getTime();
        const dateB = new Date(b.orderDate).getTime();
        return dateB - dateA;
    });

    const paginatedOrders =
        sortedOrders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) ||
        [];

    const getCustomerName = (customerId: string) => {
        const customer = customers.find((c) => c.id === customerId);
        return customer ? customer.name : "N/A";
    };

    const API = process.env.NEXT_PUBLIC_API_BASE_URL;
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`${API}/api/users`, {
                    credentials: "include",
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch customers");
                }
                setCustomers(data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchCustomers();
    }, []);

    return (
        <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ mt: "2rem", minWidth: "800px" }}>
                <TableHead sx={{ background: "#F8FAFC" }}>
                    <TableRow>
                        <TableCell>
                            <Checkbox onChange={handleSelectAllRows} sx={{
                                '& .MuiSvgIcon-root': {
                                    fill: '#E2E8F0',
                                },
                            }} />
                        </TableCell>
                        <TableCell
                            sx={{ fontSize: "0.75rem", fontWeight: 500, color: "#64748B" }}
                        >
                            Customer Name
                        </TableCell>
                        <TableCell
                            sx={{ fontSize: "0.75rem", fontWeight: 500, color: "#64748B" }}
                        >
                            Product Name
                        </TableCell>
                        <TableCell
                            sx={{ fontSize: "0.75rem", fontWeight: 500, color: "#64748B" }}
                        >
                            Category
                        </TableCell>
                        <TableCell
                            sx={{ fontSize: "0.75rem", fontWeight: 500, color: "#64748B" }}
                        >
                            Date
                        </TableCell>
                        <TableCell
                            sx={{ fontSize: "0.75rem", fontWeight: 500, color: "#64748B" }}
                        >
                            Price
                        </TableCell>
                        <TableCell
                            sx={{ fontSize: "0.75rem", fontWeight: 500, color: "#64748B" }}
                        >
                            <MoreHorizIcon sx={{ color: "#64748B" }} />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center">
                                <CircularProgress size={40} sx={{ color: "#2563EB", my: 2 }} />
                            </TableCell>
                        </TableRow>
                    ) : paginatedOrders.length < 1 ? (<Typography sx={{
                        fontSize: '1rem',
                        lineHeight: '150%',
                        fontWeight: 600,
                        padding: '20px'
                    }}>No Data Available</Typography>) : (
                        paginatedOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>

                                    <Checkbox
                                        checked={selectedRows.includes(order?.id as string)}
                                        onChange={(e) => handleRowSelect(e, order.id as string)}
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fill: '#E2E8F0',
                                            },
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        color: "#0F172A",
                                    }}
                                >
                                    {user?.role === "ADMIN"
                                        ? getCustomerName(order?.customerId)
                                        : user?.name}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        color: "#0F172A",
                                    }}
                                >
                                    {order.productName}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        color: "#0F172A",
                                    }}
                                >
                                    {order.productCategory}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        color: "#0F172A",
                                    }}
                                >
                                    {new Date(order.orderDate).toLocaleDateString("en-GB")}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        color: "#0F172A",
                                    }}
                                >
                                    {order.price}
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={(e) => {
                                            if (user?.role === "ADMIN") {
                                                setAnchorEl(e.currentTarget);
                                                setSelectedOrder(order);
                                                setMenuOpenId(order.id as string);
                                            }
                                        }}
                                    >
                                        <MoreHorizIcon
                                            sx={{ color: "#64748B", cursor: "pointer" }}
                                        />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <TablePagination
                component="div"
                count={orders?.length || 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 20, 50]}
            />

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && Boolean(menuOpenId)}
                onClose={() => {
                    setAnchorEl(null);
                    setMenuOpenId(null);
                }}
            >
                <MenuItem
                    onClick={() => {
                        setOpenModal(true);
                        setAnchorEl(null);
                        setMenuOpenId(null);
                    }}
                >
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleDeleteOrder();
                        setAnchorEl(null);
                        setMenuOpenId(null);
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>

            <EditOrderForm
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleModalClose={handleModalClose}
                categories={orders}
                selectedOrder={selectedOrder}
            />
        </Box>
    );
};

export default OrderTable;
