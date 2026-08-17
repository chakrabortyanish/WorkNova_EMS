import {useState} from 'react'
import { AdminDashboard, EmployeeDashboard } from '../components/index.js';

export const Dashboard = () => {
  const [role, setRole] = useState('admin'); // Mock role state
  return (
    <>
            {
                role === "admin"
                ? <AdminDashboard />
                : <EmployeeDashboard />
            }
        </>
  );
}
