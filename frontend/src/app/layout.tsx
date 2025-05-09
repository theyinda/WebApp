"use client";

import { Montserrat, Poppins } from "next/font/google";
import "@/styles/global.css";
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { Toaster } from "react-hot-toast";
// import { usePathname } from "next/navigation";

// const pathname = usePathname();

// const isDashboardRoute = pathname !== "/authentication" && pathname !== "/";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${montserrat.variable} ${poppins.variable}`} lang="en">
      <body>
        <Provider store={store}>
          <Toaster />
          {/* {!isDashboardRoute && <Header />} */}
          <main>{children}</main>
          {/* {!isDashboardRoute && <Footer />} */}
        </Provider>
      </body>
    </html>
  );
}
