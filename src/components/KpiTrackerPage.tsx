import type { ActiveSection } from '../App'
import { kpiData as k } from '../data/visionData'

interface Props { activeSection: ActiveSection }

export default function KpiTrackerPage({ activeSection }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      {/* Dark header banner */}
      <div className="relative bg-dark-gradient rounded-2xl p-8 mb-6 overflow-hidden shadow-card">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white tracking-tight">📊 KPI Tracker</h2>
          <p className="text-sm text-white/60 mt-1">Frontend Engineering — Spring Money OS</p>
          <div className="flex gap-8 mt-6 flex-wrap">
            {[
              { label: 'ARR', value: k.summary.arr, accent: true },
              { label: 'Target WMs', value: k.summary.targets },
              { label: 'Active Tenants', value: k.summary.tenants },
              { label: 'Eng Team', value: k.summary.teamSize },
            ].map(item => (
              <div key={item.label}>
                <p className="text-xs text-white/50 uppercase tracking-wider font-medium">{item.label}</p>
                <p className={`text-2xl font-extrabold mt-1 tracking-tight ${item.accent ? 'text-primary-light' : 'text-white'}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab sub-nav */}
      <div className="flex gap-1 bg-bg-primary border border-border-secondary rounded-xl p-1 mb-6 shadow-card overflow-x-auto">
        {[
          { id: 'kpi-overview', label: '🎯 Overview' },
          { id: 'kpi-1-standardization', label: '📦 Standardization' },
          { id: 'kpi-2-ui-platform', label: '🎨 UI Platform' },
          { id: 'kpi-3-reliability', label: '🚀 Reliability' },
          { id: 'kpi-4-leadership', label: '👥 Leadership' },
        ].map(tab => (
          <div
            key={tab.id}
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
    </div>
  )
}

function KpiOverview() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {k.kpiOverview.status.map(item => (
          <div key={item.kpi} className="bg-bg-primary border border-border-secondary rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 border-t-4 border-t-transparent data-[status=green]:border-t-emerald-500 data-[status=yellow]:border-t-amber-500 data-[status=red]:border-t-rose-500" data-status={item.status}>
            <p className="text-xs text-gray-header uppercase tracking-wide font-medium mb-3 h-8 line-clamp-2">{item.kpi}</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-extrabold text-text-primary tracking-tighter mb-1">{item.current}</p>
                <p className="text-xs text-gray-text font-medium">Target: {item.target}</p>
              </div>
              <div className={`w-3 h-3 rounded-full mb-1 border-2 border-white dark:border-gray-800 ${
                item.status === 'green' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                item.status === 'yellow' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 
                'bg-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.5)]'
              }`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-bg-primary border border-border-secondary rounded-2xl p-6 shadow-card mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-text-primary mb-1">Switch Readiness Status</h3>
          <p className="text-sm text-gray-text">{k.kpiOverview.switchReadiness.reason}</p>
        </div>
        <div className={`px-4 py-2 rounded-xl text-sm font-bold tracking-wide flex-shrink-0 ${
          k.kpiOverview.switchReadiness.status.includes('Ready') 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : k.kpiOverview.switchReadiness.status.includes('Progress')
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          {k.kpiOverview.switchReadiness.status}
        </div>
      </div>
    </>
  )
}

function KpiDetail({ kpiId }: { kpiId: string }) {
  const data = k.kpis.find(x => x.id === kpiId)
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-bg-primary border border-border-secondary rounded-2xl p-6 shadow-card">
        <h2 className="text-xl font-bold text-text-primary mb-3 leading-snug">{data.title}</h2>
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-4">
          <p className="text-sm text-primary-dark tracking-wide font-medium">
            <span className="font-bold">🎯 Goal:</span> {data.goal}
          </p>
        </div>
        <p className="text-sm text-gray-text leading-relaxed">
          <span className="font-semibold text-gray-header">📌 Description:</span> {data.description}
        </p>
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

      {/* 12-Week Roadmap & Tracking */}
      <div className="bg-bg-primary border border-border-secondary rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-bold text-text-primary tracking-tight mb-6">📅 12-Week Lead Roadmap & Progress</h3>
        
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
              <div className="p-5 grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-extrabold text-gray-header uppercase tracking-wider mb-3">👨‍💻 Lead Responsibilities</h4>
                  <ul className="space-y-2">
                    {wp.leadTasks?.map((t: string, j: number) => (
                      <li key={j} className="text-sm text-text-secondary flex items-start gap-2 leading-relaxed font-medium">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {wp.achievements && wp.achievements.length > 0 && (
                  <div className="md:border-l md:border-border-secondary/40 md:pl-6">
                    <h4 className="text-xs font-extrabold text-gray-header uppercase tracking-wider mb-3">✅ Key Outcomes</h4>
                    <ul className="space-y-2">
                      {wp.achievements.map((a: string, j: number) => (
                        <li key={j} className="text-sm text-emerald-700/90 flex items-start gap-2 leading-relaxed font-medium">
                          <span className="text-emerald-500 mt-0.5">✓</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
