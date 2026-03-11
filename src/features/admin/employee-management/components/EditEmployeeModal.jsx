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
        device_id: "",
        role: "",
        wages_per_day: "",
    });

    // 🔥 Prefill when employee changes
    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name || "",
                username: employee.username || "",
                device_id: employee.device_id || "",
                role: employee.role || "",
                wages_per_day: employee.wages_per_day || "",
            });
        }
    }, [employee]);

    if (!show) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        onUpdate(formData);
    };

    return (
        <div className="modal d-block">
            <div className="modal-dialog">
                <div className="modal-content rounded-4">
                    <div className="modal-header">
                        <h5>Edit Employee</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <input
                            className="form-control mb-2"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                        <input
                            className="form-control mb-2"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <input
                            className="form-control mb-2"
                            name="device_id"
                            value={formData.device_id}
                            onChange={handleChange}
                            placeholder="Device ID"
                        />
                        <input
                            className="form-control mb-2"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="Role"
                        />
                        <input
                            className="form-control"
                            name="wages_per_day"
                            value={formData.wages_per_day}
                            onChange={handleChange}
                            placeholder="Wages per day"
                        />
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
    );
};

export default EditEmployeeModal;
