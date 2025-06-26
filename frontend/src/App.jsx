import { Routes, Route } from "react-router";
import toast from "react-hot-toast";

import HomePage from "./pages/HomePage";
import CreateNotePage from "./pages/CreateNotePage";
import ShowNotePage from "./pages/ShowNotePage";

const App = () => {
  return (
    <div data-theme="coffee">
      <button className="btn btn-primary" onClick={() => toast.success('hallo')}>Click!</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/create" element={<CreateNotePage />} />
        <Route path="/notes/:id" element={<ShowNotePage />} />
      </Routes>
    </div>
  );
}

export default App;