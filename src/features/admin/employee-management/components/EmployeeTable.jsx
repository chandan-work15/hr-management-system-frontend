import React, { useState } from 'react'
import profileImg from '../../../../assets/images/pro-img.png'
import { useDeleteEmployeeMutation } from '../../api/employeeApi';
import ConfirmationModal from '../../../../components/common/ConfirmationModal';
import { useGetEmployeesQuery } from "../../api/employeeApi";
import EditEmployeeModal from './EditEmployeeModal';
import { useUpdateEmployeeMutation } from '../../api/employeeApi';

const EmployeeTable = () => {

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const { data, isLoading, isError } = useGetEmployeesQuery();
    const employees = data || [];
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [updateEmployee, { isUpdating }] = useUpdateEmployeeMutation();


    const [deleteEmployee, { isDeleting }] = useDeleteEmployeeMutation();

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const handleUpdate = async (formData) => {
        try {
            await updateEmployee({
                id: selectedEmployee._id,
                body: formData,
            }).unwrap();
            setShowEditModal(false);
        } catch (error) {
            console.error("Update failed:", error);
        }
    }

    const confirmDelete = async () => {
        try {
            await deleteEmployee(selectedId).unwrap();
            setShowModal(false);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    if (isLoading) return <p>Loading employees...</p>;
    if (isError) return <p>Failed to load employees</p>;

    return (
        <>
            <div className="table-responsive">
                <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                    <thead>
                        <tr className="table-warning">
                            <th>#</th>
                            <th>Name</th>
                            <th>User Name</th>
                            <th>Device Id</th>
                            <th>Job Title</th>
                            <th>Department</th>
                            <th>Site</th>
                            <th>Salary</th>
                            <th>Start Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={emp._id}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <img
                                        src={profileImg}
                                        alt={emp.name}
                                        className="tbl-empImg shadow"
                                        style={{
                                            cursor: "pointer",
                                            width: "40px",
                                            height: "40px",
                                            objectFit: "cover",
                                            borderRadius: "50%"
                                        }}
                                    />
                                    {emp.name}
                                </td>
                                <td>{emp.username}</td>
                                <td>{emp.device_id}</td>
                                <td>{emp.role}</td>
                                <td>NA</td>
                                <td>NA</td>
                                <td>{emp.wages_per_day}</td>
                                <td>NA</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-warning text-white rounded-5 me-3"
                                        onClick={() => {
                                            setSelectedEmployee(emp);
                                            setShowEditModal(true)
                                        }}
                                    >
                                        Edit
                                        <span className="ms-2">
                                            <i className="fa-solid fa-user-pen"></i>
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-danger rounded-5"
                                        onClick={() => handleDelete(emp._id)}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? "Deleting..." :
                                            <>
                                                Delete
                                                <span className="ms-2">
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </span>
                                            </>
                                        }
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <ConfirmationModal
                show={showModal}
                title="Delete Employee"
                label="Deleting..."
                message="Are you sure you want to delete this employee?"
                onConfirm={confirmDelete}
                onClose={() => setShowModal(false)}
                loading={isLoading}
            />

            <EditEmployeeModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                employee={selectedEmployee}
                onUpdate={handleUpdate}
                loading={isUpdating}
            />
        </>

    )
}

export default EmployeeTable