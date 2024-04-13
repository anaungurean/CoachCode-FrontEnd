import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from "./Pages/SignInPage";
import SignUpPage from './Pages/SignUpPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import ValidateCodePage from './Pages/ValidateCodePage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import ProblemsPage from './Pages/ProblemsPage';
import ProblemPage from './Pages/ProblemPage'; // Import the ProfilePage component

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
        <Route path="/problems/:problemId" element={<ProblemPage />} /> {/* New route for profile page */}
      </Routes>
    </Router>
  );
}
