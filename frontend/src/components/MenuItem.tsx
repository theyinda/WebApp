import { Box, IconButton, SxProps, Theme, Typography } from "@mui/material";
import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
interface MenuItemProps {
    title: string;
    icon?: Record<string, React.ReactNode>;
    route?: string;
    active?: boolean;
    bookmark?: boolean;
    noHightlight?: boolean;
    onClick?: (name: string, route: string) => void;
    hasChildren?: boolean;
    hasArrow?: boolean;
    sx?: SxProps<Theme>;
}

const MenuItem = ({
    title,
    icon,
    active,
    route,
    bookmark,
    noHightlight,
    onClick,
    hasChildren,
    hasArrow,
    sx,
}: MenuItemProps) => {
    const [menuIcon] = useState<"active" | "default">("default");
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        onClick?.(title, route || "");
        if (hasChildren) {
            setExpanded((prev) => !prev);
        }
    };

    return (
        <Box
            component={"a"}
            href={bookmark ? `#${route}` : undefined}
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.5rem",
                borderRadius: "8px",
                cursor: "pointer",
                justifyContent: "space-between",
                background: noHightlight
                    ? "transparent"
                    : active
                        ? "#408CFF)"
                        : "transparent",
                "&:hover": {
                    background: {
                        lg: noHightlight ? "transparent" : "rgba(255, 237, 213, 0.5)",
                    },
                },
                ...sx,
            }}
            onClick={handleClick}
        >
            {icon && (
                <IconButton
                    sx={{
                        color: active ? "#408CFF" : "#4b5563",
                    }}
                    size="large"
                >
                    {icon?.[menuIcon] || icon?.default}
                </IconButton>
            )}
            <Typography
                sx={{
                    marginRight: "auto",
                    fontSize: { xs: "1rem", lg: "1rem" },
                    fontWeight: 600,
                    fontFamily: "Montserrat",
                    color: active ? "#408CFF" : "#4b5563",
                    "&:hover": {
                        color: {
                            lg: "#408CFF",
                        },
                    },
                }}
            >
                {title}
            </Typography>
            {hasChildren && (
                <IconButton size="small">
                    {!expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
            )}
            {hasArrow && (
                <IconButton size="small">
                    <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
                </IconButton>
            )}
        </Box>
    );
};

export default MenuItem;
