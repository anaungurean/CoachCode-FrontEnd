import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from "./Scripts/SignInFolder/SignInPage";
import SignUpPage from './Scripts/SignUpFolder/SignUpPage';
import ForgotPasswordPage from './Scripts/ForgotPasswordFolder/ForgotPasswordPage';
import ValidateCodePage from './Scripts/ValidateCodeFolder/ValidateCodePage';
import ResetPasswordPage from './Scripts/ResetPasswordFolder/ResetPasswordPage'
import ProblemsPage from './Scripts/ProblemsFolder/ProblemsPage';
import ProblemPage from './Scripts/ProblemFolder/ProblemPage';
import SubmissionsPage from './Scripts/SubmissionsFolder/SubmissionsPage';
import MyProfile from './Scripts/MyProfileUserFolder/MyProfile';
import SearchJobPage from './Scripts/SearchJobFolder/SearchJobPage';
import JobProfilePage from './Scripts/SearchJobFolder/JobProfilePage';
import Community from './Scripts/CommunityFolder/CommunityPage';
import UserProfile from './Scripts/AnotherProfileUser/AnotherProfile';
import CreateCVPage from './Scripts/CreateCVFolder/CreateCVPage';

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
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/search-job" element={<SearchJobPage />} />
        <Route path="/job-profile/:job_id" element={<JobProfilePage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="/create-cv" element={<CreateCVPage />} />
      </Routes>
    </Router>
  );
}
