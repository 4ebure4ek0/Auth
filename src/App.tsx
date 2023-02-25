import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import authStore from './stores/authStore';
import { Routes, Route, Link } from 'react-router-dom';
import CurrenciesPage from './pages/CurrenciesPage';
import { type ReactElement } from 'react';

function App(): ReactElement {
  return (
    <div className="container">
      <header>
        <Link className="menu_bar" to="/profile">
          Profile
        </Link>
        <Link className="menu_bar" to="currencies">
          Currencies
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<AuthPage store={authStore} />} />
        <Route path="/profile" element={<ProfilePage store={authStore} />} />
        <Route path="currencies" element={<CurrenciesPage store={authStore} />} />
      </Routes>
    </div>
  );
}

export default App;
