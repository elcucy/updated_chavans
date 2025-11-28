
import React, { useEffect, useRef } from 'react';
import CanvasBackground from './CanvasBackground';
import '../styles/security-page.css';
import '../styles/endpoint-protection.css';

// --- Icons --- //
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>;

const EndpointProtectionPage: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
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
      { area: "Device Hardening Baseline", focus: "Standard secure configuration per device type based on usage and risk level" },
      { area: "EDR/XDR Security Enablement", focus: "Modern endpoint threat protection with continuous behaviour monitoring" },
      { area: "Data Protection & Encryption", focus: "Encryption and tamper protection for locally stored sensitive data" },
      { area: "Conditional Access Enforcement", focus: "Access based on device trust, identity health, and real-time risk signals" },
      { area: "Continuous Compliance & Auto-Fix", focus: "Posture monitoring, drift detection, and automated correction to maintain security" }
    ];

    const processSteps = [
        { title: "Device Hardening Baseline", description: "Set standard secure configuration for each device type based on usage and risk level." },
        { title: "EDR/XDR Security Enablement", description: "Deploy modern endpoint threat protection with continuous behaviour monitoring." },
        { title: "Data Protection & Encryption", description: "Ensure all sensitive data stored locally is encrypted and tamper protected." },
        { title: "Conditional Access Enforcement", description: "Access decisions are based on device trust state, identity health and real-time risk signals." },
        { title: "Continuous Compliance & Auto-Fix", description: "Monitor posture, detect drift and automatically apply correction to stay secure over time." },
    ];
    
    const caseStudies = [
        { title: "Microsoft Device Security Baselines", url: "https://learn.microsoft.com/microsoft-365/security/defender/device-security?view=o365-worldwide", description: "Industry aligned configuration, baseline hardening and unified endpoint governance models." },
        { title: "Google BeyondCorp Endpoint Security", url: "https://cloud.google.com/beyondcorp", description: "Reference Zero Trust execution pattern eliminating traditional network perimeter dependency." },
        { title: "NIST Mobile Device Security", url: "https://csrc.nist.gov/publications", description: "Standardized controls for secure device posture, tamper prevention and mobile threat mitigation." }
    ];
    
    return (
        <div className="ssp-page ssp-page-epp" ref={pageRef}>
            <CanvasBackground 
                particleColor="rgba(59, 130, 246, 0.7)" 
                lineColor="rgba(59, 130, 246, 0.1)"
                particleCount={40}
            />
            <header className="ssp-hero">
                <div className="container fade-in-section" ref={el => sectionsRef.current[0] = el}>
                    <h1>End-Point Protection</h1>
                    <p className="ssp-intro">
                        Endpoints are the closest attack surface where identity, credentials, apps and data are most exposed. These devices are now primary compromise entry points — AI PCs, Cloud PCs, mobile, rugged devices, frontline industrial machines, retail edge systems etc. Securing them correctly stops breach escalation before it enters core infrastructure.
                    </p>
                </div>
            </header>
            
            <main>
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[1] = el}>
                        <h2>Why It Matters</h2>
                        <div className="ssp-divider"></div>
                        <p>90% of initial breach vectors originate from endpoints. Compromised device → credential theft → lateral movement → privilege escalation → ransomware → business impact. If endpoint trust is not enforced, nothing else in Zero Trust meaningfully holds.</p>
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
                        <p>End-to-end endpoint security capability including EDR/XDR reference architecture design, OS hardening standards, Zero Trust device trust scoring models, tamper resistance controls, anti-evasion defence patterns, secure storage guardrails, runtime identity binding and policy enforcement orchestration across all device classes.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[5] = el}>
                        <h2>Who It’s For</h2>
                        <div className="ssp-divider"></div>
                        <p>Organizations operating distributed device footprints at scale — Cloud PC estates, AI PC rollout programs, branch retail chains, frontline workforce environments, OT / IoT connected industrial plants, logistics and field operations, healthcare mobility device environments, and globally distributed hybrid workforces where endpoint reliability, identity integrity and security posture must be uniformly enforced.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[6] = el}>
                        <h2>Case Studies / Reference White Papers</h2>
                        <div className="ssp-divider"></div>
                        <p>Representative guidance and real-world frameworks shaping modern endpoint protection strategy:</p>
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
                            <div className="ssp-arch-item">Device trust signal</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">baseline enforcement</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">behavioural protection</div>
                             <div className="ssp-arch-arrow">→</div>
                             <div className="ssp-arch-item">conditional access</div>
                             <div className="ssp-arch-arrow">→</div>
                             <div className="ssp-arch-item">AI anomaly detection</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">SOC integration</div>
                        </div>
                    </div>
                </section>

                 <section className="ssp-section fade-in-section" ref={el => sectionsRef.current[8] = el}>
                    <div className="container">
                        <h2>Discover More in Edge Security</h2>
                         <div className="ssp-divider"></div>
                        <p>Explore additional Edge Security capabilities from Chavans: Zero Trust Access & Real-Time Threat Detection.</p>
                        <div className="ssp-discover-container">
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/edge/zero-trust-access')}
                            >
                                Explore Zero Trust Access <span>&rarr;</span>
                            </button>
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/edge/real-time-threat-detection')}
                            >
                                Explore Threat Detection <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="ssp-cta-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[9] = el}>
                        <h2>Start Your Security Journey</h2>
                        <p>Secure the endpoint first — before breach propagation begins.</p>
                        <button className="btn" onClick={openModal}>Request a Consultation</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EndpointProtectionPage;
