import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./components/User/UserList";
import Grammage from './pages/Grammage'
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />} />
          <Route path="/shift" element={<UserList />} />
          <Route path="/grammage" element={<Grammage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
