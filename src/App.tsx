import { useEffect, useState, type KeyboardEvent, type ReactNode } from "react";

type IconName =
  | "arrow"
  | "camera"
  | "check"
  | "clock"
  | "close"
  | "cube"
  | "leaf"
  | "location"
  | "mic"
  | "route"
  | "shield"
  | "sparkle"
  | "user";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    camera: <><path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3z"/><circle cx="12" cy="13" r="3.5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    close: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    cube: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></>,
    leaf: <><path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z"/><path d="M4 21c2-5 6-9 12-12"/></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    mic: <><rect x="8" y="3" width="8" height="13" rx="4"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></>,
    route: <><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h4a3 3 0 0 0 0-6 3 3 0 0 1 0-6h4"/></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    sparkle: <><path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4z"/><path d="m19 15 .6 1.9 1.9.6-1.9.6L19 20l-.6-1.9-1.9-.6 1.9-.6z"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Action({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };
  return (
    <div className={`action ${className}`} role="button" tabIndex={0} onClick={onClick} onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
}

function App() {
  const [view, setView] = useState<"donor" | "shelter">("donor");
  const [recording, setRecording] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [seconds, setSeconds] = useState(80 * 60);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => Math.max(value - 1, 0)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = String(seconds % 60).padStart(2, "0");

  return (
    <main className="app-shell">
      <nav className="topbar">
        <div className="brand">
          <div className="brand-mark"><Icon name="leaf" size={21} /></div>
          <div className="brand-name">SharePlate <span>AI</span></div>
        </div>
        <div className="view-switch" aria-label="Choose dashboard view">
          <Action className={view === "donor" ? "switch-item active" : "switch-item"} onClick={() => setView("donor")}>Share food</Action>
          <Action className={view === "shelter" ? "switch-item active" : "switch-item"} onClick={() => setView("shelter")}>Receive food</Action>
        </div>
        <div className="nav-actions">
          <div className="live-status"><span /> Ready to help</div>
          <div className="avatar">AM</div>
        </div>
      </nav>

      <section className="page-header">
        <div>
          <div className="eyebrow"><Icon name="sparkle" size={15} /> {view === "donor" ? "You’re sharing food" : "You’re receiving food"}</div>
          <div className="display-title">
            {view === "donor" ? "Let’s share your extra meals." : "Food is ready for your team."}
          </div>
          <div className="subtitle">
            {view === "donor"
              ? "Add a photo and tell us about the food. We’ll find someone nearby to collect it."
              : "Review the food, travel time, and pickup details before you accept."}
          </div>
        </div>
        {claimed ? (
          <div className="claimed-pill"><Icon name="check" size={16} /> Pickup confirmed</div>
        ) : (
          <div className="step-label">New food offer <b>01</b></div>
        )}
      </section>

      <section className={`dashboard-grid ${view === "shelter" ? "shelter-focus" : ""}`}>
        <div className="column-left">
          <div className="panel intake-panel">
            <div className="panel-heading">
              <div>
                <div className="kicker">Step 1 of 2</div>
                <div className="title">What food are you sharing?</div>
              </div>
              <div className="secure-note"><Icon name="shield" size={15} /> Private & secure</div>
            </div>

            <div className="capture-grid">
              <Action className="photo-card">
                <div className="food-illustration">
                  <div className="container-lid" />
                  <div className="food-box">
                    <span className="food rice" />
                    <span className="food greens" />
                    <span className="food curry" />
                  </div>
                  <div className="scan-corner corner-one" />
                  <div className="scan-corner corner-two" />
                  <div className="scan-corner corner-three" />
                  <div className="scan-corner corner-four" />
                </div>
                <div className="photo-content">
                  <div className="round-icon"><Icon name="camera" size={20} /></div>
                  <div>
                    <div className="capture-title">Add a food photo</div>
                    <div className="capture-subtitle">We’ll check that it looks safe to share</div>
                  </div>
                </div>
                <div className="scan-badge"><Icon name="check" size={13} /> Image ready</div>
              </Action>

              <Action className={recording ? "voice-card recording" : "voice-card"} onClick={() => setRecording(!recording)}>
                <div className="mic-wrap">
                  <span className="pulse p1" />
                  <span className="pulse p2" />
                  <div className="mic-circle"><Icon name={recording ? "close" : "mic"} size={27} /></div>
                </div>
                <div className="voice-copy">
                  <div className="capture-title">{recording ? "Listening…" : "Tap to describe"}</div>
                    <div className="capture-subtitle">{recording ? "Tap again when you’re done" : "Say what it is, how much, when, and where"}</div>
                </div>
                {recording && <div className="wave"><i /><i /><i /><i /><i /><i /><i /></div>}
              </Action>
            </div>

            <div className="transcript">
              <div className="transcript-top">
                <div className="transcript-label"><span className="gemini-dot" /> What we heard</div>
                <div className="language">You can edit this</div>
              </div>
              <div className="quote">
                “We have 20 boxed biryani and sandwich meals left from our GDG session in Main Hall. They were prepared around 1 PM.”
              </div>
              <div className="transcript-meta">
                <span><Icon name="clock" size={14} /> 0:12</span>
                <span>Sounds clear</span>
              </div>
            </div>
          </div>

          <div className="panel analysis-panel">
            <div className="analysis-head">
              <div className="ai-orb"><Icon name="sparkle" size={19} /></div>
              <div>
                <div className="title small">Food safety check</div>
                <div className="caption">Checked just now</div>
              </div>
              <div className="verified"><Icon name="check" size={14} /> Looks good</div>
            </div>
            <div className="findings">
              <div className="finding">
                <div className="finding-icon green"><Icon name="cube" size={18} /></div>
                <div><span>Food boxes</span><b>Closed securely</b></div>
              </div>
              <div className="finding">
                <div className="finding-icon amber"><Icon name="clock" size={18} /></div>
                <div><span>How soon?</span><b>Share today</b></div>
              </div>
              <div className="finding">
                <div className="finding-icon violet"><Icon name="shield" size={18} /></div>
                <div><span>Food shown</span><b>Rice & chicken</b></div>
              </div>
            </div>
            <div className="ai-note">
              <Icon name="sparkle" size={16} />
              <span>Looks freshly packed and properly sealed. Keep it chilled while it’s being carried.</span>
            </div>
          </div>
        </div>

        <div className="column-right">
          <div className="safety-card">
            <div className="safety-top">
              <div>
                <div className="safety-label"><Icon name="shield" size={15} /> Time left to share safely</div>
                <div className="timer">{minutes}:{remainingSeconds}</div>
                <div className="timer-note">to get the food to the receiving group</div>
              </div>
              <div className="gauge">
                <svg viewBox="0 0 100 100">
                  <circle className="gauge-base" cx="50" cy="50" r="40" />
                  <circle className="gauge-value" cx="50" cy="50" r="40" />
                </svg>
                <div><b>82%</b><span>fresh</span></div>
              </div>
            </div>
            <div className="progress"><span /></div>
            <div className="safety-stats">
              <div><span>Made at</span><b>1:00 PM</b></div>
              <div><span>Collect before</span><b>4:52 PM</b></div>
              <div><span>Meals</span><b>20 boxes</b></div>
            </div>
          </div>

          <div className="panel route-panel">
            <div className="panel-heading route-heading">
              <div>
                <div className="kicker">{claimed ? "Pickup confirmed" : "Step 2 of 2"}</div>
                <div className="title">{claimed ? "Riya is on the way" : "A nearby group can receive it"}</div>
              </div>
              <div className="match-score">Great fit</div>
            </div>

            <div className="map">
              <div className="road road-one" />
              <div className="road road-two" />
              <div className="road road-three" />
              <div className="park park-one" />
              <div className="park park-two" />
              <div className="map-label label-one">Central Ave</div>
              <div className="map-label label-two">Riverside</div>
              <svg className="route-line" viewBox="0 0 500 210" preserveAspectRatio="none">
                <path d="M94 155 C155 160, 180 60, 255 93 S350 170, 412 57" />
              </svg>
              <div className="pin donor-pin"><Icon name="cube" size={17} /></div>
              <div className="pin shelter-pin"><Icon name="leaf" size={17} /></div>
              <div className="eta-chip"><Icon name="route" size={14} /> 12 min</div>
            </div>

            <div className="match-card">
              <div className="shelter-logo"><Icon name="leaf" size={21} /></div>
              <div className="match-info">
                <div className="match-name">Seva Community Kitchen</div>
                <div className="match-meta"><span>2.8 km away</span><i /> <span>Can take up to 45 meals</span></div>
              </div>
              <div className="eta"><b>12 min</b><span>travel</span></div>
            </div>

            <div className="locations">
              <div className="location-row">
                <div className="route-dot origin" />
                <div><span>Food is coming from</span><b>GDG Main Hall, Entrance B</b></div>
                <div className="location-time">Now</div>
              </div>
              <div className="route-stem" />
              <div className="location-row">
                <div className="route-dot destination"><Icon name="location" size={12} /></div>
                <div><span>Food is going to</span><b>Seva Community Kitchen</b></div>
                <div className="location-time">4:04 PM</div>
              </div>
            </div>

            {claimed ? (
              <div className="success-action">
                <div className="driver-avatar"><Icon name="user" size={18} /></div>
                <div><span>Collecting your food</span><b>Riya • Vehicle KA 04 M 2187</b></div>
                <div className="contact-chip">Contact</div>
              </div>
            ) : (
              <Action className="primary-action" onClick={() => setClaimed(true)}>
                <span>{view === "shelter" ? "Yes, we can receive this food" : "Send pickup request"}</span>
                <Icon name="arrow" size={19} />
              </Action>
            )}
            <div className="auto-note">
              <Icon name="clock" size={14} />
              If they don’t reply, we’ll ask another nearby group in <b>03:42</b>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div><span className="footer-mark"><Icon name="leaf" size={14} /></span> Every minute matters. Every meal counts.</div>
        <div className="impact"><b>20 meals</b> shared means <b>less food wasted</b> today</div>
      </footer>
    </main>
  );
}

export default App;
