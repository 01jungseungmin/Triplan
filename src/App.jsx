import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main'; 
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main/>}/>

        <Route path='/Login' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
