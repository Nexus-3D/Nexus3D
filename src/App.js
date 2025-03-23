import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import MarketplacePage from './pages/MarketplacePage';
import AssetDetailsPage from './pages/AssetDetailsPage';
import ProfilePage from './pages/ProfilePage';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/asset/:id" element={<AssetDetailsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App; 