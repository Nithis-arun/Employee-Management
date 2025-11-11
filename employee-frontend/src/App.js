import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import EmployeeList from './pages/EmployeeList'
import EmployeeForm from './pages/EmployeeForm'
import EmployeeDetails from './pages/EmployeeDetails'
import Nav from './components/Nav'

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/new" element={<EmployeeForm />} />
          <Route path="/employees/:id/edit" element={<EmployeeForm editMode />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
        </Routes>
      </main>
    </div>
  )
}
