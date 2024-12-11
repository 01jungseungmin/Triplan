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
import CommunityBoard from './pages/Community/CommunityBoard/CommunityBoard';
import CommunityDetail from './pages/Community/CommunityDetail/CommunityDetail';
import CommunityWrite from './pages/Community/CommunityWrite/CommunityWrite';
import AdminPlaceList from './pages/Admin/AdminPlaceList/AdminPlaceList';
import AdminCommunity from './pages/Admin/AdminCommunity/AdminCommunity';
import AdminPlaceDetail from './pages/Admin/AdminPlaceList/AdminPlaceDetail';
import AdminCommunityDetail from './pages/Admin/AdminCommunity/AdminCommunityDetail';
import AdminPlaceAdd from './pages/Admin/AdminPlaceAdd/AdminPlaceAdd';
import AdminPlaceModify from './pages/Admin/AdminPlaceModify/AdminPlaceModify';
import UnauthorizedPage from './pages/UnauthorizedPage';
import AdminRoute from './components/AdminRoute';

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
        <Route path='/place/details/:placeId' element={<PlaceDetail />} />
        <Route path='/community' element={<CommunityBoard />} />
        <Route path='/api/boards/:boardId' element={<CommunityDetail />} />
        <Route path='/write' element={<CommunityWrite />} />
        <Route path="/write/:crewId" element={<CommunityWrite />} />
        <Route path='/unauthorized' element={<UnauthorizedPage />} /> {/* 권한 없음 페이지 */}

        {/* 관리자 전용 경로 */}
        <Route
          path='/admin/place/list'
          element={
            <AdminRoute>
              <AdminPlaceList />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/community/list'
          element={
            <AdminRoute>
              <AdminCommunity />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/place/details/:placeId'
          element={
            <AdminRoute>
              <AdminPlaceDetail />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/community/details/:communityId'
          element={
            <AdminRoute>
              <AdminCommunityDetail />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/place/add'
          element={
            <AdminRoute>
              <AdminPlaceAdd />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/place/edit/:placeId"
          element={
            <AdminRoute>
              <AdminPlaceModify />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
