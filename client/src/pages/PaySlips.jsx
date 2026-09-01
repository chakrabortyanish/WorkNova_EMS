import {useState} from 'react'
import { AdminPayslips, EmployeePayslips } from '../components';

import { useAuth } from "../context/AuthContext.jsx";

export const PaySlips = () => {
  const { user } = useAuth();
  let role = user?.role;

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
