import {useState} from 'react'
import { AdminLeave, EmployeeLeave } from '../components';

export const Leave = () => {
   const [role, setRole] = useState('adminv'); // Mock role state
    return (
      <>
              {
                  role === "admin"
                  ? <AdminLeave />
                  : <EmployeeLeave />
              }
          </>
    );
}
