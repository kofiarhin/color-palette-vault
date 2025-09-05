import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  return (
    <section style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Dashboard</h1>
      <p>Welcome {user?.name}</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </section>
  );
};

export default Dashboard;
