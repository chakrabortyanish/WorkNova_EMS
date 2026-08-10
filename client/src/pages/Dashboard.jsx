import {useState} from 'react'
import { AdminDashboard, EmployeeDashboard } from '../components/index.js';

export const Dashboard = () => {
  const [role, setRole] = useState('admin2'); // Mock role state
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
