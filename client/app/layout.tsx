import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: "Tài liệu Cơ - Điện tử",
  description: "Tổng hợp kiến thức về cơ - điện tử (Metrachonics), từ mạch điện, điện tử, thiết kế cơ khí đến lập trình nhúng và tự động hóa.",
  openGraph: {
    title: "Tài liệu Cơ - Điện tử",
    description: "Tổng hợp kiến thức về cơ - điện tử (Metrachonics), từ mạch điện, điện tử, thiết kế cơ khí đến lập trình nhúng và tự động hóa.",
    url: "https://tailieucodientu.com",
    siteName: "Tài liệu Cơ - Điện tử",
    type: "website",
  },
  keywords: ['Cơ điện tử', 'Metrachonics', 'Mạch điện', 'Điện tử', 'Thiết kế cơ khí', 'Tự động hóa', 'Lập trình nhúng', 'Arduino', 'Raspberry Pi'],
  authors: [{ name: ['Teacher Forwarard', 'Tienalex'], url: 'https://tailieucodientu.com/' }],
  creator: 'Tienalex',

  
};

export default function RootLayout({
  children, 
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className= "min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar/>
          <main className= 'flex-1'>{children}</main>     
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}