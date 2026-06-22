import React from "react";
import Logo from '../../../../assets/images/logo.png';

const Payslip = ({ employee, startDate, endDate }) => {
    if (!employee) return null;

    // ✅ Safe salary calculation
    const basic =
        (employee.total_present_days ?? 0) *
        (employee.wages_per_day ?? 0);

    // ✅ Static allowances (you can later make dynamic)
    const hra = 5000;
    const conveyance = 800;
    const medical = 500;
    const otherAllowance = 1486;

    const grossEarning =
        basic + hra + conveyance + medical + otherAllowance;

    // ✅ Deductions
    const epf = Math.round(basic * 0.12); // 12% PF
    const esi = Math.round(basic * 0.01); // 1% ESI

    const totalDeductions = epf + esi;

    // ✅ Final Net Salary
    const netSalary = grossEarning - totalDeductions;

    return (
        <div
            style={{
                background: "#fff",
                width: "100%",
                margin: "auto",
                padding: "30px",
                border: "1px solid #ccc",
                fontFamily: "Arial, sans-serif",
                marginBottom: "30px",
            }}
        >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                    <img src={Logo} alt="Logo" width="200" crossOrigin="anonymous" />
                </div>
                <div style={{ textAlign: "right" }}>
                    <strong>
                        Payslip for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </strong>
                </div>
            </div>

            {/* Employee Details */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                    <p><strong>Employee Name:</strong> {employee.name || "NA"}</p>
                    <p><strong>Job Title:</strong> {employee.role || "NA"}</p>
                    <p><strong>Date of Joining:</strong> Jan 1, 2021</p>
                </div>
                <div style={{ textAlign: "right" }}>
                    <p><strong>Pay Period:</strong> {startDate} - {endDate}</p>
                    <p><strong>Pay Date:</strong> {new Date().toLocaleDateString()}</p>
                    <p><strong>Net Pay:</strong> ₹{netSalary}</p>
                    <p>Paid Days: {employee.total_present_days || 0} | LOP: 0</p>
                </div>
            </div>

            {/* Earnings & Deductions */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>

                {/* Earnings */}
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "16px", background: "grey", color: "white", padding: "3px" }}>
                        Earnings
                    </h3>
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr><td>Basic</td><td style={{ textAlign: "right" }}>₹{basic}</td></tr>
                            <tr><td>House Rent Allowance</td><td style={{ textAlign: "right" }}>₹{hra}</td></tr>
                            <tr><td>Conveyance Allowance</td><td style={{ textAlign: "right" }}>₹{conveyance}</td></tr>
                            <tr><td>Medical Allowance</td><td style={{ textAlign: "right" }}>₹{medical}</td></tr>
                            <tr><td>Other Allowance</td><td style={{ textAlign: "right" }}>₹{otherAllowance}</td></tr>
                            <tr style={{ borderTop: "1px solid #ccc", fontWeight: "bold" }}>
                                <td>Gross Earning</td>
                                <td style={{ textAlign: "right" }}>₹{grossEarning}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Deductions */}
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "16px", background: "grey", color: "white", padding: "3px" }}>
                        Deductions
                    </h3>
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr><td>EPF (12%)</td><td style={{ textAlign: "right" }}>₹{epf}</td></tr>
                            <tr><td>ESI (1%)</td><td style={{ textAlign: "right" }}>₹{esi}</td></tr>
                            <tr style={{ borderTop: "1px solid #ccc", fontWeight: "bold" }}>
                                <td>Total Deductions</td>
                                <td style={{ textAlign: "right" }}>₹{totalDeductions}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Net Pay */}
            <div style={{ borderTop: "1px solid #ccc", paddingTop: "10px" }}>
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Total Net Payable: ₹{netSalary}
                </div>
                <div>*Total net = Gross earning - Total deductions</div>
            </div>

            {/* Print Button */}
            <div className="d-print-none" style={{ marginTop: "20px", textAlign: "center" }}>
                <button
                    onClick={() => window.print()}
                    style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        fontSize: "14px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Print Payslip
                </button>
            </div>
        </div>
    );
};

export default Payslip;