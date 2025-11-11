import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployee, photoUrl, uploadPhoto, deleteEmployee } from '../api';
import PhotoUpload from '../components/PhotoUpload';
import "../styles/EmployeeDetails.css";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEmployee = async () => {
    try {
      setLoading(true);
      const res = await getEmployee(id);
      setEmployee(res.data);
    } catch (err) {
      setError(err?.response?.data || err.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const handleUpload = async (file) => {
    try {
      await uploadPhoto(id, file);
      await loadEmployee();
    } catch (err) {
      window.alert('Upload failed: ' + (err?.response?.data || err.message));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await deleteEmployee(id);
      navigate('/employees');
    } catch (err) {
      window.alert('Delete failed: ' + (err?.response?.data || err.message));
    }
  };

  if (loading) return <div className="message">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!employee) return <div className="message">No employee found.</div>;

  return (
    <div className="details-container">
      <div className="details-header">
        <img
          src={employee.photoPath ? photoUrl(employee.photoPath) : 'https://via.placeholder.com/120'}
          alt={employee.name}
        />
        <div className="details-info">
          <h2>{employee.name}</h2>
          <p>{employee.email}</p>
          <p>Department: {employee.department}</p>
          <div className="details-actions">
            <button onClick={() => navigate(`/employees/${id}/edit`)}>Edit</button>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
            <button onClick={() => navigate('/employees')}>Back</button>
          </div>
        </div>
      </div>

      <div className="upload-section">
        <PhotoUpload onUpload={handleUpload} />
      </div>
    </div>
  );
}
