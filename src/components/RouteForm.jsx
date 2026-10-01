import React, { useEffect, useState } from "react";

function RouteForm({ addBus, editBus, cancelEdit }) {

  const emptyForm = {
    number: "",
    name: "",
    from: "",
    to: "",
    time: ""
  };

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {

    if (editBus) {
      setForm({
        number: editBus.number,
        name: editBus.name,
        from: editBus.from,
        to: editBus.to,
        time: editBus.time
      });
    } else {
      setForm(emptyForm);
    }

    setError("");

  }, [editBus]);

  function handleChange(event) {

    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  function handleSubmit(event) {

    event.preventDefault();

    if (
      !form.number.trim() ||
      !form.name.trim() ||
      !form.from.trim() ||
      !form.to.trim() ||
      !form.time
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (
      form.from.trim().toLowerCase() ===
      form.to.trim().toLowerCase()
    ) {
      setError("Starting point and destination cannot be the same.");
      return;
    }

    const busData = {
      ...form,
      from: form.from.trim(),
      to: form.to.trim(),
      stops: [form.from.trim(), form.to.trim()]
    };

    addBus(busData);

    setForm(emptyForm);
    setError("");
  }

  return (
    <form
      className="route-form"
      onSubmit={handleSubmit}
    >

      <h2>
        {editBus ? "Edit Bus Route" : "Add New Route"}
      </h2>

      <div className="form-grid">

        <input
          type="text"
          name="number"
          placeholder="Bus Number"
          value={form.number}
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          placeholder="Bus Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="from"
          placeholder="Starting Point"
          value={form.from}
          onChange={handleChange}
        />

        <input
          type="text"
          name="to"
          placeholder="Destination"
          value={form.to}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />

      </div>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      <div className="form-buttons">

        <button
          type="submit"
          className="submit-btn"
        >
          {editBus ? "Update Route" : "Add Route"}
        </button>

        {editBus && (
          <button
            type="button"
            className="cancel-btn"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  );
}

export default RouteForm;