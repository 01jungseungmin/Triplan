import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Join from './pages/Join/Join';
import PlaceBoard from './pages/PlaceBoard/PlaceBoard';
import PlaceDetail from './pages/PlaceDetail/PlaceDetail';
import Mypage from './pages/Mypage/Mypage';
import MyTrip from './pages/MyTrip/MyTrip';
import MyTripDetail from './pages/MyTripDetail/MyTripDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />

        <Route path='/Login' element={<Login />} />
        <Route path='/Join' element={<Join />} />
        <Route path='/MyTrip' element={<MyTrip />} />
        <Route path='/crew/list/:crewId' element={<MyTripDetail />} />
        <Route path='/Mypage' element={<Mypage />} />
        <Route path='/PlaceBoard' element={<PlaceBoard />} />
        <Route path='/place/:name' element={<PlaceDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
