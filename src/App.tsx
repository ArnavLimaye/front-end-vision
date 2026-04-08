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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isKpi = activeSection.startsWith('kpi-')

  return (
    <div className="flex h-screen overflow-hidden bg-bg-secondary flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-bg-primary border-b border-border-secondary shadow-sm z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-gradient flex items-center justify-center text-sm shadow-button">🌱</div>
          <span className="font-bold text-text-primary text-lg tracking-tight">Spring Money</span>
        </div>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 -mr-2 text-gray-text hover:text-text-primary">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full">
        <Sidebar activeSection={activeSection} onSelect={setActiveSection} />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-[260px] max-w-full h-full bg-bg-primary shadow-2xl flex flex-col">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 p-2 z-50 text-gray-text hover:text-text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <Sidebar activeSection={activeSection} onSelect={(s) => { setActiveSection(s); setMobileMenuOpen(false) }} />
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto content-scroll overflow-x-hidden w-full">
        {isKpi
          ? <KpiTrackerPage activeSection={activeSection} onTabChange={setActiveSection} />
          : <FrontendVisionPage activeSection={activeSection} onTabChange={setActiveSection} />
        }
      </main>
    </div>
  )
}
