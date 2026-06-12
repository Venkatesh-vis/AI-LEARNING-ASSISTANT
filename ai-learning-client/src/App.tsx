import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LandingPage from "./pages/landingpage/LandPage";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import DocumentListPage from "./pages/documents/DocumentListPage";
import DocumentDetailPage from "./pages/documents/DocumentDetailPage";
import FlashCardListPage from "./pages/FlashCards/FlashCardListPage";
import FlashCardPage from "./pages/FlashCards/FlashCardPage";
import QuizTakePage from "./pages/Quizzes/QuizTakePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { checkAuth } from "./features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "./features/hooks/reduxHooks";
import Spinner from "./components/shared/Spinner";

function App() {
  const dispatch = useAppDispatch();

  const { isAuthenticated, loading, } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <Spinner/>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={isAuthenticated ? (<Navigate to="/dashboard" replace />) : (<LandingPage />)} />

        {/* Public Routes */}
        <Route path="/login" element={isAuthenticated ? (<Navigate to="/dashboard" replace />) : (<LoginPage />)} />
        <Route path="/register" element={isAuthenticated ? (<Navigate to="/dashboard" replace />) : (<RegisterPage />)} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<DocumentListPage />} />
          <Route path="/documents/:id" element={<DocumentDetailPage />} />
          <Route path="/flashcards" element={<FlashCardListPage />} />
          <Route path="/flashcards/:id" element={<FlashCardPage />} />
          <Route path="/quizzes/:id" element={<QuizTakePage />} />
          <Route path="/quizzes/:id/results" element={<QuizTakePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>


  );
}

export default App;
