import './globals.css';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: 'Teacher Forward',
  description: 'Self-taught and reference documentations!'
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
          <footer className='p-4 bg-gray-200 text-center'>
          @ {new Date().getFullYear()} Teacher Forward
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}