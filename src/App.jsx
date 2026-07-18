import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Homepage from "./pages/Homepage";
import Searchpage from "./pages/Searchpage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<Searchpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
