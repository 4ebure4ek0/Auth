import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import authStore from './stores/authStore';
import { Routes, Route } from 'react-router-dom';
import CurrenciesPage from './pages/CurrenciesPage';
import { type ReactElement } from 'react';
import currenciesStore from './stores/currenciesStore';
import productsStore from './stores/productsStore';
import ProductsPage from './pages/ProductsPage';
import Layout from './components/layout';

function App(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<AuthPage store={authStore} />} />
        <Route path="/profile" element={<ProfilePage store={authStore} />} />
        <Route
          path="currencies"
          element={<CurrenciesPage store={authStore} currencies={currenciesStore} />}
        />
        <Route
          path="/products"
          element={<ProductsPage store={authStore} products={productsStore} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
