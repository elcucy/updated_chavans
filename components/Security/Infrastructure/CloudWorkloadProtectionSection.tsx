
import React, { useEffect, useRef, useState } from 'react';
import CanvasBackground from '../../CanvasBackground';
import '../../../styles/security-page.css';
import '../../../styles/security-cloud-workload.css';

const CloudWorkloadProtectionSection: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
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
        { step: "Step 1", title: "Discover & Classify Workloads", desc: "Identify all workloads across virtual machines, containers, and serverless platforms and categorize them by risk and importance." },
        { step: "Step 2", title: "Secure Configuration & Policy Enforcement", desc: "Apply baseline security configurations, patch management, and access control aligned with organizational policy." },
        { step: "Step 3", title: "Threat Detection & Runtime Protection", desc: "Monitor runtime activity for vulnerabilities, exploits, and abnormal behaviour using integrated threat intelligence." },
        { step: "Step 4", title: "Compliance Validation & Reporting", desc: "Automate compliance checks against frameworks like CIS, NIST, and ISO to ensure ongoing security readiness." },
        { step: "Step 5", title: "Continuous Monitoring & SOC Integration", desc: "Send workload alerts, vulnerability reports, and activity logs to the central SIEM or SOC for proactive investigation." }
    ];

    const whatWeCoverItems = [
        { area: "Discover & Classify Workloads", focus: "Workload discovery, classification, and multi-cloud visibility" },
        { area: "Secure Configuration & Policy Enforcement", focus: "Configuration hardening, patch management, and policy-based access control" },
        { area: "Threat Detection & Runtime Protection", focus: "Vulnerability scanning, runtime threat detection, and exploit prevention" },
        { area: "Compliance Validation & Reporting", focus: "Automated compliance monitoring and reporting against CIS, NIST, and ISO standards" },
        { area: "Continuous Monitoring & SOC Integration", focus: "SIEM/SOC integration, continuous workload visibility, and proactive threat investigation" }
    ];

    const caseStudies = [
        { title: "Microsoft Defender for Cloud – CWPP", url: "https://learn.microsoft.com/azure/defender-for-cloud/workload-protections", description: "Delivers unified workload protection across Azure, AWS, and GCP with integrated threat detection and compliance tools." },
        { title: "Google Cloud Workload Protection Overview", url: "https://cloud.google.com/security/products/workload-protection", description: "Explains native workload security, vulnerability management, and runtime defense in hybrid environments." },
        { title: "AWS Security Hub & Inspector", url: "https://aws.amazon.com/security-hub/", description: "Provides centralized workload findings, vulnerability scanning, and automation for continuous cloud protection." }
    ];

    return (
        <div className="ssp-page ssp-page-cwpp" ref={pageRef}>
            {!canvasError && (
                <div className="canvas-wrapper">
                    <CanvasBackground 
                        particleColor="rgba(14, 165, 233, 0.7)" 
                        lineColor="rgba(14, 165, 233, 0.1)"
                        particleCount={40}
                    />
                </div>
            )}

            <header className="ssp-hero">
                <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[0] = el }}>
                    <h1>Cloud Workload Protection (CWPP)</h1>
                    <p className="ssp-intro">
                        Cloud workloads — from virtual machines to containers and serverless apps — are the core of modern infrastructure. Cloud Workload Protection (CWPP) ensures these workloads are continuously monitored, securely configured, and protected against threats, misconfigurations, and unauthorized activity across hybrid and multi-cloud environments. At Chavans, we help organizations implement CWPP solutions that deliver full visibility, threat prevention, and runtime protection — ensuring every workload stays safe from creation to decommissioning.
                    </p>
                </div>
            </header>
            
            <main>
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[1] = el }}>
                        <h2>Why It Matters</h2>
                        <div className="ssp-divider"></div>
                        <p>As cloud adoption grows, attackers increasingly target workloads instead of networks. Misconfigurations, unpatched images, and over-permissioned services create easy entry points. CWPP protects workloads directly, providing consistent security no matter where they run — in public cloud, private cloud, or containers.</p>
                    </div>
                </section>
                
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[2] = el }}>
                        <h2>Our Proven Process</h2>
                        <div className="ssp-divider"></div>
                        
                        <div className="cwpp-timeline-container">
                            <div className="cwpp-timeline-track">
                                {timelineSteps.map((item, index) => (
                                    <div className="cwpp-timeline-card" key={index} tabIndex={0}>
                                        <div className="cwpp-step-badge">{item.step}</div>
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
                        <p>Full visibility into cloud workloads, continuous threat detection, policy enforcement, reduced attack surface, simplified compliance audits, and a resilient cloud security foundation.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[5] = el }}>
                        <h2>Who It’s For</h2>
                        <div className="ssp-divider"></div>
                        <p>Enterprises running workloads in public, private, or hybrid clouds; organizations adopting containers, Kubernetes, or serverless; and teams that need real-time workload protection integrated with existing security operations.</p>
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
                            <div className="ssp-arch-item">Workload discovery</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">vulnerability scan</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">runtime monitoring</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">threat detection</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">compliance check</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">SIEM/SOC integration</div>
                        </div>
                    </div>
                </section>

                 <section className="ssp-section fade-in-section" ref={el => { if(el) sectionsRef.current[8] = el }}>
                    <div className="container">
                        <h2>Discover More in Infrastructure Security</h2>
                         <div className="ssp-divider"></div>
                        <p>Explore other Chavans Infrastructure Security topics: Security Information & Event Management (SIEM) and Extended Detection & Response (XDR) — together delivering unified protection across the cloud and data center.</p>
                        <div className="ssp-discover-container">
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/infra/siem')}
                            >
                                Explore SIEM <span>&rarr;</span>
                            </button>
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/infra/xdr')}
                            >
                                Explore XDR <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="ssp-cta-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[9] = el }}>
                        <h2>Start Your Security Journey</h2>
                        <p>Secure every workload from build to runtime — and make cloud operations safer, simpler, and smarter.</p>
                        <button className="btn" onClick={openModal}>Request a Consultation</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CloudWorkloadProtectionSection;
    