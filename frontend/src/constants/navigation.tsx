import React from "react";
import Image from "next/image";


export const DashboardNav = [
    {
        title: "Overview",
        route: "/dashboard",
        icon: {
            default: <Image src="/sales.png" alt="Overview" width={24} height={24} />,
            active: <Image src="/sales.png" alt="Overview" width={24} height={24} style={{ color: "#F97316", background: '"#F97316"' }} />,
        },
    },
    {
        title: "Sales",
        route: "#",
        icon: {
            default: <Image src="/sales.png" alt="Sales" width={24} height={24} />,
            active: <Image src="/sales.png" alt="Sales" width={24} height={24} style={{ color: "#F97316" }} />,
        },
    },
    {
        title: "Customers",
        route: "/customers",
        icon: {
            default: <Image src="/calendar.png" alt="Customers" width={24} height={24} />,
            active: <Image src="/calendar.png" alt="Customers" width={24} height={24} style={{ color: "#F97316" }} />,
        },
    },
    {
        title: "Inventory",
        route: "/inventory",
        icon: {
            default: <Image src="/history.png" alt="Inventory" width={24} height={24} />,
            active: <Image src="/history.png" alt="Inventory" width={24} height={24} style={{ color: "#F97316" }} />,
        },
    },
    {
        title: "Profit/Loss",
        route: "/gain",
        icon: {
            default: <Image src="/star.png" alt="Sales" width={24} height={24} />,
            active: <Image src="/star.png" alt="Sales" width={24} height={24} style={{ color: "#F97316" }} />,
        },
    },

];
