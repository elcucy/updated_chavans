
import React, { useEffect, useRef } from 'react';
import CanvasBackground from '../../CanvasBackground';
import '../../../styles/security-page.css';
import '../../../styles/security-agent-behaviour.css';

const AgentBehaviourMonitoringSection: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
    const pageRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const currentSections = sectionsRef.current.filter(el => el !== null);
        currentSections.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            currentSections.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    const timelineSteps = [
        { step: "Step 1", title: "List and Identify Agents", desc: "Find all agents running across systems — including security tools, monitoring, and automation agents." },
        { step: "Step 2", title: "Define Normal Behaviour", desc: "Understand what normal activity looks like for each agent, such as network use, file access, and system load." },
        { step: "Step 3", title: "Monitor in Real Time", desc: "Watch agent actions continuously to catch anything unusual or risky." },
        { step: "Step 4", title: "Apply Rules and Containment", desc: "If an agent behaves oddly, automatically restrict or isolate it to prevent any issues." },
        { step: "Step 5", title: "Alert Security Teams", desc: "Send alerts and reports to your security team for review, investigation, and action." }
    ];

    const whatWeCoverItems = [
        { area: "List and Identify Agents", focus: "Agent discovery, telemetry collection, and inventory visibility." },
        { area: "Define Normal Behaviour", focus: "Behavioural baselining and anomaly scoring for agent activity." },
        { area: "Monitor in Real Time", focus: "Continuous monitoring and deviation detection for operational assurance." },
        { area: "Apply Rules and Containment", focus: "Enforcement automation and isolation of abnormal agent behaviour." },
        { area: "Alert Security Teams", focus: "Reporting, alerting, and integration with SIEM/SOC systems for rapid response." }
    ];

    const caseStudies = [
        { title: "Microsoft Defender for Endpoint Sensors", url: "https://learn.microsoft.com/microsoft-365/security/defender-endpoint/next-generation-protection", description: "Guidance on next-generation protection and sensor capabilities for monitoring endpoint behaviour and blocking emerging threats." },
        { title: "Google Cloud Operations Suite (Ops Agent)", url: "https://cloud.google.com/stackdriver/docs/solutions/agents", description: "Unified agent solution for gathering metrics and logs from Compute Engine instances to monitor workload performance and health." },
        { title: "MITRE ATT&CK – Detection Engineering Guide", url: "https://attack.mitre.org/resources/", description: "Resources and guides for using the ATT&CK framework to engineer detections based on adversary behaviour patterns." }
    ];

    return (
        <div className="ssp-page ssp-page-abm" ref={pageRef}>
            <CanvasBackground 
                particleColor="rgba(16, 185, 129, 0.7)" 
                lineColor="rgba(16, 185, 129, 0.1)"
                particleCount={40}
            />
            <header className="ssp-hero">
                <div className="container fade-in-section" ref={el => sectionsRef.current[0] = el}>
                    <h1>Agent Behaviour Monitoring</h1>
                    <p className="ssp-intro">
                        Modern applications and endpoints often run multiple software agents for management, security, monitoring, and automation. Each of these agents operates continuously and has privileged access to system resources — which makes them potential targets for misuse, tampering, or exploitation. Agent Behaviour Monitoring (ABM) ensures all these agents behave as intended, remain compliant, and operate safely across runtime environments.
                    </p>
                </div>
            </header>
            
            <main>
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[1] = el}>
                        <h2>Why It Matters</h2>
                        <div className="ssp-divider"></div>
                        <p>Unmonitored agents can become blind spots in enterprise environments. A compromised or malfunctioning agent can expose sensitive data, overload systems, or disable key protections. By continuously tracking agent behaviour, organizations can detect abnormal actions early — preventing potential misuse or performance degradation before it impacts business operations.</p>
                    </div>
                </section>
                
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[2] = el}>
                        <h2>Our Proven Process</h2>
                        <div className="ssp-divider"></div>
                        <p style={{marginBottom: '3rem'}}>We operationalize ABM through five clear steps: discovery, behavioral baseline, real-time monitoring, enforcement and containment, and alerting to security teams.</p>
                        
                        <div className="abm-timeline-container">
                            <div className="abm-timeline-track">
                                {timelineSteps.map((item, index) => (
                                    <div className="abm-timeline-card" key={index} tabIndex={0}>
                                        <div className="abm-step-badge">{item.step}</div>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[3] = el}>
                        <h2>What We Cover</h2>
                        <div className="ssp-divider"></div>
                        
                        <div className="ssp-table">
                            <div className="ssp-table-header">Area</div>
                            <div className="ssp-table-header">Focus</div>
                            
                            {whatWeCoverItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="ssp-table-cell title">{item.area}</div>
                                    <div className="ssp-table-cell">{item.focus}</div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[4] = el}>
                        <h2>What You Get</h2>
                        <div className="ssp-divider"></div>
                        <p>Stronger endpoint and workload stability, early detection of compromised or malfunctioning agents, reduced false positives, improved system reliability, and centralized visibility of all agent activity from one unified dashboard.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[5] = el}>
                        <h2>Who It’s For</h2>
                        <div className="ssp-divider"></div>
                        <p>Enterprises running multiple management or protection agents across their IT landscape — including EDR/XDR systems, endpoint management tools, patching software, monitoring agents, and workload automation frameworks across hybrid or multi-cloud environments.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[6] = el}>
                        <h2>Case Studies / Reference White Papers</h2>
                        <div className="ssp-divider"></div>
                        <div className="ssp-case-study-grid">
                            {caseStudies.map((study, index) => (
                                <a href={study.url} target="_blank" rel="noopener noreferrer" className="ssp-case-study-card" key={index}>
                                    <h3>{study.title}</h3>
                                    <p>{study.description}</p>
                                    <span>Read More →</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[7] = el}>
                        <h2>Architecture Diagram (TAD)</h2>
                        <div className="ssp-divider"></div>
                        <div className="ssp-arch-diagram">
                            <div className="ssp-arch-item">Agent runtime</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">collect telemetry</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">compare with baseline</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">detect anomaly</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">enforce action</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">send signal to SOC</div>
                        </div>
                    </div>
                </section>

                 <section className="ssp-section fade-in-section" ref={el => sectionsRef.current[8] = el}>
                    <div className="container">
                        <h2>Discover More in App & Agents Security</h2>
                         <div className="ssp-divider"></div>
                        <p>Explore Runtime Application Self-Protection and API Security — together these capabilities provide comprehensive application and agent protection.</p>
                        <div className="ssp-discover-container">
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/app/runtime-application-self-protection')}
                            >
                                Explore RASP <span>&rarr;</span>
                            </button>
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/app/api-security')}
                            >
                                Explore API Security <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="ssp-cta-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[9] = el}>
                        <h2>Start Your Security Journey</h2>
                        <p>Monitor every agent, detect every deviation — and ensure your environment runs only trusted, safe, and compliant software.</p>
                        <button className="btn" onClick={openModal}>Request a Consultation</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AgentBehaviourMonitoringSection;
