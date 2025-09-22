import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import GroupsPage from "./pages/GroupsPage";
import "./styles/auth.css";
import "./styles/toast.css";
import "./styles/groups.css";
import "./styles/skeleton-card.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/groups" element={<GroupsPage />} />

        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
