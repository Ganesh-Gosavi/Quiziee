import { Route, Routes } from 'react-router-dom';
import './App.css';

import DashBoard from './pages/DashBoard';
import OpenRoute from './components/auth/OpenRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import TrendingQuiz from './components/dashboard/TrendingQuiz';
import QuizsAnalytics from './components/dashboard/analytics/QuizsAnalytics';
import QuizAnalytics from './components/dashboard/analytics/QuizAnalytics';
import QuizTest from './pages/QuizTest';
import Homepage from './pages/Homepage';
import Error from './pages/Error';

function App() {
  return (
    <div>
      <Routes>
        {/* OpenRoute allows access to routes that don't require authentication */}
        <Route 
          path='/'
          element={
            <OpenRoute>
              <Homepage/>
            </OpenRoute>
          }
        />
        
        {/* PrivateRoute protects routes that require authentication */}
        <Route
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        >
          {/* Nested routes under /dashboard path */}
          <Route path="/dashboard" element={<TrendingQuiz />} />
          <Route path="/dashboard/quizzes" element={<QuizsAnalytics />} />
          <Route path="/dashboard/quizzes/:quizId" element={<QuizAnalytics />} />
        </Route>
        
        {/* Route for taking a quiz test */}
        <Route path="/quizTest/:quizId" element={<QuizTest />} />
        
        {/* Route for handling 404 errors */}
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
