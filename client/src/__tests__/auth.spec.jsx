import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import PrivateRoute from '../components/PrivateRoute.jsx';

const server = setupServer(
  rest.get('/api/auth/me', (_req, res, ctx) => res(ctx.status(401))),
  rest.post('/api/auth/login', (_req, res, ctx) =>
    res(ctx.json({ user: { id: '1', name: 'Test', email: 'test@example.com' } }))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders login form', () => {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    </AuthProvider>
  );
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
});

test('successful login flow', async () => {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
  await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
  await userEvent.type(screen.getByPlaceholderText(/password/i), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /login/i }));
  await waitFor(() => expect(screen.getByText(/dashboard/i)).toBeInTheDocument());
});

test('displays error on failed login', async () => {
  server.use(
    rest.post('/api/auth/login', (_req, res, ctx) => res(ctx.status(400), ctx.json({ message: 'Invalid credentials' })))
  );
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    </AuthProvider>
  );
  await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
  await userEvent.type(screen.getByPlaceholderText(/password/i), 'wrongpass');
  await userEvent.click(screen.getByRole('button', { name: /login/i }));
  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials'));
});

test('PrivateRoute blocks unauthenticated user', async () => {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
  await waitFor(() => expect(screen.getByText('Login Page')).toBeInTheDocument());
});
