import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import BusCard from "./components/BusCard";
import RouteForm from "./components/RouteForm";

import busData from "./data/buses.json";

import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [buses, setBuses] = useState(busData);
  const [search, setSearch] = useState("");
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    document.title = "BusPulse - Bus Route Information System";
  }, []);

  const filteredBuses = buses.filter((bus) => {
    const searchText = search.toLowerCase().trim();

    return (
      bus.number.toLowerCase().includes(searchText) ||
      bus.name.toLowerCase().includes(searchText) ||
      bus.from.toLowerCase().includes(searchText) ||
      bus.to.toLowerCase().includes(searchText) ||
      bus.stops.some((stop) =>
        stop.toLowerCase().includes(searchText)
      )
    );
  });

  function addBus(bus) {
    if (selectedBus) {
      setBuses(
        buses.map((item) =>
          item.id === selectedBus.id
            ? {
                ...bus,
                id: selectedBus.id
              }
            : item
        )
      );

      setSelectedBus(null);
    } else {
      setBuses([
        ...buses,
        {
          ...bus,
          id: Date.now()
        }
      ]);
    }
  }

  function deleteBus(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?"
    );

    if (confirmDelete) {
      setBuses(
        buses.filter((bus) => bus.id !== id)
      );
    }
  }

  function editBus(bus) {
    setSelectedBus(bus);
    setPage("manage");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function cancelEdit() {
    setSelectedBus(null);
  }

  return (
    <div className="app">

      <Navbar
        page={page}
        setPage={setPage}
      />

      {page === "home" && (
        <main className="container">

          <section className="hero">

            <div className="hero-content">

              <p className="tag">
                SMART BUS ROUTE FINDER
              </p>

              <h1>
                Find your bus.
                <br />
                <span>Find your way.</span>
              </h1>

              <p className="hero-text">
                Search bus routes, discover stops
                and get route information quickly.
              </p>

              <div className="search-box">

                <span>🔍</span>

                <input
                  type="text"
                  placeholder="Search bus, stop or destination..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />

              </div>

            </div>

            <div className="bus-illustration">
              🚌
            </div>

          </section>

          <section className="route-section">

            <div className="section-title">

              <div>
                <p className="tag">
                  BUS DIRECTORY
                </p>

                <h2>
                  Available Buses
                </h2>
              </div>

              <span className="route-count">
                {filteredBuses.length} Routes
              </span>

            </div>

            {filteredBuses.length > 0 ? (

              <div className="bus-grid">

                {filteredBuses.map((bus) => (
                  <BusCard
                    key={bus.id}
                    bus={bus}
                  />
                ))}

              </div>

            ) : (

              <div className="no-results">

                <div>🚌</div>

                <h3>
                  No routes found
                </h3>

                <p>
                  Try searching for another bus,
                  stop or destination.
                </p>

              </div>

            )}

          </section>

        </main>
      )}

      {page === "routes" && (
        <main className="container">

          <section className="page-heading">

            <p className="tag">
              ROUTE DIRECTORY
            </p>

            <h1>
              All Bus Routes
            </h1>

            <p>
              Explore available buses and their stops.
            </p>

          </section>

          <div className="bus-grid">

            {buses.map((bus) => (
              <BusCard
                key={bus.id}
                bus={bus}
              />
            ))}

          </div>

        </main>
      )}

      {page === "manage" && (
        <main className="container">

          <section className="page-heading">

            <p className="tag">
              ROUTE MANAGEMENT
            </p>

            <h1>
              Manage Routes
            </h1>

            <p>
              Add, edit or delete bus route information.
            </p>

          </section>

          <RouteForm
            addBus={addBus}
            editBus={selectedBus}
            cancelEdit={cancelEdit}
          />

          <div className="section-title">

            <div>
              <p className="tag">
                CURRENT DATA
              </p>

              <h2>
                Current Routes
              </h2>
            </div>

            <span className="route-count">
              {buses.length} Routes
            </span>

          </div>

          <div className="bus-grid">

            {buses.map((bus) => (
              <BusCard
                key={bus.id}
                bus={bus}
                onDelete={deleteBus}
                onEdit={editBus}
              />
            ))}

          </div>

        </main>
      )}

      <footer>

        <div className="footer-logo">
          🚌 BusPulse
        </div>

        <p>
          Bus Route Information System
        </p>

        <small>
          Built with ReactJS • HTML5 • CSS3 • JavaScript ES6
        </small>

      </footer>

    </div>
  );
}

export default App;
