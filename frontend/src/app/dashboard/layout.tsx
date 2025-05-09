"use client";
import React from "react";
import {
    Box,
    Drawer,
    List,

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
    // const [profileOpen, setProfileOpen] = useState(false);
    // const [mobileNav, setMobileNav] = useState(0);

    // const [isMobile, setIsMobile] = useState(false);

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         const handleResize = () => {
    //             // setIsMobile(window.innerWidth <= 600);

    //             if (window.innerWidth > 600 && pathname === "/profile") {
    //                 router.push("/profile/info");
    //                 setProfileOpen(true);
    //             }
    //         };

    //         setIsMobile(window.innerWidth <= 600);
    //         if (pathname.startsWith("/profile")) {
    //             setProfileOpen(true);
    //         }

    //         window.addEventListener("resize", handleResize);

    //         return () => window.removeEventListener("resize", handleResize);
    //     }
    // }, [pathname, router]);

    // const handleMenuClick = (title: string, route: string) => {
    //     if (title === "Profile") {
    //         if (isMobile) {
    //             router.push("/profile");
    //         } else {
    //             router.push("/profile/info");
    //             setProfileOpen(!profileOpen);
    //         }
    //     } else {
    //         router.push(route);
    //     }
    // };

    const handleLogout = async () => {
        await fetch("/api/auth/logout");
        router.push("/");
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
                            width={120}
                            height={50}
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


        </Box>
    );
}
