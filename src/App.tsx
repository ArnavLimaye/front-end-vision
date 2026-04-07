import { useState } from 'react'
import Sidebar from './components/Sidebar.tsx'
import FrontendVisionPage from './components/FrontendVisionPage.tsx'
import KpiTrackerPage from './components/KpiTrackerPage.tsx'

export type ActiveSection =
  | 'overview' | 'environments' | 'multi-tenant' | 'app-architecture'
  | 'deployment' | 'security' | 'infrastructure' | 'monorepo'
  | 'kpi-overview' | 'kpi-1-standardization' | 'kpi-2-ui-platform' | 'kpi-3-reliability' | 'kpi-4-leadership'

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview')

  const isKpi = activeSection.startsWith('kpi-')

  return (
    <div className="flex h-screen overflow-hidden bg-bg-secondary">
      <Sidebar activeSection={activeSection} onSelect={setActiveSection} />
      <main className="flex-1 overflow-y-auto content-scroll">
        {isKpi
          ? <KpiTrackerPage activeSection={activeSection} />
          : <FrontendVisionPage activeSection={activeSection} onTabChange={setActiveSection} />
        }
      </main>
    </div>
  )
}
