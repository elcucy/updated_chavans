
import React, { useEffect, useRef, useState } from 'react';
import CanvasBackground from '../../CanvasBackground';
import '../../../styles/security-page.css';
import '../../../styles/security-xdr.css';

const XDRSection: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
    const pageRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<(HTMLElement | null)[]>([]);
    const [canvasError, setCanvasError] = useState(false);

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
        { step: "Step 1", title: "Unified Ingestion", desc: "Connect telemetry from endpoints, networks, identity providers, and cloud workloads into a single data lake." },
        { step: "Step 2", title: "Cross-Domain Correlation", desc: "Apply AI/ML analytics to link isolated alerts (e.g., a login failure + a file download) into a single incident." },
        { step: "Step 3", title: "High-Fidelity Detection", desc: "Filter out noise and identify complex attack chains that single-point solutions miss." },
        { step: "Step 4", title: "Automated Investigation", desc: "Auto-enrich incidents with context (user role, device health, IP reputation) to speed up analyst decision-making." },
        { step: "Step 5", title: "Coordinated Response", desc: "Trigger automated containment actions—block IPs, isolate devices, suspend users—across the entire estate instantly." }
    ];

    const whatWeCoverItems = [
        { area: "Endpoint Telemetry (EDR)", focus: "Deep visibility into process execution, file changes, and shell commands on devices." },
        { area: "Network Traffic Analysis (NTA)", focus: "Monitoring east-west traffic, DNS queries, and encrypted connections for anomalies." },
        { area: "Identity & Access (UEBA)", focus: "Detecting compromised credentials, impossible travel, and abnormal privilege escalation." },
        { area: "Cloud Workload Security", focus: "Tracking API calls, container activity, and serverless function execution." },
        { area: "Automated Response (SOAR)", focus: "Playbooks for instant remediation like isolating hosts or resetting passwords." }
    ];

    const caseStudies = [
        { title: "Microsoft Defender XDR", url: "https://www.microsoft.com/en-us/security/business/siem-and-xdr/microsoft-defender-xdr", description: "Integrated defense suite coordinating detection and response across endpoints, identities, email, and apps." },
        { title: "Palo Alto Cortex XDR", url: "https://www.paloaltonetworks.com/cortex/cortex-xdr", description: "Industry's first extended detection and response platform that integrates endpoint, network, and cloud data." },
        { title: "CrowdStrike Falcon XDR", url: "https://www.crowdstrike.com/products/xdr/", description: "Extends endpoint protection with network and third-party telemetry for unified threat hunting." }
    ];

    return (
        <div className="ssp-page ssp-page-xdr" ref={pageRef}>
            {!canvasError && (
                <div className="canvas-wrapper">
                    <CanvasBackground 
                        particleColor="rgba(217, 70, 239, 0.7)" 
                        lineColor="rgba(217, 70, 239, 0.15)"
                        particleCount={45}
                    />
                </div>
            )}

            <header className="ssp-hero">
                <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[0] = el }}>
                    <h1>Extended Detection & Response (XDR)</h1>
                    <p className="ssp-intro">
                        Unify your defense. Detect hidden threats. Respond in seconds.
                    </p>
                    <div className="xdr-hero-subtext">
                        Modern threats move fast, across endpoints, networks, identities, and cloud environments. XDR brings all these signals together into a single, intelligent defense layer.
                    </div>
                </div>
            </header>
            
            <main>
                {/* New Overview Section to represent the text block nicely */}
                <section className="ssp-section xdr-overview-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[1] = el }}>
                        <div className="xdr-split-layout">
                            <div className="xdr-text-content">
                                <h2>The Challenge</h2>
                                <p>
                                    Modern threats move fast, traversing endpoints, networks, identities, and cloud environments in seconds. Traditional security tools operate in silos, leaving gaps that attackers exploit.
                                </p>
                                <p>
                                    <strong>Extended Detection & Response (XDR)</strong> solves this by bringing all these signals together into a single, intelligent defense layer — giving security teams the ability to detect, investigate, and respond to complex attacks faster and with greater accuracy.
                                </p>
                            </div>
                            <div className="xdr-text-content highlight-box">
                                <h2>How Chavans Helps</h2>
                                <p>
                                    At Chavans, we help organizations deploy and manage XDR solutions that integrate telemetry from <strong>endpoints, workloads, identities, and networks</strong> into one unified detection platform.
                                </p>
                                <p>
                                    This enables faster investigation, automated containment, and end-to-end visibility across the entire attack surface — ensuring threats are stopped before they become breaches.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[2] = el }}>
                        <h2>Our Proven Process</h2>
                        <div className="ssp-divider"></div>
                        <p style={{marginBottom: '3rem'}}>We build your XDR capability through a structured integration and optimization lifecycle:</p>
                        
                        <div className="xdr-timeline-container">
                            <div className="xdr-timeline-track">
                                {timelineSteps.map((item, index) => (
                                    <div className="xdr-timeline-card" key={index} tabIndex={0}>
                                        <div className="xdr-step-badge">Step {item.step}</div>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[3] = el }}>
                        <h2>What We Cover</h2>
                        <div className="ssp-divider"></div>
                        
                        <div className="ssp-table">
                            <div className="ssp-table-header">Domain</div>
                            <div className="ssp-table-header">Capability Focus</div>
                            
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
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[4] = el }}>
                        <h2>What You Get</h2>
                        <div className="ssp-divider"></div>
                        <div className="xdr-benefits-grid">
                            <div className="xdr-benefit-card">
                                <h3>Reduced MTTD & MTTR</h3>
                                <p>Slash detection and response times from days to minutes.</p>
                            </div>
                            <div className="xdr-benefit-card">
                                <h3>Fewer False Positives</h3>
                                <p>AI-driven correlation filters out noise so analysts focus on real threats.</p>
                            </div>
                            <div className="xdr-benefit-card">
                                <h3>Proactive Threat Hunting</h3>
                                <p>Shift from reactive alerts to proactive hunting across the estate.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[5] = el }}>
                        <h2>Architecture Diagram (TAD)</h2>
                        <div className="ssp-divider"></div>
                        <div className="ssp-arch-diagram">
                            <div className="ssp-arch-item">Endpoints & Identities</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">Data Lake Integration</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">AI Correlation Engine</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">Unified Incident View</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">Auto-Response Playbook</div>
                        </div>
                        <p className="ssp-arch-caption">Data Flow: Signals Ingested → Normalized → Correlated → Analyzed → Response Triggered.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[6] = el }}>
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

                 <section className="ssp-section fade-in-section" ref={el => { if(el) sectionsRef.current[7] = el }}>
                    <div className="container">
                        <h2>Discover More in Infrastructure Security</h2>
                         <div className="ssp-divider"></div>
                        <p>Explore complementary capabilities: SIEM for log compliance and Cloud Workload Protection for runtime security.</p>
                        <div className="ssp-discover-container">
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/infra/siem')}
                            >
                                Explore SIEM <span>&rarr;</span>
                            </button>
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/infra/cloud-workload-protection')}
                            >
                                Explore CWPP <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="ssp-cta-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[8] = el }}>
                        <h2>Start Your Security Journey</h2>
                        <p>Eliminate blind spots. Unify your security stack. Stop breaches faster.</p>
                        <button className="btn" onClick={openModal}>Request a Consultation</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default XDRSection;
