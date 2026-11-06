import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Hemanth Sreenivas Uppala | Cloud Engineer & Full Stack Developer",
  description: "Portfolio of Hemanth Sreenivas Uppala, aspiring Cloud Engineer and Full Stack Developer. Developing secure cloud architectures, IoT data platforms, and MERN applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
