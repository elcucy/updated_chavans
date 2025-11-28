
import React, { useEffect, useRef } from 'react';
import CanvasBackground from './CanvasBackground';
import '../styles/security-page.css';
import '../styles/zero-trust-access.css';

// --- Icons --- //
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>;


const ZeroTrustAccessPage: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
    const sectionsRef = useRef<(HTMLElement | null)[]>([]);
    const pageRef = useRef<HTMLDivElement>(null);

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
      { area: "Identity Trust Calibration", focus: "Identity-centric access enforcement and conditional access orchestration" },
      { area: "Device Trust Validation", focus: "Device health verification, compliance posture, and risk-based access validation" },
      { area: "Context Aware Access Control", focus: "Behavioural and contextual signal-based adaptive access control" },
      { area: "Just-In-Time + Just-Enough Privilege", focus: "Privileged access control and least privilege guardrails" },
      { area: "Continuous Monitoring + Block on Risk", focus: "Continuous verification logic, live session telemetry, and automated risk-based enforcement" }
    ];

    const processSteps = [
        { title: "Identity Trust Calibration", description: "Enable strong identity controls (MFA, conditional access, least privilege baselines)." },
        { title: "Device Trust Validation", description: "Verify device health, compliance posture, risk classification and OS baseline before access." },
        { title: "Context Aware Access Control", description: "Access adapts based on behaviour signals, location, workload sensitivity and anomalies." },
        { title: "Just-In-Time + Just-Enough Privilege", description: "Temporary elevation only for required tasks — automatically revoked once completed." },
        { title: "Continuous Monitoring + Block on Risk", description: "If threat risk is high → isolate, block or restrict instantly." },
    ];
    
    const caseStudies = [
        { title: "Microsoft Zero Trust Essential Guide", url: "https://www.microsoft.com/en-us/security/business/zero-trust", description: "Enterprise deep guidance enabling identity-first enforcement, continuous verification and least privilege access strategy across cloud + hybrid estates." },
        { title: "Google BeyondCorp Zero Trust Model", url: "https://cloud.google.com/beyondcorp", description: "Industry proven Zero Trust architecture built on identity, posture and context instead of perimeter — eliminating dependency on VPN and static trust." },
        { title: "NIST Zero Trust Architecture SP 800-207", url: "https://csrc.nist.gov/publications/detail/sp/800-207/final", description: "Government backed standardized Zero Trust reference model defining risk posture, access control models and validation guardrails for regulated environments." }
    ];

    return (
        <div className="ssp-page ssp-page-zta" ref={pageRef}>
            <CanvasBackground 
                particleColor="rgba(139, 92, 246, 0.7)" 
                lineColor="rgba(139, 92, 246, 0.1)"
                particleCount={40}
            />
            <header className="ssp-hero">
                <div className="container fade-in-section" ref={el => sectionsRef.current[0] = el}>
                    <h1>Zero Trust Access</h1>
                    <p className="ssp-intro">
                       Zero Trust Access ensures every access decision is continuously verified based on identity trust, device posture, risk signals and contextual boundaries — not network location or implicit trust. This allows secure access control even in distributed environments such as Edge, remote workforce, AI PC deployments, mobile, SaaS and branch locations.
                    </p>
                </div>
            </header>
            
            <main>
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[1] = el}>
                        <h2>Why It Matters</h2>
                         <div className="ssp-divider"></div>
                        <p>Traditional perimeter access breaks at the Edge. Attackers don’t need to break into core network anymore — one stolen token, unmanaged device or exposed session is enough. Zero Trust stops lateral movement before it begins and ensures only verified access every single time.</p>
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
                        <p>Drastically reduced blast radius, minimized insider exposure, lower session hijack risk, contextual access boundaries, stronger identity-driven posture and significantly reduced lateral movement potential.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[5] = el}>
                        <h2>Who it’s For</h2>
                        <div className="ssp-divider"></div>
                        <p>Organizations with remote or distributed workforce, SaaS first models, branch operations, AI PC rollout programs, remote developers, multi-cloud access surfaces and enterprises eliminating VPN-perimeter legacy models.</p>
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
                            <div className="ssp-arch-item">Identity trust</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">device posture</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">contextual signals</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">policy engine</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">access decision</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">continuous verification</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">SOC</div>
                        </div>
                    </div>
                </section>

                <section className="ssp-section fade-in-section" ref={el => sectionsRef.current[8] = el}>
                    <div className="container">
                        <h2>Discover More in Edge Security</h2>
                        <div className="ssp-divider"></div>
                        <p>Explore additional Edge Security capabilities from Chavans: Real-Time Threat Detection</p>
                        <div className="ssp-discover-container">
                             <button className="btn ssp-discover-btn" onClick={() => navigateTo('security/edge/real-time-threat-detection')}>
                                Explore Threat Detection <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="ssp-cta-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[9] = el}>
                        <h2>Start Your Security Journey</h2>
                        <p>Move to identity-first access — eliminate implicit trust permanently.</p>
                        <button className="btn" onClick={openModal}>Request a Consultation</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ZeroTrustAccessPage;
