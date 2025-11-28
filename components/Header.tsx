
import React, { useState, useEffect, useRef } from 'react';

// Custom hook to detect clicks outside of a referenced element
function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

type AccordionItem = string | { text: string; page: string };

// Sub-component for clickable accordion sections
const AccordionSection: React.FC<{ title: string; items: AccordionItem[]; isActive: boolean; onToggle: () => void; onNavigate?: (page: string) => void }> = ({ title, items, isActive, onToggle, onNavigate }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
        }
    };

    return (
        <div className={`section ${isActive ? 'active' : ''}`}>
            <button className="section-title" onClick={onToggle} onKeyDown={handleKeyDown} tabIndex={0} aria-expanded={isActive}>
                {title} <span className="section-caret">▸</span>
            </button>
            <ul className="section-list">
                {items.map((item, index) => {
                    const text = typeof item === 'string' ? item : item.text;
                    const page = typeof item === 'string' ? undefined : item.page;

                    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                        if (page && onNavigate) {
                            e.preventDefault();
                            onNavigate(page);
                        }
                    };
                    
                    return (
                        <li key={index}><a href={page ? `/${page}` : '#'} onClick={handleClick}>{text}</a></li>
                    )
                })}
            </ul>
        </div>
    );
};


// Sub-component for the top-level mobile menu category (e.g., "Services", "AI")
const MobileMenuCategory: React.FC<{ title: string; startOpen?: boolean; children: React.ReactNode }> = ({ title, startOpen = false, children }) => {
    const [isOpen, setIsOpen] = useState(startOpen);
    const hasContent = React.Children.count(children) > 0;
    return (
        <div className={`mobile-category-item ${isOpen ? 'open' : ''}`}>
            <button onClick={() => hasContent && setIsOpen(!isOpen)} className="mobile-category-title" aria-expanded={isOpen}>
                {title}
                {hasContent && <span className="accordion-icon">{isOpen ? '−' : '+'}</span>}
            </button>
            {isOpen && hasContent && <div className="mobile-category-content">{children}</div>}
        </div>
    );
};


const Header: React.FC<{ openModal: () => void; navigateTo: (page: string) => void; }> = ({ openModal, navigateTo }) => {
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleNavClick = (menuId: string) => {
    setOpenMegaMenu(openMegaMenu === menuId ? null : menuId);
  };
  
  const closeAllMenus = () => {
      setOpenMegaMenu(null);
  }

  useOnClickOutside(headerRef, () => {
      closeAllMenus();
  });
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllMenus();
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleDesktopNav = (page: string) => {
      navigateTo(page);
      closeAllMenus();
  }
  
  const handleMobileNav = (page: string) => {
      navigateTo(page);
      setMobileMenuOpen(false);
  }

  const MegaPanel: React.FC<{id: string, children: React.ReactNode}> = ({id, children}) => (
    <div id={id} className={`mega-panel ${openMegaMenu === id ? 'visible' : ''}`} role="menu" aria-hidden={openMegaMenu !== id}>
        {children}
    </div>
  );

  const ServicesMenu: React.FC<{ isMobile?: boolean; openModal: () => void; onNavigate: (page: string) => void }> = ({ isMobile, openModal, onNavigate }) => {
    const [activeConsulting, setActiveConsulting] = useState<string|null>(null);
    const [activeProfessional, setActiveProfessional] = useState<string|null>(null);

    const consultingItems: { key: string; title: string; items: AccordionItem[] }[] = [
      { key: 'edge', title: 'EDGE', items: [{text: 'Edge Adoption Roadmap', page: 'edge-adoption-roadmap'}, 'Edge infra planning', 'AI at the edge'] },
      { key: 'app', title: 'APP & AGENTS', items: ['Legacy application assessment', 'Modernisation roadmap creation'] },
      { key: 'data', title: 'DATA & AI', items: ['Define AI goals', 'Build AI adoption roadmap', 'AI readiness assessment', 'ML model selection', 'Unifying data model selection'] },
      { key: 'infra', title: 'INFRASTRUCTURE', items: ['Infra strategy & planning', { text: 'Infra architecture & designing', page: 'infra-arch-design' }, 'Capacity planning', 'Cloud adoption roadmap', 'Cloud vendor selection', 'Multi-cloud & hybrid cloud design'] },
      { key: 'sec', title: 'SECURITY', items: ['Security & compliance architecture and design'] },
    ];
    const professionalItems = [
        { key: 'apps', title: 'APPS & AGENTS', items: ['Application deployment', 'Legacy App migration to cloud', 'Application reengineering'] },
        { key: 'data', title: 'DATA & AI', items: ['Data landscape assessment', 'Data migration and integration', 'Data fabric architecture setup', 'ML model integration', 'Custom AI model development', 'BI tool integration'] },
        { key: 'infra', title: 'INFRASTRUCTURE', items: ['Cloud readiness assessment', 'Infrastructure provisioning', 'Infrastructure monitoring & optimisation', 'Well architected reviews (WAR)', 'Server, Storage & Backup implementation', 'Disaster Recovery (DR) setup & drills'] },
        { key: 'sec', title: 'SECURITY', items: ['Security and compliance setup', 'Cybersecurity risk assessments', 'Vulnerability scanning & penetration testing'] },
        { key: 'market', title: 'MARKETPLACE', items: ['Product listing in AWS/Azure Marketplace'] },
    ];
    
    const handleInfraClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onNavigate('infrastructure');
    };

    const renderColumn = (title: string, items: typeof consultingItems, activeKey: string | null, setActive: (key: string|null)=>void) => (
      <>
        <h4>{title}</h4>
        {items.map(item => (
          <AccordionSection 
            key={item.key}
            title={item.title}
            items={item.items}
            isActive={activeKey === item.key}
            onToggle={() => setActive(activeKey === item.key ? null : item.key)}
            onNavigate={onNavigate}
          />
        ))}
      </>
    );

    if (isMobile) {
      return (
        <>
          <MobileMenuCategory title="Consulting Services">
            {consultingItems.map(item => <AccordionSection key={item.key} title={item.title} items={item.items} isActive={activeConsulting === item.key} onToggle={() => setActiveConsulting(activeConsulting === item.key ? null : item.key)} onNavigate={onNavigate} />)}
          </MobileMenuCategory>
          <MobileMenuCategory title="Professional Services">
            {professionalItems.map(item => <AccordionSection key={item.key} title={item.title} items={item.items} isActive={activeProfessional === item.key} onToggle={() => setActiveProfessional(activeProfessional === item.key ? null : item.key)} onNavigate={onNavigate} />)}
          </MobileMenuCategory>
          <MobileMenuCategory title="Managed Services">
             <ul className="section-list" style={{display: 'block'}}>
                <li><a href="#" onClick={handleInfraClick}>Infrastructure</a></li>
            </ul>
          </MobileMenuCategory>
        </>
      );
    }
    return (
      <>
        <div className="mega-grid">
            <div className="mega-col">{renderColumn('Consulting Services', consultingItems, activeConsulting, setActiveConsulting)}</div>
            <div className="mega-col">{renderColumn('Professional Services', professionalItems, activeProfessional, setActiveProfessional)}</div>
            <div className="mega-col">
                <h4>Managed Services</h4>
                <a href="#" onClick={handleInfraClick}>Infrastructure</a>
            </div>
        </div>
        <div className="mega-footer">
            <span>Need help selecting a service?</span>
            <button className="btn" onClick={openModal}>Talk to an Expert</button>
        </div>
      </>
    );
  };

  const AiMenu: React.FC<{ isMobile?: boolean, onNavigate: (page: string) => void, openModal: () => void }> = ({ isMobile, onNavigate, openModal }) => {
    const [activeStrategy, setActiveStrategy] = useState<string|null>(null);
    const [activeDev, setActiveDev] = useState<string|null>(null);
    const [activeMlops, setActiveMlops] = useState<string|null>(null);

    const strategyItems = [{ key: 'strat', title: 'Strategy', items: ['Define AI goals', 'Build AI adoption roadmap', 'AI readiness assessment'] }];
    const devItems = [{ key: 'dev', title: 'Development', items: ['Custom AI model development', 'ML model selection', 'ML model integration', 'Embed intelligence into apps'] }];
    const mlopsItems = [{ key: 'mlops', title: 'Platforms', items: ['Production-ready pipelines', 'Monitoring and retraining', 'Data fabric architecture setup'] }];
    
    const handleUseCaseClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onNavigate('ai-use-cases');
    }
    
    if (isMobile) {
        return (
            <>
                {strategyItems.map(item => <AccordionSection key={item.key} title={item.title} items={item.items} isActive={activeStrategy === item.key} onToggle={() => setActiveStrategy(activeStrategy === item.key ? null : item.key)} onNavigate={onNavigate} />)}
                {devItems.map(item => <AccordionSection key={item.key} title={item.title} items={item.items} isActive={activeDev === item.key} onToggle={() => setActiveDev(activeDev === item.key ? null : item.key)} onNavigate={onNavigate} />)}
                {mlopsItems.map(item => <AccordionSection key={item.key} title={item.title} items={item.items} isActive={activeMlops === item.key} onToggle={() => setActiveMlops(activeMlops === item.key ? null : item.key)} onNavigate={onNavigate} />)}
                 <button className="section-title" style={{fontWeight: 400}} onClick={handleUseCaseClick}>AI Use Cases</button>
            </>
        )
    }

    return (
        <>
            <div className="mega-grid">
                <div className="mega-col">
                    <h4>AI Strategy & Consulting</h4>
                    {strategyItems.map(item => <AccordionSection key={item.key} title={item.title} items={item.items} isActive={activeStrategy === item.key} onToggle={() => setActiveStrategy(activeStrategy === item.key ? null : item.key)} onNavigate={onNavigate} />)}
                </div>
                <div className="mega-col">
                    <h4>Custom AI Development</h4>
                    {devItems.map(item => <AccordionSection key={item.key} title={item.title} items={item.items} isActive={activeDev === item.key} onToggle={() => setActiveDev(activeDev === item.key ? null : item.key)} onNavigate={onNavigate} />)}
                </div>
                 <div className="mega-col">
                    <h4>MLOps & Platforms</h4>
                    {mlopsItems.map(item => <AccordionSection key={item.key} title={item.title} items={item.items} isActive={activeMlops === item.key} onToggle={() => setActiveMlops(activeMlops === item.key ? null : item.key)} onNavigate={onNavigate} />)}
                </div>
                <div className="mega-col">
                    <h4>Explore</h4>
                    <a href="#" onClick={handleUseCaseClick} style={{textDecoration: 'none', color: 'var(--muted)', fontSize: '14px', padding: '8px 10px', display: 'block', borderRadius: '6px' }}>
                        AI Use Cases
                    </a>
                </div>
            </div>
             <div className="mega-footer">
                <span>Ready to build with AI?</span>
                <button className="btn" onClick={openModal}>Talk to an AI Expert</button>
            </div>
        </>
    )
  }
  
  const IntelligentInfrastructureMenu: React.FC<{isMobile?: boolean, openModal: () => void, onNavigate: (page: string) => void}> = ({ isMobile, openModal, onNavigate }) => {
    const items = [
        { title: 'Cloud', page: 'infrastructure', desc: 'Scalable, secure, and managed cloud solutions.' },
        { title: 'Datacenter', page: 'infra-arch-design', desc: 'Modernize your on-premise infrastructure.' },
        { title: 'Edge', page: 'edge-adoption-roadmap', desc: 'Distributed intelligence for real-time insights.' }
    ];

    const handleClick = (e: React.MouseEvent, page: string) => {
        e.preventDefault();
        onNavigate(page);
    };

    if(isMobile) return (
        <ul className="section-list" style={{display: 'block', paddingLeft: 0, listStyle: 'none'}}>
            {items.map(item => (
                <li key={item.title}><a href="#" onClick={(e) => handleClick(e, item.page)} style={{fontSize:'16px', display: 'block', padding: '8px 0'}}>{item.title}</a></li>
            ))}
        </ul>
    );

    return (
        <>
            <div className="mega-grid">
                {items.map(item => (
                    <div className="mega-col" key={item.title}>
                        <a href="#" onClick={(e) => handleClick(e, item.page)} style={{ display: 'block', textDecoration: 'none', padding: '10px', borderRadius: '8px', transition: 'background-color 0.2s' }} className="hover-bg">
                            <h4 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--fg)' }}>{item.title}</h4>
                            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: '1.5' }}>{item.desc}</p>
                        </a>
                    </div>
                ))}
            </div>
            <div className="mega-footer">
                <span>Need an infrastructure assessment?</span>
                <button className="btn" onClick={openModal}>Request Assessment</button>
            </div>
        </>
    );
  };

  const SecurityMenu: React.FC<{isMobile?: boolean, openModal: () => void, onNavigate: (page: string) => void}> = ({ isMobile, openModal, onNavigate }) => {
    // State for the accordion on mobile
    const [activeMobileAccordion, setActiveMobileAccordion] = useState<string|null>(null);

    // Data structure as per requirements
    const securityMenuData = [
        {
            category: 'Edge',
            pagePrefix: 'edge',
            items: [
                { text: 'End-point protection', page: 'endpoint-protection' },
                { text: 'Zero Trust Access', page: 'zero-trust-access' },
                { text: 'Real-Time Threat Detection', page: 'real-time-threat-detection' },
            ],
        },
        {
            category: 'App & Agents',
            pagePrefix: 'app',
            items: [
                { text: 'Runtime Application Self-protection', page: 'runtime-application-self-protection' },
                { text: 'API Security', page: 'api-security' },
                { text: 'Agent Behaviour Monitoring', page: 'agent-behaviour-monitoring' },
            ],
        },
        {
            category: 'Data & AI',
            pagePrefix: 'data',
            items: [
                { text: 'Data Encryption & Leakage', page: 'data-encryption-leakage' },
                { text: 'AI Model Integrity & Access Control', page: 'ai-model-integrity-access-control' },
                { text: 'Data Governance & Compliance', page: 'data-governance-compliance' },
            ],
        },
        {
            category: 'Infrastructure',
            pagePrefix: 'infra',
            items: [
                { text: 'Cloud Workload Protection (CWPP)', page: 'cloud-workload-protection' },
                { text: 'Security Info & Event Management (SIEM)', page: 'siem' },
                { text: 'Extended Detection & Response (XDR)', page: 'xdr' },
            ],
        },
    ];

    const handleSubtopicClick = (e: React.MouseEvent<HTMLAnchorElement>, pageKey: string) => {
        e.preventDefault();
        onNavigate(pageKey);
    };

    // Mobile view: Accordion style
    if (isMobile) {
        return (
            <>
                {securityMenuData.map(col => (
                    <AccordionSection
                        key={col.category}
                        title={col.category}
                        // Create page keys like 'security/edge/endpoint-protection'
                        items={col.items.map(item => ({ 
                            text: item.text, 
                            page: `security/${col.pagePrefix}/${item.page}` 
                        }))}
                        isActive={activeMobileAccordion === col.category}
                        onToggle={() => setActiveMobileAccordion(activeMobileAccordion === col.category ? null : col.category)}
                        onNavigate={onNavigate}
                    />
                ))}
            </>
        );
    }

    // Desktop view: 4-column mega-menu
    return (
        <>
            <div className="mega-grid">
                {securityMenuData.map(col => (
                    <div className="mega-col" key={col.category}>
                        <h4>{col.category}</h4>
                        <ul>
                            {col.items.map(item => {
                                const pageKey = `security/${col.pagePrefix}/${item.page}`;
                                return (
                                    <li key={item.page}>
                                        <a href={`/${pageKey}`} onClick={(e) => handleSubtopicClick(e, pageKey)}>
                                            {item.text}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="mega-footer">
                <span>Schedule a security review</span>
                <button className="btn" onClick={openModal}>Request Review</button>
            </div>
        </>
    );
};

  const ResourcesMenu: React.FC<{isMobile?: boolean, onNavigate: (page: string) => void}> = ({ isMobile, onNavigate }) => {
    const [activeLearn, setActiveLearn] = useState<string|null>(null);
    const [activeConnect, setActiveConnect] = useState<string|null>(null);
    const learnSections = [
        { key: 'sol', title: 'Solution Library', items: ['Solution patterns', 'Reference architectures', 'Starter templates']},
        { key: 'arch', title: 'Architecture', items: ['Reference architectures & diagrams']},
    ];
    const connectSections = [
        { key: 'events', title: 'Events & Webinars', items: ['Upcoming webinars', 'Workshops & trainings']}
    ];
    const learnLinks = ['Fundamentals', 'Tutorials'];
    const connectLinks = ['Press Releases'];
    const storiesItems = ['Blogs', 'Success Stories', 'Case studies'];

    const searchFooter = (
        <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ color: 'var(--muted)' }}>Need a search bar to find the right content?</div>
            <div style={{ width: '420px', maxWidth: '100%' }} className="resources-search">
                <input type="search" placeholder="Search docs, case studies, webinars..." aria-label="Search resources"/>
                <button className="btn" onClick={() => alert('Search functionality not implemented.')}>Search</button>
            </div>
        </div>
    );

    if(isMobile) return(
        <>
            <MobileMenuCategory title="Learn">
                {learnSections.map(item => <AccordionSection key={item.key} title={item.title} items={item.items} isActive={activeLearn === item.key} onToggle={()=>setActiveLearn(activeLearn === item.key ? null : item.key)} onNavigate={onNavigate} />)}
                {learnLinks.map(item => <a href="#" key={item} style={{display:'block', padding: '8px 0', marginLeft: '1rem'}}>{item}</a>)}
            </MobileMenuCategory>
             <MobileMenuCategory title="Connect">
                {connectSections.map(item => <AccordionSection key={item.key} title={item.title} items={item.items} isActive={activeConnect === item.key} onToggle={()=>setActiveConnect(activeConnect === item.key ? null : item.key)} onNavigate={onNavigate} />)}
                {connectLinks.map(item => <a href="#" key={item} style={{display:'block', padding: '8px 0', marginLeft: '1rem'}}>{item}</a>)}
            </MobileMenuCategory>
             <MobileMenuCategory title="Stories">
                {storiesItems.map(item => <a href="#" key={item} style={{display:'block', padding: '8px 0', marginLeft: '1rem'}}>{item}</a>)}
            </MobileMenuCategory>
            <div className="resources-search" style={{marginTop: '16px', flexDirection: 'column', alignItems: 'stretch' }}>
                 <input type="search" placeholder="Search resources..." />
                 <button className="btn" style={{marginTop:'8px'}} onClick={() => alert('Search functionality not implemented.')}>Search</button>
            </div>
        </>
    )

    return(
      <>
        <div className="mega-grid">
            <div className="mega-col">
                <h4>Learn</h4>
                {learnSections.map(item => <AccordionSection key={item.key} title={item.title} items={item.items} isActive={activeLearn === item.key} onToggle={()=>setActiveLearn(activeLearn === item.key ? null : item.key)} onNavigate={onNavigate} />)}
                {learnLinks.map(link => <a href="#" key={link}>{link}</a>)}
            </div>
            <div className="mega-col">
                <h4>Connect</h4>
                {connectSections.map(item => <AccordionSection key={item.key} title={item.title} items={item.items} isActive={activeConnect === item.key} onToggle={()=>setActiveConnect(activeConnect === item.key ? null : item.key)} onNavigate={onNavigate} />)}
                {connectLinks.map(item => <a href="#" key={item}>{item}</a>)}
            </div>
            <div className="mega-col">
                <h4>Stories</h4>
                {storiesItems.map(item => <a href="#" key={item}>{item}</a>)}
            </div>
        </div>
        {searchFooter}
      </>
  )};

  const PricingMenu: React.FC<{isMobile?: boolean}> = ({ isMobile }) => {
    const tiers = ['Standard — 10% of MRR', 'Premium — 13%', 'Premium+ — 15%', 'Enterprise — 17%'];
    const custom = ['Request a quote', 'Bulk enterprise pricing'];

    if(isMobile) return (
        <>
            <MobileMenuCategory title="Service Tiers">
                <ul className="section-list" style={{display: 'block', paddingLeft: 0, listStyle: 'none'}}>{tiers.map(i => <li key={i}><a href="#">{i}</a></li>)}</ul>
            </MobileMenuCategory>
             <MobileMenuCategory title="Custom Pricing">
                 <ul className="section-list" style={{display: 'block', paddingLeft: 0, listStyle: 'none'}}>{custom.map(i => <li key={i}><a href="#">{i}</a></li>)}</ul>
            </MobileMenuCategory>
        </>
    );
    return(
        <div className="mega-grid">
            <div className="mega-col">
                <h4>Service Tiers</h4>
                <ul className="section-list" style={{display: 'block', paddingLeft: 0, listStyle: 'none'}}>
                    {tiers.map(i => <li key={i}><a href="#">{i}</a></li>)}
                </ul>
            </div>
            <div className="mega-col">
                <h4>Custom Pricing</h4>
                <ul className="section-list" style={{display: 'block', paddingLeft: 0, listStyle: 'none'}}>
                    {custom.map(i => <li key={i}><a href="#">{i}</a></li>)}
                </ul>
            </div>
        </div>
    )
  }

  return (
    <header aria-label="Main header" ref={headerRef}>
      <div className="container header-row">
        <div className="brand" onClick={() => navigateTo('home')} style={{cursor: 'pointer'}}>CHAVANS</div>
        <nav aria-label="Primary navigation" className="nav">
          <button className="nav-btn" onClick={() => handleNavClick('services-mega')}>Services ▾</button>
          <button className="nav-btn" onClick={() => handleNavClick('ai-mega')}>AI ▾</button>
          <button className="nav-btn" onClick={() => handleNavClick('intel-mega')}>Intelligent Infrastructure ▾</button>
          <button className="nav-btn" onClick={() => handleNavClick('security-mega')}>Security ▾</button>
          <button className="nav-btn" onClick={() => handleNavClick('resources-mega')}>Resources ▾</button>
          <button className="nav-btn" onClick={() => handleNavClick('pricing-mega')}>Pricing ▾</button>
        </nav>
        <div className="nav">
          <button className="btn" onClick={openModal}>Contact Us</button>
        </div>
        <div className="mobile-nav-toggle">
            <button className="nav-btn" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
                {isMobileMenuOpen ? 'Close' : 'Menu'}
            </button>
        </div>
      </div>

      <MegaPanel id="services-mega"><ServicesMenu openModal={openModal} onNavigate={handleDesktopNav} /></MegaPanel>
      <MegaPanel id="ai-mega"><AiMenu onNavigate={handleDesktopNav} openModal={openModal} /></MegaPanel>
      <MegaPanel id="intel-mega"><IntelligentInfrastructureMenu openModal={openModal} onNavigate={handleDesktopNav} /></MegaPanel>
      <MegaPanel id="security-mega"><SecurityMenu openModal={openModal} onNavigate={handleDesktopNav} /></MegaPanel>
      <MegaPanel id="resources-mega"><ResourcesMenu onNavigate={handleDesktopNav} /></MegaPanel>
      <MegaPanel id="pricing-mega"><PricingMenu/></MegaPanel>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
            <MobileMenuCategory title="Services" startOpen={true}>
                <ServicesMenu isMobile={true} openModal={openModal} onNavigate={handleMobileNav} />
            </MobileMenuCategory>
            <MobileMenuCategory title="AI">
                <AiMenu isMobile={true} onNavigate={handleMobileNav} openModal={openModal} />
            </MobileMenuCategory>
            <MobileMenuCategory title="Intelligent Infrastructure">
                <IntelligentInfrastructureMenu isMobile={true} openModal={openModal} onNavigate={handleMobileNav} />
            </MobileMenuCategory>
             <MobileMenuCategory title="Security">
                <SecurityMenu isMobile={true} openModal={openModal} onNavigate={handleMobileNav} />
            </MobileMenuCategory>
             <MobileMenuCategory title="Resources">
                <ResourcesMenu isMobile={true} onNavigate={handleMobileNav} />
            </MobileMenuCategory>
            <MobileMenuCategory title="Pricing">
                <PricingMenu isMobile={true} />
            </MobileMenuCategory>
            <div className="mobile-contact-btn-wrapper">
                <button className="btn" onClick={() => { openModal(); setMobileMenuOpen(false); }}>Contact Us</button>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;
