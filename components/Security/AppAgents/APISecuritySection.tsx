
import React, { useEffect, useRef } from 'react';
import CanvasBackground from '../../CanvasBackground';
import '../../../styles/security-page.css';
import '../../../styles/security-api.css';

// --- Icons --- //
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>;

const APISecuritySection: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
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
        { step: "Step 1", title: "API Inventory & Discovery", desc: "Find and document all APIs across your environment — public, private, and internal — including any hidden or forgotten ones." },
        { step: "Step 2", title: "Identity & Access Enforcement", desc: "Make sure every API request is verified. Enforce strong authentication, authorization, and least privilege access for every user or system." },
        { step: "Step 3", title: "Input Validation & Threat Filtering", desc: "Check all incoming data for errors or harmful inputs. Block attacks such as injections, bots, and automated scripts." },
        { step: "Step 4", title: "Real-Time Monitoring", desc: "Watch for unusual traffic, sudden spikes in requests, or suspicious usage patterns in real time." },
        { step: "Step 5", title: "Incident Visibility & SOC Integration", desc: "Send alerts and reports to your security team so threats can be analyzed, tracked, and resolved quickly." }
    ];

    const whatWeCoverItems = [
        { area: "API Inventory & Discovery", focus: "Comprehensive API discovery, documentation, and visibility across all environments." },
        { area: "Identity & Access Enforcement", focus: "Authentication, token validation, and least privilege access controls for APIs." },
        { area: "Input Validation & Threat Filtering", focus: "Request filtering, payload inspection, and protection against injections and bot attacks." },
        { area: "Real-Time Monitoring", focus: "Continuous traffic analysis, anomaly detection, and rate control for API activity." },
        { area: "Incident Visibility & SOC Integration", focus: "Centralized alerting, reporting, and SOC integration for threat investigation and response." }
    ];

    const caseStudies = [
        { title: "OWASP API Security Top 10", url: "https://owasp.org/www-project-api-security/", description: "The standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications." },
        { title: "Google API Security Guidelines", url: "https://cloud.google.com/api-gateway/docs/security-concepts", description: "Best practices for securing your APIs using Google Cloud's API Gateway and related security services." },
        { title: "Microsoft API Security Fundamentals", url: "https://learn.microsoft.com/security/api-security", description: "Guidance on how to design, build, and operate secure APIs using Microsoft's comprehensive security portfolio." }
    ];

    return (
        <div className="ssp-page ssp-page-api" ref={pageRef}>
            <CanvasBackground 
                particleColor="rgba(249, 115, 22, 0.7)" 
                lineColor="rgba(249, 115, 22, 0.1)"
                particleCount={40}
            />
            <header className="ssp-hero">
                <div className="container fade-in-section" ref={el => sectionsRef.current[0] = el}>
                    <h1>API Security</h1>
                    <p className="ssp-intro">
                        APIs are now the backbone of most digital systems — connecting apps, devices, users, and AI services together. Because of this, they are also one of the most common attack targets. API Security helps protect these connections by allowing only verified calls, trusted users, and authorized actions while blocking any unsafe or abnormal activity. It ensures data remains secure and systems stay reliable.
                    </p>
                </div>
            </header>
            
            <main>
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[1] = el}>
                        <h2>Why It Matters</h2>
                        <div className="ssp-divider"></div>
                        <p>APIs directly expose business logic and data, making them a favorite path for attackers. Many breaches now start from weak or unprotected APIs. By securing APIs properly, organizations can stop data leaks, unauthorized access, and automated attacks early — before they cause real damage. Strong API security also builds customer trust and ensures compliance with data protection standards.</p>
                    </div>
                </section>
                
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[2] = el}>
                        <h2>Our Proven Process</h2>
                        <div className="ssp-divider"></div>
                        <p style={{marginBottom: '3rem'}}>We secure your API landscape through a comprehensive five-step lifecycle:</p>
                        
                        <div className="api-timeline-container">
                            <div className="api-timeline-track">
                                {timelineSteps.map((item, index) => (
                                    <div className="api-timeline-card" key={index} tabIndex={0}>
                                        <div className="api-step-badge">{item.step}</div>
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
                        <p>A safer and more stable API environment, better protection against data breaches, reduced risk from automated and credential-based attacks, and clear visibility for your security teams to act faster.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[5] = el}>
                        <h2>Who It’s For</h2>
                        <div className="ssp-divider"></div>
                        <p>Companies using cloud-native apps, mobile platforms, SaaS systems, partner integrations, or open APIs. It’s especially important for those running payment systems, AI endpoints, or any services exposed to the internet.</p>
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
                            <div className="ssp-arch-item">API request</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">verify identity</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">validate data</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">apply policy</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">block suspicious actions</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">alert security team</div>
                        </div>
                    </div>
                </section>

                 <section className="ssp-section fade-in-section" ref={el => sectionsRef.current[8] = el}>
                    <div className="container">
                        <h2>Discover More in App & Agents Security</h2>
                         <div className="ssp-divider"></div>
                        <p>Explore additional Chavans solutions for App & Agent protection, including Agent Behaviour Monitoring for deeper runtime visibility and threat detection.</p>
                        <div className="ssp-discover-container">
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/app/agent-behaviour-monitoring')}
                            >
                                Explore Agent Monitoring <span>&rarr;</span>
                            </button>
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/app/runtime-application-self-protection')}
                            >
                                Explore RASP <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="ssp-cta-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[9] = el}>
                        <h2>Start Your Security Journey</h2>
                        <p>APIs are the new digital front door — protect them like any other critical system to keep your business safe.</p>
                        <button className="btn" onClick={openModal}>Request a Consultation</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default APISecuritySection;
