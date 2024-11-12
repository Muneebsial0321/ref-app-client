import Signup from './Pages/Authentiction/Signup';
import Login from './Pages/Authentiction/Login';
import { BrowserRouter as Router, Route, Routes,  useLocation } from 'react-router-dom';
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
  const token = localStorage.getItem('authToken')
  // console.log("Token of ref is " , token)

  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/forget' && location.pathname !== '/reset' && location.pathname !== '/block' && <Navbar />}
      <Routes>
        {/* Private Routes */}
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forget' element={<ForgetPass/>} />
        <Route path='/reset' element={<ResetPassword/>} />

        {/* Public Routes */}
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
