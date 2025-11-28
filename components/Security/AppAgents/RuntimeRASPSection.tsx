
import React, { useEffect, useRef } from 'react';
import CanvasBackground from '../../CanvasBackground';
import '../../../styles/security-page.css';
import '../../../styles/security-runtime-rasp.css';

// --- Icons --- //
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>;

const RuntimeRASPSection: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
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
        { step: "Step 1", title: "Understand App Exposure Areas", desc: "Identify which parts of the app are most sensitive and where attacks normally target." },
        { step: "Step 2", title: "Enable Runtime Monitoring", desc: "Track how the app behaves during execution to detect unusual or unsafe actions." },
        { step: "Step 3", title: "Block Unsafe Behaviour", desc: "Stop malicious requests, injection patterns or abnormal actions inside the runtime." },
        { step: "Step 4", title: "Continuous Runtime Protection", desc: "Keep protection active during all sessions without slowing down the application." },
        { step: "Step 5", title: "SOC Feedback & Visibility", desc: "Send runtime alerts and signals to security teams to improve detection and incident response." }
    ];

    const whatWeCoverItems = [
        { area: "Understand App Exposure Areas", focus: "Application surface mapping and identification of sensitive or high-risk components" },
        { area: "Enable Runtime Monitoring", focus: "Real-time runtime detection, behaviour tracking, and anomaly identification" },
        { area: "Block Unsafe Behaviour", focus: "Injection prevention, tampering protection, and memory misuse defense" },
        { area: "Continuous Runtime Protection", focus: "Persistent runtime security enforcement and continuous trust validation" },
        { area: "SOC Feedback & Visibility", focus: "Runtime telemetry integration, alerting, and SOC visibility for faster incident response" }
    ];

    const caseStudies = [
        { title: "Microsoft Secure Development Lifecycle (SDL)", url: "https://www.microsoft.com/en-us/securityengineering/sdl", description: "A comprehensive security assurance process that embeds security requirements and RASP-like checks directly into the development lifecycle." },
        { title: "OWASP AppSensor Project", url: "https://owasp.org/www-project-appsensor/", description: "A framework for implementing intrusion detection and automated response within the application, offering conceptual foundations for RASP." },
        { title: "Google BeyondProd", url: "https://cloud.google.com/beyondprod", description: "A new approach to cloud-native security that moves protection from the network perimeter to individual services and microservices." }
    ];

    return (
        <div className="ssp-page ssp-page-rasp" ref={pageRef}>
            <CanvasBackground 
                particleColor="rgba(6, 182, 212, 0.7)" 
                lineColor="rgba(6, 182, 212, 0.1)"
                particleCount={40}
            />
            <header className="ssp-hero">
                <div className="container fade-in-section" ref={el => sectionsRef.current[0] = el}>
                    <h1>Runtime Application Self-Protection (RASP)</h1>
                    <p className="ssp-intro">
                        Runtime Application Self-Protection helps applications defend themselves while they are running. Instead of relying only on firewalls or network tools, the protection is inside the application. This allows attacks, injection attempts, tampering and abnormal behaviour to be detected and blocked instantly before they impact business logic, data or users.
                    </p>
                </div>
            </header>
            
            <main>
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[1] = el}>
                        <h2>Why It Matters</h2>
                        <div className="ssp-divider"></div>
                        <p>Most modern attacks target application logic directly. Network security cannot see what happens inside the runtime. If the application can defend itself in real-time, the chance of successful exploitation is greatly reduced. This keeps applications safer, more stable and lowers the cost of incident response.</p>
                    </div>
                </section>
                
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[2] = el}>
                        <h2>Our Proven Process</h2>
                        <div className="ssp-divider"></div>
                        <p style={{marginBottom: '3rem'}}>We operationalize RASP through a five-step lifecycle: understand app exposure areas, enable runtime monitoring, block unsafe behaviour, maintain continuous runtime protection, and feed runtime signals to the SOC.</p>
                        
                        <div className="rasp-timeline-container">
                            <div className="rasp-timeline-track">
                                {timelineSteps.map((item, index) => (
                                    <div className="rasp-timeline-card" key={index} tabIndex={0}>
                                        <div className="rasp-step-badge">{item.step}</div>
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
                        <p>Lower risk of runtime exploitation, safer application logic, reduced attacker success paths, consistent protection across releases and stronger runtime trust posture.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[5] = el}>
                        <h2>Who It’s For</h2>
                        <div className="ssp-divider"></div>
                        <p>Businesses running critical digital applications, SaaS platforms, mobile apps, customer-facing workloads, API-first platforms, cloud-native services and applications deployed at the Edge.</p>
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
                            <div className="ssp-arch-item">Application runtime</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">behaviour monitoring</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">detect abnormal activity</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">block</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">notify SOC</div>
                        </div>
                    </div>
                </section>

                 <section className="ssp-section fade-in-section" ref={el => sectionsRef.current[8] = el}>
                    <div className="container">
                        <h2>Discover More in App & Agents Security</h2>
                         <div className="ssp-divider"></div>
                        <p>Explore API Security and Agent Behaviour Monitoring to complete application & agent protection coverage.</p>
                        <div className="ssp-discover-container">
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/app/api-security')}
                            >
                                Explore API Security <span>&rarr;</span>
                            </button>
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/app/agent-behaviour-monitoring')}
                            >
                                Explore Agent Monitoring <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="ssp-cta-section">
                    <div className="container fade-in-section" ref={el => sectionsRef.current[9] = el}>
                        <h2>Start Your Security Journey</h2>
                        <p>Strengthen protection inside the application itself — where attacks are most likely to occur.</p>
                        <button className="btn" onClick={openModal}>Request a Consultation</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default RuntimeRASPSection;
