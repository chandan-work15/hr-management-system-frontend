import React, { useState } from 'react'
import profileImg from '../../../../assets/images/pro-img.png'
import { useDeleteEmployeeMutation } from '../../api/employeeApi';
import ConfirmationModal from '../../../../components/common/ConfirmationModal';
import { useGetEmployeesQuery } from "../../api/employeeApi";
import EditEmployeeModal from './EditEmployeeModal';
import { useUpdateEmployeeMutation } from '../../api/employeeApi';
import { formatDate } from '../../../../utils/formatDate';

const EmployeeTable = ({ page, search, setPage, sortField, setSortField, sortOrder, setSortOrder, roleFilter }) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const { data, isLoading, isError } = useGetEmployeesQuery({
        page,
        limit: 5,
        search,
        sortField,
        sortOrder,
        role: roleFilter,
    });
    const employees = data || [];
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [updateEmployee, { isUpdating }] = useUpdateEmployeeMutation();
    const [deleteEmployee, { isDeleting }] = useDeleteEmployeeMutation();

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

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

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
                            <th
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    if (sortField === "name") {
                                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortField("name");
                                        setSortOrder("asc");
                                    }
                                }}
                            >
                                Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>

                            <th
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    if (sortField === "username") {
                                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortField("username");
                                        setSortOrder("asc");
                                    }
                                }}
                            >
                                User Name {sortField === "username" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>

                            <th
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    if (sortField === "device_id") {
                                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortField("device_id");
                                        setSortOrder("asc");
                                    }
                                }}
                            >
                                Device Id {sortField === "device_id" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>

                            <th
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    if (sortField === "role") {
                                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortField("role");
                                        setSortOrder("asc");
                                    }
                                }}
                            >
                                Job Title {sortField === "role" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>

                            {/* <th
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    if (sortField === "department") {
                                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortField("department");
                                        setSortOrder("asc");
                                    }
                                }}
                            >
                                Department {sortField === "department" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th> */}

                            {/* <th
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    if (sortField === "site") {
                                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortField("site");
                                        setSortOrder("asc");
                                    }
                                }}
                            >
                                Site {sortField === "site" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th> */}

                            <th
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    if (sortField === "wages_per_day") {
                                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortField("wages_per_day");
                                        setSortOrder("asc");
                                    }
                                }}
                            >
                                Salary {sortField === "wages_per_day" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>

                            <th
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    if (sortField === "start_date") {
                                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortField("start_date");
                                        setSortOrder("asc");
                                    }
                                }}
                            >
                                Start Date {sortField === "start_date" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees?.data?.users.map((emp, index) => (
                            <tr key={emp._id}>
                                <th scope="row">{(page - 1) * 5 + index + 1}</th>
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
                                <td>{emp.job_title}</td>
                                {/* <td>Department</td> */}
                                {/* <td>site</td> */}
                                <td>{emp.wages_per_day}/day</td>
                                <td>{formatDate(emp.start_date)}</td>
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

                <div className="d-flex justify-content-between mt-3">

                    <button
                        className="btn btn-secondary rounded-5"
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        Prev
                    </button>

                    <span>
                        Page {data?.data?.pagination?.page} of {data?.data?.pagination?.pages}
                    </span>

                    <button
                        className="btn btn-secondary rounded-5"
                        disabled={page === data?.data?.pagination?.pages}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                    </button>

                </div>
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