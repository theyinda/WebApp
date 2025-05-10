"use client";
import React from "react";
import { Box, Typography, Chip, Divider } from "@mui/material";
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

interface Metric {
    label: string;
    value: string;
    percentage: number;
}

interface DashboardCardProps {
    data: Metric[];
}

const DashboardCard = ({ data }: DashboardCardProps) => {
    //   const theme = useTheme();

    const getChip = (percent: number) => {
        const isPositive = percent >= 0;
        return (
            <Chip
                label={`${Math.abs(percent)}%`}
                icon={isPositive ? <NorthIcon sx={{ color: '#24D164 !important', fontSize: '1rem' }} /> : <SouthIcon sx={{ color: '#ED4F9D !important', fontSize: 'small' }} />}
                sx={{
                    backgroundColor: isPositive ? "#F0FDF4" : "#FDF2F8",
                    color: isPositive ? "#24D164" : "#ED4F9D",
                    fontWeight: 600,
                    height: '24px',
                    fontSize: '0.75rem',
                    "& .MuiChip-icon": {
                        fontSize: '12px',
                    }


                }}
                size="small"
            />
        );
    };

    return (
        <Box
            sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                padding: "1.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: "1rem", md: "0" },
            }}
        >
            {data?.map((item, index) => (
                <React.Fragment key={item.label}>
                    {index > 0 && (
                        <Divider
                            orientation="vertical"

                            flexItem
                            sx={{ display: { xs: "none", md: "block" }, mx: 3, color: '#E2E8F0' }}
                        />
                    )}
                    <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                        <Typography
                            sx={{
                                fontSize: "0.875rem",
                                color: "#64748B",
                                lineHeight: "160%",
                                fontWeight: 600,
                                marginBottom: "0.25rem",
                            }}
                        >
                            {item.label}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "start" }, gap: "0.5rem" }}>
                            <Typography
                                sx={{
                                    fontSize: "1.25rem",
                                    fontWeight: 700,
                                    color: "#0F172A",
                                    lineHeight: "125%",
                                }}
                            >
                                {item.value}
                            </Typography>
                            {getChip(item.percentage)}
                        </Box>
                    </Box>
                </React.Fragment>
            ))}
        </Box>
    );
};

export default DashboardCard;