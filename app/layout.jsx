import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

export const metadata = {
  title: "PropertyPulse | Find the perfect rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
