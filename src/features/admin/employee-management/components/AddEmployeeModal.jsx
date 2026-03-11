import { useState } from 'react';
import { useAddEmployeeMutation } from '../../api/employeeApi';

const AddEmployeeModal = () => {
    const [addEmployee] = useAddEmployeeMutation();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        device_id: "",
        role: "",
        wages_per_day: "",
    });

    return (
        <div
            className="modal fade"
            id="addEmployeeModal"
            tabIndex="-1"
            aria-labelledby="addEmployeeModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content rounded-4">
                    <div className="modal-header">

                    </div>
                </div>
            </div>
        </div>
    )

}