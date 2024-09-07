import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main'; 
import Login from './pages/Login/Login';
import Join from './pages/Join/Join';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main/>}/>

        <Route path='/Login' element={<Login/>}/>
        <Route path='/Join' element={<Join/>}/>
      </Routes>
    </Router>
  );
}

export default App;
