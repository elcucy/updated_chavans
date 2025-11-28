
import React, { useEffect, useRef, useState } from 'react';
import CanvasBackground from '../../CanvasBackground';
import '../../../styles/security-page.css';
import '../../../styles/edge-endpoint-protection.css';

// --- Icons --- //
const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EndpointProtectionSection: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
    const pageRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<(HTMLElement | null)[]>([]);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

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

    const toggleAccordion = (title: string) => {
        setOpenAccordion(openAccordion === title ? null : title);
    };

    const processSteps = [
        { step: "1", title: "Device Hardening Baseline", desc: "Apply secure OS/app configuration templates tailored to device classes and risk level." },
        { step: "2", title: "EDR/XDR Security Enablement", desc: "Deploy behaviour-based detection, memory protection, and cross-endpoint correlation." },
        { step: "3", title: "Data Protection & Encryption", desc: "Encrypt local storage, enforce secure containers and tamper-resistant storage guards." },
        { step: "4", title: "Conditional Access Enforcement", desc: "Gate access based on device trust, identity health and real-time signals." },
        { step: "5", title: "Continuous Compliance & Auto-Fix", desc: "Monitor posture, detect configuration drift and automatically remediate deviations." }
    ];

    const whatWeCoverItems = [
        { title: "Device Hardening & Baselines", content: "Standardized secure images, OS hardening, secure boot and configuration guardrails to reduce attack surface and ensure consistent compliance.", value: "Reduced Attack Surface" },
        { title: "EDR/XDR Architecture & Ops", content: "Behavioural detection, telemetry enrichment and SOC-integrated playbooks for rapid detection and response.", value: "Faster Threat Detection" },
        { title: "Data Protection & Tamper Resistance", content: "Encryption, secure storage patterns, and runtime protections that keep sensitive data safe even on compromised devices.", value: "Zero Data Leakage" },
        { title: "Conditional Access & Policy Orchestration", content: "Policy-based access decisions that combine identity, device posture and contextual risk signals.", value: "Identity-First Security" },
        { title: "Automated Compliance & Drift Remediation", content: "Continuous posture checks and auto-fix workflows to maintain baseline security at scale.", value: "Always-On Compliance" }
    ];

    const caseStudies = [
        { title: "Microsoft Device Security Baselines", url: "https://learn.microsoft.com/microsoft-365/security/defender/device-security?view=o365-worldwide", desc: "Industry aligned configuration, baseline hardening and unified endpoint governance models." },
        { title: "Google BeyondCorp Endpoint Security", url: "https://cloud.google.com/beyondcorp", desc: "Reference Zero Trust execution pattern eliminating traditional network perimeter dependency." },
        { title: "NIST Mobile Device Guidance", url: "https://csrc.nist.gov/publications", desc: "Standardized controls for secure device posture, tamper prevention and mobile threat mitigation." }
    ];

    return (
        <div className="ssp-page ssp-page-epp" ref={pageRef}>
            <CanvasBackground 
                particleColor="rgba(59, 130, 246, 0.6)" 
                lineColor="rgba(59, 130, 246, 0.15)"
                particleCount={35}
            />
            
            <header className="ssp-hero epp-hero">
                <div className="container epp-hero-grid">
                    <div className="epp-hero-content fade-in-section" ref={el => { if(el) sectionsRef.current[0] = el }}>
                        <h1>End-Point Protection</h1>
                        <p className="ssp-intro epp-lead">
                            Endpoints are the closest attack surface — from AI/Cloud PCs and mobile devices to industrial controllers and retail systems — where identity, credentials, apps and data are most exposed. Chavans secures devices at scale with hardened baselines, continuous behavioural protection, and policy-driven access controls so breaches are stopped at the edge before they reach core infrastructure.
                        </p>
                    </div>
                    <div className="epp-hero-visual fade-in-section" ref={el => { if(el) sectionsRef.current[1] = el }}>
                        {/* Immersive SVG Graphic */}
                        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="epp-svg-visual">
                            <defs>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="5" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                                <linearGradient id="shieldGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                                </linearGradient>
                            </defs>
                            
                            {/* Network Lines (Animated) */}
                            <g className="network-lines" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3">
                                <path className="line-path" d="M80 220 L200 150" strokeDasharray="5 5" />
                                <path className="line-path delay-1" d="M320 220 L200 150" strokeDasharray="5 5" />
                                <path className="line-path delay-2" d="M200 50 L200 150" strokeDasharray="5 5" />
                            </g>

                            {/* Central Shield */}
                            <g transform="translate(200 150)">
                                <path d="M0 -40 C30 -40 50 -20 50 10 C50 50 0 80 0 80 C0 80 -50 50 -50 10 C-50 -20 -30 -40 0 -40 Z" 
                                      fill="url(#shieldGradient)" stroke="#3b82f6" strokeWidth="2" />
                                <path d="M-15 0 L0 15 L25 -15" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </g>

                            {/* Device 1: Laptop (Left) */}
                            <g transform="translate(40 200)">
                                <rect x="0" y="0" width="80" height="50" rx="4" fill="rgba(16, 22, 43, 0.8)" stroke="#64748b" strokeWidth="2" />
                                <path d="M-10 50 L90 50 L80 60 L0 60 Z" fill="#334155" />
                                <circle cx="40" cy="25" r="12" fill="#3b82f6" fillOpacity="0.2" />
                            </g>

                            {/* Device 2: Mobile (Right) */}
                            <g transform="translate(300 200)">
                                <rect x="0" y="0" width="30" height="55" rx="4" fill="rgba(16, 22, 43, 0.8)" stroke="#64748b" strokeWidth="2" />
                                <circle cx="15" cy="48" r="2" fill="#64748b" />
                                <circle cx="15" cy="20" r="8" fill="#3b82f6" fillOpacity="0.2" />
                            </g>

                            {/* Device 3: Cloud Icon (Top) */}
                            <g transform="translate(170 20)">
                                <path d="M15 40 L55 40 C65 40 70 30 65 20 C60 5 40 5 35 15 C30 5 10 10 5 20 C0 30 5 40 15 40 Z" 
                                      fill="rgba(16, 22, 43, 0.8)" stroke="#3b82f6" strokeWidth="2" />
                            </g>

                            {/* Animated Pulses */}
                            <circle cx="200" cy="150" r="60" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.2" fill="none">
                                <animate attributeName="r" values="50;70" dur="3s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.5;0" dur="3s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </div>
                </div>
            </header>
            
            <main>
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[2] = el }}>
                        <h2>Why It Matters</h2>
                        <div className="ssp-divider"></div>
                        <p>About 90% of attack chains begin at devices. A single compromised endpoint can enable credential theft, lateral movement, privilege escalation and ransomware. Enforcing strong device trust, modern endpoint detection, and data protection at runtime dramatically reduces attacker success and preserves business continuity.</p>
                    </div>
                </section>
                
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[3] = el }}>
                        <h2>Our Proven Process</h2>
                        <div className="ssp-divider"></div>
                        
                        <div className="epp-timeline-container">
                            <div className="epp-timeline-track">
                                {processSteps.map((item, index) => (
                                    <div className="epp-timeline-card" key={index} tabIndex={0}>
                                        <div className="epp-step-badge">Step {item.step}</div>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[4] = el }}>
                        <h2>What We Cover</h2>
                        <div className="ssp-divider"></div>
                        <div className="epp-accordion">
                            {whatWeCoverItems.map((item, index) => (
                                <div key={index} className={`epp-accordion-item ${openAccordion === item.title ? 'active' : ''}`}>
                                    <button 
                                        className="epp-accordion-header" 
                                        onClick={() => toggleAccordion(item.title)}
                                        aria-expanded={openAccordion === item.title}
                                    >
                                        <span className="epp-accordion-title">{item.title}</span>
                                        <span className="epp-accordion-icon"><ChevronDownIcon /></span>
                                    </button>
                                    <div className="epp-accordion-content">
                                        <p>{item.content}</p>
                                        <div className="epp-value-tag">
                                            <strong>Value Delivered:</strong> {item.value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[5] = el }}>
                        <h2>Who It’s For</h2>
                        <div className="ssp-divider"></div>
                        <p>Enterprises deploying Cloud/AI PC fleets, distributed retail or branch environments, frontline workers, industrial OT sites, and any organization that needs device-level trust and consistent security controls across global, hybrid estates.</p>
                    </div>
                </section>
                
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[6] = el }}>
                        <h2>Architecture Diagram</h2>
                        <div className="ssp-divider"></div>
                        <div className="epp-arch-flow">
                            <div className="arch-step">Device trust signal</div>
                            <div className="arch-arrow">→</div>
                            <div className="arch-step">Baseline enforcement</div>
                            <div className="arch-arrow">→</div>
                            <div className="arch-step">Behavioural protection</div>
                            <div className="arch-arrow">→</div>
                            <div className="arch-step">Conditional access</div>
                            <div className="arch-arrow">→</div>
                            <div className="arch-step">SOC integration</div>
                        </div>
                        <p className="ssp-arch-caption">Device trust signal → baseline enforcement → behavioural protection → conditional access → SOC integration.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[7] = el }}>
                        <h2>Case Studies / Reference White Papers</h2>
                        <div className="ssp-divider"></div>
                        <div className="ssp-case-study-grid">
                            {caseStudies.map((study, index) => (
                                <a href={study.url} target="_blank" rel="noopener noreferrer" className="ssp-case-study-card" key={index}>
                                    <div className="case-study-icon"><ExternalLinkIcon /></div>
                                    <h3>{study.title}</h3>
                                    <p>{study.desc}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="ssp-cta-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[8] = el }}>
                        <h2>Start Your Security Journey</h2>
                        <p>Secure the endpoint first — before breach propagation begins.</p>
                        <div className="epp-cta-group">
                            <button className="btn primary" onClick={openModal}>Start Your Security Journey</button>
                            <button className="btn secondary" onClick={openModal}>Request a Security Review</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EndpointProtectionSection;
