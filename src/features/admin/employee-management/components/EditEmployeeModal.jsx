import { useEffect, useState } from "react";

const EditEmployeeModal = ({
    show,
    onClose,
    employee,
    onUpdate,
    loading,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        mobile: "",
        gender: "",
        profile_image: "",
        job_title: "",
        device_id: "",
        wages_per_day: "",
        start_date: "",
        status: "active",
        address: "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.username.trim()) {
            newErrors.username = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
            newErrors.username = "Invalid email format";
        }

        if (!formData.job_title.trim()) {
            newErrors.job_title = "Job title is required";
        }

        if (!formData.wages_per_day) {
            newErrors.wages_per_day = "Wages is required";
        }

        if (!formData.gender) {
            newErrors.gender = "Gender is required";
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile is required";
        }

        if (!formData.start_date) {
            newErrors.start_date = "Start Date is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // 🔥 Prefill when employee changes
    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name || "",
                username: employee.username || "",
                email: employee.email || "",
                mobile: employee.mobile || "",
                gender: employee.gender || "",
                profile_image: employee.profile_image || "",
                job_title: employee.job_title || "",
                device_id: employee.device_id || "",
                wages_per_day: employee.wages_per_day || "",
                start_date: employee.start_date?.split("T")[0] || "",
                status: employee.status || "active",
                address: employee.address || "",
            });
        }
    }, [employee]);

    if (!show) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = () => {
        if (!validate()) return;
        onUpdate(formData);
    };

    return (
        <>
            {/* Backdrop */}
            <div className="modal-backdrop fade show" onClick={onClose}></div>

            {/* Modal */}
            <div className="modal d-block">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content rounded-4">
                        <div className="modal-header">
                            <h5>Edit Employee</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <div className="row">
                                {/* Left Column */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter name"
                                            required
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">
                                            Company Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="username"
                                            name="username"
                                            type="email"
                                            className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                            required
                                        />
                                        {errors.username && (
                                            <div className="invalid-feedback">
                                                {errors.username}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="device_id" className="form-label">
                                            Device ID
                                        </label>
                                        <input
                                            id="device_id"
                                            name="device_id"
                                            className="form-control"
                                            value={formData.device_id}
                                            onChange={handleChange}
                                            placeholder="Enter device ID"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="job_title" className="form-label">
                                            Job Title <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="job_title"
                                            name="job_title"
                                            className={`form-control ${errors.job_title ? "is-invalid" : ""}`}
                                            value={formData.job_title}
                                            onChange={handleChange}
                                            placeholder="Enter job title"
                                            required
                                        />
                                        {errors.job_title && (
                                            <div className="invalid-feedback">
                                                {errors.job_title}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="wages_per_day" className="form-label">
                                            Wages per day <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="wages_per_day"
                                            name="wages_per_day"
                                            type="number"
                                            className={`form-control ${errors.wages_per_day ? "is-invalid" : ""}`}
                                            value={formData.wages_per_day}
                                            onChange={handleChange}
                                            placeholder="Enter wages"
                                            required
                                        />
                                        {errors.wages_per_day && (
                                            <div className="invalid-feedback">
                                                {errors.wages_per_day}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="mobile" className="form-label">
                                            Mobile <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="mobile"
                                            name="mobile"
                                            className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            placeholder="Enter mobile number"
                                            required
                                        />
                                        {errors.mobile && (
                                            <div className="invalid-feedback">
                                                {errors.mobile}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Personal Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="gender" className="form-label">
                                            Gender <span className="text-danger">*</span>
                                        </label>
                                        <div>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={formData.gender === "male"}
                                                onChange={handleChange}
                                                id="male"
                                            />
                                            <label htmlFor="male" className="ms-2 form-check-label">
                                                Male
                                            </label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={formData.gender === "female"}
                                                onChange={handleChange}
                                                id="female"
                                                className="ms-3"
                                            />
                                            <label htmlFor="female" className="ms-2 form-check-label">
                                                Female
                                            </label>
                                        </div>
                                        {errors.gender && (
                                            <div className="invalid-feedback d-block">
                                                {errors.gender}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="start_date" className="form-label">
                                            Start Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="start_date"
                                            name="start_date"
                                            type="date"
                                            className={`form-control ${errors.start_date ? "is-invalid" : ""}`}
                                            value={formData.start_date}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.start_date && (
                                            <div className="invalid-feedback">
                                                {errors.start_date}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="status" className="form-label">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            name="status"
                                            className="form-control"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Full Width Fields */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">
                                            Address
                                        </label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            className="form-control"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Enter address"
                                            rows="2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditEmployeeModal;
