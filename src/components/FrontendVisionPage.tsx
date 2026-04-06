import { useState } from 'react'
import type { ReactNode } from 'react'
import type { ActiveSection } from '../App'
import { frontendVisionData } from '../data/visionData'

const d = frontendVisionData

interface Props { activeSection: ActiveSection; onTabChange: (s: ActiveSection) => void }

export default function FrontendVisionPage({ activeSection, onTabChange }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      {/* Page header */}
      <div className="flex items-start gap-4 mb-7">
        <span className="text-4xl leading-none mt-1">🎨</span>
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight leading-tight">Frontend Vision</h2>
          <p className="text-sm text-gray-header mt-1">Multi-Tenant SaaS Frontend Architecture for Wealth Management Platform</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-bg-primary border border-border-secondary rounded-xl p-1 mb-6 flex-wrap shadow-card">
        {d.tabs.map(tab => {
          const isActive = activeSection === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as ActiveSection)}
              className={`flex items-center gap-1.5 px-3 py-[7px] rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                isActive
                  ? 'bg-primary text-white shadow-button'
                  : 'text-gray-text hover:bg-bg-secondary hover:text-text-primary'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="animate-fadeIn">
        {activeSection === 'overview' && <OverviewTab />}
        {activeSection === 'environments' && <EnvironmentsTab />}
        {activeSection === 'multi-tenant' && <MultiTenantTab />}
        {activeSection === 'app-architecture' && <AppArchTab />}
        {activeSection === 'deployment' && <DeploymentTab />}
        {activeSection === 'security' && <SecurityTab />}
        {activeSection === 'infrastructure' && <InfraTab />}
        {activeSection === 'monorepo' && <MonorepoTab />}
      </div>
    </div>
  )
}

/* ─────────────────── OVERVIEW ─────────────────── */
function OverviewTab() {
  return (
    <>
      <Card>
        <CardTitle>Architecture Objective</CardTitle>
        <p className="text-sm text-gray-text leading-relaxed mb-4">
          Spring Money's frontend layer serves two user personas (Advisors and Clients) across two surfaces
          (Web and Mobile), all from a single shared codebase per app — with zero code changes needed to onboard a new tenant.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {d.objectives.map(o => (
            <div
              key={o.title}
              className="bg-bg-secondary border border-border-secondary rounded-xl p-4 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-default"
            >
              <p className="text-sm font-semibold text-text-primary mb-1">{o.title}</p>
              <p className="text-xs text-gray-text leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>4 Frontend Apps</CardTitle>
        <CardSubtitle>Web + Mobile surfaces, single tenant-agnostic codebase per app</CardSubtitle>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {d.apps.map(app => (
            <div
              key={app.repo}
              className="border border-border-secondary rounded-xl p-5 bg-bg-primary hover:border-primary hover:shadow-card-hover transition-all duration-200"
            >
              <div className="text-3xl mb-2">{app.icon}</div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-bold text-text-primary">{app.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  app.status === 'Live' ? 'bg-success/10 text-success-light' : 'bg-amber-100 text-amber-700'
                }`}>{app.status}</span>
              </div>
              <p className="text-xs text-gray-header font-mono mb-2">{app.repo}</p>
              <p className="text-xs text-gray-text leading-relaxed mb-3">{app.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {app.stack.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded bg-primary/5 text-primary font-medium border border-primary/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>Shared Architecture Principles</CardTitle>
        <ol className="mt-3 space-y-2">
          {([
            ['Core Product First', 'Core features stay in main. Never develop on tenant branches.'],
            ['Customizations Isolated', 'Branding, section ordering, field visibility, feature toggling via config objects'],
            ['BFF Pattern', 'All external API calls go through Next.js API routes or /app/api/ SDK modules (mobile)'],
            ['Tier-Based Components', 'Tier 1 (base/dumb) → Tier 2 (functional) → Tier 3 (business logic)'],
            ['Feature Flag Gates', 'Every tenant-specific UI element is wrapped in <FeatureGate> — never raw conditionals'],
          ] as [string, string][]).map(([title, desc], i) => (
            <li key={i} className="flex gap-3 text-sm items-start">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
              <div>
                <span className="font-semibold text-text-primary">{title}</span>
                <span className="text-gray-text"> — {desc}</span>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </>
  )
}

/* ─────────────────── ENVIRONMENTS ─────────────────── */
function EnvironmentsTab() {
  return (
    <>
      <Card>
        <CardTitle>Environment Topology</CardTitle>
        <CardSubtitle>Three-tier deployment: Shared QA → Per-Tenant UAT → Per-Tenant PROD</CardSubtitle>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {d.environments.map(env => (
            <div key={env.name} className="border border-border-secondary rounded-xl overflow-hidden hover:shadow-card-hover transition-all duration-200">
              <div className={`px-4 py-3 text-sm font-semibold border-b border-border-secondary ${
                env.type === 'qa' ? 'bg-blue-50 text-blue-700' :
                env.type === 'uat' ? 'bg-amber-50 text-amber-700' :
                'bg-green-50 text-green-700'
              }`}>{env.name}</div>
              <div className="p-4 bg-bg-primary space-y-2">
                <InfoRow label="URL" value={env.url} mono />
                <InfoRow label="Trigger" value={env.trigger} />
                <InfoRow label="Data" value={env.data} />
                <p className="text-xs text-gray-text leading-relaxed pt-1">{env.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>URL Naming Convention</CardTitle>
        <table className="w-full text-sm mt-4">
          <thead>
            <tr className="bg-bg-secondary border-b border-border-secondary text-gray-header text-xs uppercase tracking-wide">
              <Th>App</Th><Th>QA</Th><Th>UAT</Th><Th>PROD</Th>
            </tr>
          </thead>
          <tbody>
            {([
              ['Advisor Web', 'qa-advisor.springmoney.in', 'nswealth-uat.nswealth.in', 'app.nswealth.in'],
              ['Client Web', 'qa-client.springmoney.in', 'client-uat.nswealth.in', 'client.nswealth.in'],
              ['Client Mobile', 'TestFlight / internal', 'UAT build on TestFlight', 'App Store (client)'],
              ['Advisor Mobile', 'TestFlight / internal', 'UAT build on TestFlight', 'App Store (client)'],
            ] as string[][]).map((row, i) => (
              <tr key={i} className="border-b border-border-secondary/50 hover:bg-bg-secondary transition-colors">
                <Td bold>{row[0]}</Td>
                {row.slice(1).map((v, j) => <Td key={j} mono>{v}</Td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <CardTitle>Environment Variables (Web)</CardTitle>
        <div className="code-block mt-3">{`# Shared QA — one deployment, tenant chosen at runtime
NEXT_PUBLIC_CLIENT_ID=qa
NEXT_PUBLIC_FRAPPE_BASE_URL=https://qa.frappe.springmoney.in

# Per-Tenant UAT
NEXT_PUBLIC_CLIENT_ID=nswealth-uat
NEXT_PUBLIC_FRAPPE_BASE_URL=https://nswealthuat.frappe.cloud

# Per-Tenant PROD
NEXT_PUBLIC_CLIENT_ID=nswealth-prod
NEXT_PUBLIC_FRAPPE_BASE_URL=https://nswealth.frappe.cloud`}
        </div>
      </Card>
    </>
  )
}

/* ─────────────────── MULTI-TENANT ─────────────────── */
function MultiTenantTab() {
  return (
    <>
      <Callout type="warning">
        <strong>Current problem:</strong> Each tenant has its own git branch (ria-nswealth, ria-prudeno, etc.).
        Bug fixes on one branch are missed in others. Impossible to scale beyond 5 tenants without exponential maintenance.
      </Callout>

      <Card>
        <CardTitle>Target State: Config-Driven Single Repo</CardTitle>
        <div className="code-block mt-3">{`main branch
  └── config/features/client-configs.ts
        ├── nswealth: { branding: {...}, features: {...}, sectionConfig: {...} }
        ├── prudeno:  { branding: {...}, features: {...}, sectionConfig: {...} }
        └── advent:   { branding: {...}, features: {...}, sectionConfig: {...} }

// One deployment per environment; NEXT_PUBLIC_CLIENT_ID selects config at build time.`}
        </div>
      </Card>

      <Card>
        <CardTitle>Three Levels of Tenant Customization</CardTitle>
        <div className="mt-4 space-y-3">
          {d.multiTenantLevels.map((level, i) => (
            <div key={i} className="border border-border-secondary rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-3 bg-bg-secondary border-b border-border-secondary">
                <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{level.title}</p>
                  <p className="text-xs text-gray-header">{level.desc}</p>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-gray-text leading-relaxed mb-3">{level.detail}</p>
                <div className="flex flex-wrap gap-2">
                  {level.items.map(item => (
                    <span key={item} className="text-xs px-2.5 py-1 rounded bg-primary/5 text-primary font-mono border border-primary/20">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>Mobile Multi-Tenancy</CardTitle>
        <table className="w-full text-sm mt-4">
          <thead>
            <tr className="bg-bg-secondary border-b border-border-secondary text-gray-header text-xs uppercase tracking-wide">
              <Th>Platform</Th><Th>Build System</Th><Th>Store</Th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border-secondary/50 hover:bg-bg-secondary">
              <Td bold>Android (AAB)</Td><Td>GitHub Actions on self-hosted EC2</Td><Td>Client's Google Play Console</Td>
            </tr>
            <tr className="border-b border-border-secondary/50 hover:bg-bg-secondary">
              <Td bold>iOS (IPA)</Td><Td>GitHub-hosted macos-latest + EAS</Td><Td>Client's Apple App Store</Td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  )
}

/* ─────────────────── APP ARCHITECTURE ─────────────────── */
function AppArchTab() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const modules = [
    { name: 'springmoney_core', icon: '⚙️', color: 'bg-emerald-50', desc: 'Core platform config, auth, base types, shared utilities' },
    { name: 'springmoney_client_management', icon: '👥', color: 'bg-blue-50', desc: 'Client profiles, data collection, KYC, risk profiling' },
    { name: 'springmoney_asset_mapping', icon: '📊', color: 'bg-amber-50', desc: 'Asset mapping, portfolio allocation, CAS import' },
    { name: 'springmoney_financial_planning', icon: '📈', color: 'bg-orange-50', desc: 'Financial plans, goal planning, calculators, projections' },
    { name: 'springmoney_portfolio_analytics', icon: '👁️', color: 'bg-purple-50', desc: 'Portfolio performance, analytics, XIRR, benchmark' },
    { name: 'springmoney_transaction_engine', icon: '💳', color: 'bg-red-50', desc: 'BSE transactions, order management, payment gateway' },
    { name: 'springmoney_crm', icon: '🤝', color: 'bg-teal-50', desc: 'Leads, deals, contacts, orgs, notes, tasks, call logs' },
    { name: 'springmoney_reconciliation', icon: '🔄', color: 'bg-indigo-50', desc: 'CAS import processing, RTA feed reconciliation' },
  ]
  return (
    <>
      <Card>
        <CardTitle>Domain-Driven Modular Architecture</CardTitle>
        <CardSubtitle>Package Diagram — App Modules</CardSubtitle>
        <p className="text-sm text-gray-text leading-relaxed mt-1 mb-4">
          The platform must never be built as one monolithic app. Apps follow domain-driven modular architecture.
        </p>
        <p className="text-xs text-gray-header font-semibold mb-3 uppercase tracking-wide">Core Platform Apps</p>
        <div className="flex flex-col gap-2">
          {modules.map(m => (
            <div
              key={m.name}
              className="flex items-center justify-between px-4 py-3 border border-border-secondary rounded-xl bg-bg-primary hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
              onClick={() => setExpanded(p => ({...p, [m.name]: !p[m.name]}))}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 ${m.color} rounded-lg flex items-center justify-center text-base flex-shrink-0`}>{m.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-text-primary font-mono">{m.name}</p>
                  {expanded[m.name] && <p className="text-xs text-gray-text mt-0.5">{m.desc}</p>}
                </div>
              </div>
              <span className="text-gray-header text-sm">{expanded[m.name] ? '▴' : '▸'}</span>
            </div>
          ))}
        </div>
      </Card>

      {d.apps.map(app => (
        <Card key={app.repo}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{app.icon}</span>
            <div>
              <CardTitle>{app.name}</CardTitle>
              <CardSubtitle>{app.repo}</CardSubtitle>
            </div>
          </div>
          <p className="text-sm text-gray-text leading-relaxed mb-3">{app.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {app.stack.map(s => (
              <span key={s} className="text-xs px-2.5 py-1 rounded bg-primary/5 text-primary font-medium border border-primary/20">{s}</span>
            ))}
          </div>
        </Card>
      ))}
    </>
  )
}

/* ─────────────────── DEPLOYMENT ─────────────────── */
function DeploymentTab() {
  return (
    <>
      <Card>
        <CardTitle>Web Portal Deployment Pipeline</CardTitle>
        <CardSubtitle>GitHub Actions CI/CD → Docker → Traefik → EC2</CardSubtitle>
        <div className="relative mt-4">
          <div className="absolute left-[22px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary to-primary/20" />
          <div className="space-y-1">
            {d.deploymentSteps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start py-2.5 group">
                <div className="w-11 h-11 rounded-full bg-bg-primary border-2 border-border-secondary group-hover:border-primary group-hover:bg-primary/5 flex items-center justify-center text-lg flex-shrink-0 relative z-10 transition-all duration-200">
                  {step.icon}
                </div>
                <div className="pt-2">
                  <p className="text-sm font-semibold text-text-primary">{step.title}</p>
                  <p className="text-sm text-gray-text mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <CardTitle>Infrastructure Option Comparison</CardTitle>
        <table className="w-full text-sm mt-4">
          <thead>
            <tr className="bg-bg-secondary border-b border-border-secondary text-gray-header text-xs uppercase tracking-wide">
              <Th>Option</Th><Th>Zero Downtime</Th><Th>Complexity</Th><Th>Cost</Th><Th>Verdict</Th>
            </tr>
          </thead>
          <tbody>
            {([
              ['Traefik + Docker Compose', '✅ Rolling restart', 'Low', '~EC2 only', '✅ Best for now'],
              ['Docker Swarm', '✅ Rolling update', 'Medium', '~EC2 only', 'Good alternative'],
              ['Kubernetes (K8s)', '✅ Rolling update', 'Very High', 'Higher (EKS)', '❌ Overkill < 50 tenants'],
              ['Vercel', '✅ Built-in', 'Very Low', '$$$ per tenant', 'Only if EC2 painful'],
            ] as string[][]).map((row, i) => (
              <tr key={i} className={`border-b border-border-secondary/50 hover:bg-bg-secondary transition-colors ${i === 0 ? 'bg-primary/5' : ''}`}>
                <Td bold={i === 0}>{row[0]}</Td>
                {row.slice(1).map((v, j) => <Td key={j}>{v}</Td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <CardTitle>Android Mobile Build Pipeline</CardTitle>
        <div className="code-block mt-3">{`Developer
  │ push to main / manual trigger
  ▼
GitHub Actions (runs-on: self-hosted EC2)
  │ Pre-installed: Node, Java 17, Android SDK
  │ Inject env vars from GitHub Secrets (per-tenant)
  │ ./gradlew bundleRelease
  ▼
.aab → S3 (builds/[timestamp]/[TENANT]-[version].aab)
  │
  └──► Slack notification → Developer submits to client's Google Play Console`}
        </div>
      </Card>
    </>
  )
}

/* ─────────────────── SECURITY ─────────────────── */
function SecurityTab() {
  return (
    <>
      <Card>
        <CardTitle>Security Principles</CardTitle>
        <div className="mt-4 space-y-2.5">
          {d.securityPrinciples.map((p, i) => (
            <div key={i} className="flex gap-4 px-4 py-3.5 border border-border-secondary rounded-xl bg-bg-primary hover:border-primary hover:bg-primary/5 transition-all duration-200">
              <span className="text-xl flex-shrink-0">{p.icon}</span>
              <div>
                <p className="text-sm font-semibold text-text-primary">{p.key}</p>
                <p className="text-sm text-gray-text mt-0.5 leading-relaxed">{p.val}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>Security Architecture Layers</CardTitle>
        <div className="code-block mt-3">{`Browser / Mobile App
      │ HTTPS (TLS 1.3 via Traefik)
      ▼
Next.js BFF (API Routes)
      │ requireFeature() → 403 if disabled for tenant
      │ Session validation (httpOnly cookie)
      ▼
Frappe ERPNext (per-tenant site)
      │ Role-based permissions
      │ Site-level DB isolation (separate DB per firm)
      ▼
Data Layer`}
        </div>
      </Card>

      <Card>
        <CardTitle>Mobile Security</CardTitle>
        <ul className="mt-3 space-y-2">
          {[
            'API calls from mobile go through the API Suite BFF — not directly to Frappe',
            'EXPO_PUBLIC_* vars are build-time — sensitive keys never exposed at runtime',
            'GitHub Secrets store Android keystore + API credentials — never in repo',
            'EAS Secrets store iOS per-tenant credentials for App Store submission',
            'Biometric auth support (FaceID / Fingerprint) for mobile login',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-text">
              <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </>
  )
}

/* ─────────────────── INFRASTRUCTURE ─────────────────── */
function InfraTab() {
  return (
    <>
      <Card>
        <CardTitle>Proposed EC2 Layout</CardTitle>
        <CardSubtitle>AWS Region: ap-south-1 (Mumbai)</CardSubtitle>
        <div className="code-block mt-3">{`EC2: springmoney-qa (t3.medium)
  └── Docker Compose
        ├── traefik (reverse proxy + SSL)
        ├── advisor-portal-qa    (NEXT_PUBLIC_CLIENT_ID=qa)
        └── client-portal-qa

EC2: springmoney-uat (t3.medium)
  └── Docker Compose
        ├── traefik
        ├── nswealth-advisor-uat / nswealth-client-uat
        ├── prudeno-advisor-uat  / prudeno-client-uat
        └── advent-advisor-uat

EC2: springmoney-prod (t3.large)
  └── Docker Compose
        ├── traefik
        └── nswealth-*, prudeno-*, ...`}
        </div>
      </Card>

      <Card>
        <CardTitle>Cost at 10 Tenants</CardTitle>
        <table className="w-full text-sm mt-4">
          <thead>
            <tr className="bg-bg-secondary border-b border-border-secondary text-gray-header text-xs uppercase tracking-wide">
              <Th>Component</Th><Th>Cost / Month</Th>
            </tr>
          </thead>
          <tbody>
            {d.infraCosts.map((row, i) => (
              <tr key={i} className="border-b border-border-secondary/50 hover:bg-bg-secondary transition-colors">
                <Td>{row.component}</Td>
                <Td bold>{row.cost}</Td>
              </tr>
            ))}
            <tr className="bg-primary/5">
              <td className="px-4 py-3 font-bold text-text-primary text-sm">Total</td>
              <td className="px-4 py-3 font-bold text-primary text-sm">~₹13,400</td>
            </tr>
          </tbody>
        </table>
        <Callout type="success" className="mt-3">
          Same EC2 serves all tenants via Docker — no per-tenant infra cost for web. Android builds reuse existing EC2 self-hosted runner at zero extra cost.
        </Callout>
      </Card>
    </>
  )
}

/* ─────────────────── MONOREPO ─────────────────── */
function MonorepoTab() {
  return (
    <>
      <Card>
        <CardTitle>The Case for a Monorepo (Turborepo)</CardTitle>
        <p className="text-sm text-gray-text leading-relaxed mt-2">
          Currently Spring Money maintains 4 separate repos. The same business logic (tenant configs, TypeScript types,
          validation rules) appears in multiple places. A monorepo eliminates this duplication with incremental builds,
          remote caching, and parallel task execution.
        </p>
        <div className="code-block mt-4">{`spring-money-frontend/
  apps/
    advisor-web/       ← manthan-ria-planner-portal (Next.js 15)
    client-web/        ← manthan-ria-client-web-portal (Next.js 16)
    advisor-mobile/    ← manthan-ria-advisor-app (Expo 54) [new]
    client-mobile/     ← manthan-ria-app (Expo 54)
  packages/
    config/            ← feature flags, tenant configs, branding (SHARED)
    ui-web/            ← React component library
    ui-mobile/         ← React Native component library
    design-tokens/     ← platform-agnostic design system
    api-client/        ← TypeScript types for all API responses
    validation/        ← shared validation rules + per-tenant JSONs
  turbo.json`}
        </div>
      </Card>

      <Card>
        <CardTitle>Shared Packages</CardTitle>
        <table className="w-full text-sm mt-4">
          <thead>
            <tr className="bg-bg-secondary border-b border-border-secondary text-gray-header text-xs uppercase tracking-wide">
              <Th>Package</Th><Th>Contents</Th><Th>Used By</Th>
            </tr>
          </thead>
          <tbody>
            {d.monorepoPackages.map((row, i) => (
              <tr key={i} className="border-b border-border-secondary/50 hover:bg-bg-secondary transition-colors">
                <Td mono bold>{row.pkg}</Td>
                <Td>{row.desc}</Td>
                <Td>{row.usedBy}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <CardTitle>Migration Path</CardTitle>
        <ol className="mt-3 space-y-2.5">
          {[
            'Create new monorepo with Turborepo scaffold',
            'Move config/features/ from advisor-web into packages/config/ — update imports',
            'Move shared TypeScript types into packages/api-client/',
            'Copy existing apps into apps/ directory (with git history via git subtree)',
            'Gradually extract shared components into packages/ui-web/ and packages/ui-mobile/',
          ].map((step, i) => (
            <li key={i} className="flex gap-3 text-sm items-start">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
              <span className="text-gray-text">{step}</span>
            </li>
          ))}
        </ol>
      </Card>
    </>
  )
}

/* ─────────────────── SHARED ATOMS ─────────────────── */
function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-bg-primary border border-border-secondary rounded-2xl p-6 mb-4 shadow-card hover:shadow-card-hover transition-shadow duration-200 ${className}`}>
      {children}
    </div>
  )
}

function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-base font-bold text-text-primary mb-1 tracking-tight">{children}</h3>
}

function CardSubtitle({ children }: { children: ReactNode }) {
  return <p className="text-xs text-gray-header font-mono mb-1">{children}</p>
}

function Th({ children }: { children: ReactNode }) {
  return <th className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wide text-gray-header">{children}</th>
}

function Td({ children, bold, mono }: { children: ReactNode; bold?: boolean; mono?: boolean }) {
  return (
    <td className={`px-4 py-2.5 text-sm border-b border-border-secondary/40 align-top ${bold ? 'font-semibold text-text-primary' : 'text-gray-text'} ${mono ? 'font-mono' : ''}`}>
      {children}
    </td>
  )
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex gap-2 text-xs">
      <span className="text-gray-header font-medium w-16 flex-shrink-0">{label}</span>
      <span className={`text-gray-text ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  )
}

function Callout({ type, children, className = '' }: { type: 'warning' | 'info' | 'success'; children: ReactNode; className?: string }) {
  const styles = {
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    success: 'bg-green-50 border-green-200 text-green-900',
  }
  const icons = { warning: '⚠️', info: 'ℹ️', success: '✅' }
  return (
    <div className={`flex gap-3 px-4 py-3.5 rounded-xl border text-sm leading-relaxed mb-4 ${styles[type]} ${className}`}>
      <span className="flex-shrink-0">{icons[type]}</span>
      <div>{children}</div>
    </div>
  )
}

