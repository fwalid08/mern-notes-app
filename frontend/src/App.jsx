import { Routes, Route } from "react-router";

import HomePage from "./pages/HomePage";
import CreateNotePage from "./pages/CreateNotePage";
import ShowNotePage from "./pages/ShowNotePage";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/create" element={<CreateNotePage />} />
        <Route path="/notes/:id" element={<ShowNotePage />} />
      </Routes>
    </div>
  );
}

export default App;