
import React, { useState, useEffect, useRef } from 'react';

// --- Futuristic Visual Components --- //

const DataSphere: React.FC = () => (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="data-sphere">
        <style>
            {`
            .data-sphere .orbit { animation: rotate 20s linear infinite; transform-origin: center; }
            .data-sphere .orbit-2 { animation-duration: 30s; }
            .data-sphere .orbit-3 { animation-duration: 40s; }
            .data-sphere .dot { animation: pulse 2s ease-in-out infinite alternate; }
            .data-sphere .dot-2 { animation-delay: -1s; }
            .data-sphere .dot-3 { animation-delay: -0.5s; }
            @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes pulse { from { r: 2; opacity: 0.7; } to { r: 4; opacity: 1; } }
            `}
        </style>
        <defs>
            <radialGradient id="grad-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: 'rgba(59, 130, 246, 0.5)', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: 'rgba(59, 130, 246, 0)', stopOpacity: 1}} />
            </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="url(#grad-glow)" />
        <g className="orbits">
            <g className="orbit orbit-1">
                <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
                <circle className="dot dot-1" cx="300" cy="200" r="3" fill="#3b82f6" />
            </g>
            <g className="orbit orbit-2" style={{transform: "rotate(60deg)"}}>
                <ellipse cx="200" cy="200" rx="120" ry="120" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" transform="scale(1 0.5)"/>
                <circle className="dot dot-2" cx="320" cy="200" r="3" fill="#8b5cf6" />
            </g>
            <g className="orbit orbit-3" style={{transform: "rotate(-45deg)"}}>
                <ellipse cx="200" cy="200" rx="140" ry="140" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5" transform="scale(1 0.7)"/>
                <circle className="dot dot-3" cx="60" cy="200" r="2.5" fill="#3b82f6" />
            </g>
        </g>
    </svg>
);

const BackgroundGrid: React.FC = () => (
    <div className="background-grid-container" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5"/>
                </pattern>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect width="40" height="40" fill="url(#smallGrid)"/>
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    </div>
);


// --- Data for the page --- //

const whatYouGetData = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        title: 'Predictable Uptime',
        description: 'Proactive monitoring, automated alerts, and structured incident response ensure applications stay available when your business needs them most.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        title: 'Controlled Spending',
        description: 'Deep cost analytics and optimization practices remove wasteful spend and deliver predictable, well-managed cloud budgets.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
        title: 'Faster Recovery',
        description: 'Comprehensive backup, disaster recovery preparation, and rapid response workflows minimize disruption and accelerate restoration.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>,
        title: 'Ongoing Maturity',
        description: 'Quarterly well-architected reviews keep your architecture aligned with evolving best practices, security requirements, and modernization patterns.'
    }
];

const whoItIsForData = [
    { title: 'Teams Focused on Innovation', description: 'If your engineering team spends time firefighting issues instead of building new features, managed services restores that lost productivity.' },
    { title: 'Growing and Scaling Businesses', description: 'Organizations that require stable, reliable, cost-efficient cloud operations managed by experts—not a patchwork of ad-hoc fixes—benefit from our structured, enterprise-grade approach.' }
];

const whatWeCoverData = [
  {
    title: "Subscription Management",
    content: "We oversee the complete lifecycle of cloud subscriptions—including provisioning, entitlement validation, renewals, transfers, and secure retirement for AWS, Azure, and Google Cloud. Our team enforces naming standards, tagging frameworks, cost grouping, and compliance baselines, making your infrastructure organized and audit-ready. Vendor escalations and subscription-level admin issues are resolved efficiently, streamlining complex operations. This lowers operational overhead and removes bottlenecks that disrupt service continuity.",
    value: "Centralized oversight, clean governance, and simplified billing operations."
  },
  {
    title: "IAM User Management",
    content: "Our service implements least-privilege RBAC models, enforces multi-factor authentication, and establishes secure policies for users, groups, workloads, and service accounts. Regular access reviews and continuous monitoring ensure only authorized identities have appropriate permissions, keeping environments secure and compliant. Automated detection of risky behaviors and exposure is built into our workflow. We align all identity management processes with leading security frameworks.",
    value: "Reduced identity risks, stronger compliance alignment, and minimized exposure."
  },
  {
    title: "Billing & Cost Optimization",
    content: "We use FinOps-driven audits to validate every cloud billing detail and track consumption accuracy, quickly resolving vendor disputes and anomalies. Commitment discounts and optimization strategies are proactively applied, reducing costs and maximizing value from all cloud spend. Real-time dashboards and showback reports provide leadership with budget predictability and financial clarity. Cost allocation and visibility empower data-driven savings decisions.",
    value: "Trusted cost governance and proactive savings."
  },
  {
    title: "Quota & Limit Management",
    content: "Service limits can unexpectedly disrupt scaling or daily workflows. We monitor quota utilization in real time and preemptively raise vendor requests, so you never hit critical usage thresholds during scale-up or deployment. Automation and tracking minimize risk from performance interruptions and failed resource requests, ensuring flexibility is always maintained for essential services.",
    value: "Seamless cloud scaling without administrative bottlenecks."
  },
  {
    title: "24×7 Technical Support Access",
    content: "Our team manages all technical support interactions—including case creation, triage, diagnostics, escalation, and closure—across AWS, Azure, and GCP. This eliminates delays from vendor coordination, reduces workload on your engineering teams, and improves the speed of ticket resolution. Support is available at all hours, so mission-critical issues receive rapid attention. Clients also experience increased SLA responsiveness and satisfaction.",
    value: "Faster recovery, reduced engineering workloads, improved SLA responsiveness."
  },
  {
    title: "Case Prioritization & Severity Management",
    content: "Incidents are swiftly classified and prioritized based on the actual business impact, so critical problems get immediate action while smaller issues follow structured processes. Escalation protocols ensure the right resource focus and governance for every ticket. This minimizes unnecessary interruptions and supports rapid recovery for key services. Teams maintain streamlined communication and proactive intervention for urgent incidents.",
    value: "Efficient triage, business-aligned prioritization, minimized interruptions."
  },
  {
    title: "Asset & Resource Optimization",
    content: "We analyze infrastructure usage patterns to detect idle, underutilized, or oversized resources. Rightsizing, lifecycle cleanup, and configuration improvements reduce waste, lower costs, and maximize active utilization of cloud assets. Automated recommendations keep your environment lean and efficient, aligning resources with true business requirements and consolidating scattered workloads.",
    value: "Increased utilization, lower cloud spend, reduced sprawl."
  },
  {
    title: "Well-Architected Reviews (Quarterly)",
    content: "Every quarter, our experts review your environment against AWS, Azure, and Google Cloud architecture frameworks. We assess reliability, performance, security, operational excellence, and cost optimization, identifying gaps and opportunities for modernization. Detailed feedback guides migration, remediation, and continuous improvement steps. Your cloud grows in maturity and aligns to global best practices.",
    value: "Continuous modernization and alignment with cloud best practices."
  },
  {
    title: "Reserved Instance & Savings Plan Optimization",
    content: "We evaluate real usage patterns to design RI, Savings Plan, and Committed Use Discount strategies that lock-in savings while ensuring operational flexibility. Insights drive commitment decisions, so wasted capacity and overspend are minimized. Proactive recommendations adjust reservations as business needs shift. Financial planning is supported by predictability in cloud spending.",
    value: "Predictable, optimized cloud spending with minimized waste."
  },
  {
    title: "Cost Allocation & Showback",
    content: "Using advanced tagging standards and metadata, we allocate cloud spend to business units, projects, or applications for transparent financial accountability. Detailed showback reporting makes budgeting straightforward and supports chargeback models for interdepartmental collaboration. Stakeholders receive clear breakdowns, driving accurate financial analysis and workflows across environments.",
    value: "Clear visibility and data-driven budgeting."
  },
  {
    title: "Real-Time Cost Monitoring",
    content: "Our tools provide hourly and daily cost monitoring to flag billing anomalies, spikes, or unexpected patterns that can otherwise go unnoticed. Automated alerts and proactive interventions keep expenses from escalating and prevent budget overruns. Tracking helps maintain business focus on goals while avoiding surprise financial impacts.",
    value: "Early detection, prevention of financial surprises."
  },
  {
    title: "Usage Forecasting & Budget Planning",
    content: "By applying predictive modeling and long-term analytics, we support accurate cloud usage forecasts and future budget creation. Teams can strategically plan expansions, allocate resources, and anticipate seasonal or business growth. This reduces fiscal risk and supports stable cost management in dynamic cloud environments.",
    value: "Accurate future projections and stable cost planning."
  },
  {
    title: "Database Monitoring (Native Tools)",
    content: "Native tools continuously monitor database performance, replication health, resource consumption, and data availability. Immediate detection of slowdowns, failures, or bottlenecks ensures problems are resolved before impacting operations. Proactive alerts and dashboards enable robust management of core data assets.",
    value: "Reliable data integrity and consistent performance."
  },
  {
    title: "Application Performance Monitoring (Native Tools)",
    content: "Using CloudWatch, Application Insights, and GCP Monitoring, we track application latency, throughput, service dependencies, and failures. Continuous monitoring identifies performance anomalies and root causes, helping teams maintain high levels of reliability and user satisfaction. Integrations drive seamless workflow optimization and rapid response.",
    value: "Consistent, optimized end-user experience."
  },
  {
    title: "Status Reporting (Weekly / Monthly)",
    content: "Our operational reporting provides leadership with transparent, regular summaries of cloud performance, cost trends, incidents, and risks. Actionable insights and recommendations are included so you can make informed, timely decisions for all business environments.",
    value: "Clear operational insights and informed decision-making."
  },
  {
    title: "Incident Management",
    content: "We execute full incident management processes—identification, triage, restoration, root cause analysis (RCA), and preventive planning—so operational resilience is maintained. Documentation supports proactive learning and process improvement. Service restoration and downtime reduction are core priorities throughout every incident cycle.",
    value: "Faster recovery, reduced downtime, improved resiliency."
  },
  {
    title: "Security Recommendations",
    content: "Continuous security assessments detect configuration gaps, vulnerabilities, and compliance issues. We deliver customized remediation roadmaps aligned to cloud security best practices and business requirements, ensuring you maintain a strong defensive posture.",
    value: "Reduced risk exposure and strong security posture."
  },
  {
    title: "Backup & Restore Assurance",
    content: "Routine validation of backup processes, retention policies, and recovery workflows ensures your critical cloud data is always protected and recoverable. Regular restore testing confirms disaster recovery readiness, aligning to business continuity goals.",
    value: "Guaranteed data protection and DR readiness."
  },
  {
    title: "Database Backup (Native Tools)",
    content: "Automated cloud-native backups are configured and monitored for alignment with RPO/RTO objectives. Restoration integrity is validated through scheduled, production-ready tests—supporting zero-data-loss postures for core environments.",
    value: "Zero data-loss posture with validated backup workflows."
  },
  {
    title: "Change Management",
    content: "We implement strict change control processes—reviews, approvals, scheduling, testing, and rollback planning—protecting your production cloud environments from operational risk and instability. Documentation and governance meet audit and compliance standards.",
    value: "Stable operations and minimized change-related risk."
  },
  {
    title: "Ticketing System Integration",
    content: "Cloud support integrates seamlessly with your service desk tools, centralizing all requests—incidents, changes, provisioning, and troubleshooting—into unified, traceable workflows. Automated case sharing, approvals, and resolution drive accountability and allow superior SLA tracking.",
    value: "Better collaboration, accountability, and SLA management."
  }
];

const allPricingServices = [
    { id: 'sub-mgmt', name: 'Subscription Management' }, { id: 'iam', name: 'IAM User Management' }, { id: 'billing', name: 'Billing related issue' }, { id: 'quota', name: 'Increase quota limit' }, { id: 'support', name: 'Access to 24X7 Microsoft Technical Support - Email, Phone & Chat' }, { id: 'severity', name: 'Case Severity and Response Time- (Critical - 1hr, Moderate -4hrs, Minimal -8hrs)' }, { id: 'assets', name: 'Identify unused assets and over-provisioned VMs' }, { id: 'war', name: 'Well-architected Reviews (Quarterly)' }, { id: 'ri', name: 'Identify RI and Savings Plan opportunities' }, { id: 'cost-alloc', name: 'Allocate cost and show back spend across BUs' }, { id: 'cost-mon', name: 'Monitor costs hourly or daily & stay ahead of budget breaches' }, { id: 'forecast', name: 'Forecast usage trends and set smarter budgets' }, { id: 'db-mon', name: 'Database monitoring - Native Tool' }, { id: 'apm', name: 'App Performance monitoring - Native Tool' }, { id: 'reports', name: 'Monthly/Weekly Status-quo Reports' }, { id: 'incident', name: 'Incident management' }, { id: 'security', name: 'Security Recommendation' }, { id: 'backup', name: 'Backup & Restore' }, { id: 'db-backup', name: 'Database Backup - native tool' }, { id: 'change-mgmt', name: 'Change management' }, { id: 'ticketing', name: 'Ticketing System' },
];

const pricingTiers = [
    { name: 'Standard', price: '10%', description: 'Charged at % of MRR', isPopular: false, includedServices: new Set(['sub-mgmt', 'iam', 'billing', 'quota', 'support', 'severity', 'assets', 'war']) },
    { name: 'Premium', price: '13%', description: 'Charged at % of MRR', isPopular: false, includedServices: new Set(['sub-mgmt', 'iam', 'billing', 'quota', 'support', 'severity', 'assets', 'war', 'ri', 'cost-alloc', 'cost-mon', 'forecast', 'db-mon']) },
    { name: 'Premium+', price: '15%', description: 'Charged at % of MRR', isPopular: true, includedServices: new Set(['sub-mgmt', 'iam', 'billing', 'quota', 'support', 'severity', 'assets', 'war', 'ri', 'cost-alloc', 'cost-mon', 'forecast', 'db-mon', 'apm', 'reports', 'incident', 'security', 'backup', 'db-backup']) },
    { name: 'Enterprise', price: '17%', description: 'Charged at % of MRR', isPopular: false, includedServices: new Set(allPricingServices.map(s => s.id)) }
];

const caseStudiesData = [
    { logo: 'AWS', title: 'Reference Implementations', description: "Validated architectures and deployment patterns for security, analytics, DevOps automation, networking, and more." },
    { logo: 'Microsoft', title: 'Cloud Architecture Center', description: "Comprehensive architectural blueprints backed by Microsoft’s Cloud Adoption Framework and Well-Architected model." },
    { logo: 'Google Cloud', title: 'Architecture Framework', description: "Guidance covering reliability, security, cost optimization, and operational excellence for modern cloud workloads." }
];

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="24" height="24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="24" height="24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);


// --- Main Component --- //

const InfrastructureManagedServicesPage: React.FC<{ openModal: () => void }> = ({ openModal }) => {
    const sectionsRef = useRef<(HTMLElement | null)[]>([]);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 }
        );
        const currentSections = sectionsRef.current.filter(el => el !== null);
        currentSections.forEach((section) => { if (section) observer.observe(section); });
        return () => { currentSections.forEach((section) => { if (section) observer.unobserve(section); }); };
    }, []);

    // Card hover effect for glassmorphism
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const cards = document.querySelectorAll('.ims-glass-card, .ims-carousel-card');
            for (const card of cards) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
                (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
            }
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const scrollCarousel = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            // Scroll by roughly one card width + gap
            const scrollAmount = 450 + 32; 
            const currentScroll = carouselRef.current.scrollLeft;
            carouselRef.current.scrollTo({
                left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="ims-futuristic-page">
            <style>{`
                .ims-carousel-section {
                    position: relative;
                    padding: 40px 0;
                    overflow: hidden;
                }
                .ims-carousel-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    max-width: 1400px;
                    margin: 0 auto;
                }
                .ims-carousel-container {
                    display: flex;
                    overflow-x: auto;
                    scroll-behavior: smooth;
                    scroll-snap-type: x mandatory;
                    gap: 32px;
                    padding: 40px 20px;
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE/Edge */
                    width: 100%;
                    align-items: stretch;
                }
                .ims-carousel-container::-webkit-scrollbar {
                    display: none; /* Chrome/Safari */
                }
                .ims-carousel-card {
                    min-width: 400px;
                    width: 400px;
                    flex-shrink: 0;
                    scroll-snap-align: center;
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    text-align: left;
                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                    position: relative;
                    overflow: hidden;
                }
                .ims-carousel-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    border-radius: 24px;
                    background: radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(59, 130, 246, 0.1), transparent 40%);
                    opacity: 0;
                    transition: opacity 0.3s;
                    z-index: 0;
                    pointer-events: none;
                }
                .ims-carousel-card:hover::before {
                    opacity: 1;
                }
                .ims-carousel-card:hover {
                    border-color: var(--ims-accent1);
                    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(59, 130, 246, 0.2);
                    transform: translateY(-10px) scale(1.02);
                    z-index: 10;
                }
                .ims-carousel-card h3 {
                    color: #fff;
                    font-size: 1.4rem;
                    margin: 0;
                    font-weight: 700;
                    z-index: 1;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                .ims-carousel-card p {
                    color: #cbd5e1;
                    font-size: 1rem;
                    line-height: 1.7;
                    margin: 0;
                    z-index: 1;
                    flex-grow: 1;
                }
                .ims-value-tag {
                    margin-top: 24px;
                    padding: 16px;
                    background: rgba(59, 130, 246, 0.1);
                    border-left: 3px solid var(--ims-accent1);
                    border-radius: 0 8px 8px 0;
                    font-size: 0.9rem;
                    color: #bfdbfe;
                    font-weight: 500;
                    z-index: 1;
                }
                .ims-value-tag strong {
                    display: block;
                    color: var(--ims-accent1);
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 4px;
                }
                
                /* Navigation Buttons */
                .ims-carousel-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(15, 23, 42, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #fff;
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(8px);
                    transition: all 0.3s ease;
                    z-index: 20;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
                }
                .ims-carousel-btn.prev { left: 20px; }
                .ims-carousel-btn.next { right: 20px; }
                
                .ims-carousel-btn:hover {
                    background: var(--ims-accent1);
                    border-color: var(--ims-accent1);
                    transform: translateY(-50%) scale(1.1);
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
                }

                /* Mobile Adjustment */
                @media (max-width: 768px) {
                    .ims-carousel-card { min-width: 85vw; width: 85vw; padding: 24px; }
                    .ims-carousel-btn { display: none; } /* Touch swipe is better on mobile */
                    .ims-carousel-container { padding: 20px; gap: 16px; }
                }
            `}</style>

            <header className="ims-hero">
                <div className="data-sphere-container">
                    <DataSphere />
                </div>
                <div className="ims-hero-content">
                    <h1>Infrastructure Managed Services</h1>
                    <p>Chavans Infrastructure Managed Services keeps your cloud infrastructure continuously healthy, secure, operational, and fully optimized 24×7. Our cloud engineers proactively monitor, protect, and support your environment, ensuring seamless performance and reliability—so your teams can innovate without being slowed down by infrastructure operations, break/fix cycles, or administrative overhead.</p>
                </div>
            </header>
            
            <section ref={el => sectionsRef.current[0] = el} className="fade-in-section">
                <div className="container">
                    <h2 className="section-title-header">Why It Matters</h2>
                    <p className="section-summary">Most organizations face a constant stream of infrastructure noise—unexpected outages, service quota limits, budget overruns, elevated latency, access issues, and uncontrolled cloud sprawl. These disruptions drain engineering time, stall roadmaps, and inflate operational cost. With managed services, your cloud transforms from a reactive firefighting zone into a stable, predictable, well-governed operating platform. You gain consistent performance, controlled spending, strong governance, and complete operational confidence.</p>
                </div>
            </section>

            <section ref={el => sectionsRef.current[1] = el} className="fade-in-section">
                <div className="container">
                     <BackgroundGrid />
                    <h2 className="section-title-header">What You Get</h2>
                     <p className="section-summary">Chavans provides a continuously operated, enterprise-grade infrastructure foundation built for stability, performance, and cost efficiency. Your cloud is monitored, governed, secured, and optimized at all times—without needing to expand internal operations staff.</p>
                    <div className="ims-grid grid-4">
                        {whatYouGetData.map(item => (
                            <div key={item.title} className="ims-glass-card">
                                {item.icon}
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             <section ref={el => sectionsRef.current[2] = el} className="fade-in-section">
                <div className="container" style={{maxWidth: '100%', padding: 0}}>
                    <div className="container">
                        <h2 className="section-title-header">What We Cover</h2>
                        <p className="section-summary">A comprehensive suite of operational capabilities to manage, optimize, and secure your cloud environment.</p>
                    </div>
                    
                    <div className="ims-carousel-section">
                        <div className="ims-carousel-wrapper">
                            <button className="ims-carousel-btn prev" onClick={() => scrollCarousel('left')} aria-label="Previous">
                                <ArrowLeftIcon />
                            </button>
                            
                            <div className="ims-carousel-container" ref={carouselRef}>
                                {whatWeCoverData.map((item, index) => (
                                    <div className="ims-carousel-card" key={`${item.title}-${index}`}>
                                        <h3>{item.title}</h3>
                                        <p>{item.content}</p>
                                        <div className="ims-value-tag">
                                            <strong>Value Delivered</strong>
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="ims-carousel-btn next" onClick={() => scrollCarousel('right')} aria-label="Next">
                                <ArrowRightIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={el => sectionsRef.current[3] = el} className="fade-in-section">
                <div className="container">
                    <h2 className="section-title-header">Who It’s For</h2>
                    <div className="ims-grid grid-2">
                        {whoItIsForData.map(item => (
                            <div key={item.title} className="ims-glass-card">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section ref={el => sectionsRef.current[4] = el} className="fade-in-section ims-pricing-section">
                <div className="container">
                    <h2 className="section-title-header">Managed Services Tiers</h2>
                    <div className="pricing-grid">
                        {pricingTiers.map(tier => (
                            <div key={tier.name} className={`pricing-card ${tier.isPopular ? 'popular' : ''}`}>
                                {tier.isPopular && <div className="popular-badge">MOST POPULAR</div>}
                                <div className="card-header">
                                    <h2>{tier.name}</h2>
                                    <div className="price">{tier.price}</div>
                                    <p className="price-desc">{tier.description}</p>
                                </div>
                                <div className="card-body">
                                    <h3>INCLUDED SERVICES</h3>
                                    <ul className="service-list">
                                        {allPricingServices.map(service => {
                                            const isIncluded = tier.includedServices.has(service.id);
                                            return (
                                                <li key={service.id} className={isIncluded ? 'included' : 'excluded'}>
                                                    {isIncluded && <CheckIcon />}
                                                    <span>{service.name}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section ref={el => sectionsRef.current[5] = el} className="fade-in-section">
                <div className="container">
                    <h2 className="section-title-header">Case Studies / References</h2>
                    <div className="ims-grid grid-3">
                        {caseStudiesData.map(item => (
                             <div key={item.title} className="ims-glass-card">
                                <h3 style={{fontSize: '1.5rem', fontWeight: '800'}}>{item.logo}</h3>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section ref={el => sectionsRef.current[6] = el} className="fade-in-section" style={{paddingBottom: 0}}>
                <div className="container">
                    <div className="ims-discover-section">
                        <h2 className="section-title-header" style={{fontSize: '2rem'}}>Discover More in Managed Services</h2>
                        <p className="section-summary" style={{marginBottom: 0}}>Explore additional Managed Services offerings and the broader operational capabilities available from Chavans.</p>
                    </div>
                </div>
            </section>

            <section ref={el => sectionsRef.current[7] = el} className="ims-final-cta-section fade-in-section">
                <div className="container">
                    <h2 className="section-title-header">Start Your Journey</h2>
                    <p className="section-summary">Let our experts manage the complexity of cloud operations, improve reliability, reduce costs, and strengthen your security posture—while your teams focus on building what matters.</p>
                    <div className="ims-cta-buttons">
                        <button className="btn primary" onClick={() => window.open('https://chavans.in/contact', '_blank')}>Start Your Journey</button>
                        <button className="btn secondary" onClick={openModal}>Request a Consultation</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InfrastructureManagedServicesPage;
