"use client";
import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";

const Header = () => {
    return (
        <Box sx={{ padding: "0!important", margin: "0!imporant" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: { xs: 'space-between', sm: 'flex-end' },
                    alignItems: "center",
                    background: "#fff",
                    padding: '1rem 3rem 1rem 2rem'
                }}
            >
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <Image
                        src="/logo.png"
                        width={70}
                        height={29}
                        alt="XYZ logo"
                    />
                </Box>

                <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <Image
                        src={"/notification.png"}
                        width={16}
                        height={18}
                        alt="notification"
                        style={{ width: "100%" }}
                    />

                    <Image
                        src={"/profile.png"}
                        width={48}
                        height={48}
                        alt="profile"
                        style={{ borderRadius: "50%" }}
                    />
                    <Image
                        src={"/arrow.png"}
                        width={16}
                        height={16}
                        alt="arrow"
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Header

