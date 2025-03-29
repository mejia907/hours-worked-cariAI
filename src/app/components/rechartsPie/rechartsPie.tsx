import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { RechartsPieProps } from "./rechartsPie.types";

// Colores para los gráficos de piecharts
const COLORS = ["#790a92", "#16A34A", "#EAB308", "#F97316", "#3B82F6"]

// Componente para gráficos de piecharts
export default function RechartsPie(props: RechartsPieProps) {

  const { data } = props
  return (
    <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie data={data} dataKey="hours" nameKey="concept" cx="50%" cy="50%" outerRadius={100} label>
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: "#111827",
          color: "#ffffff",
          borderRadius: "8px",
          border: "1px solid #ddd"
        }}
        labelStyle={{ color: "#ffffff" }}
        formatter={(value, name) => [
          <span style={{ color: "#ffffff" }}>Horas: {value}</span>,
          <span style={{ color: "#ffffff" }}>{name}</span>
        ]}
      />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
  );
}