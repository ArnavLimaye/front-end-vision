import type { ActiveSection } from '../App'
import { kpiData as k } from '../data/visionData'

interface Props { activeSection: ActiveSection }

export default function KpiTrackerPage({ activeSection }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      {/* Dark header banner */}
      <div className="relative bg-dark-gradient rounded-2xl p-8 mb-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white tracking-tight">📊 KPI Tracker</h2>
          <p className="text-sm text-white/60 mt-1">Frontend Engineering — Spring Money OS · April 2026</p>
          <div className="flex gap-8 mt-6 flex-wrap">
            {[
              { label: 'ARR', value: k.summary.arr, accent: true },
              { label: 'Target WMs', value: k.summary.targets },
              { label: 'Active Tenants', value: k.summary.tenants },
              { label: 'Eng Team', value: k.summary.teamSize },
            ].map(item => (
              <div key={item.label}>
                <p className="text-xs text-white/50 uppercase tracking-wider">{item.label}</p>
                <p className={`text-2xl font-extrabold mt-1 tracking-tight ${item.accent ? 'text-primary-light' : 'text-white'}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab sub-nav */}
      <div className="flex gap-1 bg-bg-primary border border-border-secondary rounded-xl p-1 mb-6 shadow-card">
        {[
          { id: 'kpi-overview', label: '🎯 Overview' },
          { id: 'kpi-progress', label: '📈 Progress' },
          { id: 'kpi-milestones', label: '🏁 Milestones' },
          { id: 'kpi-risks', label: '⚠️ Risks' },
        ].map(tab => (
          <div
            key={tab.id}
            className={`flex-1 text-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
              activeSection === tab.id
                ? 'bg-primary text-white shadow-button'
                : 'text-gray-text hover:bg-bg-secondary'
            }`}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="animate-fadeIn">
        {activeSection === 'kpi-overview' && <KpiOverview />}
        {activeSection === 'kpi-progress' && <KpiProgress />}
        {activeSection === 'kpi-milestones' && <KpiMilestones />}
        {activeSection === 'kpi-risks' && <KpiRisks />}
      </div>
    </div>
  )
}

/* ─────────────────── KPI OVERVIEW ─────────────────── */
function KpiOverview() {
  const tileColorMap: Record<string, string> = {
    green: 'border-t-emerald-500',
    blue: 'border-t-blue-500',
    amber: 'border-t-amber-500',
    purple: 'border-t-purple-500',
    cyan: 'border-t-cyan-500',
    indigo: 'border-t-indigo-500',
    orange: 'border-t-orange-500',
    rose: 'border-t-rose-500',
  }
  return (
    <>
      <div className="grid grid-cols-4 gap-3 mb-5">
        {k.tiles.map(tile => (
          <div
            key={tile.label}
            className={`bg-bg-primary border border-border-secondary rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 border-t-4 ${tileColorMap[tile.color]}`}
          >
            <p className="text-xs text-gray-header uppercase tracking-wide font-medium mb-2">{tile.label}</p>
            <p className="text-3xl font-extrabold text-text-primary tracking-tighter leading-none mb-1.5">{tile.value}</p>
            <p className="text-xs text-gray-text mb-2">{tile.sub}</p>
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
              tile.trendDir === 'up' ? 'bg-emerald-50 text-emerald-700' :
              tile.trendDir === 'down' ? 'bg-red-50 text-red-700' :
              'bg-amber-50 text-amber-700'
            }`}>
              {tile.trendDir === 'up' ? '↑' : tile.trendDir === 'down' ? '↓' : '→'} {tile.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Team velocity chart */}
      <div className="bg-bg-primary border border-border-secondary rounded-2xl p-6 shadow-card mb-4">
        <h3 className="text-base font-bold text-text-primary mb-1">Sprint Velocity</h3>
        <p className="text-xs text-gray-header mb-5">Story points completed per sprint</p>
        <div className="space-y-3">
          {k.teamVelocity.map(s => {
            const pct = Math.round((s.points / 80) * 100)
            const isCurrent = s.sprint.includes('curr')
            return (
              <div key={s.sprint} className="flex items-center gap-3">
                <span className="text-xs text-gray-text w-24 flex-shrink-0">{s.sprint}</span>
                <div className="flex-1 h-6 bg-bg-secondary rounded-lg overflow-hidden">
                  <div
                    className={`h-full rounded-lg flex items-center justify-end pr-2.5 ${isCurrent ? 'bg-primary-gradient opacity-80' : 'bg-primary-gradient'}`}
                    style={{ width: `${pct}%` }}
                  >
                    <span className="text-xs font-semibold text-white">{s.points}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

/* ─────────────────── KPI PROGRESS ─────────────────── */
function KpiProgress() {
  const badgeStyle = (b: string) =>
    b === 'on-track' ? 'bg-emerald-50 text-emerald-700' :
    b === 'at-risk' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-500'

  const badgeLabel = (b: string) =>
    b === 'on-track' ? '✅ On Track' : b === 'at-risk' ? '⚠️ At Risk' : '⏳ Pending'

  return (
    <div className="grid grid-cols-2 gap-4">
      {k.progress.map(prog => (
        <div key={prog.title} className="bg-bg-primary border border-border-secondary rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm font-bold text-text-primary leading-snug pr-2">{prog.title}</h3>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${badgeStyle(prog.badge)}`}>
              {badgeLabel(prog.badge)}
            </span>
          </div>
          <div className="space-y-3">
            {prog.items.map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-text">{item.label}</span>
                  <span className="font-semibold text-text-primary">{item.pct}%</span>
                </div>
                <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────── KPI MILESTONES ─────────────────── */
function KpiMilestones() {
  const statusStyle: Record<string, string> = {
    done: 'bg-emerald-50 text-emerald-700',
    progress: 'bg-blue-50 text-blue-700',
    pending: 'bg-gray-100 text-gray-500',
    'at-risk': 'bg-amber-50 text-amber-700',
    blocked: 'bg-red-50 text-red-600',
  }
  const statusLabel: Record<string, string> = {
    done: '✅ Done',
    progress: '🔵 In Progress',
    pending: '○ Pending',
    'at-risk': '⚠️ At Risk',
    blocked: '🚫 Blocked',
  }

  return (
    <div className="bg-bg-primary border border-border-secondary rounded-2xl shadow-card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-bg-secondary border-b border-border-secondary text-gray-header text-xs uppercase tracking-wide">
            <th className="px-5 py-3 text-left font-semibold">Milestone</th>
            <th className="px-5 py-3 text-left font-semibold">Owner</th>
            <th className="px-5 py-3 text-left font-semibold">Due</th>
            <th className="px-5 py-3 text-left font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {k.milestones.map((m, i) => (
            <tr key={i} className={`border-b border-border-secondary/50 hover:bg-bg-secondary transition-colors ${m.status === 'done' ? 'opacity-70' : ''}`}>
              <td className="px-5 py-3.5 font-medium text-text-primary">{m.milestone}</td>
              <td className="px-5 py-3.5 text-gray-text">{m.owner}</td>
              <td className="px-5 py-3.5 text-gray-text font-mono text-xs">{m.due}</td>
              <td className="px-5 py-3.5">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusStyle[m.status]}`}>
                  {statusLabel[m.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─────────────────── KPI RISKS ─────────────────── */
function KpiRisks() {
  const sevStyle: Record<string, string> = {
    high: 'bg-red-50 text-red-700',
    medium: 'bg-amber-50 text-amber-700',
    low: 'bg-emerald-50 text-emerald-700',
  }

  return (
    <>
      <div className="bg-bg-primary border border-border-secondary rounded-2xl p-6 mb-4 shadow-card">
        <h3 className="text-base font-bold text-text-primary mb-1">Risk Register</h3>
        <p className="text-xs text-gray-header mb-5">Active risks across the frontend engineering workstream</p>
        <div className="space-y-3">
          {k.risks.map((risk, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3.5 border border-border-secondary rounded-xl bg-bg-primary hover:border-primary hover:bg-primary/5 transition-all duration-200">
              <span className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-md flex-shrink-0 w-16 text-center ${sevStyle[risk.severity]}`}>
                {risk.severity}
              </span>
              <p className="flex-1 text-sm font-medium text-text-primary">{risk.title}</p>
              <span className="text-xs text-gray-header flex-shrink-0 bg-bg-secondary px-2.5 py-1 rounded-lg">{risk.owner}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { severity: 'High', count: k.risks.filter(r => r.severity === 'high').length, color: 'bg-red-50 border-red-200', text: 'text-red-700' },
          { severity: 'Medium', count: k.risks.filter(r => r.severity === 'medium').length, color: 'bg-amber-50 border-amber-200', text: 'text-amber-700' },
          { severity: 'Low', count: k.risks.filter(r => r.severity === 'low').length, color: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700' },
        ].map(s => (
          <div key={s.severity} className={`${s.color} border rounded-2xl p-5 text-center`}>
            <p className={`text-4xl font-extrabold ${s.text}`}>{s.count}</p>
            <p className={`text-sm font-semibold mt-1 ${s.text}`}>{s.severity} Risk{s.count !== 1 ? 's' : ''}</p>
          </div>
        ))}
      </div>
    </>
  )
}
