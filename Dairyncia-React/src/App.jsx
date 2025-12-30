import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./components/pages/Home";
import { Layout } from './components/Layouts/Layout';
import { Signup } from './components/pages/SignUp';
import { Login } from './components/pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App
