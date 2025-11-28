
import React, { useEffect, useRef } from 'react';
import CanvasBackground from '../../CanvasBackground';
import '../../../styles/security-page.css';
import '../../../styles/security-data-governance.css';

const DataGovernanceComplianceSection: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
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
        { step: "Step 1", title: "Data Ownership & Classification", desc: "Define who owns which data, classify it by sensitivity, and map it to relevant compliance requirements." },
        { step: "Step 2", title: "Policy Definition & Access Controls", desc: "Create policies for data handling, access, retention, and deletion aligned with business and regulatory needs." },
        { step: "Step 3", title: "Compliance Automation & Auditing", desc: "Automate compliance checks, audit logs, and data handling activities to maintain continuous visibility." },
        { step: "Step 4", title: "Retention & Lifecycle Management", desc: "Apply retention schedules to ensure data is archived or deleted appropriately based on legal timelines." },
        { step: "Step 5", title: "Continuous Monitoring & Reporting", desc: "Track compliance status, data movement, and control effectiveness using dashboards and compliance alerts." }
    ];

    const whatWeCoverItems = [
        { area: "Data Ownership & Classification", focus: "Data ownership mapping, sensitivity classification, and compliance alignment." },
        { area: "Policy Definition & Access Controls", focus: "Policy management for data handling, access, retention, and deletion." },
        { area: "Compliance Automation & Auditing", focus: "Automated compliance checks, audit trails, and continuous visibility." },
        { area: "Retention & Lifecycle Management", focus: "Retention scheduling, archiving, and legal hold enforcement." },
        { area: "Continuous Monitoring & Reporting", focus: "Compliance reporting, audit readiness, and real-time control monitoring." }
    ];

    const caseStudies = [
        { title: "Microsoft Purview Data Governance", url: "https://learn.microsoft.com/microsoft-365/compliance/microsoft-purview-data-governance", description: "A unified data governance solution that helps you manage and govern your on-premises, multi-cloud, and SaaS data." },
        { title: "Google Cloud Data Governance", url: "https://cloud.google.com/solutions/data-governance", description: "Tools and best practices for managing data security, privacy, and compliance across the data lifecycle on Google Cloud." },
        { title: "AWS Data Protection & Compliance", url: "https://aws.amazon.com/compliance/programs", description: "Comprehensive compliance programs and data protection services helping customers navigate global regulatory requirements." }
    ];

    return (
        <div className="ssp-page ssp-page-dgc" ref={pageRef}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
                <CanvasBackground 
                    particleColor="rgba(99, 102, 241, 0.7)" 
                    lineColor="rgba(99, 102, 241, 0.1)"
                    particleCount={40}
                />
            </div>

            <header className="ssp-hero">
                <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[0] = el }}>
                    <h1>Data Governance & Compliance</h1>
                    <p className="ssp-intro">
                        Data Governance & Compliance ensures that all data within an organization is managed, secured, and used responsibly according to legal, regulatory, and business requirements. It builds trust, consistency, and accountability in how data is collected, stored, shared, and retained across the enterprise. At Chavans, we help organizations establish governance frameworks that align data ownership, classification, retention, and compliance controls with standards like GDPR, HIPAA, ISO 27001, and other global regulations. This ensures that data remains accurate, secure, and compliant throughout its lifecycle.
                    </p>
                </div>
            </header>
            
            <main>
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[1] = el }}>
                        <h2>Why It Matters</h2>
                        <div className="ssp-divider"></div>
                        <p>As businesses expand across multiple cloud platforms, regions, and data systems, compliance risks and governance complexity increase. Without structured governance, organizations face inconsistent data handling, regulatory violations, audit failures, and loss of customer confidence. Strong data governance provides visibility, standardization, and control — turning compliance from a burden into a business strength.</p>
                    </div>
                </section>
                
                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[2] = el }}>
                        <h2>Our Proven Process</h2>
                        <div className="ssp-divider"></div>
                        <p style={{marginBottom: '3rem'}}>Implement governance through this five-step lifecycle: data ownership & classification; policy definition & access controls; compliance automation & auditing; retention & lifecycle management; and continuous monitoring & reporting.</p>
                        
                        <div className="dgc-timeline-container">
                            <div className="dgc-timeline-track">
                                {timelineSteps.map((item, index) => (
                                    <div className="dgc-timeline-card" key={index} tabIndex={0}>
                                        <div className="dgc-step-badge">{item.step}</div>
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
                        <p>Stronger data accountability, simplified audits, consistent policy enforcement, reduced compliance risk, and alignment with key data privacy frameworks. Organizations gain a single, unified view of their data posture across all environments.</p>
                    </div>
                </section>

                <section className="ssp-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[5] = el }}>
                        <h2>Who It’s For</h2>
                        <div className="ssp-divider"></div>
                        <p>Enterprises handling regulated data such as healthcare, finance, public sector, research, and global operations managing multi-region data flows and privacy laws. Also suitable for organizations preparing for ISO certifications, SOC 2 audits, or GDPR compliance.</p>
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
                            <div className="ssp-arch-item">Data classification</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">policy definition</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">compliance automation</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">monitoring</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">audit readiness</div>
                            <div className="ssp-arch-arrow">→</div>
                            <div className="ssp-arch-item">continuous improvement</div>
                        </div>
                        <p className="ssp-arch-caption">Data classification → policy definition → compliance automation → monitoring → audit readiness → continuous improvement.</p>
                    </div>
                </section>

                 <section className="ssp-section fade-in-section" ref={el => { if(el) sectionsRef.current[8] = el }}>
                    <div className="container">
                        <h2>Discover More in Data & AI Security</h2>
                         <div className="ssp-divider"></div>
                        <p>Explore related topics — AI Model Integrity & Access Control and Data Encryption & Leakage.</p>
                        <div className="ssp-discover-container">
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/data/ai-model-integrity-access-control')}
                            >
                                Explore AI Model Integrity <span>&rarr;</span>
                            </button>
                            <button 
                                className="btn ssp-discover-btn" 
                                onClick={() => navigateTo('security/data/data-encryption-leakage')}
                            >
                                Explore Data Encryption <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="ssp-cta-section">
                    <div className="container fade-in-section" ref={el => { if(el) sectionsRef.current[9] = el }}>
                        <h2>Start Your Security Journey</h2>
                        <p>Build a compliant, governed, and trustworthy data foundation — because secure data is compliant data.</p>
                        <button className="btn" onClick={openModal}>Request a Consultation</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DataGovernanceComplianceSection;
