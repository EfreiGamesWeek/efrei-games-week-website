import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "Efrei Games Week",
    description: "Site de l'association Efrei Games Week",
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr" className="w-full">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
