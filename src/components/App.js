import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from '../context/WalletContext';
import { NotificationProvider } from '../context/NotificationContext';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import HomePage from './homepage/HomePage';
import CreatePage from './editor/CreatePage';
import ErrorBoundary from './common/ErrorBoundary';
import MarketplacePage from './marketplace/MarketplacePage';
import ProfilePage from './profile/ProfilePage';
import LoginPrompt from './auth/LoginPrompt';
import NotFoundPage from './common/NotFoundPage';

const App = () => {
  return (
    <ErrorBoundary>
      <WalletProvider>
        <NotificationProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/create" element={<CreatePage />} />
                  <Route path="/marketplace" element={<MarketplacePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/login" element={<LoginPrompt />} />
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </NotificationProvider>
      </WalletProvider>
    </ErrorBoundary>
  );
};

export default App;