
"use client";
import { LocationOn, NotificationsOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

// import { formatTime } from "@/utils/time";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


const Dashboard = () => {


    const user = useSelector((state: RootState) => state.auth.user)


    const dymanicGreeting = () => {
        const date = new Date();
        const hours = date.getHours();
        if (hours < 12) {
            return "Good Morning";
        } else if (hours < 17) {
            return "Good Afternoon";
        } else if (hours < 21) {
            return "Good Evening";
        } else {
            return "Good Night";
        }
    };


    return (
        <Box
            sx={{ padding: { xs: "1rem", lg: "3rem" }, backgroundColor: "#f3f4f670" }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: { xs: "0.5rem", lg: "1rem" },
                        alignItems: "center",
                    }}
                >
                    <Box
                        component={"img"}
                        src="/images/profile.png"
                        alt="Profile picture"
                        sx={{
                            border: "3px solid #F97316",
                            borderRadius: "50%",
                            padding: 0,
                            width: { xs: "60px", lg: "80px" },
                            height: { xs: "60px", lg: "80px" },
                        }}
                    />
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: { xs: "0.2rem", lg: "0.5rem" },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: { xs: "1rem", lg: "1.2rem" },
                                    fontFamily: "Montserrat",
                                }}
                            >
                                {`${dymanicGreeting()}, ${user?.name || ""}! 👋`}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: { xs: "0.2rem", lg: "0.5rem" },
                            }}
                        >
                            <LocationOn sx={{ color: " #F97316" }} />

                        </Box>
                    </Box>
                </Box>
                <NotificationsOutlined
                    sx={{ color: "#4B5563", fontSize: { xs: "2rem", lg: "2.25rem" } }}
                />
            </Box>
            <Box sx={{ marginTop: "2rem" }}>
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
                            fontSize: { xs: "1.2rem", lg: "1.5rem" },
                            fontWeight: 600,
                            fontFamily: "Montserrat",
                        }}
                    >
                        Recommended Meals
                    </Typography>

                </Box>


            </Box>
            <Box sx={{ marginTop: "2rem" }}>
                <Typography
                    sx={{
                        fontSize: { xs: "1.2rem", lg: "1.5rem" },
                        fontWeight: 600,
                        fontFamily: "Montserrat",
                    }}
                >
                    Next Meal
                </Typography>

            </Box>



        </Box>
    );
};

export default Dashboard;
