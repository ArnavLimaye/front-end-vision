// ============================================================
// FRONTEND VISION DATA — mirrors Architecture Objective content
// ============================================================

export const frontendVisionData = {
  tabs: [
    { id: 'overview', label: 'Overview', icon: '🧱' },
    { id: 'environments', label: 'Environments', icon: '🌐' },
    { id: 'multi-tenant', label: 'Multi-Tenant', icon: '🏗️' },
    { id: 'app-architecture', label: 'App Architecture', icon: '⚙️' },
    { id: 'deployment', label: 'Deployment', icon: '🚀' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'infrastructure', label: 'Infrastructure', icon: '🖥️' },
    { id: 'monorepo', label: 'Monorepo', icon: '📦' },
  ],
  objectives: [
    { title: 'Scalability', desc: 'Support 40–100+ advisor firms without forking code' },
    { title: 'Tenant Isolation', desc: 'Each firm gets its own branding, features, and data boundaries' },
    { title: 'Single Codebase', desc: 'One repo per app; tenants differ only in config + assets' },
    { title: 'Mobile-First', desc: 'Native iOS + Android per client, under client\'s App Store account' },
    { title: 'Maintainability', desc: 'Zero divergence between tenant branches — eliminated by config' },
    { title: 'Rapid Onboarding', desc: 'New tenant live in < 1 day after assets + config are added' },
  ],
  apps: [
    {
      name: 'Advisor Web Portal',
      repo: 'manthan-ria-planner-portal',
      icon: '💼',
      surface: 'Web',
      framework: 'Next.js 15+',
      stack: ['Next.js 15', 'TypeScript', 'TailwindCSS', 'React Query', 'React Hook Form'],
      desc: 'Full-featured advisor platform: client management, CRM, portfolio, task centre, reconciliation.',
      status: 'Live',
    },
    {
      name: 'Client Web Portal',
      repo: 'manthan-ria-client-web-portal',
      icon: '🌱',
      surface: 'Web',
      framework: 'Next.js 16',
      stack: ['Next.js 16', 'TypeScript', 'TailwindCSS', 'Turbopack', 'OTPless Auth'],
      desc: 'Client-facing: onboarding, KYC, risk profile, portfolio view, account aggregator.',
      status: 'Live',
    },
    {
      name: 'Client Mobile App',
      repo: 'manthan-ria-app',
      icon: '📱',
      surface: 'Mobile',
      framework: 'Expo SDK 54',
      stack: ['Expo SDK 54', 'React Native 0.81.5', 'Expo Router v6', 'NativeWind v4'],
      desc: 'Client mobile app: portfolio overview, goals, KYC, account aggregator, biometric login.',
      status: 'Live',
    },
    {
      name: 'Advisor Mobile App',
      repo: 'manthan-ria-advisor-app',
      icon: '📲',
      surface: 'Mobile',
      framework: 'Expo SDK 54',
      stack: ['Expo SDK 54', 'React Native', 'Expo Router', 'NativeWind v4'],
      desc: 'New advisor app: client list, profile view, task centre, CRM quick actions, notifications.',
      status: 'To Be Built',
    },
  ],
  environments: [
    {
      name: 'Shared QA',
      type: 'qa',
      url: 'qa.springmoney.in',
      trigger: 'Every push to main',
      data: 'Shared test data — no real client data',
      desc: 'Internal developer and QA testing. Floating dev-only tenant switcher lets testers pick any CLIENT_ID without redeployment.',
    },
    {
      name: 'Per-Tenant UAT',
      type: 'uat',
      url: '[tenant]-uat.[domain].in',
      trigger: 'Manual trigger or tag after QA sign-off',
      data: 'Staging Frappe site per tenant',
      desc: 'Client acceptance testing. Business team validates before go-live. Real Frappe UAT site per tenant.',
    },
    {
      name: 'Per-Tenant PROD',
      type: 'prod',
      url: 'app.[domain].in',
      trigger: 'Manual approval gate after UAT sign-off',
      data: 'Production Frappe site per tenant',
      desc: 'Live advisors and clients with real data. Blue-green swap via Traefik for zero downtime.',
    },
  ],
  multiTenantLevels: [
    {
      level: 'Level 1',
      title: 'Branding',
      desc: 'Colors, Logo, Firm Name',
      items: ['firmName', 'logoPath', 'primaryColor', 'primaryGradient', 'favicon'],
      detail: 'ThemeProvider injects CSS custom properties on document.documentElement — overrides defaults without touching globals.css.',
    },
    {
      level: 'Level 2',
      title: 'Structural Customization',
      desc: 'Tabs, Sections, Ordering',
      items: ['sectionConfig.profile.accordions', 'sectionConfig.planning.tabs', 'featureFlag gates', 'subsection ordering'],
      detail: 'sectionConfig controls which accordions appear, their order, and what planning tabs are visible per tenant.',
    },
    {
      level: 'Level 3',
      title: 'Field-Level Customization',
      desc: 'Visible Fields, Layouts, Validation',
      items: ['fieldConfig per section key', 'visibleFields array', 'layout grid config', 'per-tenant validation.json'],
      detail: 'Validation rules per tenant stored in lib/validation/rules/clients/[tenant]/. NRI clients get extra fields.',
    },
  ],
  deploymentSteps: [
    { icon: '👨‍💻', title: 'Developer Pushes', desc: 'Push to main branch on GitHub' },
    { icon: '🔄', title: 'GitHub Actions', desc: 'Lint → Tests → Docker image build → Push to ECR/GHCR' },
    { icon: '🐳', title: 'Container Deploy', desc: 'Shared QA: auto-deploy. UAT: manual trigger per tenant. PROD: approval gate.' },
    { icon: '🔀', title: 'Traefik Routing', desc: 'Routes nswealth.in → nswealth container. Auto Let\'s Encrypt SSL.' },
    { icon: '✅', title: 'Health Check', desc: 'New container must pass /api/health → old container stops. Zero downtime.' },
    { icon: '📣', title: 'Slack Notification', desc: 'S3 artifact link + deploy status notification to engineering channel.' },
  ],
  securityPrinciples: [
    { icon: '🔐', key: 'Tenant Isolation', val: 'NEXT_PUBLIC_CLIENT_ID determines which Frappe site (DB) is called — never mixed' },
    { icon: '🛡️', key: 'API Route Protection', val: 'All external calls via Next.js BFF routes; requireFeature() guard blocks disabled features' },
    { icon: '🔑', key: 'OTP Authentication', val: 'OTPless integration — no passwords stored; session cookies are httpOnly' },
    { icon: '🚧', key: 'Feature-Based Access', val: '<FeatureGate> component + requireFeature() API wrapper — 403 if feature disabled for tenant' },
    { icon: '🔒', key: 'No Hardcoded Credentials', val: 'All API keys + secrets in env vars / GitHub Secrets / EAS secrets; never in code' },
    { icon: '🌐', key: 'HTTPS', val: 'Traefik + Let\'s Encrypt auto-renews SSL per subdomain (TLS 1.3)' },
  ],
  infraCosts: [
    { component: 'QA EC2 (t3.medium)', cost: '~₹2,500' },
    { component: 'UAT EC2 (t3.medium)', cost: '~₹2,500' },
    { component: 'PROD EC2 (t3.large)', cost: '~₹5,000' },
    { component: 'S3 (build artifacts)', cost: '~₹500' },
    { component: 'EAS Build (iOS only)', cost: '~₹2,400' },
    { component: 'Route 53 / DNS', cost: '~₹500' },
  ],
  monorepoPackages: [
    { pkg: '@spring/config', desc: 'Feature flags, client-configs.ts, branding, sectionConfig, fieldConfig', usedBy: 'All 4 apps' },
    { pkg: '@spring/api-client', desc: 'TypeScript types for Frappe/API Suite responses, request utilities', usedBy: 'All 4 apps' },
    { pkg: '@spring/validation', desc: 'Validation rule engine + per-tenant JSON files', usedBy: 'All 4 apps' },
    { pkg: '@spring/design-tokens', desc: 'Color palette, spacing scale, typography — platform-agnostic', usedBy: 'ui-web + ui-mobile' },
    { pkg: '@spring/ui-web', desc: 'React components (TextInput, DataTable, SidePanel, etc.)', usedBy: 'advisor-web + client-web' },
    { pkg: '@spring/ui-mobile', desc: 'React Native components (Input, Card, Modal, etc.)', usedBy: 'advisor-mobile + client-mobile' },
  ],
}

// ============================================================
// KPI TRACKER DATA
// ============================================================

export const kpiData = {
  summary: {
    arr: '₹4 Cr',
    targets: '40 WMs',
    tenants: '3 Active',
    teamSize: '6 Eng',
  },
  tiles: [
    { label: 'Annual Recurring Revenue', value: '₹4 Cr', sub: 'Target: ₹10 Cr by FY26', trend: '+22%', trendDir: 'up', color: 'green' },
    { label: 'Active Tenants', value: '3', sub: 'nswealth · prudeno · advent', trend: '+1 this Q', trendDir: 'up', color: 'blue' },
    { label: 'Wealth Managers', value: '~40', sub: 'Target: 100+ by EOY', trend: 'On Track', trendDir: 'neutral', color: 'amber' },
    { label: 'Avg ARR / Customer', value: '₹10L', sub: 'Range: ₹8–12 Lakhs', trend: 'Stable', trendDir: 'neutral', color: 'purple' },
    { label: 'Infra Cost / Month', value: '₹13.4K', sub: 'For 10 tenants on EC2', trend: '-65% vs old', trendDir: 'up', color: 'cyan' },
    { label: 'Apps Live', value: '3/4', sub: 'Advisor Mobile: In Build', trend: 'Q2 target', trendDir: 'neutral', color: 'indigo' },
    { label: 'Multi-Tenant Config', value: '60%', sub: 'Branch → Config migration', trend: 'In Progress', trendDir: 'neutral', color: 'orange' },
    { label: 'Onboarding SLA (Tier A)', value: '<1d', sub: 'Config-driven, no code change', trend: 'Achieved', trendDir: 'up', color: 'rose' },
  ],
  progress: [
    {
      title: 'Advisor Web Multi-Tenancy Migration',
      badge: 'on-track',
      items: [
        { label: 'Branch cleanup', pct: 100, color: '#10b981' },
        { label: 'Config system', pct: 80, color: '#3b82f6' },
        { label: 'Feature flags', pct: 70, color: '#f59e0b' },
      ],
    },
    {
      title: 'Monorepo (Turborepo) Setup',
      badge: 'at-risk',
      items: [
        { label: 'Workspace scaffold', pct: 40, color: '#10b981' },
        { label: '@spring/config extracted', pct: 20, color: '#3b82f6' },
        { label: 'TypeScript types shared', pct: 10, color: '#f59e0b' },
      ],
    },
    {
      title: 'Advisor Mobile App (New)',
      badge: 'pending',
      items: [
        { label: 'Designs', pct: 60, color: '#10b981' },
        { label: 'Expo scaffold & auth', pct: 30, color: '#3b82f6' },
        { label: 'Client list & profile', pct: 0, color: '#f59e0b' },
      ],
    },
    {
      title: 'Design System & Component Library',
      badge: 'on-track',
      items: [
        { label: 'Design tokens defined', pct: 90, color: '#10b981' },
        { label: 'Web components', pct: 65, color: '#3b82f6' },
        { label: 'Mobile components', pct: 45, color: '#8b5cf6' },
      ],
    },
  ],
  milestones: [
    { milestone: 'Config-driven multi-tenancy (Advisor Web)', owner: 'Web Dev', due: 'Apr 30', status: 'progress' },
    { milestone: 'Advisor Mobile App — Auth + Client List', owner: 'App Dev', due: 'May 15', status: 'progress' },
    { milestone: 'Monorepo scaffold + @spring/config', owner: 'Tech Lead', due: 'May 30', status: 'pending' },
    { milestone: 'Prudeno tenant fully on config (no branches)', owner: 'Web Dev', due: 'Jun 15', status: 'pending' },
    { milestone: 'Storybook + Web Component Library v1', owner: 'UI/UX Eng', due: 'Jun 30', status: 'pending' },
    { milestone: 'Advisor Mobile App — Full MVP', owner: 'App Dev', due: 'Jul 31', status: 'pending' },
    { milestone: 'Tier B Onboarding SLA < 1 week', owner: 'Tech Lead', due: 'Aug 31', status: 'pending' },
    { milestone: 'Android release automation via EC2 runner', owner: 'DevOps', due: 'Done', status: 'done' },
  ],
  teamVelocity: [
    { sprint: 'Sprint 1', points: 42 },
    { sprint: 'Sprint 2', points: 56 },
    { sprint: 'Sprint 3', points: 51 },
    { sprint: 'Sprint 4', points: 63 },
    { sprint: 'Sprint 5', points: 68 },
    { sprint: 'Sprint 6 (curr)', points: 55 },
  ],
  risks: [
    { severity: 'high', title: 'Branch divergence growing before config migration completes', owner: 'Tech Lead' },
    { severity: 'high', title: 'iOS EAS Build dependency for all mobile releases (macOS runner cost)', owner: 'App Dev' },
    { severity: 'medium', title: 'Advisor Mobile MVP scope creep delaying Q2 delivery', owner: 'PM' },
    { severity: 'medium', title: 'Design token system not enforced — custom styles accumulating', owner: 'UI/UX Eng' },
    { severity: 'low', title: 'EC2 disk space management for Android build artifacts', owner: 'DevOps' },
  ],
}

export const navItems = [
  {
    id: 'frontend-vision',
    icon: '🎨',
    label: 'Frontend Vision',
    children: [
      { id: 'overview', icon: '🧱', label: 'Overview' },
      { id: 'environments', icon: '🌐', label: 'Environments' },
      { id: 'multi-tenant', icon: '🏗️', label: 'Multi-Tenant' },
      { id: 'app-architecture', icon: '⚙️', label: 'App Architecture' },
      { id: 'deployment', icon: '🚀', label: 'Deployment' },
      { id: 'security', icon: '🔒', label: 'Security' },
      { id: 'infrastructure', icon: '🖥️', label: 'Infrastructure' },
      { id: 'monorepo', icon: '📦', label: 'Monorepo' },
    ],
  },
  {
    id: 'kpi-tracker',
    icon: '📊',
    label: 'KPI Tracker',
    children: [
      { id: 'kpi-overview', icon: '🎯', label: 'Overview' },
      { id: 'kpi-progress', icon: '📈', label: 'Progress' },
      { id: 'kpi-milestones', icon: '🏁', label: 'Milestones' },
      { id: 'kpi-risks', icon: '⚠️', label: 'Risks' },
    ],
  },
]
