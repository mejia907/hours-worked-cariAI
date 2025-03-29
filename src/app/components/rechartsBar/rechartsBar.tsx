import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { RechartsBarProps } from "./rechartsBar.types";

// Componente para gráficos de barras
export default function RechartsBar(props: RechartsBarProps) {

  const { data } = props

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="concept" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "#111827",
            color: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}
          labelStyle={{ color: "#ffffff" }}
          formatter={(value, name) => [
            <span key={value.toString()} style={{ color: "#ffffff" }}>Horas: {value}</span>,
            <span key={name} style={{ color: "#ffffff" }}>{name}</span>
          ]}
        />
        <Bar dataKey="hours" fill="#790a92" radius={[5, 5, 0, 0]} barSize={50} />
      </BarChart>
    </ResponsiveContainer>
  );
}
