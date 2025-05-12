"use client";
import React, { useEffect, useState } from "react";
import {
    Box,
    Drawer,
    List,
    BottomNavigation,
    BottomNavigationAction,
    Paper,
} from "@mui/material";
import Image from "next/image";
import { DashboardNav } from "@/constants/navigation";
import MenuItem from "@/components/MenuItem";
import { usePathname, useRouter } from "next/navigation";
import { Logout } from "@mui/icons-material";

const drawerWidth = 260;


export default function DashboardRouteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const API = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileNav, setMobileNav] = useState(0);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                // setIsMobile(window.innerWidth <= 600);

                if (window.innerWidth > 600 && pathname === "/profile") {
                    router.push("/profile/info");
                    setProfileOpen(true);
                }
            };

            setIsMobile(window.innerWidth <= 600);
            if (pathname.startsWith("/profile")) {
                setProfileOpen(true);
            }

            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
        }
    }, [pathname, router]);

    const handleMenuClick = (title: string, route: string) => {
        if (title === "Profile") {
            if (isMobile) {
                router.push("/profile");
            } else {
                router.push("/profile/info");
                setProfileOpen(!profileOpen);
            }
        } else {
            router.push(route);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${API}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                localStorage.removeItem('user');
                router.push("/");
            } else {
                console.error('Logout failed:', await response.json());
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                variant="permanent"
                sx={{

                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                open
            >
                <Box
                    sx={{
                        padding: "1rem 0",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            padding: "1rem ",
                        }}
                    >
                        <Image
                            src="/logo.png"
                            width={70}
                            height={29}
                            alt="XYZ logo"
                            onClick={() => router.push("/")}
                            style={{
                                cursor: "pointer",
                            }}
                        />
                    </Box>

                    <List>
                        {DashboardNav.map((item) => (
                            <React.Fragment key={item.title}>
                                <MenuItem
                                    title={item.title}
                                    icon={item.icon}
                                    route={item.route}
                                    active={pathname === item.route}
                                    noHightlight={false}
                                // onClick={handleMenuClick}

                                />


                            </React.Fragment>
                        ))}
                    </List>
                    <Box
                        sx={{
                            marginTop: "auto",
                        }}
                    >
                        <MenuItem
                            title="Settings"
                            icon={{ default: <Image src="/settings.png" alt="Settings" width={24} height={24} />, }}
                            noHightlight={false}
                            onClick={handleLogout}
                        />
                        <MenuItem
                            title="Logout"
                            icon={{ default: <Logout /> }}
                            noHightlight={false}
                            onClick={handleLogout}
                        />
                    </Box>
                </Box>
            </Drawer>

            <Box
                component="main"
                sx={{

                    pb: "4rem",
                    backgroundColor: "#F8FAFC",
                    marginLeft: "auto",
                    width: { xs: "100%", sm: `calc(100vw - ${drawerWidth}px)` },
                    overflowY: "auto",
                    height: "100vh",
                    scrollBehavior: "smooth",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    position: "relative",
                }}
            >
                {children}
            </Box>
            {/* {(pathname === "/profile" || !pathname?.match("/profile/*")) && ( */}
            <Paper
                sx={{
                    display: { xs: "block", sm: "none" },
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    zIndex: 1000,
                }}
                elevation={1}
            >
                <BottomNavigation
                    value={mobileNav}
                    onChange={(_, newValue) => setMobileNav(newValue)}
                    showLabels
                >
                    {DashboardNav.map((item) => (
                        <BottomNavigationAction
                            sx={{
                                color:
                                    pathname === item.route
                                        ? 'red'
                                        : "#4b5563 !important",
                                "& .MuiBottomNavigationAction-label": {
                                    fontSize: "11px",
                                    margin: 0,
                                },
                            }}
                            key={item.title}
                            label={item.title}
                            icon={item.icon.default}
                            onClick={() => handleMenuClick(item.title, item.route)}
                        />
                    ))}
                </BottomNavigation>
            </Paper>
            {/* )} */}

        </Box>
    );
}
