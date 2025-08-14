import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbr from "./Mynavbar";
import Login from "./Login";
import Dbord from "./Dbord";
import All_transaction from "./All_transaction";
import To_do_list from "./To_do_list";


function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}


function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const hideFooterRoutes = ["/"];

  return (
    <>
      <Navbr />
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/Home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dbord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/All_transaction"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <All_transaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/To_do_list"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <To_do_list />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}

export default App;
