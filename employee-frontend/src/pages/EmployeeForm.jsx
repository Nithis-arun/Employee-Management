import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee, uploadPhoto } from '../api';
import '../styles/EmployeeForm.css';

export default function EmployeeForm({ editMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', department: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editMode && id) {
      (async () => {
        try {
          const res = await getEmployee(id);
          setForm({
            name: res.data.name || '',
            email: res.data.email || '',
            department: res.data.department || ''
          });
        } catch (err) {
          setError(err.message || 'Failed to load');
        }
      })();
    }
  }, [editMode, id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode && id) {
        await updateEmployee(id, form);
        if (file) await uploadPhoto(id, file);
        navigate(`/employees/${id}`);
      } else {
        const fd = new FormData();
        fd.append('name', form.name);
        fd.append('email', form.email);
        fd.append('department', form.department);
        if (file) fd.append('file', file);
        const res = await createEmployee(fd);
        navigate(res.data?.id ? `/employees/${res.data.id}` : '/employees');
      }
    } catch (err) {
      setError(err?.response?.data || err.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{editMode ? 'Edit Employee' : 'Add Employee'}</h2>
      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="form-body">
        <div className="form-field">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="form-field">
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="form-field">
          <label>Department</label>
          <input name="department" value={form.department} onChange={handleChange} required />
        </div>

        <div className="form-field">
          <label>Photo (optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={() => navigate('/employees')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
