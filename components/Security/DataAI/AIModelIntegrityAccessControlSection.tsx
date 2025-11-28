
import React, { useEffect, useRef, useState } from 'react';
import CanvasBackground from '../../CanvasBackground';
import '../../../styles/security-page.css';
import '../../../styles/security-ai-integrity.css';

const AIModelIntegrityAccessControlSection: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
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
        { step: "Step 1", title: "Model & Asset Inventory", desc: "Identify all AI assets including models, datasets, APIs, and pipelines, and classify them by sensitivity and usage." },
        { step: "Step 2", title: "Access Control Definition", desc: "Establish clear role-based access rules for developers, data scientists, and systems that interact with AI assets." },
        { step: "Step 3", title: "Model Integrity Validation", desc: "Use digital signatures and checksums to verify that models remain unchanged after deployment or transfer." },
        { step: "Step 4", title: "Secure Model Storage & Deployment", desc: "Store models in secure registries and apply encryption and key-based access to prevent tampering or leaks." },
        { step: "Step 5", title: "Continuous Monitoring & Alerts", desc: "Track model usage, drift, and access patterns — generate alerts on anomalies or unauthorized modifications." }
    ];

    const whatWeCoverItems = [
        { area: "Model & Asset Inventory", focus: "AI asset discovery, classification, and inventory management" },
        { area: "Access Control Definition", focus: "Role-based access control (RBAC) and permission governance for AI assets" },
        { area: "Model Integrity Validation", focus: "Integrity verification, model version tracking, and digital signature enforcement" },
        { area: "Secure Model Storage & Deployment", focus: "Secure model registry, encryption, and controlled deployment pipelines" },
        { area: "Continuous Monitoring & Alerts", focus: "AI pipeline security, continuous monitoring, auditing, and anomaly alerting" }
    ];

    const caseStudies = [
        { title: "Microsoft Responsible AI Security Framework", url: "https://www.microsoft.com/en-us/ai/responsible-ai", description: "Outlines principles and methods to secure AI models, manage access, and ensure responsible use." },
        { title: "Google Vertex AI Security & Governance", url: "https://cloud.google.com/vertex-ai/docs/general/security", description: "Explains how to implement model access control, encryption, and audit mechanisms in managed AI environments." },
        { title: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework", description: "Defines controls for AI model integrity, explainability, and secure deployment for regulated industries." }
    ];

    return (
        <div className="ssp-page ssp-page-ai-integrity" ref={pageRef}>
            {!canvasError && (
                <div className="canvas-wrapper">
                    <CanvasBackground 
                        particleColor="rgba(168, 85, 247, 0.7)" 
                        lineColor="rgba(168, 85, 247, 0.1)"
                        particleCount={40}
                    />
                </div>
            )}

            <header className="ssp-hero">
                <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[0] = el }}>
                    <h1>AI Model Integrity & Access Control</h1>
                    <p className="ssp-intro">
                        As AI becomes part of core business operations, protecting AI models from tampering, misuse, or unauthorized access is critical. AI Model Integrity & Access Control ensures that models, datasets, and pipelines remain secure, unchanged, and traceable throughout their lifecycle — from training to deployment. At Chavans, we help organizations build trust in their AI systems by applying secure access policies, monitoring model activity, and validating integrity across every component. This ensures that your AI models perform as intended, without hidden risks or manipulation.
                    </p>
                </div>
            </header>
            
            <main>
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[1] = el }}>
                        <h2>Why It Matters</h2>
                        <div className="ssp-divider"></div>
                        <p>AI models often contain sensitive data, proprietary algorithms, and decision logic that power key business outcomes. If compromised, they can lead to biased results, data leaks, or operational disruptions. Proper integrity checks and access controls protect against data poisoning, model theft, or unauthorized changes that could impact trust and performance.</p>
                    </div>
                </section>
                
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[2] = el }}>
                        <h2>Our Proven Process</h2>
                        <div className="ssp-divider"></div>
                        
                        <div className="ai-integrity-timeline-container">
                            <div className="ai-integrity-timeline-track">
                                {timelineSteps.map((item, index) => (
                                    <div className="ai-integrity-timeline-card" key={index} tabIndex={0}>
                                        <div className="ai-integrity-step-badge">{item.step}</div>
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
                        <p>Protection of AI models against theft, corruption, or misuse; improved transparency and trust in model behaviour; auditable records of every change; and compliance with security and regulatory requirements for AI-driven workloads.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[5] = el }}>
                        <h2>Who It’s For</h2>
                        <div className="ssp-divider"></div>
                        <p>Organizations running AI/ML workloads in production, data science teams managing model lifecycles, industries using predictive or generative AI systems, and enterprises integrating AI APIs or third-party model services.</p>
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
                            <div className="ssp-arch-item">Model registry</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">role-based access control</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">integrity validation</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">encrypted storage</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">monitoring and alerts</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">SOC visibility</div>
                        </div>
                    </div>
                </section>

                 <section className="ssp-section fade-in-section" ref={el => { if(el) sectionsRef.current[8] = el }}>
                    <div className="container">
                        <h2>Discover More in Data & AI Security</h2>
                         <div className="ssp-divider"></div>
                        <p>Continue your journey with: Data Encryption & Leakage and Data Governance & Compliance — building complete confidence across your AI and data environments.</p>
                        <div className="ssp-discover-container">
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/data/data-encryption-leakage')}
                            >
                                Explore Data Encryption <span>&rarr;</span>
                            </button>
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/data/data-governance-compliance')}
                            >
                                Explore Data Governance <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="ssp-cta-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[9] = el }}>
                        <h2>Start Your Security Journey</h2>
                        <p>Protect your AI models with integrity, control, and continuous monitoring — ensuring your intelligence stays secure and trustworthy.</p>
                        <button className="btn" onClick={openModal}>Request a Consultation</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AIModelIntegrityAccessControlSection;
