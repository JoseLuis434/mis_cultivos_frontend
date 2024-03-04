import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
} from "recharts";
const data = [
  { name: "1", data: 25 },
  { name: "3", data: 15 },
  { name: "5", data: 25 },
  { name: "7", data: 25 },
  { name: "9", data: 25 },
  { name: "11", data: 25 },
  { name: "13", data: 25 },
  { name: "15", data: 25 },
  { name: "17", data: 25 },
  { name: "19", data: 25 },
  { name: "21", data: 25 },
  { name: "23", data: 25 },
];
import "./GraphicTime.css";

export function GraphicTime() {
  return (
    <div className="resize">
    <BarChart data={data} width={300} height={200}
    margin=
      {{
        top: 20,
        right: 0,
        left: -35,
        bottom: 0,
      }}>
      <CartesianGrid strokeDasharray="4 1 2" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="data" fill="#8884d8" />
    </BarChart>
    </div>
  );
}
