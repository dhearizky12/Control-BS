import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./components/User/UserList";
import AddUser from "./components/User/AddUser";
import EditUser from "./components/User/EditUser";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />} />
          <Route path="/shift" element={<UserList />} />
          <Route path="/gramasi" element={<UserList />} />
        </Route>
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
