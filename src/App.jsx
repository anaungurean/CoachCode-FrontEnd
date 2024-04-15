import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from "./Pages/SignInPage";
import SignUpPage from './Pages/SignUpPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import ValidateCodePage from './Pages/ValidateCodePage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import ProblemsPage from './Pages/ProblemsPage';
import ProblemPage from './Pages/ProblemPage';

export default function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<SignInPage />} /> 
        <Route path="/signup" element={<SignUpPage />} /> 
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/validate-code" element={<ValidateCodePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />  
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problems/:id" element={<ProblemPage />} />
      </Routes>
    </Router>
  );
}
