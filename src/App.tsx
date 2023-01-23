import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import logStore from './components/logStore';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<AuthPage store={logStore} />} />
            <Route path='/profile' element={<ProfilePage store={logStore}/>} />
        </Routes>
    </div>
  );
}

export default App;
