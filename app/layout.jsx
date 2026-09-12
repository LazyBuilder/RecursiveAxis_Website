import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ModalProvider } from '../components/ModalProvider';

export const metadata = {
  title: 'Recursive Axis | Technology, Analytics & Innovation',
  description: 'Your expert Tech Strategy and Execution partner. Get CPO/CTO advisory, technical due diligence, and innovation program design.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ModalProvider>
          <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ModalProvider>
      </body>
    </html>
  );
}
