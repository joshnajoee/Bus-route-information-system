import React from "react";

function Navbar({ page, setPage }) {
  return (
    <nav className="navbar">

      <div className="logo">
        🚌 Bus<span>Pulse</span>
      </div>

      <div className="nav-links">

        <button
          className={page === "home" ? "active" : ""}
          onClick={() => setPage("home")}
        >
          Search
        </button>

        <button
          className={page === "routes" ? "active" : ""}
          onClick={() => setPage("routes")}
        >
          Routes
        </button>

        <button
          className={page === "manage" ? "active" : ""}
          onClick={() => setPage("manage")}
        >
          Manage
        </button>

      </div>

    </nav>
  );
}

export default Navbar;