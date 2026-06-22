import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0d6efd", "#dc3545"]; // blue, red

const GenderPieChart = ({ data }) => {
    const genderData = [
        { name: "Male", value: data?.genderStats?.male || 450 },
        { name: "Female", value: data?.genderStats?.female || 200 },
    ];

    return (
        <div className="d-flex align-items-center">
            <div>
                {genderData.every(item => item.value === 0) ? (
                    <p className="text-center text-muted">No data available</p>
                ) : (
                    <PieChart width={350} height={300}>
                        <Pie
                            data={genderData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label
                        >
                            {genderData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />
                    </PieChart>
                )}
            </div>
            <div className="">
                <div className="mt-2">
                    <h6>Male : {data?.genderStats?.malePercent}%</h6>
                    <h6>Female : {data?.genderStats?.femalePercent}%</h6>
                    <h6>Other : {data?.genderStats?.otherPercent || 0.00}%</h6>
                </div>
            </div>
        </div>
    );
};

export default GenderPieChart;