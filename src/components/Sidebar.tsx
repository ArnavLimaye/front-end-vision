import { useState } from 'react'
import type { ActiveSection } from '../App'
import { navItems } from '../data/visionData'

interface SidebarProps {
  activeSection: ActiveSection
  onSelect: (s: ActiveSection) => void
}

export default function Sidebar({ activeSection, onSelect }: SidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'frontend-vision': true,
    'kpi-tracker': activeSection.startsWith('kpi-'),
  })

  const toggle = (id: string) =>
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <aside className="w-[260px] min-w-[260px] bg-bg-primary border-r border-border-secondary flex flex-col overflow-hidden shadow-card z-10">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border-secondary flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-gradient flex items-center justify-center text-lg shadow-button flex-shrink-0">
            🌱
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-bold text-text-primary tracking-tight">Spring Money</h1>
            <span className="text-xs text-gray-header font-normal">Frontend Vision OS</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll py-3">
        {navItems.map(section => (
          <div key={section.id} className="mb-1">
            {/* Section header */}
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-bg-secondary transition-colors duration-150 cursor-pointer"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </span>
              <span
                className={`text-gray-header text-xs transition-transform duration-200 ${
                  expanded[section.id] ? 'rotate-90' : ''
                }`}
              >
                ▶
              </span>
            </button>

            {/* Children */}
            {expanded[section.id] && (
              <div className="animate-fadeIn">
                {section.children.map(child => {
                  const isActive = activeSection === child.id
                  return (
                    <button
                      key={child.id}
                      onClick={() => onSelect(child.id as ActiveSection)}
                      className={`w-full flex items-center gap-2 pl-10 pr-4 py-[7px] text-sm transition-all duration-150 border-l-2 text-left ${
                        isActive
                          ? 'text-primary font-semibold bg-primary/5 border-l-primary'
                          : 'text-gray-text border-l-transparent hover:bg-bg-secondary hover:text-text-primary'
                      }`}
                    >
                      <span className="text-sm">{child.icon}</span>
                      <span>{child.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border-secondary">
        <p className="text-xs text-gray-header text-center">Tech Vision · April 2026</p>
      </div>
    </aside>
  )
}
