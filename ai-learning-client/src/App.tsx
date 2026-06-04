import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import DocumentListPage from "./pages/documents/DocumentListPage";
import DocumentDetailPage from "./pages/documents/DocumentDetailPage";
import FlashCardListPage from "./pages/FlashCards/FlashCardListPage";
import FlashCardPage from "./pages/FlashCards/FlashCardPage";
import QuizTakePage from "./pages/Quizzes/QuizTakePage";
import ProfilePage from "./pages/Profile/ProfilePage";

function App() {

  const isAuthenticated = false;
  const loading = false;

  if (loading) {
    return (
    <div className="flex items-center justify-center h-screen">
      <p>Loading...</p>
    </div>
    )
  }
  

  return (
    <Router>
      <Routes>
        <Route path="/"
        element={isAuthenticated ? <Navigate to= "/Dashboard" replace /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<DocumentListPage />} />
          <Route path="/documents/:id" element={<DocumentDetailPage  />} />
          <Route path="/flashcards" element={<FlashCardListPage />} />
          <Route path="/flashcards/:id" element={<FlashCardPage />} />
          <Route path="/quizzes/:id" element={<QuizTakePage />} />
          <Route path="/quizzes/:id/results" element={<QuizTakePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
