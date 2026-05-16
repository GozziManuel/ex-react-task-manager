import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function DefaultTemplate() {
  return (
    <>
      <NavBar />
      <section className="mx-5">
        <Outlet />
      </section>
    </>
  );
}
