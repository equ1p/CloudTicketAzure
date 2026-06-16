import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import TicketDetailPage from './pages/TicketDetailPage';
import MyOrdersPage from './pages/MyOrdersPage';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<TicketDetailPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/purchase-success" element={<PurchaseSuccessPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
