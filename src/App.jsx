import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import

import SignInPage from "./Pages/SignInPage";
import SignUpPage from './Pages/SignUpPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';

export default function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<SignInPage />} /> 
        <Route path="/signup" element={<SignUpPage />} /> 
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
}
