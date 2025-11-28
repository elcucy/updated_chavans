
import React, { useEffect, useRef, useState } from 'react';
import CanvasBackground from '../../CanvasBackground';
import '../../../styles/security-page.css';
import '../../../styles/security-data-encryption.css';

const DataEncryptionLeakageSection: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
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
        { step: "1", title: "Discover & Classify", desc: "Scan all storage, databases, and endpoints to identify sensitive data (PII, IP, PCI) and tag it based on criticality." },
        { step: "2", title: "Encrypt Everywhere", desc: "Apply strong encryption standards (AES-256) to data at rest and TLS 1.3 for data in transit, managing keys securely." },
        { step: "3", title: "Define DLP Policies", desc: "Configure rules that prevent unauthorized sharing, printing, or copying of sensitive data outside trusted boundaries." },
        { step: "4", title: "Real-Time Blocking", desc: "Monitor data flow in real-time and automatically block or quarantine attempts to exfiltrate sensitive information." },
        { step: "5", title: "Audit & Remediation", desc: "Log all access and transfer attempts, providing forensics for incidents and proof of compliance for auditors." }
    ];

    const whatWeCoverItems = [
        { area: "Data Discovery & Classification", focus: "Automated scanning and tagging of sensitive data across hybrid environments." },
        { area: "Encryption (Rest & Transit)", focus: "Full-disk, database, and file-level encryption with secure key management (BYOK/HYOK)." },
        { area: "Endpoint DLP", focus: "Preventing data leakage via USB, clipboard, printing, or unauthorized apps on devices." },
        { area: "Cloud & Email DLP", focus: "Protecting data in SaaS applications (M365, G-Suite) and preventing accidental email exposure." },
        { area: "Insider Risk Management", focus: "Detecting anomalous user behavior that indicates potential data theft or sabotage." }
    ];

    const caseStudies = [
        { title: "Microsoft Purview Information Protection", url: "https://learn.microsoft.com/microsoft-365/compliance/information-protection", description: "Discover, classify, and protect sensitive information wherever it lives or travels." },
        { title: "AWS Macie & KMS", url: "https://aws.amazon.com/macie/", description: "Automated data discovery and protection service that uses machine learning to uncover sensitive data in AWS." },
        { title: "Google Cloud DLP", url: "https://cloud.google.com/sensitive-data-protection/docs/dlp-overview", description: "Fully managed service designed to help you discover, classify, and protect your most sensitive data." }
    ];

    return (
        <div className="ssp-page ssp-page-del" ref={pageRef}>
            {!canvasError && (
                <div className="canvas-wrapper">
                    <CanvasBackground 
                        particleColor="rgba(6, 182, 212, 0.7)" 
                        lineColor="rgba(6, 182, 212, 0.1)"
                        particleCount={40}
                    />
                </div>
            )}

            <header className="ssp-hero">
                <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[0] = el }}>
                    <h1>Data Encryption & Leakage</h1>
                    <p className="ssp-intro">
                        Data is your most valuable asset, and it must be protected wherever it exists. Data Encryption & Leakage Prevention (DLP) ensures that sensitive information remains unreadable to unauthorized users and cannot be moved outside your organization’s secure boundaries. At Chavans, we implement comprehensive encryption strategies and DLP frameworks that secure data at rest, in transit, and in use—safeguarding your intellectual property and ensuring compliance with global privacy regulations.
                    </p>
                </div>
            </header>
            
            <main>
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[1] = el }}>
                        <h2>Why It Matters</h2>
                        <div className="ssp-divider"></div>
                        <p>Data breaches often occur not through hacking, but through lack of internal controls—unencrypted laptops, accidental email forwards, or insider theft. Without robust encryption and DLP, a single mistake can lead to massive regulatory fines, reputational damage, and loss of competitive advantage. Securing data at the object level ensures that even if infrastructure is compromised, the data itself remains useless to attackers.</p>
                    </div>
                </section>
                
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[2] = el }}>
                        <h2>Our Proven Process</h2>
                        <div className="ssp-divider"></div>
                        
                        <div className="del-timeline-container">
                            <div className="del-timeline-track">
                                {timelineSteps.map((item, index) => (
                                    <div className="del-timeline-card" key={index} tabIndex={0}>
                                        <div className="del-step-badge">Step {item.step}</div>
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
                        <p>Complete visibility into where sensitive data resides, automatic protection of intellectual property, immunity to data extortion (ransomware), and simplified compliance with GDPR, CCPA, and HIPAA mandates.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[5] = el }}>
                        <h2>Who It’s For</h2>
                        <div className="ssp-divider"></div>
                        <p>Organizations protecting trade secrets, financial institutions handling transaction data, healthcare providers securing patient records (PHI), and any enterprise operating in highly regulated industries or using hybrid cloud storage.</p>
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
                            <div className="ssp-arch-item">Data Source</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">Classifier Engine</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">Encryption (KMS)</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">DLP Policy Check</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">Allow/Block</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">Audit Log</div>
                        </div>
                        <p className="ssp-arch-caption">Data flow: Discovery → Classification → Encryption → Policy Enforcement → Reporting.</p>
                    </div>
                </section>

                 <section className="ssp-section fade-in-section" ref={el => { if(el) sectionsRef.current[8] = el }}>
                    <div className="container">
                        <h2>Discover More in Data & AI Security</h2>
                         <div className="ssp-divider"></div>
                        <p>Explore Data Governance & Compliance to see how we build the framework that supports these encryption controls.</p>
                        <div className="ssp-discover-container">
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
                        <p>Protect your data at the source. Prevent leaks before they happen.</p>
                        <button className="btn" onClick={openModal}>Request a Consultation</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DataEncryptionLeakageSection;
