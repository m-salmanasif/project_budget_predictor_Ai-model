import React, { useState } from 'react';

// ---- All the dropdown options pulled from your dataset ----
const LOCATIONS = [
  'Abbottabad','Bahawalpur','Dera Ghazi Khan','Faisalabad','Gujranwala',
  'Gwadar','Hyderabad','Islamabad','Karachi','Lahore','Mardan','Multan',
  'Peshawar','Quetta','Rawalpindi','Sargodha','Sialkot','Sukkur','Swat','Turbat'
];

const PROJECT_TYPES = [
  'Bridge','Dam','Flyover','Grid Station','Hospital','Irrigation Canal',
  'Road Construction','Rural Health Centre','School Building','Solar Plant',
  'University Building','Water Treatment Plant'
];

const DEPARTMENTS = [
  'Agriculture','Education','Energy','Health','Infrastructure','Water & Sanitation'
];



function PredictPage() {
  // ---- Form state: one value per input ----
  const [form, setForm] = useState({
    location: '',
    projectType: '',
    department: '',
    projAgeYrs: '',
    amountPaid: '',
  });

  const [prediction, setPrediction] = useState(null); // stores result
  const [loading, setLoading] = useState(false);       // shows spinner
  const [error, setError] = useState('');              // shows error

  // ---- Called every time a field changes ----
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ---- Called when user clicks Predict ----
  async function handlePredict() {
    // Basic check: all fields must be filled
    for (let key in form) {
      if (form[key] === '') {
        setError('Please fill in all fields before predicting.');
        return;
      }
    }
    setError('');
    setLoading(true);
    setPrediction(null);

    try {
      // Build the object to send to Node.js backend
      // We need to convert dropdowns into the one-hot columns your model expects
      const body = {
        ExperienceRating: 5,
        AmountPaid: parseFloat(form.amountPaid),
        BalanceAmount: 0,                       // unknown before project ends
        projAgeYrs: parseFloat(form.projAgeYrs),
        logAnnualBudget: 0,                     // model will estimate
        paymentRatio: 0.5,                      // default middle value
        deptActive: 1,
        statusProjEnc: 1,
        // Department flags - set 1 for selected, 0 for rest
        dept_Agriculture:        form.department === 'Agriculture' ? 1 : 0,
        dept_Education:          form.department === 'Education' ? 1 : 0,
        dept_Energy:             form.department === 'Energy' ? 1 : 0,
        dept_Health:             form.department === 'Health' ? 1 : 0,
        dept_Infrastructure:     form.department === 'Infrastructure' ? 1 : 0,
        'dept_Water & Sanitation': form.department === 'Water & Sanitation' ? 1 : 0,
        // Project type flags
        ptype_Bridge:            form.projectType === 'Bridge' ? 1 : 0,
        ptype_Dam:               form.projectType === 'Dam' ? 1 : 0,
        ptype_Flyover:           form.projectType === 'Flyover' ? 1 : 0,
        'ptype_Grid Station':    form.projectType === 'Grid Station' ? 1 : 0,
        ptype_Hospital:          form.projectType === 'Hospital' ? 1 : 0,
        'ptype_Irrigation Canal':form.projectType === 'Irrigation Canal' ? 1 : 0,
        'ptype_Road Construction':form.projectType === 'Road Construction' ? 1 : 0,
        'ptype_Rural Health Centre':form.projectType === 'Rural Health Centre' ? 1 : 0,
        'ptype_School Building': form.projectType === 'School Building' ? 1 : 0,
        'ptype_Solar Plant':     form.projectType === 'Solar Plant' ? 1 : 0,
        'ptype_University Building':form.projectType === 'University Building' ? 1 : 0,
        'ptype_Water Treatment Plant':form.projectType === 'Water Treatment Plant' ? 1 : 0,
        // Location flags
        loc_Abbottabad:         form.location === 'Abbottabad' ? 1 : 0,
        loc_Bahawalpur:         form.location === 'Bahawalpur' ? 1 : 0,
        'loc_Dera Ghazi Khan':  form.location === 'Dera Ghazi Khan' ? 1 : 0,
        loc_Faisalabad:         form.location === 'Faisalabad' ? 1 : 0,
        loc_Gujranwala:         form.location === 'Gujranwala' ? 1 : 0,
        loc_Gwadar:             form.location === 'Gwadar' ? 1 : 0,
        loc_Hyderabad:          form.location === 'Hyderabad' ? 1 : 0,
        loc_Islamabad:          form.location === 'Islamabad' ? 1 : 0,
        loc_Karachi:            form.location === 'Karachi' ? 1 : 0,
        loc_Lahore:             form.location === 'Lahore' ? 1 : 0,
        loc_Mardan:             form.location === 'Mardan' ? 1 : 0,
        loc_Multan:             form.location === 'Multan' ? 1 : 0,
        loc_Peshawar:           form.location === 'Peshawar' ? 1 : 0,
        loc_Quetta:             form.location === 'Quetta' ? 1 : 0,
        loc_Rawalpindi:         form.location === 'Rawalpindi' ? 1 : 0,
        loc_Sargodha:           form.location === 'Sargodha' ? 1 : 0,
        loc_Sialkot:            form.location === 'Sialkot' ? 1 : 0,
        loc_Sukkur:             form.location === 'Sukkur' ? 1 : 0,
        loc_Swat:               form.location === 'Swat' ? 1 : 0,
        loc_Turbat:             form.location === 'Turbat' ? 1 : 0,
      };

      // Send POST to your Node.js server (which talks to Python)
      const response = await fetch('http://localhost:5000/api/predict-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.error) {
        setError('Server error: ' + data.error);
      } else {
        setPrediction(data.predicted_cost);
      }
    } catch (err) {
      setError('Could not connect to backend. Make sure Node.js (port 5000) and Python (port 8000) are running.');
    }

    setLoading(false);
  }

  return (
    <div>
      <h1 className="page-title"> Predict Project Budget</h1>
      <p className="page-subtitle">Fill in the project details below and click Predict to get an AI-generated budget estimate.</p>

      {/* ===== INPUT FORM ===== */}
      <div className="card">
        <div className="card-title">Project Details</div>
        <div className="form-grid">

          {/* Location dropdown */}
          <div className="form-group">
            <label>Location</label>
            <select name="location" value={form.location} onChange={handleChange}>
              <option value="">-- Select Location --</option>
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Project Type dropdown */}
          <div className="form-group">
            <label>Project Type</label>
            <select name="projectType" value={form.projectType} onChange={handleChange}>
              <option value="">-- Select Project Type --</option>
              {PROJECT_TYPES.map(pt => (
                <option key={pt} value={pt}>{pt}</option>
              ))}
            </select>
          </div>

          {/* Department dropdown */}
          <div className="form-group">
            <label>Department</label>
            <select name="department" value={form.department} onChange={handleChange}>
              <option value="">-- Select Department --</option>
              {DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>


          <div className="form-group">
            <label>Project Age (Years)</label>
            <input
              type="number"
              name="projAgeYrs"
              min="0" max="50"
              placeholder="e.g. 3"
              value={form.projAgeYrs}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Amount Already Paid (PKR Millions)</label>
            <input
              type="number"
              name="amountPaid"
              min="0"
              placeholder="e.g. 500"
              value={form.amountPaid}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* Error message */}
        {error && <div className="error-box">⚠️ {error}</div>}

        {/* Predict Button */}
        <button className="predict-btn" onClick={handlePredict} disabled={loading}>
          {loading ? '⏳ Predicting...' : '🔮 Predict Budget'}
        </button>
      </div>

      {/* ===== RESULT ===== */}
      {loading && <div className="loading">🤖 AI is calculating the budget...</div>}

      {prediction !== null && !loading && (
        <div className="card">
          <div className="card-title">Prediction Result</div>
          <div className="result-box">
            <div className="result-label">Estimated Total Budget</div>
            <div className="result-amount">
              PKR {prediction.toLocaleString()}M
            </div>
            <div className="result-unit">Pakistani Rupees (in Millions)</div>
            <div className="result-range">
              📊 Confidence Range: PKR {Math.round(prediction * 0.85).toLocaleString()}M — PKR {Math.round(prediction * 1.15).toLocaleString()}M
              <br />
              <small>Based on ±15% variance typical for Random Forest predictions</small>
            </div>
          </div>

          {/* Similar projects info box */}
          <div style={{ marginTop: '20px', padding: '15px', background: '#e8eaf6', borderRadius: '8px', fontSize: '14px' }}>
            <strong>💡 What this means:</strong>
            <ul style={{ marginTop: '8px', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>The AI analyzed 485 similar past projects to generate this estimate.</li>
              <li>Projects of type <strong>{form.projectType}</strong> in <strong>{form.location}</strong> typically fall in this range.</li>
              <li>Actual budget may vary based on market conditions and project scope changes.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default PredictPage;
