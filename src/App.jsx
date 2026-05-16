import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import DefaultTemplate from "./template/DefaultTemplate";
import TaskList from "./pages/TaskList";
import TaskAdd from "./pages/TaskAdd";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultTemplate />}>
            <Route path="/" element={<TaskList />}></Route>
            <Route path="/TaskAdd" element={<TaskAdd />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
