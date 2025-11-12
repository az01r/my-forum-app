import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function RootLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
