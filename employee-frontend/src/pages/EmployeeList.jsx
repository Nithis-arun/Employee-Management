import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getEmployees, deleteEmployee, photoUrl } from '../api';
import "../styles/EmployeeList.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await getEmployees();
      setEmployees(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(e => e.id !== id));
    } catch (err) {
      window.alert('Failed to delete: ' + (err?.response?.data || err.message));
    }
  };

  if (loading) return <div className="message">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="employee-container">
      <div className="employee-header">
        <h1>Employees</h1>
        <Link to="/employees/new" className="add-button">+ Add Employee</Link>
      </div>

      {employees.length === 0 && (
        <div className="no-employees">No employees yet.</div>
      )}

      <div className="employee-list">
        {employees.map(emp => (
          <div key={emp.id} className="employee-card">
            <div className="employee-info">
              <img
                src={emp.photoPath ? photoUrl(emp.photoPath) : 'https://via.placeholder.com/60'}
                alt={emp.name}
              />
              <div className="employee-text">
                <h2>{emp.name}</h2>
                <p>{emp.email} • {emp.department}</p>
              </div>
            </div>
            <div className="employee-actions">
              <button onClick={() => navigate(`/employees/${emp.id}`)}>View</button>
              <button onClick={() => navigate(`/employees/${emp.id}/edit`)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(emp.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
