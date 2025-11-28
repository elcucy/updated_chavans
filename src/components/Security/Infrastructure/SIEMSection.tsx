
import React, { useEffect, useRef, useState } from 'react';
import CanvasBackground from '../../CanvasBackground';
import '../../../styles/security-page.css';
import '../../../styles/security-siem.css';

const SIEMSection: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
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
        { step: "Step 1", title: "Log & Signal Collection", desc: "Connect logs and events from servers, endpoints, networks, cloud workloads, and applications into one centralized SIEM platform." },
        { step: "Step 2", title: "Data Normalization & Correlation", desc: "Standardize data formats and correlate related events to build a clear picture of activities across your environment." },
        { step: "Step 3", title: "Threat Detection & Alerting", desc: "Use predefined rules, AI-based analytics, and anomaly detection to identify potential attacks or policy violations in real time." },
        { step: "Step 4", title: "Incident Investigation & Response", desc: "Provide analysts with context-rich data and automation workflows to investigate, prioritize, and remediate threats quickly." },
        { step: "Step 5", title: "Reporting & Continuous Improvement", desc: "Generate compliance and security reports, measure detection effectiveness, and refine rules to reduce false positives over time." }
    ];

    const whatWeCoverItems = [
        { area: "Log & Signal Collection", focus: "Centralized log aggregation and multi-source signal ingestion from servers, endpoints, networks, and cloud workloads" },
        { area: "Data Normalization & Correlation", focus: "Event normalization, correlation, and contextual linkage for unified visibility" },
        { area: "Threat Detection & Alerting", focus: "Rule-based and AI-driven threat detection, anomaly analytics, and automated alerting" },
        { area: "Incident Investigation & Response", focus: "Context-rich investigation workflows, triage automation, and integrated remediation actions" },
        { area: "Reporting & Continuous Improvement", focus: "Compliance reporting, SIEM–SOAR/XDR integration, and continuous tuning for optimization" }
    ];

    const caseStudies = [
        { title: "Microsoft Sentinel SIEM", url: "https://learn.microsoft.com/azure/sentinel/overview", description: "Cloud-native SIEM offering real-time analytics, AI-driven threat detection, and integration with multi-cloud and on-prem environments." },
        { title: "Google Chronicle Security Operations", url: "https://cloud.google.com/chronicle", description: "A scalable SIEM platform built for high-speed threat detection and investigation using Google’s global infrastructure." },
        { title: "AWS Security Hub Integration", url: "https://aws.amazon.com/security-hub/", description: "Centralized view for managing and analyzing security findings across AWS services and third-party tools." }
    ];

    return (
        <div className="ssp-page ssp-page-siem" ref={pageRef}>
            {!canvasError && (
                <div className="canvas-wrapper">
                    <CanvasBackground 
                        particleColor="rgba(245, 158, 11, 0.7)" 
                        lineColor="rgba(245, 158, 11, 0.1)"
                        particleCount={40}
                    />
                </div>
            )}

            <header className="ssp-hero">
                <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[0] = el }}>
                    <h1>Security Information & Event Management (SIEM)</h1>
                    <p className="ssp-intro">
                        Modern IT environments generate massive amounts of data across systems, users, and applications every second. Security Information & Event Management (SIEM) helps organizations collect, analyze, and correlate this data in real time — detecting threats faster and responding before incidents escalate. At Chavans, we design and implement SIEM solutions that unify logs, alerts, and security signals across hybrid and multi-cloud infrastructures. Our approach combines visibility, automation, and analytics to give security teams actionable insights for proactive defense.
                    </p>
                </div>
            </header>
            
            <main>
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[1] = el }}>
                        <h2>Why It Matters</h2>
                        <div className="ssp-divider"></div>
                        <p>Without centralized visibility, detecting security incidents becomes slow and reactive. Attackers exploit this gap to move undetected across systems. SIEM helps close that gap by continuously collecting and analyzing data from multiple sources, identifying suspicious behaviour, and providing the intelligence needed for timely response.</p>
                    </div>
                </section>
                
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[2] = el }}>
                        <h2>Our Proven Process</h2>
                        <div className="ssp-divider"></div>
                        
                        <div className="siem-timeline-container">
                            <div className="siem-timeline-track">
                                {timelineSteps.map((item, index) => (
                                    <div className="siem-timeline-card" key={index} tabIndex={0}>
                                        <div className="siem-step-badge">{item.step}</div>
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
                        <p>Centralized visibility, faster threat detection, improved incident response, reduced investigation time, compliance-ready audit trails, and better decision-making through real-time analytics.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[5] = el }}>
                        <h2>Who It’s For</h2>
                        <div className="ssp-divider"></div>
                        <p>Organizations managing complex IT and cloud environments, security operations teams, compliance-driven enterprises, and businesses looking to modernize their security operations with automation and intelligence.</p>
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
                            <div className="ssp-arch-item">Log ingestion</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">normalization</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">correlation</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">detection engine</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">alerts</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">SOC dashboard</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">continuous improvement</div>
                        </div>
                    </div>
                </section>

                 <section className="ssp-section fade-in-section" ref={el => { if(el) sectionsRef.current[8] = el }}>
                    <div className="container">
                        <h2>Discover More in Infrastructure Security</h2>
                         <div className="ssp-divider"></div>
                        <p>Explore other Infrastructure Security focus areas: Cloud Workload Protection (CWPP) and Extended Detection & Response (XDR) — enabling complete visibility and faster response across environments.</p>
                        <div className="ssp-discover-container">
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/infra/cloud-workload-protection')}
                            >
                                Explore CWPP <span>&rarr;</span>
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
                        <p>Gain unified visibility and control with an intelligent SIEM — your first step toward a smarter, connected security operation.</p>
                        <button className="btn" onClick={openModal}>Request a Consultation</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default SIEMSection;
