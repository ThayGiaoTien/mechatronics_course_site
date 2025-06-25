import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import Image from 'next/image';

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
  keywords: ["Mạch khuếch đại", "Mạch DC", "Điện trường", "Từ trường", "Mạch Analog", "Mạch AC", "Mạch Digital", "Máy điện", "Điện tử công suất", "Cung cấp điện", "Lý thuyết điều khiển"],
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
      
      <head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />
        <meta name="author" content={metadata.authors.map(author => author.name).join(', ')} />
        <meta name="og:title" content={metadata.openGraph.title} />
        <meta name="og:description" content={metadata.openGraph.description} />
        <meta name="og:url" content={metadata.openGraph.url} />
        <meta name="og:site_name" content={metadata.openGraph.siteName} />
        <meta name="og:type" content={metadata.openGraph.type} />
    
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2664684964953851"
     crossOrigin="anonymous">

        </script>

      </head>
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