
"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from "@mui/material";



// import { formatTime } from "@/utils/time";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import OrderForm from "./OrderForm";




const Dashboard = () => {

    const [selectedRows, setSelectedRows] = useState<number[]>([]); // Track selected rows
    const [openModal, setOpenModal] = useState(false); // Modal visibility state

    const handleSelectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedRows([1, 2, 3, 4, 5]); // Example: Select all rows by their ids
        } else {
            setSelectedRows([]);
        }
    };

    const handleRowSelect = (event: React.ChangeEvent<HTMLInputElement>, rowId: number) => {
        if (event.target.checked) {
            setSelectedRows([...selectedRows, rowId]);
        } else {
            setSelectedRows(selectedRows.filter(id => id !== rowId));
        }
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };
    ;


    const user = useSelector((state: RootState) => state.auth.user)



    return (
        <Box
            sx={{ padding: '0!important', margin: '0!imporant' }}
        >
            <Box
                sx={{
                    display: "flex",
                    // flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    background: '#fff'
                }}
            >

                <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Image
                        src={"/notification.png"}
                        width={16}
                        height={18}
                        alt="profile"
                    // style={{ borderRadius: '50%' }}
                    />

                    <Image
                        src={"/profile.png"}
                        width={48}
                        height={48}
                        alt="profile"
                        style={{ borderRadius: '50%' }}
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
            <Box sx={{ margin: "2rem", background: '#fff', padding: '2rem', borderRadius: '1rem' }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '1rem',
                            lineHeight: '160%',
                            fontWeight: 700,
                            color: '#64748B'
                        }}
                    >
                        Orders
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} sx={{
                        background: '#2563EB',
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "140%",
                        letterSpacing: "0.%",
                        color: "#fff",

                    }}>
                        Create an Order
                    </Button>

                </Box>

                <Box>
                    {/* Table */}
                    <Table sx={{ background: '', mt: '2rem' }}>
                        <TableHead sx={{ background: '#F8FAFC' }}>
                            <TableRow sx={{ background: '' }}>
                                <TableCell>
                                    <Checkbox onChange={handleSelectAllRows} />
                                </TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell><MoreHorizIcon /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[1, 2, 3, 4, 5].map(rowId => (
                                <TableRow key={rowId}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRows.includes(rowId)}
                                            onChange={(e) => handleRowSelect(e, rowId)}
                                        // sx={{

                                        //     color: "#E2E8F0",
                                        //     width: '21px',
                                        //     height: '14',
                                        //     borderRadius: '4px',

                                        // }}
                                        // sx={{
                                        //     color: "#E2E8F0", // Unchecked color
                                        //     // width: '21px',
                                        //     height: '21px',
                                        //     padding: 0,
                                        //     '& .MuiSvgIcon-root': {
                                        //         border: '2px solid red', // ✅ custom border color
                                        //         borderRadius: '50%',          // ✅ makes it round
                                        //         boxSizing: 'border-box',
                                        //     },
                                        //     '&.Mui-checked .MuiSvgIcon-root': {
                                        //         color: '#408CFF', // Checked color
                                        //         backgroundColor: '#E0F2FF', // Optional: background when checked
                                        //     },
                                        // }}
                                        />
                                    </TableCell>
                                    <TableCell>Customer {rowId}</TableCell>
                                    <TableCell>Product {rowId}</TableCell>
                                    <TableCell>Category {rowId}</TableCell>
                                    <TableCell>01/01/2022</TableCell>
                                    <TableCell>$100</TableCell>
                                    <TableCell>
                                        <MoreHorizIcon sx={{ cursor: 'pointer' }} onClick={() => setOpenModal(true)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <OrderForm openModal={openModal} setOpenModal={setOpenModal} handleModalClose={handleModalClose} />
                </Box>


            </Box>










        </Box >
    );
};

export default Dashboard;
