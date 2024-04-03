import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import

import SignInPage from "./Pages/SignInPage";
import SignUpPage from './Pages/SignUpPage';

export default function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<SignInPage />} /> 
        <Route path="/signup" element={<SignUpPage />} /> 
      </Routes>
    </Router>
  );
}
