"use client";
import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Login from "./login/page";
import Register from "./register/page";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
const Index = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                marginTop: "5.5rem",
                marginBottom: { xs: "5rem", lg: "5rem" },
                position: "relative",
                paddingX: { xs: "1rem", lg: "3rem" },
            }}
        >
            <Box
                sx={{
                    boxShadow: " 0px 20px 25px 0px #0000001A",
                    border: "1px solid #E5E7EB",
                    background: "#fff",
                    maxWidth: 448,
                    margin: "8rem auto 0 auto",
                    width: "100%",
                    height: "auto",
                    borderRadius: "1rem",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "1.5rem 0",
                    }}
                >
                    <Image src="/logo.png" width={139} height={50} alt="XYZ logo" />
                </Box>
                <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                        sx={{
                            "& .MuiTabs-indicator": {
                                backgroundColor: "#408CFF",
                            },
                            "& .MuiTab-root": {
                                color: "#6B7280",
                                "&.Mui-selected": {
                                    color: "#408CFF",
                                },
                            },
                        }}
                    >
                        <Tab label="Sign Up" {...a11yProps(0)} />
                        <Tab label="Sign In" {...a11yProps(1)} />
                    </Tabs>

                    <CustomTabPanel value={value} index={0}>
                        <Register />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Login />
                    </CustomTabPanel>
                </Box>
            </Box>
        </Box>
    );
};

export default Index;
