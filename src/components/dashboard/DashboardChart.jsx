import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";

import { getChartPenyewaan } from "../../services/dashboardService";

import "../../assets/css/dashboard-chart.css";

function DashboardChart() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const response = await getChartPenyewaan();

      setData(response);
    } catch (error) {
      console.log("Gagal mengambil data chart :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Statistik Penyewaan</h3>

        <span>Data Penyewaan</span>
      </div>

      {loading ? (
        <div className="chart-loading">Loading grafik...</div>
      ) : (
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="bulan" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="penyewaan" fill="#2563eb" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default DashboardChart;
