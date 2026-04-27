import React, { useState } from 'react';

// ===== ALL REAL VALUES FROM RUNNING YOUR MODEL =====
const METRICS = {
  r2:           0.9833,
  mae:          189.54,
  rmse:         370.58,
  mse:          137330.84,
  trainR2:      0.9979,
  testR2:       0.9833,
  trainSize:    339,
  testSize:     146,
  totalSamples: 485,
  nFeatures:    50,
  nEstimators:  100,
  testSplit:    '70 / 30',
  algorithm:    'Random Forest Regressor',
};


// Metric score card config
const SCORE_CARDS = [
  {
    label: 'R² Score',
    value: '0.9833',
    percent: 98.33,
    color: '#4caf50',
    description: 'Model explains 98.33% of the variance in project budgets. Excellent fit.',
    rating: 'Excellent',
  },
  {
    label: 'MAE',
    value: 'PKR 189.54M',
    percent: null,
    color: '#2196f3',
    description: 'Mean Absolute Error — on average the prediction is off by PKR 189.54 Million.',
    rating: 'Good',
  },
  {
    label: 'RMSE',
    value: 'PKR 370.58M',
    percent: null,
    color: '#ff9800',
    description: 'Root Mean Squared Error — penalizes large errors more. Acceptable for this budget range.',
    rating: 'Good',
  },
  {
    label: 'MSE',
    value: '137,330',
    percent: null,
    color: '#9c27b0',
    description: 'Mean Squared Error (raw). Lower is better; used internally for tree splitting.',
    rating: 'Info',
  },
];

// Rating badge colors
const RATING_COLORS = {
  Excellent: { bg: '#e8f5e9', text: '#2e7d32' },
  Good:      { bg: '#e3f2fd', text: '#1565c0' },
  Info:      { bg: '#f3e5f5', text: '#6a1b9a' },
};



function ModelPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <h1 className="page-title">🧠 Model Performance</h1>
      <p className="page-subtitle">
        Training details and evaluation metrics for the Random Forest Regressor trained on {METRICS.totalSamples} projects.
      </p>

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
        {[
          { id: 'overview',     label: '📋 Overview'           },
          { id: 'metrics',      label: '📊 Metrics'             },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '9px 20px',
              border: '2px solid #1a237e',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              background: activeTab === tab.id ? '#1a237e' : 'white',
              color: activeTab === tab.id ? 'white' : '#1a237e',
              fontSize: '14px',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== TAB 1: OVERVIEW ===== */}
      {activeTab === 'overview' && (
        <div>
          {/* Training config card */}
          <div className="card">
            <div className="card-title">⚙️ Training Configuration</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
              {[
                { label: 'Algorithm',         value: 'Random Forest Regressor' },
                { label: 'Total Samples',     value: '485 projects'            },
                { label: 'Train / Test Split',value: '70% / 30%'               },
                { label: 'Training Samples',  value: '339'                     },
                { label: 'Testing Samples',   value: '146'                     },
                { label: 'Number of Trees',   value: '100 estimators'          },
                { label: 'Total Features',    value: '50 columns'              },
                { label: 'Target Variable',   value: 'TotalBudget (PKR M)'     },
                { label: 'Random State',      value: '42 (reproducible)'       },
              ].map(item => (
                <div key={item.label} style={{
                  background: '#f5f5f5', borderRadius: '8px', padding: '14px',
                }}>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1a237e' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Train vs Test R² card */}
          <div className="card">
            <div className="card-title">📈 Train vs Test R² Score</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

              {/* Training R² */}
              <div style={{ textAlign: 'center', padding: '20px', background: '#e8f5e9', borderRadius: '10px' }}>
                <div style={{ fontSize: '13px', color: '#555', marginBottom: '8px' }}>Training R²</div>
                <div style={{ fontSize: '44px', fontWeight: 'bold', color: '#2e7d32' }}>0.9979</div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>339 samples used for training</div>
                <div style={{ marginTop: '12px', background: '#c8e6c9', borderRadius: '6px', padding: '8px', fontSize: '13px' }}>
                  The model fits training data almost perfectly
                </div>
              </div>

              {/* Test R² */}
              <div style={{ textAlign: 'center', padding: '20px', background: '#e3f2fd', borderRadius: '10px' }}>
                <div style={{ fontSize: '13px', color: '#555', marginBottom: '8px' }}>Test R² (Unseen Data)</div>
                <div style={{ fontSize: '44px', fontWeight: 'bold', color: '#1565c0' }}>0.9833</div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>146 samples used for testing</div>
                <div style={{ marginTop: '12px', background: '#bbdefb', borderRadius: '6px', padding: '8px', fontSize: '13px' }}>
                  Generalizes very well to new, unseen projects
                </div>
              </div>
            </div>

            {/* Overfitting note */}
            <div style={{ marginTop: '15px', background: '#000000', border: '1px solid #ffe082', borderRadius: '8px', padding: '14px', fontSize: '14px' }}>
              <strong>📌 Overfitting Check:</strong> The gap between Train R² (0.9979) and Test R² (0.9833) is only <strong>0.0146</strong>.
              This is very small, meaning the model is <strong>not overfitting</strong> — it generalizes well to new data.
            </div>
          </div>
        </div>
      )}

      {/* ===== TAB 2: METRICS ===== */}
      {activeTab === 'metrics' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {SCORE_CARDS.map(card => (
              <div key={card.label} className="card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#444' }}>{card.label}</div>
                  <span style={{
                    fontSize: '12px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '20px',
                    background: RATING_COLORS[card.rating].bg,
                    color: RATING_COLORS[card.rating].text,
                  }}>
                    {card.rating}
                  </span>
                </div>

                <div style={{ fontSize: '32px', fontWeight: 'bold', color: card.color, marginBottom: '10px' }}>
                  {card.value}
                </div>

                {/* Progress bar for R² only */}
                {card.percent !== null && (
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ background: '#eee', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${card.percent}%`, height: '100%',
                        background: card.color, borderRadius: '6px',
                        transition: 'width 0.8s ease',
                      }} />
                    </div>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '4px', textAlign: 'right' }}>
                      {card.percent}%
                    </div>
                  </div>
                )}

                <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                  {card.description}
                </div>
              </div>
            ))}
          </div>

          {/* What the metrics mean table */}
          <div className="card" style={{ marginTop: '20px' }}>
            <div className="card-title">📚 What Do These Metrics Mean?</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#e8eaf6' }}>
                  <th style={{ padding: '10px', textAlign: 'left', borderRadius: '6px 0 0 0' }}>Metric</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Full Name</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Your Value</th>
                  <th style={{ padding: '10px', textAlign: 'left', borderRadius: '0 6px 0 0' }}>Ideal</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { m: 'R²',   full: 'R-Squared (Coefficient of Determination)', val: '0.9833', ideal: 'As close to 1.0 as possible' },
                  { m: 'MAE',  full: 'Mean Absolute Error',                       val: '189.54M', ideal: 'As low as possible' },
                  { m: 'RMSE', full: 'Root Mean Squared Error',                   val: '370.58M', ideal: 'As low as possible' },
                  { m: 'MSE',  full: 'Mean Squared Error',                        val: '137,330', ideal: 'As low as possible' },
                ].map((row, i) => (
                  <tr key={row.m} style={{ background: i % 2 === 0 ? 'white' : '#fafafa', borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#1a237e' }}>{row.m}</td>
                    <td style={{ padding: '10px', color: '#444' }}>{row.full}</td>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{row.val}</td>
                    <td style={{ padding: '10px', color: '#666', fontSize: '12px' }}>{row.ideal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModelPage;
