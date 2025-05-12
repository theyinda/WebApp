"use client";

import React, { useState } from 'react'
import { Button, Modal, IconButton, Box, FormControl, Select, MenuItem, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import type { RootState } from '@/redux/store';
import { ErrorHandler, SuccessHandler } from '@/helper/Handler';
import { Order } from '@/interfaces/order';
import { useSelector } from 'react-redux';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


interface OrderProp {
    openModal: boolean;
    handleModalClose: () => void;
    selectedOrder: Order | null;
    setOpenModal: (openModal: boolean) => void;
    categories: {
        name?: string;
        productName?: string;
        productCategory?: string;
        price?: string;
        orderDate?: string;
    }[];
}
const modalStyle = {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    boxShadow: '0px 4px 32px 0px #0000001F',
    borderRadius: "8px",
    maxWidth: "488px",
    width: "100%",
};


const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    productName: Yup.string().required("Name is required"),
    productCategory: Yup.string().required("Name is required"),
    price: Yup.string().required("Name is required"),
    orderDate: Yup.string().required("Name is required"),
});

const EditOrderForm = ({ openModal, setOpenModal, handleModalClose, categories, selectedOrder }: OrderProp) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const API = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [loading, setLoading] = useState(false);


    const uniqueCategories = [
        ...new Map(
            categories.map(item => [item.productCategory, { productCategory: item.productCategory }])
        ).values()
    ];

    const handleOrder = async (values: Order) => {
        try {
            setLoading(true);

            const res = await fetch(`${API}/api/orders/${selectedOrder?.id}`, {
                method: "PATCH",
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: values.name,
                    productName: values.productName,
                    productCategory: values.productCategory,
                    price: values.price,
                    orderDate: values.orderDate,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                SuccessHandler({
                    message: "Order Created!",
                });
                setOpenModal(false);
                console.log(data, 'data')


            } else {
                const errorData = await res.json();
                console.log(errorData, 'error')
                ErrorHandler({
                    message: errorData.message || "Could not update order.",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            console.log(error, 'error')
            ErrorHandler({ message: "Could not update order" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>

            <Modal open={openModal} onClose={handleModalClose}
                slotProps={{
                    backdrop: {
                        style: {
                            background: '#09122782',
                            opacity: '1',


                        },
                    },
                }}
            >
                <Box sx={modalStyle}>
                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: "5px", borderBottom: '.7px solid #D9D9D9', }}>
                        <Typography sx={{
                            fontSize: '1rem',
                            lineHeight: '150%',
                            fontWeight: 600,
                            padding: '20px'
                        }}>Create an Order</Typography>
                        <IconButton sx={{ color: '#000', padding: '20px' }} onClick={handleModalClose}><Close /></IconButton>
                    </Box>

                    <Formik
                        initialValues={{
                            name: user?.name || "", productName: selectedOrder?.productName || "", productCategory: selectedOrder?.productCategory || "", price: selectedOrder?.price || "", orderDate: selectedOrder?.orderDate
                                ? new Date(selectedOrder.orderDate).toISOString().split('T')[0]
                                : ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleOrder(values);
                        }}
                    >
                        {(formik) => (
                            <Form>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%", padding: '20px' }}>
                                    <label
                                        htmlFor="name"
                                        style={{
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            lineHeight: "20px",
                                            letterSpacing: "0.5%",
                                            color: "#777980",
                                        }}
                                    >
                                        Customer Name
                                    </label>
                                    <Input
                                        name="name"
                                        onChange={formik.handleChange}
                                        disabled
                                        sx={{

                                            "& .MuiInputBase-input": {
                                                padding: '7px',
                                            },
                                        }}
                                    />
                                    <label
                                        htmlFor="productName"
                                        style={{
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            lineHeight: "20px",
                                            letterSpacing: "0.5%",
                                            color: "#777980",
                                        }}
                                    >
                                        Product Name
                                    </label>
                                    <Input
                                        name="productName"
                                        type="text"
                                        placeholder="Type product name here..."
                                        onChange={formik.handleChange}
                                        sx={{

                                            "& .MuiInputBase-input": {
                                                padding: '7px',
                                            },
                                        }}
                                    />
                                    <label
                                        htmlFor="productCategory"
                                        style={{
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            lineHeight: "20px",
                                            letterSpacing: "0.5%",
                                            color: "#777980",
                                        }}
                                    >
                                        Product Category
                                    </label>

                                    <FormControl fullWidth>
                                        <Select
                                            id="productCategory"
                                            name="productCategory"
                                            onChange={formik.handleChange}
                                            displayEmpty
                                            value={formik.values.productCategory}
                                            sx={{
                                                fontFamily: "poppins",
                                                color: "#4B5563",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                    border: "1px solid transparent",
                                                },
                                                ".Mui-focused": {
                                                    border: "1px solid #F97316",
                                                },
                                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                {
                                                    borderColor: "transparent",
                                                },
                                                "& .MuiInputBase-input": {
                                                    padding: '7px',
                                                },
                                            }}
                                        >

                                            {uniqueCategories?.map((product) => (
                                                <MenuItem
                                                    key={product.productCategory}
                                                    sx={{
                                                        fontFamily: "poppins",
                                                        color: "#4B5563",
                                                    }}
                                                    value={product?.productCategory}
                                                >
                                                    {product?.productCategory}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <label
                                        htmlFor="price"
                                        style={{
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            lineHeight: "20px",
                                            letterSpacing: "0.5%",
                                            color: "#777980",
                                        }}
                                    >
                                        Base Price
                                    </label>
                                    <Input
                                        name="price"
                                        type="text"
                                        placeholder="NGN Type base price here..."
                                        onChange={formik.handleChange}
                                        sx={{

                                            "& .MuiInputBase-input": {
                                                padding: '7px',
                                            },
                                        }}
                                    />
                                    <label
                                        htmlFor="orderDate"
                                        style={{
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            lineHeight: "20px",
                                            letterSpacing: "0.5%",
                                            color: "#777980",
                                        }}
                                    >
                                        Order date
                                    </label>

                                    <DatePicker
                                        label=""
                                        value={formik.values.orderDate ? new Date(formik.values.orderDate) : null}

                                        onChange={(value) => {
                                            formik.setFieldValue("orderDate", value);
                                        }}
                                        slotProps={{
                                            textField: {
                                                sx: {
                                                    "& .MuiInputBase-input": {
                                                        padding: "6px 10px !important",
                                                    },
                                                    "& .MuiPickersSectionList-root": {
                                                        padding: "7px 8px",
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                    },
                                                },
                                            },
                                        }}



                                    />

                                    <Box style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: 'center', gap: "2rem", }}>
                                        <Button variant="contained" color="primary" type='submit' loading={loading} sx={{
                                            background: '#2563EB',
                                            fontWeight: 500,
                                            fontSize: "16px",
                                            lineHeight: "140%",
                                            letterSpacing: "0.%",
                                            color: "#fff",
                                            width: '100%',
                                            textTransform: 'none'
                                        }}>
                                            Update Order
                                        </Button>
                                        <Button variant="outlined" onClick={handleModalClose} sx={{
                                            fontWeight: 500,
                                            fontSize: "16px",
                                            lineHeight: "140%",
                                            letterSpacing: "0.%",
                                            color: "#425276",
                                            width: '100%',
                                            textTransform: 'none'
                                        }}>
                                            Cancel
                                        </Button>
                                    </Box>



                                </Box>
                            </Form>
                        )}
                    </Formik>




                </Box>
            </Modal>
        </Box>
    )
}

export default EditOrderForm