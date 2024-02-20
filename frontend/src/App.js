import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import Production from "./pages/Production";
import Target from "./pages/Target";
import Grammage from "./pages/Grammage";
import Product from "./pages/Product";
import Group from "./pages/Group";
import Shift from "./pages/Shift";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />} />
          <Route path="/target" element={<Target />} />
          <Route path="/production" element={<Production />} />
          <Route path="/grammage" element={<Grammage />} />
          <Route path="/master/product" element={<Product />} />
          <Route path="/master/group" element={<Group />} />
          <Route path="/master/shift" element={<Shift />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
