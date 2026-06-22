import React, { useEffect, useState } from 'react'
import EmployeeTable from './components/EmployeeTable'
import AddEmployeeModal from './components/AddEmployeeModal'

const EmployeeList = () => {

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [roleFilter, setRoleFilter] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]); 

    return (
        <div>
            <div className="container-fluid employee-page">
                <div className="px-lg-5 px-0">
                    <div className="row">
                        <div className="col-12 px-4">
                            <h1 className="my-4">Employee Management</h1>
                        </div>

                        <div className="col-md-12 mb-4">
                            <div className="card bg-ffffff94 border-0 rounded-5 h-100">

                                <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                    <h4 className="mb-0 fw-bold">Employee List</h4>
                                    <div className='d-flex gap-3'>
                                        <input
                                            type="text"
                                            className="form-control rounded-5 w-auto"
                                            placeholder="Search employee..."
                                            value={search}
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                                setPage(1);
                                            }}
                                        />
                                        <select
                                            className="form-select rounded-5 w-auto"
                                            value={roleFilter}
                                            onChange={(e) => {
                                                setRoleFilter(e.target.value);
                                                setPage(1);
                                            }}
                                        >
                                            <option value="">All Roles</option>
                                            <option value="Frontend Developer">Frontend Developer</option>
                                            <option value="MERN Developer">MERN Developer</option>
                                        </select>
                                        <button
                                            type="button"
                                            className="btn btn-dark rounded-5"
                                            data-bs-toggle="modal"
                                            data-bs-target="#addEmployeeModal"
                                        >
                                            <span className="me-2">
                                                <i className="fa-solid fa-circle-plus"></i>
                                            </span>
                                            Add Employee
                                        </button>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <EmployeeTable
                                        page={page}
                                        search={debouncedSearch}
                                        setPage={setPage}
                                        sortField={sortField}
                                        setSortField={setSortField}
                                        sortOrder={sortOrder}
                                        setSortOrder={setSortOrder}
                                        roleFilter={roleFilter}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddEmployeeModal />

        </div>
    )
}

export default EmployeeList