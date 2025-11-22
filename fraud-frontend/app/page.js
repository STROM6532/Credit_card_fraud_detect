// "use client";

// import { useState } from "react";

// const API_URL = "http://127.0.0.1:8000/predict";

// export default function Home() {
//   const [form, setForm] = useState({
//     amt: "",
//     city_pop: "",
//     trans_hour: "",
//     trans_day_of_week: "",
//     time_diff: "",
//     distance_km: "",
//     category: "",
//     gender: "",
//     state: "",
//   });

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amt: Number(form.amt),
//           city_pop: Number(form.city_pop),
//           trans_hour: Number(form.trans_hour),
//           trans_day_of_week: Number(form.trans_day_of_week),
//           time_diff: Number(form.time_diff),
//           distance_km: Number(form.distance_km),
//           category: form.category,
//           gender: form.gender,
//           state: form.state,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("API request failed");
//       }

//       const data = await res.json();
//       setResult(data);
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const isFraud = result && result.fraud;
//   const riskScore =
//     result && typeof result.score === "number"
//       ? result.score.toFixed(2)
//       : null;

//   return (
//     <main className="page">
//       {/* background glow */}
//       <div className="gradient-bg" />

//       <div className="page-inner">
//         {/* Top bar / logo */}
//         <header className="top-bar">
//           <div className="logo">
//             <span className="logo-dot" />
//             <span className="logo-text">FraudDetect</span>
//           </div>
//           <div className="top-badges">
//             <span className="badge badge-soft">Realtime Prediction</span>
//             <span className="badge badge-strong">AI Powered</span>
//           </div>
//         </header>

//         {/* Two-column layout */}
//         <section className="layout-grid">
//           {/* LEFT: FORM CARD */}
//           <div className="glass-card">
//             <h1 className="title">
//               Credit Card <span>Fraud Detection</span>
//             </h1>
//             <p className="subtitle">
//               Enter transaction details to check if it looks{" "}
//               <strong>fraudulent</strong> or <strong>safe</strong>.
//             </p>

//             <form className="form" onSubmit={handleSubmit}>
//               <div className="field">
//                 <label>Amount (₹)</label>
//                 <input
//                   name="amt"
//                   placeholder="e.g. 2499"
//                   value={form.amt}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="field">
//                 <label>City Population</label>
//                 <input
//                   name="city_pop"
//                   placeholder="e.g. 50000"
//                   value={form.city_pop}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="field-row">
//                 <div className="field">
//                   <label>Transaction Hour (0–23)</label>
//                   <input
//                     name="trans_hour"
//                     placeholder="e.g. 14"
//                     value={form.trans_hour}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="field">
//                   <label>Day of Week (0=Sun…6=Sat)</label>
//                   <input
//                     name="trans_day_of_week"
//                     placeholder="e.g. 2"
//                     value={form.trans_day_of_week}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="field-row">
//                 <div className="field">
//                   <label>Time since last txn (sec)</label>
//                   <input
//                     name="time_diff"
//                     placeholder="e.g. 120"
//                     value={form.time_diff}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="field">
//                   <label>Distance customer–merchant (km)</label>
//                   <input
//                     name="distance_km"
//                     placeholder="e.g. 5"
//                     value={form.distance_km}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="field-row">
//                 <div className="field">
//                   <label>Category</label>
//                   <input
//                     name="category"
//                     placeholder="e.g. shopping_pos"
//                     value={form.category}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="field">
//                   <label>Gender</label>
//                   <input
//                     name="gender"
//                     placeholder="M or F"
//                     value={form.gender}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="field">
//                 <label>State</label>
//                 <input
//                   name="state"
//                   placeholder="e.g. NY, CA, TX"
//                   value={form.state}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {error && (
//                 <div className="alert alert-error">
//                   {error}
//                 </div>
//               )}

//               <button className="btn-primary" type="submit" disabled={loading}>
//                 {loading ? <span className="spinner" /> : "Run Fraud Check"}
//               </button>
//             </form>

//             <p className="hint">
//               Hint: connect this UI to your ML backend at{" "}
//               <code>/predict</code> for live scoring.
//             </p>
//           </div>

//           {/* RIGHT: RESULT CARD */}
//           <div className="glass-card glass-secondary">
//             <h2 className="panel-title">Prediction Result</h2>

//             {!result && !loading && !error && (
//               <div className="empty-state">
//                 <p>
//                   Fill out the form and click <strong>Run Fraud Check</strong>{" "}
//                   to see the risk analysis here.
//                 </p>
//               </div>
//             )}

//             {loading && (
//               <div className="loading-state">
//                 <div className="big-spinner" />
//                 <p>Analyzing transaction pattern...</p>
//               </div>
//             )}

//             {result && !loading && (
//               <>
//                 <div
//                   className={
//                     "pill-result " + (isFraud ? "pill-danger" : "pill-safe")
//                   }
//                 >
//                   <span className="status-dot" />
//                   <span className="status-text">
//                     {isFraud
//                       ? "Fraudulent Transaction"
//                       : "Legitimate Transaction"}
//                   </span>
//                 </div>

//                 <div className="stats-grid" style={{ marginTop: "1.1rem" }}>
//                   <div className="stat-card">
//                     <span className="stat-label">Risk Score</span>
//                     <div>
//                       <span className="stat-value">
//                         {riskScore ?? "--"}
//                       </span>
//                       <span className="stat-unit">/ 100</span>
//                     </div>
//                   </div>

//                   <div className="stat-card">
//                     <span className="stat-label">Amount</span>
//                     <div>
//                       <span className="stat-value">
//                         {form.amt || "0"}
//                       </span>
//                       <span className="stat-unit">₹</span>
//                     </div>
//                   </div>

//                   <div className="stat-card">
//                     <span className="stat-label">Category</span>
//                     <div>
//                       <span className="stat-value">
//                         {form.category || "--"}
//                       </span>
//                       <span className="stat-unit">
//                         {form.gender ? `(${form.gender})` : ""}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mini-note">
//                   This view is a demo. Use your production model & rules to
//                   drive final decisions.
//                 </div>
//               </>
//             )}

//             <div className="timeline">
//               <div className="timeline-item">
//                 <span className="timeline-dot" />
//                 <div>
//                   <p className="timeline-title">Realtime Scoring</p>
//                   <p className="timeline-text">
//                     Each transaction is evaluated instantly using your trained
//                     fraud model.
//                   </p>
//                 </div>
//               </div>

//               <div className="timeline-item">
//                 <span className="timeline-dot" />
//                 <div>
//                   <p className="timeline-title">Analyst Friendly</p>
//                   <p className="timeline-text">
//                     Show risk scores and key attributes to help fraud teams
//                     review suspicious activity quickly.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }
"use client";

import { useState } from "react";

const API_URL = "http://127.0.0.1:8000/predict";

// choice lists
const DOW_OPTIONS = [
  { value: "0", label: "0 - Sunday" },
  { value: "1", label: "1 - Monday" },
  { value: "2", label: "2 - Tuesday" },
  { value: "3", label: "3 - Wednesday" },
  { value: "4", label: "4 - Thursday" },
  { value: "5", label: "5 - Friday" },
  { value: "6", label: "6 - Saturday" },
];

const CATEGORY_OPTIONS = [
  "shopping_pos",
  "gas_transport",
  "grocery_pos",
  "grocery_net",
  "online_retail",
  "shopping_net",
  "entertainment",
];

const GENDER_OPTIONS = ["M", "F"];

const STATE_OPTIONS = ["NY", "CA", "TX", "NC", "WA", "OR", "OH", "IL", "PA", "FL"];

export default function Home() {
  const [form, setForm] = useState({
    amt: "",
    city_pop: "",
    trans_hour: "",
    trans_day_of_week: "",
    time_diff: "",
    distance_km: "",
    category: "",
    gender: "",
    state: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amt: Number(form.amt),
          city_pop: Number(form.city_pop),
          trans_hour: Number(form.trans_hour),
          trans_day_of_week: Number(form.trans_day_of_week),
          time_diff: Number(form.time_diff),
          distance_km: Number(form.distance_km),
          category: form.category,
          gender: form.gender,
          state: form.state,
        }),
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const isFraud = result && result.fraud;
  const riskScore =
    result && typeof result.score === "number"
      ? result.score.toFixed(2)
      : null;

  return (
    <main className="page">
      {/* background glow */}
      <div className="gradient-bg" />

      <div className="page-inner">
        {/* Top bar / logo */}
        <header className="top-bar">
          <div className="logo">
            <span className="logo-dot" />
            <span className="logo-text">FraudDetect</span>
          </div>
          <div className="top-badges">
            <span className="badge badge-soft">Realtime Prediction</span>
            <span className="badge badge-strong">AI Powered</span>
          </div>
        </header>

        {/* Two-column layout */}
        <section className="layout-grid">
          {/* LEFT: FORM CARD */}
          <div className="glass-card">
            <h1 className="title">
              Credit Card <span>Fraud Detection</span>
            </h1>
            <p className="subtitle">
              Enter transaction details to check if it looks{" "}
              <strong>fraudulent</strong> or <strong>safe</strong>.
            </p>

            <form className="form" onSubmit={handleSubmit}>
              <div className="field">
                <label>Amount (₹)</label>
                <input
                  name="amt"
                  placeholder="e.g. 2499"
                  value={form.amt}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>City Population</label>
                <input
                  name="city_pop"
                  placeholder="e.g. 50000"
                  value={form.city_pop}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Transaction Hour (0–23)</label>
                  <input
                    name="trans_hour"
                    placeholder="e.g. 14"
                    value={form.trans_hour}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field">
                  <label>Day of Week</label>
                  <select
                    name="trans_day_of_week"
                    value={form.trans_day_of_week}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select day</option>
                    {DOW_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Time since last txn (sec)</label>
                  <input
                    name="time_diff"
                    placeholder="e.g. 120"
                    value={form.time_diff}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field">
                  <label>Distance customer–merchant (km)</label>
                  <input
                    name="distance_km"
                    placeholder="e.g. 5"
                    value={form.distance_km}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select gender</option>
                    {GENDER_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label>State</label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select state</option>
                  {STATE_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {error && <div className="alert alert-error">{error}</div>}

              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? <span className="spinner" /> : "Run Fraud Check"}
              </button>
            </form>

            <p className="hint">
              Hint: connect this UI to your ML backend at <code>/predict</code>{" "}
              for live scoring.
            </p>
          </div>

          {/* RIGHT: RESULT CARD */}
          <div className="glass-card glass-secondary">
            <h2 className="panel-title">Prediction Result</h2>

            {!result && !loading && !error && (
              <div className="empty-state">
                <p>
                  Fill out the form and click <strong>Run Fraud Check</strong>{" "}
                  to see the risk analysis here.
                </p>
              </div>
            )}

            {loading && (
              <div className="loading-state">
                <div className="big-spinner" />
                <p>Analyzing transaction pattern...</p>
              </div>
            )}

            {result && !loading && (
              <>
                <div
                  className={
                    "pill-result " + (isFraud ? "pill-danger" : "pill-safe")
                  }
                >
                  <span className="status-dot" />
                  <span className="status-text">
                    {isFraud
                      ? "Fraudulent Transaction"
                      : "Legitimate Transaction"}
                  </span>
                </div>

                <div className="stats-grid" style={{ marginTop: "1.1rem" }}>
                  <div className="stat-card">
                    <span className="stat-label">Risk Score</span>
                    <div>
                      <span className="stat-value">
                        {riskScore ?? "--"}
                      </span>
                      <span className="stat-unit">/ 100</span>
                    </div>
                  </div>

                  <div className="stat-card">
                    <span className="stat-label">Amount</span>
                    <div>
                      <span className="stat-value">
                        {form.amt || "0"}
                      </span>
                      <span className="stat-unit">₹</span>
                    </div>
                  </div>

                  <div className="stat-card">
                    <span className="stat-label">Category</span>
                    <div>
                      <span className="stat-value">
                        {form.category || "--"}
                      </span>
                      <span className="stat-unit">
                        {form.gender ? `(${form.gender})` : ""}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mini-note">
                  This view is a demo. Use your production model & rules to
                  drive final decisions.
                </div>
              </>
            )}

            <div className="timeline">
              <div className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <p className="timeline-title">Realtime Scoring</p>
                  <p className="timeline-text">
                    Each transaction is evaluated instantly using your trained
                    fraud model.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <p className="timeline-title">Analyst Friendly</p>
                  <p className="timeline-text">
                    Show risk scores and key attributes to help fraud teams
                    review suspicious activity quickly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
