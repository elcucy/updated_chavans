
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
        { step: "Step 1", title: "Environment Integration", desc: "Connect all data sources including endpoint, network, identity, and cloud telemetry into the XDR platform." },
        { step: "Step 2", title: "Unified Threat Detection", desc: "Correlate signals from multiple domains using advanced analytics, AI, and behavior-based models." },
        { step: "Step 3", title: "Automated Response Playbooks", desc: "Define automated actions such as isolating endpoints, blocking IPs, or disabling compromised accounts in real time." },
        { step: "Step 4", title: "Cross-Domain Investigation", desc: "Provide analysts with contextual incident views linking related alerts across systems to speed up root cause analysis." },
        { step: "Step 5", title: "Continuous Learning & Optimization", desc: "Refine detection rules, enhance automation logic, and integrate feedback from incident outcomes for better future protection." }
    ];

    const whatWeCoverItems = [
        { area: "Environment Integration", focus: "Cross-domain data integration from endpoint, network, identity, and cloud sources" },
        { area: "Unified Threat Detection", focus: "AI-based threat correlation and behavior analytics across all telemetry domains" },
        { area: "Automated Response Playbooks", focus: "Automated containment, playbook execution, and real-time threat response" },
        { area: "Cross-Domain Investigation", focus: "Integrated incident investigation and contextual alert correlation" },
        { area: "Continuous Learning & Optimization", focus: "Continuous tuning, rule optimization, and feedback-driven protection enhancement" }
    ];

    const caseStudies = [
        { title: "Microsoft Defender XDR", url: "https://learn.microsoft.com/en-us/security/defender-xdr/overview", description: "Unified XDR solution integrating signals across endpoints, identities, email, and cloud to deliver coordinated defense." },
        { title: "Google Cloud Security Operations (Chronicle XDR)", url: "https://cloud.google.com/security/operations", description: "Provides context-aware threat detection and response across hybrid and multi-cloud workloads using advanced analytics." },
        { title: "Palo Alto Cortex XDR", url: "https://www.paloaltonetworks.com/cortex/cortex-xdr", description: "Industry-leading XDR platform that combines endpoint, network, and cloud data for comprehensive threat prevention and faster response." }
    ];

    return (
        <div className="ssp-page ssp-page-xdr" ref={pageRef}>
            {!canvasError && (
                <div className="canvas-wrapper">
                    <CanvasBackground 
                        particleColor="rgba(217, 70, 239, 0.7)" 
                        lineColor="rgba(217, 70, 239, 0.1)"
                        particleCount={40}
                    />
                </div>
            )}

            <header className="ssp-hero">
                <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[0] = el }}>
                    <h1>Extended Detection & Response (XDR)</h1>
                    <p className="ssp-intro">
                        Modern threats move fast, across endpoints, networks, identities, and cloud environments. Extended Detection & Response (XDR) brings all these signals together into a single, intelligent defense layer — giving security teams the ability to detect, investigate, and respond to complex attacks faster and with greater accuracy. At Chavans, we help organizations deploy and manage XDR solutions that integrate telemetry from endpoints, workloads, identities, and networks into one unified detection platform. This enables faster investigation, automated containment, and end-to-end visibility across the entire attack surface.
                    </p>
                </div>
            </header>
            
            <main>
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[1] = el }}>
                        <h2>Why It Matters</h2>
                        <div className="ssp-divider"></div>
                        <p>Traditional point tools isolate data — XDR connects them. Attackers exploit these silos to evade detection. With XDR, security teams see the full picture of an attack across systems, identify the root cause, and respond automatically to stop threats before they spread. It transforms reactive defense into proactive protection.</p>
                    </div>
                </section>
                
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[2] = el }}>
                        <h2>Our Proven Process</h2>
                        <div className="ssp-divider"></div>
                        
                        <div className="xdr-timeline-container">
                            <div className="xdr-timeline-track">
                                {timelineSteps.map((item, index) => (
                                    <div className="xdr-timeline-card" key={index} tabIndex={0}>
                                        <div className="xdr-step-badge">{item.step}</div>
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
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[4] = el }}>
                        <h2>What You Get</h2>
                        <div className="ssp-divider"></div>
                        <p>End-to-end visibility across hybrid environments, faster detection of multi-vector attacks, reduced manual workload for security teams, and improved incident response efficiency through automation and AI.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[5] = el }}>
                        <h2>Who It’s For</h2>
                        <div className="ssp-divider"></div>
                        <p>Organizations managing complex, distributed infrastructures — including cloud, data center, and edge — and security teams needing faster, smarter, and more unified detection and response workflows.</p>
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

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[7] = el }}>
                        <h2>Architecture Diagram (TAD)</h2>
                        <div className="ssp-divider"></div>
                        <div className="ssp-arch-diagram">
                            <div className="ssp-arch-item">Telemetry collection</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">correlation engine</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">AI-driven detection</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">automated playbooks</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">SOC dashboard</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">continuous learning</div>
                        </div>
                    </div>
                </section>

                 <section className="ssp-section fade-in-section" ref={el => { if(el) sectionsRef.current[8] = el }}>
                    <div className="container">
                        <h2>Discover More in Infrastructure Security</h2>
                         <div className="ssp-divider"></div>
                        <p>Explore other Chavans Infrastructure Security topics: Cloud Workload Protection (CWPP) and Security Information & Event Management (SIEM) — together forming a unified defense architecture.</p>
                        <div className="ssp-discover-container">
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/infra/cloud-workload-protection')}
                            >
                                Explore CWPP <span>&rarr;</span>
                            </button>
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/infra/siem')}
                            >
                                Explore SIEM <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="ssp-cta-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[9] = el }}>
                        <h2>Start Your Security Journey</h2>
                        <p>Move from isolated alerts to connected defense — with XDR, every signal becomes part of a stronger, smarter protection system.</p>
                        <button className="btn" onClick={openModal}>Request a Consultation</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default XDRSection;
