import React from "react";

function BusCard({ bus, onDelete, onEdit }) {
  return (
    <div className="bus-card">

      <div className="bus-top">

        <div>
          <span className="bus-number">
            {bus.number}
          </span>

          <h3>{bus.name}</h3>
        </div>

        <span className="time">
          {bus.time}
        </span>

      </div>

      <div className="route">

        <div>
          <small>FROM</small>
          <strong>{bus.from}</strong>
        </div>

        <div className="arrow">
          →
        </div>

        <div>
          <small>TO</small>
          <strong>{bus.to}</strong>
        </div>

      </div>

      <div className="stops">

        {bus.stops.map((stop, index) => (
          <span key={index}>
            {stop}
          </span>
        ))}

      </div>

      {onEdit && (
        <div className="actions">

          <button onClick={() => onEdit(bus)}>
            Edit
          </button>

          <button
            className="delete"
            onClick={() => onDelete(bus.id)}
          >
            Delete
          </button>

        </div>
      )}

    </div>
  );
}

export default BusCard;