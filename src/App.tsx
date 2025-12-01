import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ApplicationPage from './components/ApplicationPage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import DemoPage from './components/DemoPage';
import SecurityPage from './components/SecurityPage';
import ClientDashboard from './components/ClientDashboard';
import ClientProfile from './components/ClientProfile';
import ClientAnalytics from './components/ClientAnalytics';
import ClientReports from './components/ClientReports';
import MyAgentPage from './components/MyAgentPage';
import SavedPropertiesPage from './components/SavedPropertiesPage';
import InvitationsPage from './components/InvitationsPage';
import AccountPage from './components/AccountPage';
import SettingsPage from './components/SettingsPage';
import BrokerDashboard from './components/BrokerDashboard';
import BrokerListingsPage from './components/BrokerListingsPage';
import BrokerAddListing from './components/BrokerAddListing';
import BrokerLeadsPage from './components/BrokerLeadsPage';
import BrokerBuyersPage from './components/BrokerBuyersPage';
import BrokerContractsPage from './components/BrokerContractsPage';
import BrokerNDAs from './components/BrokerNDAs';
import BrokerInvitations from './components/BrokerInvitations';
import BrokerProfile from './components/BrokerProfile';
import BrokerMarketplace from './components/BrokerMarketplace';
import BrokerAccount from './components/BrokerAccount';
import BrokerSettings from './components/BrokerSettings';
import BrokerAnalytics from './components/BrokerAnalytics';
import BrokerReports from './components/BrokerReports';
import AdminDashboard from './components/AdminDashboard';
import AdminApprovals from './components/AdminApprovals';
import AdminListingReviews from './components/AdminListingReviews';
import AdminUsers from './components/AdminUsers';
import AdminDocuments from './components/AdminDocuments';
import AdminAnalytics from './components/AdminAnalytics';
import AdminSupport from './components/AdminSupport';
import AdminAudit from './components/AdminAudit';
import AdminProfile from './components/AdminProfile';
import AdminAccount from './components/AdminAccount';
import AdminSettings from './components/AdminSettings';
import AdminReports from './components/AdminReports';
import AdminMarketplace from './components/AdminMarketplace';
import AdminFinancials from './components/AdminFinancials';
import MarketplacePage from './components/MarketplacePage';
import ListingDetailPage from './components/ListingDetailPage';
import DocumentsPage from './components/DocumentsPage';
import RequestHelpPage from './components/RequestHelpPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'client' | 'broker' | 'admin' | null>(null);

  const handleLogin = (role: 'client' | 'broker' | 'admin') => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/apply" element={<ApplicationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/security" element={<SecurityPage />} />
        
        {/* Client Routes */}
        <Route 
          path="/client/dashboard" 
          element={isAuthenticated && userRole === 'client' ? 
            <ClientDashboard onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/client/profile" 
          element={isAuthenticated && userRole === 'client' ? 
            <ClientProfile onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/client/analytics" 
          element={isAuthenticated && userRole === 'client' ? 
            <ClientAnalytics onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/client/reports" 
          element={isAuthenticated && userRole === 'client' ? 
            <ClientReports onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/client/marketplace" 
          element={isAuthenticated && userRole === 'client' ? 
            <MarketplacePage userRole="client" onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/client/listing/:id" 
          element={isAuthenticated && userRole === 'client' ? 
            <ListingDetailPage userRole="client" onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/client/documents" 
          element={isAuthenticated && userRole === 'client' ? 
            <DocumentsPage userRole="client" onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/client/help" 
          element={isAuthenticated && userRole === 'client' ? 
            <RequestHelpPage userRole="client" onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/client/agent" 
          element={isAuthenticated && userRole === 'client' ? 
            <MyAgentPage onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/client/invitations" 
          element={isAuthenticated && userRole === 'client' ? 
            <InvitationsPage onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/client/account" 
          element={isAuthenticated && userRole === 'client' ? 
            <AccountPage onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/client/settings" 
          element={isAuthenticated && userRole === 'client' ? 
            <SettingsPage onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/client/saved" 
          element={isAuthenticated && userRole === 'client' ? 
            <SavedPropertiesPage onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        
        {/* Broker Routes */}
        <Route 
          path="/broker/dashboard" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerDashboard onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/listings" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerListingsPage onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/add-listing" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerAddListing onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/leads" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerLeadsPage onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/buyers" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerBuyersPage onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/contracts" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerContractsPage onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/ndas" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerNDAs onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/invitations" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerInvitations onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/documents" 
          element={isAuthenticated && userRole === 'broker' ? 
            <DocumentsPage userRole="broker" onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/help" 
          element={isAuthenticated && userRole === 'broker' ? 
            <RequestHelpPage userRole="broker" onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/profile" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerProfile onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/marketplace" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerMarketplace onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/account" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerAccount onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/settings" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerSettings onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/analytics" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerAnalytics onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/broker/reports" 
          element={isAuthenticated && userRole === 'broker' ? 
            <BrokerReports onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminDashboard onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/approvals" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminApprovals onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/listing-reviews" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminListingReviews onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/users" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminUsers onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/documents" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminDocuments onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/analytics" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminAnalytics onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/support" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminSupport onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/audit" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminAudit onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/profile" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminProfile onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/account" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminAccount onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/settings" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminSettings onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/reports" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminReports onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/marketplace" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminMarketplace onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/financials" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminFinancials onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />

        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}