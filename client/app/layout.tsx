import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: "Cơ điện tử",
  keywords: ['Cơ điện tử', 'Metrachonics', 'Mạch điện', 'Điện tử', 'Thiết k]ế cơ khí', 'Tự động hóa', 'Lập trình nhúng', 'Arduino', 'Raspberry Pi'],
  authors: [{ name: ['Teacher Forwarard', 'Tienalex'], url: 'https://mechatronics-course-site.vercel.app/' }],
  description: 'Là một trang web tổng hợp kiến thức về lĩnh vực cơ - điện tử (Metrachonics). Từ các kiến thức cơ bản về mạch điện, điện tử, thiết kế sản phẩm cơ khí đến mô phỏng lắp ráp, lập trình điều khiển tự động hóa, lập trình nhúng... !'
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