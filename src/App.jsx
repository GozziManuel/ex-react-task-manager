import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import DefaultTemplate from "./template/DefaultTemplate";
import TaskList from "./pages/TaskList";
import TaskAdd from "./pages/TaskAdd";
import MainProvider from "./context/MainContext";
import DetailedTask from "./pages/DetailedTask";

function App() {
  return (
    <MainProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultTemplate />}>
            <Route path="/" element={<TaskList />}></Route>
            <Route path="/TaskAdd" element={<TaskAdd />}></Route>
            <Route path="/Task/:id" element={<DetailedTask />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </MainProvider>
  );
}

export default App;
