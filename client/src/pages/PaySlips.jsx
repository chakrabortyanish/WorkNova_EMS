import {useState} from 'react'
import { AdminPayslips, EmployeePayslips } from '../components';

export const PaySlips = () => {
  const [role, setRole] = useState('admin'); // Mock role state
   return (
     <>
             {
                 role === "admin"
                 ? <AdminPayslips />
                 : <EmployeePayslips />
             }
         </>
   );
}
