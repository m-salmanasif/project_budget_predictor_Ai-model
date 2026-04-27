import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line,
  ScatterChart, Scatter
} from 'recharts';

// ===== CHART DATA (from your real dataset) =====

// 1. Budget distribution by department (average TotalBudget)
const deptData = [
  { dept: 'Agriculture',        avgBudget: 3188 },
  { dept: 'Education',          avgBudget: 3219 },
  { dept: 'Energy',             avgBudget: 2966 },
  { dept: 'Health',             avgBudget: 2752 },
  { dept: 'Infrastructure',     avgBudget: 3159 },
  { dept: 'Water & San.',       avgBudget: 3085 },
];

// 2. Project status breakdown
// statusProjEnc values: 0=Cancelled, 1=Active, 2=On Hold, 3=Completed, 4=In Progress, 5=Under Review
const statusData = [
  { name: 'Completed',    value: 90, color: '#4caf50' },
  { name: 'Active',       value: 85, color: '#2196f3' },
  { name: 'Under Review', value: 84, color: '#ff9800' },
  { name: 'In Progress',  value: 80, color: '#9c27b0' },
  { name: 'Cancelled',    value: 77, color: '#f44336' },
  { name: 'On Hold',      value: 69, color: '#607d8b' },
];

// 3. Payment trends over project age (avg amount paid vs project age in years)
const paymentTrendData = [
  { year: '2 yrs',  avgPaid: 1271 },
  { year: '3 yrs',  avgPaid: 2088 },
  { year: '4 yrs',  avgPaid: 1725 },
  { year: '5 yrs',  avgPaid: 1654 },
  { year: '6 yrs',  avgPaid: 1315 },
  { year: '7 yrs',  avgPaid: 1091 },
  { year: '8 yrs',  avgPaid: 1739 },
  { year: '9 yrs',  avgPaid: 1605 },
  { year: '10 yrs', avgPaid: 1243 },
  { year: '11 yrs', avgPaid: 1504 },
];

// 4. Predicted vs Actual comparison (sample from dataset)
// "Actual" = TotalBudget, "Predicted" = simulated ~5-10% variance for demo
const comparisonData = [
  { project: 'P1',  actual: 436,  predicted: 460  },
  { project: 'P2',  actual: 613,  predicted: 580  },
  { project: 'P3',  actual: 662,  predicted: 700  },
  { project: 'P4',  actual: 1249, predicted: 1190 },
  { project: 'P5',  actual: 848,  predicted: 890  },
  { project: 'P6',  actual: 507,  predicted: 530  },
  { project: 'P7',  actual: 217,  predicted: 240  },
  { project: 'P8',  actual: 1693, predicted: 1640 },
  { project: 'P9',  actual: 1952, predicted: 2010 },
  { project: 'P10', actual: 2052, predicted: 1980 },
];

// Custom tooltip for charts
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'white', border: '1px solid #ccc', padding: '10px', borderRadius: '6px', fontSize: '13px' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: PKR {p.value.toLocaleString()}M
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function DashboardPage() {
  return (
    <div>
      <h1 className="page-title">📈 Project Dashboard</h1>
      <p className="page-subtitle">Visual overview of budget, payments, and project status based on your dataset (485 projects).</p>

      <div className="charts-grid">

        {/* ===== CHART 1: Budget by Department (Bar Chart) ===== */}
        <div className="chart-wrapper">
          <div className="chart-title">💰 Avg Budget by Department (PKR Millions)</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={deptData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="dept"
                angle={-35}
                textAnchor="end"
                tick={{ fontSize: 11 }}
                interval={0}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(val) => [`PKR ${val}M`, 'Avg Budget']} />
              <Bar dataKey="avgBudget" fill="#1a237e" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ===== CHART 2: Project Status Breakdown (Pie Chart) ===== */}
        <div className="chart-wrapper">
          <div className="chart-title">📊 Project Status Breakdown</div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="45%"
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(val) => [`${val} projects`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
          {/* Manual legend since labelLine=false */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', justifyContent: 'center' }}>
            {statusData.map(s => (
              <span key={s.name} style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', background: s.color, borderRadius: '50%', display: 'inline-block' }}></span>
                {s.name}
              </span>
            ))}
          </div>
        </div>

        {/* ===== CHART 3: Payment Trends Over Time (Line Chart) ===== */}
        <div className="chart-wrapper">
          <div className="chart-title">📉 Avg Payment by Project Age</div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={paymentTrendData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(val) => [`PKR ${val}M`, 'Avg Paid']} />
              <Line
                type="monotone"
                dataKey="avgPaid"
                stroke="#e53935"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ===== CHART 4: Predicted vs Actual Budget (Comparison Bar Chart) ===== */}
        <div className="chart-wrapper">
          <div className="chart-title">🎯 Predicted vs Actual Budget (Sample)</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={comparisonData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="project" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="actual"    name="Actual Budget"    fill="#1a237e" radius={[3,3,0,0]} />
              <Bar dataKey="predicted" name="Predicted Budget" fill="#90caf9" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ===== Summary Stats Row ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '25px' }}>
        {[
          { label: 'Total Projects', value: '485', icon: '📁' },
          { label: 'Avg Budget', value: 'PKR 3,061M', icon: '💰' },
          { label: 'Avg Amount Paid', value: 'PKR 1,500M', icon: '✅' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'white', borderRadius: '10px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>{stat.icon}</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a237e' }}>{stat.value}</div>
            <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
