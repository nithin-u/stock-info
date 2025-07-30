import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import PennyStocks from './pages/PennyStocks';
import MutualFunds from './pages/MutualFunds';
import MutualFundDetails from './pages/MutualFundDetails';
import StockDetails from './pages/StockDetails';
import AboutPage from './pages/AboutPage';
import Watchlist from './pages/Watchlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/penny-stocks" element={
            <ProtectedRoute>
              <Layout>
                <PennyStocks />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/mutual-funds" element={
            <ProtectedRoute>
              <Layout>
                <MutualFunds />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/stock/:ticker" element={
            <ProtectedRoute>
              <Layout>
                <StockDetails />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <Layout>
                <AboutPage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/watchlist" element={
            <ProtectedRoute>
              <Layout>
                <Watchlist />
              </Layout>
            </ProtectedRoute>
          } />
           <Route path="/mutual-fund/:schemeCode" element={<MutualFundDetails />} />
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
