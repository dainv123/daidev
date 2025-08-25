import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import Script from "next/script";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { AuthProvider } from "../contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DaiDev Portfolio - Professional Web Developer",
  description:
    "Portfolio website showcasing web development projects, themes, and professional experience",
  keywords: "web developer, portfolio, themes, react, next.js, typescript",
  authors: [{ name: "Dai Nguyen" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Template CSS Files */}
        <link rel="stylesheet" href="/assets/web/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/web/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/web/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/assets/web/css/lightcase.min.css" />
        <link rel="stylesheet" href="/assets/web/css/fontawesome.min.css" />
        <link rel="stylesheet" href="/assets/web/css/linearicons.min.css" />
        <link rel="stylesheet" href="/assets/web/css/pe-icon-7-stroke.min.css" />
        <link rel="stylesheet" href="/assets/web/css/style.css" />
      </head>
      <body className={inter.className}>
        {/* Preloader */}
        <div id="preloader">
          <div id="preloader-circle">
            <span></span>
            <span></span>
          </div>
        </div>

        <AuthProvider>
          <div className="wrapper-page">{children}</div>
        </AuthProvider>

        {/* Language Switcher */}
        {/* <LanguageSwitcher /> */}
        {/* Google Maps */}
        <Script
          src={`https://maps.google.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=en`}
          strategy="afterInteractive"
        />

        {/* Template JS Files */}
        <Script src="/assets/web/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/assets/web/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script
          src="/assets/web/js/owl.carousel.min.js"
          strategy="afterInteractive"
        />
        <Script src="/assets/web/js/typed.min.js" strategy="afterInteractive" />
        <Script src="/assets/web/js/lightcase.min.js" strategy="afterInteractive" />
        <Script
          src="/assets/web/js/jquery.isotope.min.js"
          strategy="afterInteractive"
        />
        <Script src="/assets/web/js/wow.min.js" strategy="afterInteractive" />
        <Script src="/assets/web/js/common.js" strategy="afterInteractive" />
        <Script src="/assets/web/js/util.js" strategy="afterInteractive" />
        <Script src="/assets/web/js/stats.js" strategy="afterInteractive" />
        <Script src="/assets/web/js/onion.js" strategy="afterInteractive" />
        <Script src="/assets/web/js/map.js" strategy="afterInteractive" />
        <Script src="/assets/web/js/marker.js" strategy="afterInteractive" />
        
        {/* Load init.js last to ensure all dependencies are loaded */}
        <Script 
          src="/assets/web/js/init.js" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
