import Signup from './Pages/Authentiction/Signup';
import Login from './Pages/Authentiction/Login';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import './assets/style/navbar.css';
import Home from './Pages/Home/Home';
import Wallet from './Pages/Wallet/Wallet';
import Ledger from './Pages/Ledger/Ledger';
import Profile from './Pages/profile/Profile';
import Task from './Pages/task/Task';
import Block from './component/Block';
import './App.css';
import ForgetPass from './Pages/Authentiction/ForgetPassword';
import  ResetPassword  from './Pages/Authentiction/ResetPassword';

function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

function Content() {
  const location = useLocation();

  return (
    <>
      {/* Show Navbar only when the path is not /login or /signup */}
      {location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/block' && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forget' element={<ForgetPass/>} />
        <Route path='/reset' element={<ResetPassword/>} />

        {/* Private Routes */}
        <Route path='/home' element={<Home />} />
        <Route path='/ledger' element={<Ledger />} />
        <Route path='/wallet' element={<Wallet />} />
        <Route path='/task' element={<Task />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/block' element={<Block />} />
      </Routes>
    </>
  );
}

export default App;
