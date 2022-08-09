import { Navigate, Outlet } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

const ProtectedRoute = () => {
  const { user } = useSocket();

  return user ? <Outlet /> : <Navigate to={'/login'} replace />;
};
export default ProtectedRoute;
