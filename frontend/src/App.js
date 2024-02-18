import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import Production from "./pages/Production";
import Target from "./pages/Target";
import Grammage from "./pages/Grammage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />} />
          <Route path="/target" element={<Target />} />
          <Route path="/production" element={<Production />} />
          <Route path="/grammage" element={<Grammage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
