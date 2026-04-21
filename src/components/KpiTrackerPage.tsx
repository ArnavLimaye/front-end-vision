import { useState, useMemo } from 'react'
import type { ActiveSection } from '../App'
import { kpiData as k, navItems } from '../data/visionData'

interface Props { 
  activeSection: ActiveSection;
  onTabChange?: (section: ActiveSection) => void;
}

export default function KpiTrackerPage({ activeSection, onTabChange }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'kpi' | 'weekly-plan' | 'weekly-progress'>('kpi')
  const currentTabLabel = navItems.find(n => n.id === 'kpi-tracker')?.children.find(c => c.id === activeSection)?.label || 'Overview'

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">
      {/* Dark header banner */}
      <div className="relative bg-dark-gradient rounded-2xl p-6 md:p-8 mb-6 overflow-hidden shadow-card">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">📊 KPI Tracker</h2>
          <p className="text-xs md:text-sm text-white/60 mt-1">Frontend Engineering — Spring Money OS</p>
          <div className="flex gap-4 md:gap-8 mt-6 flex-wrap">
            {[
              { label: 'KPI 1', value: 'Monorepo', accent: true },
              { label: 'KPI 2', value: 'Components' },
              { label: 'KPI 3', value: 'Observability' },
              { label: 'KPI 4', value: 'Leadership' },
            ].map(item => (
              <div key={item.label}>
                <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider font-medium">{item.label}</p>
                <p className={`text-xl md:text-2xl font-extrabold mt-0.5 md:mt-1 tracking-tight ${item.accent ? 'text-primary-light' : 'text-white'}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex bg-bg-secondary w-fit rounded-lg p-1.5 mb-6 border border-border-secondary shadow-sm">
        <button
          onClick={() => setViewMode('kpi')}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${viewMode === 'kpi' ? 'bg-primary text-white shadow' : 'text-gray-text hover:text-text-primary'}`}
        >
          KPI View
        </button>
        <button
          onClick={() => setViewMode('weekly-plan')}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${viewMode === 'weekly-plan' ? 'bg-primary text-white shadow' : 'text-gray-text hover:text-text-primary'}`}
        >
          Weekly Planning
        </button>
        <button
          onClick={() => setViewMode('weekly-progress')}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${viewMode === 'weekly-progress' ? 'bg-primary text-white shadow' : 'text-gray-text hover:text-text-primary'}`}
        >
          Weekly Progress
        </button>
      </div>

      {viewMode === 'weekly-plan' ? (
        <WeeklyOverview mode="plan" />
      ) : viewMode === 'weekly-progress' ? (
        <WeeklyOverview mode="progress" />
      ) : (
        <>
          {/* Mobile Tab menu */}
          <div className="md:hidden relative mb-6">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between p-3.5 bg-bg-primary border border-border-secondary rounded-xl shadow-card"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                <span className="font-semibold text-text-primary text-sm">{currentTabLabel}</span>
              </div>
              <span className="text-gray-header text-xs">{mobileMenuOpen ? '▲' : '▼'}</span>
            </button>
            
            {mobileMenuOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-bg-primary border border-border-secondary rounded-xl shadow-card p-2 flex flex-col gap-1 z-30">
                {navItems.find(n => n.id === 'kpi-tracker')?.children.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => { onTabChange?.(tab.id as ActiveSection); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm transition-all text-left ${activeSection === tab.id ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-text hover:bg-bg-secondary font-medium'}`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tab sub-nav (Desktop) */}
          <div className="hidden md:flex gap-1 bg-bg-primary border border-border-secondary rounded-xl p-1 mb-6 shadow-card overflow-x-auto">
            {[
              { id: 'kpi-overview', label: '🎯 Overview' },
              { id: 'kpi-1-standardization', label: '📦 Monorepo Setup' },
              { id: 'kpi-2-ui-platform', label: '🎨 Component Library' },
              { id: 'kpi-3-reliability', label: '🚀 Observability' },
              { id: 'kpi-4-leadership', label: '👥 Leadership' },
            ].map(tab => (
              <div
                key={tab.id}
                onClick={() => onTabChange?.(tab.id as ActiveSection)}
                className={`whitespace-nowrap flex-1 text-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                  activeSection === tab.id
                    ? 'bg-primary text-white shadow-button'
                    : 'text-gray-text hover:bg-bg-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="animate-fadeIn">
            {activeSection === 'kpi-overview' ? <KpiOverview /> : <KpiDetail kpiId={activeSection} />}
          </div>
        </>
      )}
    </div>
  )
}

function KpiOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
      {k.kpiOverview.document.map((doc, idx) => (
        <div key={idx} className="bg-bg-primary border border-border-secondary rounded-2xl p-6 shadow-card flex flex-col">
          <h3 className="text-lg font-bold text-text-primary mb-5 border-b border-border-secondary pb-3">{doc.title}</h3>
          
          <div className="mb-6 flex-1">
            <h4 className="text-xs font-extrabold text-primary uppercase tracking-widest mb-3">🎯 Outcome</h4>
            <ul className="space-y-2.5">
              {doc.outcome.map((item, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-start gap-2 leading-relaxed font-medium">
                  <span className="text-emerald-500 mt-[-1px]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-bg-secondary/40 rounded-xl p-5 border border-border-secondary/50">
            <h4 className="text-xs font-extrabold text-gray-header uppercase tracking-widest mb-3">⚡ Execution Pointers</h4>
            <ul className="space-y-2">
              {doc.pointers.map((item, i) => (
                <li key={i} className="text-sm text-gray-text flex items-start gap-2 leading-relaxed">
                  <span className="text-primary/70 mt-0.5 text-lg leading-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

function KpiDetail({ kpiId }: { kpiId: string }) {
  const data = k.kpis.find(x => x.id === kpiId)
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-bg-primary border border-border-secondary rounded-2xl p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
          <h2 className="text-xl font-bold text-text-primary leading-snug">{data.title}</h2>
          {data.chatgptLink && (
            <a 
              href={data.chatgptLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#10a37f]/10 hover:bg-[#10a37f]/20 border border-[#10a37f]/20 text-text-primary text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
              title="View Brainstorming Context"
            >
              <span className="text-[#10a37f] text-sm leading-none">🤖</span> ChatGPT Brainstorm
            </a>
          )}
        </div>
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-4">
          <p className="text-sm text-primary-dark tracking-wide font-medium">
            <span className="font-bold">🎯 Goal:</span> {data.goal}
          </p>
        </div>
        <p className="text-sm text-gray-text leading-relaxed">
          <span className="font-semibold text-gray-header">📌 Description:</span> {data.description}
        </p>
        {data.reviewCadence && (
          <div className="mt-4 flex items-center">
            <p className="text-sm text-primary-dark leading-relaxed bg-primary/10 inline-block px-3 py-1.5 rounded-lg border border-primary/20 font-medium tracking-wide">
              <span className="font-bold text-primary mr-1">🔄 Review Cadence:</span> {data.reviewCadence}
            </p>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.metrics.map(m => (
          <div key={m.name} className="bg-bg-primary border border-border-secondary rounded-xl p-5 shadow-card-sm hover:shadow-card transition-shadow">
            <p className="text-xs text-gray-header uppercase tracking-wider font-medium mb-2 h-8 line-clamp-2">{m.name}</p>
            <p className="text-2xl font-extrabold text-text-primary tracking-tight mb-1">{m.current}</p>
            <p className="text-xs text-gray-text bg-bg-secondary inline-block px-2 py-0.5 rounded-md font-medium">Target: {m.target}</p>
          </div>
        ))}
      </div>

      {/* Impact Section */}
      {data.impact && (
        <div className="bg-bg-primary border border-border-secondary rounded-2xl p-6 shadow-card space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-text-primary tracking-tight">🌟 Expected Impact</h3>
            <span className="bg-primary/10 text-primary-dark text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
              Value Proposition
            </span>
          </div>
          <p className="text-sm font-bold text-gray-header italic border-l-2 border-primary/50 pl-3 py-1 mb-5">{data.impact.oneLine}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data.impact.sections.map((section: any, i: number) => (
              <div key={i} className="bg-bg-secondary/30 border border-border-secondary/50 rounded-xl p-4 hover:shadow-card-sm transition-shadow">
                <h4 className="text-sm font-bold text-text-primary mb-3 tracking-tight">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item: string, j: number) => (
                    <li key={j} className="text-xs text-text-secondary flex items-start gap-2 leading-relaxed font-medium">
                      <span className="text-emerald-500 mt-[1px]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Level Lead Notes / Reflections */}
      {data.leadNotes && data.leadNotes.length > 0 && (
        <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-amber-900 tracking-tight mb-3">📝 Overall Lead Reflections</h3>
          <ul className="space-y-2">
            {data.leadNotes.map((note: string, i: number) => (
              <li key={i} className="text-sm text-amber-800 flex items-start gap-2 leading-relaxed font-medium">
                <span className="text-amber-500 mt-1 text-xs">◆</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Execution Phases (If provided) */}
      {data.executionPhases && (
        <div className="bg-bg-primary border border-border-secondary rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-bold text-text-primary tracking-tight mb-4">⏱️ Execution Plan (Phases)</h3>
          <div className="flex flex-col gap-3">
            {data.executionPhases.map((phase: any, i: number) => (
              <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${
                phase.status === 'current' ? 'bg-primary/5 border-primary/30 shadow-sm' : 'bg-bg-secondary border-border-secondary/50'
              }`}>
                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  phase.status === 'current' ? 'bg-primary text-white shadow-[0_0_8px_rgba(var(--color-primary),0.4)]' : 'bg-gray-300 text-gray-500'
                }`}>
                  {phase.status === 'current' ? <span className="text-[10px] font-bold">⚡</span> : <span className="text-[10px]">○</span>}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${phase.status === 'current' ? 'text-primary-dark' : 'text-text-primary'}`}>
                    {phase.phase}
                  </h4>
                  <p className="text-xs text-gray-text mt-1">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Roadmap & Tracking */}
      <div className="bg-bg-primary border border-border-secondary rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-bold text-text-primary tracking-tight mb-6">📅 {data.weeklyProgress.length}-Week Lead Roadmap & Progress</h3>
        
        <div className="space-y-4">
          {data.weeklyProgress.map((wp: any, i: number) => (
            <div key={i} className={`rounded-xl border ${wp.status === 'completed' ? 'border-primary/20 bg-primary/5' : wp.status === 'in-progress' ? 'border-amber-200 bg-amber-50/30' : 'border-border-secondary/40 bg-bg-secondary/20'} overflow-hidden`}>
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-secondary/30 gap-2">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${wp.status === 'completed' ? 'bg-primary text-white' : wp.status === 'in-progress' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-bg-secondary text-gray-text border border-border-secondary'}`}>{wp.week}</span>
                  <p className="text-sm font-bold text-text-primary">{wp.focus || 'Weekly Focus'}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${wp.status === 'completed' ? 'text-primary-dark' : wp.status === 'in-progress' ? 'text-amber-600' : 'text-gray-header'}`}>{wp.status}</span>
              </div>
              <WeeklyProgressContent wp={wp} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WeeklyOverview({ mode }: { mode: 'plan' | 'progress' }) {
  const allWeeks = useMemo(() => {
    const maxWeeks = Math.max(...k.kpis.map(kpi => kpi.weeklyProgress.length));
    const weeksMap = [];

    for (let i = 0; i < maxWeeks; i++) {
        const kpiTasks = k.kpis.map((kpi) => {
            const wp = kpi.weeklyProgress[i];
            if (!wp) return null;
            return {
                kpiTitle: kpi.title,
                focus: wp.focus,
                status: wp.status,
                leadTasks: wp.leadTasks || [],
                achievements: wp.achievements || [],
                leadNotes: wp.leadNotes || [],
                targetOutcomes: (wp as any).targetOutcomes || null,
                additionalOutcomes: (wp as any).additionalOutcomes || [],
                actionItems: (wp as any).actionItems || [],
            };
        }).filter(Boolean);

        if (kpiTasks.length > 0) {
          weeksMap.push({
              weekNumber: i + 1,
              kpiTasks: kpiTasks as any
          });
        }
    }
    return weeksMap;
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {allWeeks.map((week) => (
         <div key={week.weekNumber} className="bg-bg-primary border border-border-secondary rounded-2xl p-6 shadow-card">
            <h3 className="text-xl font-bold text-text-primary tracking-tight mb-6 mt-2 border-b border-border-secondary/40 pb-4">
              📅 Week {week.weekNumber} Snapshot ({mode === 'plan' ? 'Planning' : 'Progress'})
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
               {week.kpiTasks.map((t: any, i: number) => (
                  <div key={i} className="bg-bg-secondary/30 border border-border-secondary rounded-xl shadow-sm hover:shadow-card transition-shadow flex flex-col overflow-hidden">
                     <div className="p-5 pb-0">
                       <h4 className="text-sm font-extrabold text-primary line-clamp-2 md:line-clamp-1">{t.kpiTitle}</h4>
                       <div className="flex items-center gap-2 mt-3 flex-wrap">
                         {mode === 'progress' && <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${t.status === 'completed' ? 'bg-primary text-white' : t.status === 'in-progress' ? 'bg-amber-100 text-amber-800' : 'bg-bg-secondary border border-border-secondary text-gray-text'}`}>{t.status}</span>}
                         <span className="text-xs font-semibold text-text-primary">{t.focus}</span>
                       </div>
                     </div>
                     <WeeklyProgressContent wp={t} mode={mode} />
                   </div>
                ))}
             </div>
         </div>
      ))}
    </div>
  )
}

function TargetOutcomeItem({ item, displayMode = 'both' }: { item: any; displayMode?: 'plan' | 'progress' | 'both' }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasContent = item.notes || item.reason || item.link;

  const isPlanOnly = displayMode === 'plan';

  const statusConfig = {
    'completed': { icon: '✅', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    'incomplete': { icon: '⚠️', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    'blocked': { icon: '🚫', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
    'in-progress': { icon: '⏳', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
  } as any;

  const conf = isPlanOnly 
    ? { icon: '🎯', color: 'text-primary-dark', bg: 'bg-primary/5', border: 'border-primary/20' }
    : (statusConfig[item.status] || { icon: '○', color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200' });


  return (
    <div className={`border ${conf.border} rounded-xl overflow-hidden transition-all duration-200 ${hasContent && isOpen ? 'shadow-sm' : ''}`}>
      <div 
        className={`p-3 ${conf.bg} flex items-center justify-between ${hasContent ? 'cursor-pointer hover:opacity-90' : ''}`}
        onClick={() => hasContent && setIsOpen(!isOpen)}
        title={item.status !== 'completed' ? item.reason : ''}
      >
        <div className="flex items-center gap-3">
          <span className={`text-sm ${conf.color}`}>{conf.icon}</span>
          <span className="text-sm font-semibold text-text-primary">{item.title}</span>
        </div>
        {hasContent && (
          <span className={`text-xs font-bold transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${conf.color}`}>
            ▼
          </span>
        )}
      </div>
      
      {hasContent && isOpen && (
        <div className="p-4 bg-bg-primary border-t border-border-secondary/40 text-sm text-text-secondary space-y-3">
           {item.reason && (
             <div><span className="font-bold text-gray-header uppercase tracking-wider text-[10px] block mb-1">Reason</span> {item.reason}</div>
           )}
           {item.notes && (
             <div><span className="font-bold text-gray-header uppercase tracking-wider text-[10px] block mb-1">Notes</span> {item.notes}</div>
           )}
           {item.links && item.links.length > 0 ? (
             <div className="flex flex-wrap gap-2">
               {item.links.map((lnk: string, idx: number) => (
                 <a key={idx} href={lnk} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-secondary hover:bg-border-secondary border border-border-secondary text-text-primary text-xs font-bold rounded-lg transition-colors">
                   🔗 View External Resource {item.links.length > 1 ? idx + 1 : ''}
                 </a>
               ))}
             </div>
           ) : item.link && (
             <div>
               <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-secondary hover:bg-border-secondary border border-border-secondary text-text-primary text-xs font-bold rounded-lg transition-colors">
                 🔗 View External Resource
               </a>
             </div>
           )}
        </div>
      )}
    </div>
  )
}

function WeeklyProgressContent({ wp, mode = 'both' }: { wp: any; mode?: 'plan' | 'progress' | 'both' }) {
  const isNewFormat = !!wp.targetOutcomes;
  const showPlan = mode === 'plan' || mode === 'both';
  const showProgress = mode === 'progress' || mode === 'both';

  return (
    <div className="flex flex-col h-full bg-bg-primary border-t border-border-secondary/40">
      <div className={`p-5 flex-1 ${isNewFormat ? 'flex flex-col gap-6' : 'grid md:grid-cols-2 gap-6'} ${(!showPlan || !showProgress) ? '!grid-cols-1' : ''}`}>
        {isNewFormat ? (
          <>
            {(showPlan || showProgress) && (
              <div>
                <h4 className="text-xs font-extrabold text-gray-header uppercase tracking-wider mb-3">
                  {mode === 'plan' ? '🎯 Target Outcomes (Planned)' : '🎯 Target Outcomes (Progress)'}
                </h4>
                <div className="flex flex-col gap-2">
                  {wp.targetOutcomes.map((outcome: any, idx: number) => (
                    <TargetOutcomeItem key={idx} item={outcome} displayMode={mode} />
                  ))}
                </div>
              </div>
            )}
            
            {showProgress && (wp.additionalOutcomes?.length > 0 || wp.actionItems?.length > 0) && (
              <div className="grid md:grid-cols-2 gap-6 border-t border-border-secondary/40 pt-5">
                {wp.additionalOutcomes?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-header uppercase tracking-wider mb-3">✨ Additional Outcomes Achieved</h4>
                    <ul className="space-y-2">
                      {wp.additionalOutcomes.map((ach: string, j: number) => (
                        <li key={j} className="text-sm text-emerald-700/90 flex items-start gap-2 leading-relaxed font-medium">
                          <span className="text-emerald-500 mt-0.5">✓</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {wp.actionItems?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-header uppercase tracking-wider mb-3">⏭️ Next Week Actionables</h4>
                    <ul className="space-y-2.5">
                      {wp.actionItems.map((act: any, j: number) => {
                        const title = typeof act === 'string' ? act : act.title;
                        const owner = typeof act === 'string' ? null : act.owner;
                        const dueDate = typeof act === 'string' ? null : act.dueDate;
                        return (
                          <li key={j} className="text-sm text-blue-700/90 flex items-start gap-2 leading-relaxed font-medium bg-blue-50/50 p-2.5 rounded-lg border border-blue-100/50">
                            <span className="text-blue-500 mt-0.5">→</span>
                            <div className="flex-1">
                              <span>{title}</span>
                              {(owner || dueDate) && (
                                <div className="mt-2 flex flex-col gap-1.5">
                                  {owner && (
                                    <span className="w-fit bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-200">
                                      👤 {owner}
                                    </span>
                                  )}
                                  {dueDate && (
                                    <span className="w-fit bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-200">
                                      📅 Due: {dueDate}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {showPlan && (
              <div>
                <h4 className="text-xs font-extrabold text-gray-header uppercase tracking-wider mb-3">👨‍💻 Lead Responsibilities (Planned)</h4>
                <ul className="space-y-2">
                  {wp.leadTasks?.map((t: string, j: number) => (
                    <li key={j} className="text-sm text-text-secondary flex items-start gap-2 leading-relaxed font-medium">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showProgress && wp.achievements && wp.achievements.length > 0 && (
              <div className={showPlan ? "md:border-l md:border-border-secondary/40 md:pl-6" : ""}>
                <h4 className="text-xs font-extrabold text-gray-header uppercase tracking-wider mb-3">✅ Key Outcomes Progress</h4>
                <ul className="space-y-2">
                  {wp.achievements.map((a: string, j: number) => (
                    <li key={j} className="text-sm text-emerald-700/90 flex items-start gap-2 leading-relaxed font-medium">
                      <span className="text-emerald-500 mt-[1px]">✓</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Lead Notes */}
      {showProgress && wp.leadNotes && wp.leadNotes.length > 0 && (
        <div className="bg-amber-50/50 border-t border-amber-100/60 p-4 mt-auto">
          <h4 className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider mb-2">📝 Lead Reflections</h4>
          <ul className="space-y-1.5 focus:outline-none">
            {wp.leadNotes.map((note: string, j: number) => (
              <li key={j} className="text-xs text-amber-900/80 flex items-start gap-1.5 leading-relaxed font-medium">
                <span className="text-amber-500 mt-[3px] text-[8px]">▶</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
