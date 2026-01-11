import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "Efrei Games Week",
    description: "Site de l'association Efrei Games Week",
};

const hungryFont = localFont({
    src: [
        {
            path: "../../public/fonts/Hungry-7.ttf",
            weight: "200",
        },
    ],
    variable: "--font-hungry",
});

export default function RootLayout({ children }) {
    return (
        <html lang="fr" className={`w-full ${hungryFont.variable}`}>
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
