import { useState } from 'react';
import { useAddEmployeeMutation } from '../../api/employeeApi';

const AddEmployeeModal = () => {
    const [addEmployee] = useAddEmployeeMutation();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        device_id: "",
        start_date: "",
        job_title: "",
        wages_per_day: "",
        gender: "",
        address: "",
        mobile: "",
        email: "",
        // profile_image: "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.username.trim()) {
            newErrors.username = "Company email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
            newErrors.username = "Invalid email format";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Personal email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Enter valid 10-digit number";
        }

        if (!formData.device_id.trim()) {
            newErrors.device_id = "Device ID is required";
        }

        if (!formData.start_date) {
            newErrors.start_date = "Start date is required";
        }

        if (!formData.job_title.trim()) {
            newErrors.job_title = "Job title is required";
        }

        if (!formData.wages_per_day) {
            newErrors.wages_per_day = "Wages per day is required";
        }

        if (!formData.gender) {
            newErrors.gender = "Gender is required";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "wages_per_day" ? Number(value) : value,
        });
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            // ✅ Create FormData object
            const formDataToSend = new FormData();

            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });

            // ✅ Send FormData instead of JSON
            await addEmployee(formDataToSend).unwrap();

            alert("Employee added successfully");

            setFormData({
                name: "",
                username: "",
                password: "",
                device_id: "",
                start_date: "",
                job_title: "",
                wages_per_day: "",
                gender: "",
                address: "",
                mobile: "",
                email: "",
                // profile_image: "", 
            });

            setErrors({});

            document.getElementById("closeModal").click();

        } catch (error) {
            console.error("Failed to add employee:", error);
            alert(error?.data?.message || "Something went wrong");
        }
    };

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
                        <h5>Add Employee</h5>
                        <button
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder='Employee Name'
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    name="username"
                                    placeholder="Email"
                                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.username && (
                                    <div className="invalid-feedback">
                                        {errors.username}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="device_id"
                                    placeholder="Device ID"
                                    className={`form-control ${errors.device_id ? "is-invalid" : ""}`}
                                    value={formData.device_id}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.device_id && (
                                    <div className="invalid-feedback">
                                        {errors.device_id}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="job_title"
                                    placeholder="Job Title"
                                    className={`form-control ${errors.job_title ? "is-invalid" : ""}`}
                                    value={formData.job_title}
                                    onChange={handleChange}
                                />
                                {errors.job_title && (
                                    <div className="invalid-feedback">
                                        {errors.job_title}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    name="wages_per_day"
                                    placeholder="Wages per day"
                                    className={`form-control ${errors.wages_per_day ? "is-invalid" : ""}`}
                                    value={formData.wages_per_day}
                                    onChange={handleChange}
                                />
                                {errors.wages_per_day && (
                                    <div className="invalid-feedback">
                                        {errors.wages_per_day}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Personal Email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                                    value={formData.mobile}
                                    onChange={handleChange}
                                />
                                {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="date"
                                    name="start_date"
                                    className={`form-control ${errors.start_date ? "is-invalid" : ""}`}
                                    value={formData.start_date}
                                    onChange={handleChange}
                                />
                                {errors.start_date && <div className="invalid-feedback">{errors.start_date}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label d-block">Gender</label>

                                <div>
                                    <input type="radio" name="gender" value="male" onChange={handleChange} /> Male
                                    <input type="radio" name="gender" value="female" onChange={handleChange} className="ms-3" /> Female
                                </div>

                                {errors.gender && <div className="text-danger">{errors.gender}</div>}
                            </div>

                            <div className="mb-3">
                                <textarea
                                    name="address"
                                    placeholder="Address"
                                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                            </div>

                            {/* <div className="mb-3">
                                <input
                                    type="file"
                                    name="profile_image"
                                    className="form-control"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            profile_image: e.target.files[0],
                                        })
                                    }
                                />
                            </div> */}

                        </div>
                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                id="closeModal"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Add Employee
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default AddEmployeeModal;