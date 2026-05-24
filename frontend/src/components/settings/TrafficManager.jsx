import { useEffect, useState } from "react";
import {
  createTraffic,
  deleteTraffic,
  getAllTraffic,
  updateTraffic,
} from "../../api/traffic";

function TrafficManager({ onDataChanged }) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    country: "",
    vehicleType: "",
    count: "",
  });
  const [editingId, setEditingId] = useState(null);

  const loadRecords = async () => {
    const data = await getAllTraffic();
    setRecords(data);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const resetForm = () => {
    setForm({ country: "", vehicleType: "", count: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      country: form.country,
      vehicleType: form.vehicleType,
      count: Number(form.count),
    };

    if (editingId) {
      await updateTraffic(editingId, payload);
    } else {
      await createTraffic(payload);
    }

    resetForm();
    await loadRecords();
    onDataChanged?.();
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setForm({
      country: record.country,
      vehicleType: record.vehicleType,
      count: record.count,
    });
  };

  const handleDelete = async (id) => {
    await deleteTraffic(id);
    await loadRecords();
    onDataChanged?.();
  };

  return (
    <div className="settingsPanel">
      <div className="sectionHeader">
        <div>
          <h2>Traffic Data Management</h2>
          <p>Add, update, or remove traffic records</p>
        </div>
      </div>

      <form className="trafficForm" onSubmit={handleSubmit}>
        <input
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          required
        />

        <input
          placeholder="Vehicle Type"
          value={form.vehicleType}
          onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Count"
          value={form.count}
          onChange={(e) => setForm({ ...form, count: e.target.value })}
          required
        />

        <button type="submit">
          {editingId ? "Update Record" : "Add Record"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm} className="cancelBtn">
            Cancel
          </button>
        )}
      </form>

      <div className="recordsTable">
        <div className="recordsRow recordsHead">
          <span>Country</span>
          <span>Vehicle</span>
          <span>Count</span>
          <span>Actions</span>
        </div>

        {records.map((record) => (
          <div className="recordsRow" key={record.id}>
            <span>{record.country}</span>
            <span>{record.vehicleType}</span>
            <span>{record.count}</span>
            <span className="recordActions">
              <button onClick={() => handleEdit(record)}>Edit</button>
              <button onClick={() => handleDelete(record.id)}>Delete</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrafficManager;