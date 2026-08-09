import {useState} from 'react'
import { AdminSettings, EmployeeSettings } from '../components';

export const Settings = () => {
   const [role, setRole] = useState('adminvv'); // Mock role state
    return (
      <>
              {
                  role === "admin"
                  ? <AdminSettings />
                  : <EmployeeSettings />
              }
          </>
    );
}
