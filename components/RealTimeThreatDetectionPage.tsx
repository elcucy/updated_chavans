
import React, { useEffect, useRef } from 'react';
import CanvasBackground from './CanvasBackground';
import '../styles/security-page.css';
import '../styles/security-real-time.css';

// --- Icons --- //
const BoltIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;

const RealTimeThreatDetectionPage: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
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

    const whatWeCoverItems = [
        { area: "Behaviour Baseline Creation", focus: "Threat signal collection and behavioural baselines" },
        { area: "Continuous Threat Signal Monitoring", focus: "Telemetry enrichment and real-time threat data collection" },
        { area: "AI/ML Driven Anomaly Detection", focus: "Anomaly detection engines and dynamic threat scoring" },
        { area: "Automated Containment & Response", focus: "Automated response logic and isolation playbooks" },
        { area: "SOC Integration & Intelligence Feedback", focus: "SOC-aligned detection patterns and continuous intelligence feedback" }
    ];

    const processSteps = [
        { title: "Behaviour Baseline Creation", description: "Understand normal device + app + identity behaviour to detect abnormal deviations early." },
        { title: "Continuous Threat Signal Monitoring", description: "Collect telemetry from device state, runtime behaviour, auth flows, network and app activity." },
        { title: "AI/ML Driven Anomaly Detection", description: "Analyse deviations, correlations and suspicious patterns in real-time." },
        { title: "Automated Containment & Response", description: "If threat risk is high → isolate, block or restrict instantly." },
        { title: "SOC Integration & Intelligence Feedback", description: "Feed enriched signals into SOC for improved detection, investigation and future defence strengthening." },
    ];

    const caseStudies = [
        { title: "Microsoft Defender Threat Analytics", url: "https://learn.microsoft.com/microsoft-365/security/defender/threat-analytics", description: "A continuously updated threat intelligence service that provides active campaign visibility, TTP breakdowns and recommended defensive actions to strengthen proactive prevention." },
        { title: "Google Chronicle Security Analytics", url: "https://cloud.google.com/chronicle", description: "A hyperscale security analytics platform that correlates global telemetry at speed — enabling faster detection cycles, reduced alert noise and better threat triage accuracy." },
        { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", description: "A globally recognized adversary behaviour framework used to map attacker techniques, identify detection coverage gaps and strengthen SOC prioritization." }
    ];

    return (
        <div className="ssp-page ssp-page-rttd" ref={pageRef}>
            <CanvasBackground 
                particleColor="rgba(239, 68, 68, 0.7)" 
                lineColor="rgba(239, 68, 68, 0.1)"
                particleCount={40}
            />
            <header className="ssp-hero">
                <div className="container fade-in-section" ref={el => sectionsRef.current[0] = el}>
                    <h1>Real-Time Threat Detection</h1>
                    <p className="ssp-intro">
                        Real-Time Threat Detection focuses on identifying malicious behaviour, suspicious activity and exploit attempts as they happen — directly at Edge devices, Edge workloads and Edge connected users. Instead of reacting after an incident occurs, threats are detected instantly so containment happens before impact reaches core infrastructure.
                    </p>
                </div>
            </header>
            
            <main>
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[1] = el}>
                        <h2>Why It Matters</h2>
                        <div className="ssp-divider"></div>
                        <p>Modern attacks are fast — token theft, credential replay, ransomware staging and privilege escalation no longer take hours or days… they take seconds. Edge is where the first signal originates. If detection is delayed, containment becomes expensive, noisy and difficult for SOC teams. Real-time detection ensures attacks are blocked at the earliest entry point.</p>
                    </div>
                </section>
                
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[2] = el}>
                        <h2>Our Proven Process</h2>
                        <div className="ssp-divider"></div>
                        <div className="ssp-process-grid">
                            {processSteps.map((step, index) => (
                                <div className="ssp-process-card" key={index}>
                                    <div className="ssp-process-step-number">{index + 1}</div>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            ))}
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
                        <p>Reduced attacker dwell time, early prevention before escalation, faster response cycles, higher SOC clarity, increased defensive automation and significantly lower breach cost impact.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[5] = el}>
                        <h2>Who It’s For</h2>
                        <div className="ssp-divider"></div>
                        <p>Organizations managing distributed fleets, remote workforce, retail/branch compute locations, frontline Edge endpoints, industrial IoT/OT environments, AI PC workloads and businesses where threat speed cannot rely on delayed centralized response.</p>
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
                            <div className="ssp-arch-item">Device signals</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">anomaly detection</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">threat score</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">automated containment</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">SOC intelligence feedback</div>
                        </div>
                    </div>
                </section>

                 <section className="ssp-section fade-in-section" ref={el => sectionsRef.current[8] = el}>
                    <div className="container">
                        <h2>Discover More in Edge Security</h2>
                         <div className="ssp-divider"></div>
                        <p>Explore End-Point Protection and Zero Trust Access to strengthen complete Edge defence coverage.</p>
                        <div className="ssp-discover-container">
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/edge/endpoint-protection')}
                            >
                                Explore End-Point Protection <span>&rarr;</span>
                            </button>
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/edge/zero-trust-access')}
                            >
                                Explore Zero Trust Access <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="ssp-cta-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[9] = el}>
                        <h2>Start Your Security Journey</h2>
                        <p>Prevent threats before they become incidents — stop them in real-time at the Edge.</p>
                        <button className="btn" onClick={openModal}>Request a Consultation</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default RealTimeThreatDetectionPage;
