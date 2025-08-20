import React, { useEffect, useState } from "react";

// Single-file React component (no external CSS or assets).
// Drop this file in src/App.jsx of a Create React App / Vite React project and run normally.
// This component injects its own CSS at runtime so there are no external dependencies.

export default function App() {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, by: "bot", text: "Hello! I'm your Justice AI assistant. How can I help you with your legal query today?" },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Inject styles once
    if (document.getElementById("justice-ai-styles")) return;
    const style = document.createElement("style");
    style.id = "justice-ai-styles";
    style.innerHTML = `
      :root{
        --bg:#f6f3f1;
        --accent:#9b6b3c;
        --accent-2:#b78857;
        --card:#ffffff;
        --muted:#6b6b6b;
        --glass: rgba(255,255,255,0.6);
        --shadow: 0 6px 18px rgba(31,31,31,0.08);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      }
      *{box-sizing:border-box}
      body{margin:0;background:linear-gradient(180deg,var(--bg),#efe9e2);}
      .container{max-width:1100px;margin:36px auto;padding:0 20px}

      /* Header */
      header{display:flex;align-items:center;justify-content:space-between;padding:12px 0}
      .logo{display:flex;align-items:center;gap:12px}
      .logo .mark{width:44px;height:44px;border-radius:8px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;color:white;font-weight:700}
      nav{display:flex;gap:18px;align-items:center}
      nav a{color:rgba(17,17,17,0.75);text-decoration:none;font-weight:600}
      .lang{border:1px solid rgba(0,0,0,0.08);padding:6px 10px;border-radius:8px;background:white}

      /* Hero */
      .hero{background:linear-gradient(180deg, rgba(155,107,60,0.12), transparent);padding:28px;border-radius:12px;box-shadow:var(--shadow);}
      .hero-top{display:flex;align-items:center;gap:18px}
      .badge{background:rgba(255,255,255,0.9);padding:6px 10px;border-radius:20px;font-size:13px;color:var(--muted);display:inline-block}
      h1{font-size:36px;margin:8px 0 8px;color:#2b2b2b}
      p.lead{margin:0 0 18px;color:var(--muted);max-width:780px}
      .hero-ctas{display:flex;gap:12px;margin-top:12px}
      .btn{padding:12px 18px;border-radius:10px;border:none;cursor:pointer;font-weight:700}
      .btn-primary{background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white}
      .btn-outline{background:transparent;border:2px solid rgba(0,0,0,0.06)}

      /* Feature boxes under hero */
      .feature-row{display:flex;gap:12px;margin-top:20px}
      .feature{flex:1;background:linear-gradient(180deg,rgba(255,255,255,0.9),var(--card));padding:14px;border-radius:10px;text-align:center;box-shadow:var(--shadow)}
      .feature h4{margin:8px 0 6px}
      .feature p{margin:0;color:var(--muted);font-size:14px}

      /* Two column layout below */
      .columns{display:grid;grid-template-columns:1fr 420px;gap:24px;margin-top:30px}

      /* Chat assistant */
      .chat-card{background:var(--card);padding:18px;border-radius:12px;box-shadow:var(--shadow);min-height:360px;display:flex;flex-direction:column}
      .chat-header{display:flex;align-items:center;gap:12px}
      .avatar{width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;color:white;font-weight:700}
      .chat-messages{flex:1;overflow:auto;margin-top:14px;padding-right:6px}
      .msg{display:flex;gap:10px;margin-bottom:12px}
      .msg.bot{justify-content:flex-start}
      .msg.user{justify-content:flex-end}
      .bubble{max-width:78%;padding:10px 12px;border-radius:12px;font-size:14px;line-height:1.3}
      .bubble.bot{background:#fff;border:1px solid rgba(0,0,0,0.04)}
      .bubble.user{background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white}
      .chat-input{display:flex;gap:8px;padding-top:12px;align-items:center}
      .chat-input input{flex:1;padding:10px 12px;border-radius:10px;border:1px solid rgba(0,0,0,0.06)}

      /* Services grid */
      .services{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
      .card{background:var(--card);padding:16px;border-radius:12px;box-shadow:var(--shadow)}
      .card h5{margin:10px 0 8px}
      .card p{margin:0;color:var(--muted);font-size:14px}

      /* CTA */
      .cta{margin-top:22px;padding:20px;border-radius:12px;background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white;text-align:center}

      /* Responsive */
      @media (max-width:980px){
        .columns{grid-template-columns:1fr;}
        .services{grid-template-columns:repeat(2,1fr)}
        h1{font-size:28px}
      }
      @media (max-width:560px){
        .feature-row{flex-direction:column}
        .services{grid-template-columns:1fr}
      }
    `;
    document.head.appendChild(style);
  }, []);

  function handleSend(e) {
    e && e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), by: "user", text: input.trim() };
    setChatMessages((m) => [...m, userMsg]);
    setInput("");

    // fake bot response for demo
    setTimeout(() => {
      setChatMessages((m) => [
        ...m,
        { id: Date.now() + 1, by: "bot", text: "Thanks — I can help with that. Could you share case number or a brief description?" },
      ]);
    }, 900);
  }

  return (
    <div style={{ padding: 18 }}>
      <div className="container">
        <header>
          <div className="logo">
            <div className="mark">JA</div>
            <div>
              <div style={{ fontWeight: 800 }}>Justice AI</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Committed to citizens' justice</div>
            </div>
          </div>
          <nav>
            <a href="#">Home</a>
            <a href="#services">Services</a>
            <a href="#legalchat">Legal Chat</a>
            <a href="#help">Help</a>
            <div className="lang">English ▾</div>
          </nav>
        </header>

        <main>
          <section className="hero">
            <div className="hero-top">
              <span className="badge">Available 24/7</span>
            </div>
            <h1>Justice AI
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 6 }}>Your Legal Assistant</div>
            </h1>
            <p className="lead">Get instant answers to legal questions, check case status, and understand judiciary procedures in simple language. Available in Hindi and English.</p>

            <div className="hero-ctas">
              <button className="btn btn-primary">Start Legal Chat</button>
              <button className="btn btn-outline">Check Case Status</button>
            </div>

            <div className="feature-row">
              <div className="feature">
                <div style={{ fontSize: 20, fontWeight: 700 }}>Legal Guidance</div>
                <p>Ask questions about legal procedures and get instant help.</p>
              </div>
              <div className="feature">
                <div style={{ fontSize: 20, fontWeight: 700 }}>Case Tracking</div>
                <p>Check your case status and get real-time updates.</p>
              </div>
              <div className="feature">
                <div style={{ fontSize: 20, fontWeight: 700 }}>Court Procedures</div>
                <p>Understand court processes and required documentation.</p>
              </div>
            </div>
          </section>

          <div className="columns">
            <div>
              <section className="chat-card" id="legalchat">
                <div className="chat-header">
                  <div className="avatar">AI</div>
                  <div>
                    <div style={{ fontWeight: 800 }}>Legal Chat Assistant</div>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>Ask any legal question in Hindi or English. Our AI is here 24/7.</div>
                  </div>
                </div>

                <div className="chat-messages" aria-live="polite">
                  {chatMessages.map((m) => (
                    <div key={m.id} className={`msg ${m.by === "bot" ? "bot" : "user"}`}>
                      {m.by === "bot" && <div className="avatar" style={{ width: 36, height: 36, borderRadius: 8 }}>AI</div>}
                      <div className={`bubble ${m.by === "bot" ? "bot" : "user"}`}>{m.text}</div>
                      {m.by === "user" && <div style={{ width: 36 }} />}
                    </div>
                  ))}
                </div>

                <form className="chat-input" onSubmit={handleSend}>
                  <input aria-label="Type your legal question" placeholder="Type your legal question here..." value={input} onChange={(e) => setInput(e.target.value)} />
                  <button className="btn btn-primary" type="submit">Send</button>
                </form>
              </section>

              <div style={{ marginTop: 20 }}>
                <h3 style={{ margin: "8px 0" }}>Legal Services Available</h3>
                <div className="services" id="services">

                  <div className="card">
                    <div style={{ fontSize: 22 }}>📜</div>
                    <h5>Legal Procedures</h5>
                    <p>Get step-by-step guidance on filing cases, court procedures, and legal documentation.</p>
                  </div>

                  <div className="card">
                    <div style={{ fontSize: 22 }}>🔎</div>
                    <h5>Case Status Tracking</h5>
                    <p>Track your ongoing cases, next hearing dates, and receive updates as cases progress.</p>
                  </div>

                  <div className="card">
                    <div style={{ fontSize: 22 }}>⚖️</div>
                    <h5>Know Your Rights</h5>
                    <p>Understand your fundamental and legal rights in a clear, non-technical way.</p>
                  </div>

                  <div className="card">
                    <div style={{ fontSize: 22 }}>🤝</div>
                    <h5>Find Legal Help</h5>
                    <p>Connect with qualified lawyers and legal aid services in your area when needed.</p>
                  </div>

                  <div className="card">
                    <div style={{ fontSize: 22 }}>📁</div>
                    <h5>Court Information</h5>
                    <p>Get court timelines, required documents, and fees for various procedures.</p>
                  </div>

                  <div className="card">
                    <div style={{ fontSize: 22 }}>🏛️</div>
                    <h5>Nearby Courts</h5>
                    <p>Find the nearest courts, legal aid centers, and government legal service offices.</p>
                  </div>

                </div>
              </div>
            </div>

            <aside>
              <div className="card">
                <h4>Need Immediate Legal Help?</h4>
                <p style={{ color: "var(--muted)" }}>Our AI assistant is available 24/7 to help you with urgent legal questions and guidance.</p>
                <div style={{ marginTop: 12 }}>
                  <button className="btn btn-primary">Start Immediate Chat</button>
                </div>
              </div>

              <div className="card" style={{ marginTop: 14 }}>
                <h4>Quick Actions</h4>
                <ul style={{ paddingLeft: 18, margin: "8px 0", color: "var(--muted)" }}>
                  <li>Track Case Status</li>
                  <li>Find a Lawyer</li>
                  <li>Download Forms</li>
                </ul>
              </div>
            </aside>
          </div>

          <div style={{ marginTop: 26, textAlign: "center" }}>
            <div className="cta">
              <div style={{ fontSize: 20, fontWeight: 800 }}>Need Immediate Legal Help?</div>
              <div style={{ marginTop: 8 }}>Our AI assistant is available 24/7 for urgent legal questions and guidance.</div>
              <div style={{ marginTop: 12 }}>
                <button className="btn" style={{ background: "white", color: "#5a3f2a", fontWeight: 800, padding: "10px 14px", borderRadius: 9 }}>Start Chat</button>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
