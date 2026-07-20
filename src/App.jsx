import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import TypePage from "./pages/TypePage";
import ContentDetailPage from "./pages/ContentDetailPage";
import GenrePage from "./pages/GenrePage";
import PerformerPage from "./pages/PerformerPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/contents/:slug" element={<ContentDetailPage />} />
          <Route path="/genres/:slug" element={<GenrePage />} />
          <Route path="/performers/:slug" element={<PerformerPage />} />
          <Route path="/:type" element={<TypePage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
