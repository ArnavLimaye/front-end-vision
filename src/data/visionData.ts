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
  kpiOverview: {
    document: [
      {
        title: '1. Single Monorepo for Multi-Tenant Frontend (11-Week Plan)',
        outcome: [
          'All frontend apps (Web + Mobile) in a single monorepo',
          'Shared core systems (Config, API, Validation)',
          'Web CI/CD stable, Android builds stable, iOS builds stable',
          'Zero platform-specific bugs and zero duplication',
        ],
        pointers: [
          'Phase 1: Foundation Build (Weeks 1–3, Compressed)',
          'Phase 2: Mobile Integration + Stabilization (Weeks 4–7)',
          'Phase 3: Hardening & Confidence (Weeks 8–9)',
          'Phase 4: Integration Buffer (Weeks 10–11)',
          'Non-Negotiable Rule: Build → Deploy → Test → Then Proceed',
          'Key Insight: Web proves structure, Mobile proves system maturity',
        ]
      },
      {
        title: '2. Component Library & Design System (11-Week Plan)',
        outcome: [
          'Unified design system across web and mobile',
          '100% Level 1 & Level 2 components fully reusable',
          '5–8 Level 3 business components deployed',
          '0 duplicate components across apps',
          '≥80% UI uses shared components',
        ],
        pointers: [
          'Week 1-2: Foundation & Theme System (Tokens + Tenant injection)',
          'Week 3-4: Build & Adopt Level 1 Components (Crunch Week)',
          'Week 5-7: Build & Adopt Level 2 Components (Forms, Navigation, Data)',
          'Week 8-10: Build & Adopt Level 3 Components (Business Logic)',
          'Week 11: Adoption Completion & Hardening',
          'Leadership Control: Ensure build AND use. Track adoption. Identify violations.',
          'Hard Stop Criteria: Components built but not used, duplicates appearing, theme mismatch.',
        ]
      },
      {
        title: '3. Platform Observability, Performance & Release Engineering (12-Week Plan)',
        outcome: [
          'Full observability across web (ELK) and mobile (Crashlytics)',
          'High-performance apps across API, rendering, and BFF layers',
          'Stable, automated CI/CD pipelines with rollback',
          'Zero downtime deployments for web apps',
          'Seamless tester & store distribution',
          'Scalable multi-tenant mobile architecture',
        ],
        pointers: [
          'Week 1-2: Zero Downtime Deployment (ZDD) & Firebase App Distribution Execution',
          'Week 3-4: API Logging, Crashlytics & ELK Stack Setup on Production',
          'Week 5-7: Alerting Setup & Web Performance Optimization',
          'Week 8: App Performance Optimization (Tab Loads < 3s)',
          'Week 9-10: iOS Mobile Builds & TestFlight/App Store Distribution',
          'Week 11-12: Frontend Logging Exploration & Slow Render Alerting',
        ]
      },
      {
        title: '4. Leadership — Updated 10-Week Execution Plan (with Zero Downtime)',
        outcome: [
          'Web and Mobile operate independently',
          'Team delivers consistently without lead dependency',
          'Rework is minimal (<10%)',
          'Zero downtime deployment is standard practice',
          '2+ features delivered per developer per week',
        ],
        pointers: [
          'Week 1-3: Ownership Setup & Autonomy Kickoff (Deployment checklists)',
          'Week 4-6: Independent Delivery & Speed (QA deployments, speed, standard scripts)',
          'Week 7-8: Ownership Maturity & Cross-Domain (UAT deploys, cross-reviews)',
          'Week 9-10: System Efficiency & Success State (Zero downtime in PROD)',
        ]
      }
    ]
  },
  kpis: [
    {
      id: 'kpi-1-standardization',
      title: 'KPI 1: Single Monorepo for Multi-Tenant Frontend',
      chatgptLink: 'https://chatgpt.com/share/69da5ccc-54d8-83e8-ad25-4712f2869b23',
      goal: 'Establish a unified monorepo for web + mobile apps. Web proves structure, Mobile proves system maturity. At every stage: Build → Deploy → Test → Proceed.',
      description: 'Guiding Principles: 1. Same tenant, same behavior. 2. Zero platform-specific bugs. 3. Zero duplication. 4. Shared Config, API, Validate across all apps.',
      metrics: [
        { name: 'Monorepo Setup (Web)', target: 'Completed', current: 'Pending' },
        { name: 'Deployment Pipeline', target: 'Stable', current: 'Pending' },
        { name: 'Shared Systems (Web)', target: 'Integrated', current: 'Pending' },
        { name: 'Mobile in Monorepo', target: 'Working', current: 'Pending' },
        { name: 'Android Build (EC2)', target: 'Stable', current: 'Pending' },
        { name: 'iOS Build (EAS)', target: 'Stable', current: 'Pending' },
        { name: 'Shared Systems (Mobile)', target: 'Integrated', current: 'Pending' },
        { name: 'Zero Platform Bugs', target: 'Achieved', current: 'Pending' },
        { name: 'Zero Tenant Bugs', target: 'Achieved', current: 'Pending' },
        { name: 'Zero Duplication', target: 'Achieved', current: 'Pending' }
      ],
      executionPhases: [
        { phase: 'Phase 1: Foundation Build (Weeks 1–3, Compressed)', desc: 'Monorepo supports Advisor Web App, Deployment Pipeline, Shared Systems (Config, API, Validation), and Initial Mobile Readiness.', status: 'current' },
        { phase: 'Phase 2: Mobile Integration + Stabilization (Weeks 4–7)', desc: 'Mobile apps inside monorepo, builds working (Android + iOS), shared systems used across web + mobile.', status: 'upcoming' },
        { phase: 'Phase 3: Hardening & Confidence (Weeks 8–9)', desc: 'Fix mobile build issues, standardize config + API usage, full regression testing (web + mobile).', status: 'upcoming' },
        { phase: 'Phase 4: Integration Buffer (Weeks 10–11)', desc: 'System stable under real usage, component library integrated safely across web + mobile.', status: 'upcoming' }
      ],
      leadNotes: [
        'how to handle updated changes at least for first 2 weeks which will be done on separate repos (because currently we do not have a monorepo)'
      ],
      weeklyProgress: [
        { week: 'Week 1', focus: 'Monorepo Setup', status: 'in-progress', leadTasks: ['Local regression testing', 'Basic flows (login, dashboard)'], achievements: ['App runs via monorepo (pnpm dev)', 'Zero runtime errors introduced', 'No code refactor done'], leadNotes: ['Focus on web portal and get everything related to different tenants into 1 branch - use variants for wherever tenant specific changes are present -> Create plan for different changes every day and implement it and then whatever issues come, talk to Nikhil or AI to find solution', 'Do not move anything to the specific packages.', 'Pick onboarding from ria-advent, data-collection from Prudeno, financial plan from NSW, asset-internals from prudeno'] },
        { week: 'Week 2', focus: 'Deployment Validation (Hard Gate)', status: 'upcoming', leadTasks: ['Production smoke test (/api/health)', 'Tenant-level validation'], achievements: ['CI pipeline success rate = 100%', 'Deployment works without errors', 'No UI/API behavior change'], leadNotes: ['Stabilise monorepo for advisor portals', 'Move brand config and feature flags to separate config', 'Deploy to NSW and Prudeno using monorepo', 'Check how we can inject env variables at the build time'] },
        { week: 'Week 3', focus: 'Shared Systems + Multi-App', status: 'upcoming', leadTasks: ['Cross-app regression (advisor + client web)', 'Tenant switching validation'], achievements: ['Single client-configs.ts (no duplicates)', '100% API types from shared package', '0 validation logic inside components', 'Client web app runs from monorepo'], leadNotes: ['Separate out reusable packages (APIs, Client configs, conditional validations etc.)', 'Check build', 'Check how can we inject package name etc required for playstore on build time so that we can have same repo for different clients', 'If week 2 work is done and successfully deployed in previous week, then deploy to advent as well.'] },
        { week: 'Week 4', focus: 'Mobile Migration', status: 'upcoming', leadTasks: ['App launch success', 'Basic navigation flows'], achievements: ['Mobile app runs via Expo inside monorepo', 'No broken imports or env issues'], leadNotes: ['Get mobile apps copied to monorepo', 'Again get everything related to different tenants into 1 branch - use variants for wherever tenant specific changes are present -> Create plan for different changes every day and implement it and then whatever issues come, talk to Nikhil or AI to find solution', 'Get AA from NSW', 'Check how can we inject package name etc required for playstore on build time so that we can have'] },
        { week: 'Week 5', focus: 'Mobile Deployment', status: 'upcoming', leadTasks: ['Installable builds tested', 'API connectivity verified'], achievements: ['Android build success (100%)', 'iOS build success (EAS)', 'No build-time failures'], leadNotes: ['Stabilise monorepo for client apps', 'Deploy to NSW and Prudeno using monorepo', 'Check how we can inject env variables at the build time alongwith feature-flag config and other configs'] },
        { week: 'Week 6', focus: 'Shared Systems on Mobile', status: 'upcoming', leadTasks: ['Cross-platform behavior parity (web vs mobile)'], achievements: ['100% config from shared package', '100% API calls use shared client', 'No duplicated validation logic'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 7', focus: 'Cross-App Integration', status: 'upcoming', leadTasks: ['Cross-platform regression testing', 'Same tenant → same behavior'], achievements: ['3 apps running (Advisor, Client, Mobile)', 'No duplication across apps'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 8', focus: 'Consistency Audit', status: 'upcoming', leadTasks: ['Full regression (web + mobile)'], achievements: ['0 duplicate config/API/validation', '100% shared package usage'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 9', focus: 'Monorepo Hardening', status: 'upcoming', leadTasks: ['Failure scenario testing', 'Tenant edge-case validation'], achievements: ['Build success rate = 100%', 'Deployment failure rate = 0%', 'No architectural inconsistencies'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 10', focus: 'Component Integration (Initial)', status: 'upcoming', leadTasks: ['UI regression testing', 'Cross-screen validation'], achievements: ['30–50% UI replaced with shared components', 'No UI regressions'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 11', focus: 'Final Validation', status: 'upcoming', leadTasks: ['Full end-to-end regression', 'Performance sanity'], achievements: ['0 duplicate components', '0 regressions', 'Stable across all tenants'], leadNotes: ['Add reflections and notes here...'] }
      ],
      impact: {
        sections: [
          { title: '🚀 Business Impact', items: ['Faster onboarding → <1 day per tenant', 'Lower cost per tenant → near zero marginal cost', 'Enables scaling to 50–100+ tenants'] },
          { title: '⚙️ Engineering Impact', items: ['No duplication → faster development', 'Fix once, fix everywhere → fewer bugs', 'Higher release confidence'] },
          { title: '🧪 QA Impact', items: ['Single test covers all tenants → no repetitive testing', 'Fewer regressions due to unified codebase', 'Faster testing cycles → quicker releases', 'Easier cross-platform validation (web + mobile)'] },
          { title: '📱 Platform Impact', items: ['Consistent behavior across web + mobile', 'Standardized, reliable deployments'] },
          { title: '🧑‍💼 Team Impact', items: ['Shift to platform thinking', 'Higher productivity with same team', 'Reduced tech debt'] },
          { title: '🧠 Strategic Impact', items: ['Moves from custom builds → true SaaS', 'Foundation for all future scalability'] }
        ],
        oneLine: 'Turns engineering and QA from bottlenecks into scalable growth engines.'
      },
    },
    {
      id: 'kpi-2-ui-platform',
      title: 'KPI 2: Component Library & Design System',
      chatgptLink: 'https://chatgpt.com/share/69da5d1d-984c-83e8-8fc2-fe4171f451ad',
      goal: 'Complete end-to-end delivery and adoption of shared, themeable component library for web and mobile.',
      description: 'Zero duplication goal. Level 1 (Base UI/Crunch week), Level 2 (Forms/Data), Level 3 (Business). Leadership must enforce adoption as strictly as creation.',
      metrics: [
        { name: 'Foundation / Themes', target: 'Complete', current: 'Pending' },
        { name: 'L1 Built / Adopted', target: '100% / >50%', current: 'Pending' },
        { name: 'L2 Built / Adopted', target: '100% / >70%', current: 'Pending' },
        { name: 'L3 Built / Adopted', target: '5-8 used', current: 'Pending' },
        { name: 'Overall Adoption', target: '≥80%', current: 'Pending' },
        { name: 'Duplicates', target: '0', current: 'Pending' }
      ],
      executionPhases: [
        { phase: 'Weeks 1-2: Foundation & Theme System', desc: 'Design tokens, mono-repo packages, ThemeProvider (web) & theme injection (mobile). 2 tenants working with different themes.', status: 'current' },
        { phase: 'Weeks 3-4: Level 1 Components', desc: 'Build 100% L1 components (Crunch Week) and achieve ≥50% adoption across at least 5 key screens per platform.', status: 'upcoming' },
        { phase: 'Weeks 5-7: Level 2 Components', desc: 'Build and adopt Forms, Data, Navigation, & Structure. ≥70% forms use FormField system.', status: 'upcoming' },
        { phase: 'Weeks 8-11: Level 3 Components & Hardening', desc: 'Build OTPInput, ProfileSection, KYCSection. Achieve ≥80% shared UI adoption. Eliminate 0 duplicates.', status: 'upcoming' }
      ],
      leadNotes: ['Add reflections and notes here...'],
      weeklyProgress: [
        { week: 'Week 1', focus: 'Foundation Setup', status: 'upcoming', leadTasks: ['Setup design-tokens, ui-web, ui-mobile', 'Configure shadcn + NativeWind + Gluestack', 'Define design tokens'], achievements: ['Packages created & consumed', 'Tokens available in both', 'No UI outside shared'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 2', focus: 'Theme System', status: 'upcoming', leadTasks: ['Implement ThemeProvider (web)', 'Implement theme injection (mobile)', 'Connect tenant config → tokens'], achievements: ['2 tenants working with different themes', 'Theme changes reflect instantly', '0 hardcoded colors'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 3', focus: 'Build ALL Level 1 Components', status: 'upcoming', leadTasks: ['Button, Input, Textarea, Label', 'Select, Checkbox, Radio, Switch, DatePicker', 'Card, Modal, Drawer, Spinner, Toast'], achievements: ['100% Level 1 components built', 'Same API across platforms', 'All states supported', 'Theme-compliant'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 4', focus: 'Adopt Level 1 Components', status: 'upcoming', leadTasks: ['Replace base components in apps', 'Use Level 1 in real screens'], achievements: ['≥50% screens using L1', '5 key screens migrated/platform', 'No new base components created', 'Duplicate components removed'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 5', focus: 'Build Level 2 (Forms + Data)', status: 'upcoming', leadTasks: ['FormField, FormSection, ErrorMessage', 'AsyncSelect, FieldWrapper', 'DataTable, ListCard'], achievements: ['Core form abstraction ready', 'Data components support states', 'APIs consistent across platforms'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 6', focus: 'Build Level 2 (Nav + Structure)', status: 'upcoming', leadTasks: ['Tabs, Accordion', 'Pagination, EmptyState', 'SectionHeader, PageHeader'], achievements: ['Full L2 library complete', 'Works with feature flags', 'Components tested in isolation'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 7', focus: 'Adopt Level 2 Components', status: 'upcoming', leadTasks: ['Refactor forms and data screens', 'Replace implementations with shared components'], achievements: ['≥70% forms use FormField', '≥60% data views use shared', '5 screens migrated per app', 'Reduction in duplicate logic'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 8', focus: 'Build Level 3 (Batch 1)', status: 'upcoming', leadTasks: ['OTPInput', 'AddressForm', 'ProfileSection'], achievements: ['3–4 reusable business components', 'No tenant-specific logic', 'Used in at least 1 app'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 9', focus: 'Build Level 3 (Batch 2)', status: 'upcoming', leadTasks: ['KYCSection', 'InvestmentCard', 'Identify high-reuse components'], achievements: ['5–8 Level 3 components built', 'Standardized APIs', 'Ready for cross-app reuse'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 10', focus: 'Adopt Level 3 (Phase 1)', status: 'upcoming', leadTasks: ['Integrate Level 3 in onboarding/profile flows'], achievements: ['Used in at least 2 apps', 'Core flows using shared', 'Reduced duplication in UI flows'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 11', focus: 'Adoption Completion & Hardening', status: 'upcoming', leadTasks: ['Complete migration across all apps', 'Remove ALL duplicate components', 'Finalize Storybook/Preview'], achievements: ['≥80% UI uses shared components', '0 duplicate components', '100% L1 & L2 documented', 'All new development uses shared'], leadNotes: ['Add reflections and notes here...'] }
      ],
      impact: {
        sections: [
          { title: '🚀 Business Impact', items: ['Faster feature delivery → 2–3x development speed', 'Faster onboarding → near <1 day per tenant', 'Lower cost per tenant → minimal incremental engineering cost', 'Enables scaling to 50–100+ tenants'] },
          { title: '⚙️ Engineering Impact', items: ['No duplication → faster development cycles', 'Fix once, fix everywhere → fewer bugs', 'Standardized components → higher release confidence'] },
          { title: '📱 Platform Impact', items: ['Consistent UI/UX across web + mobile', 'Theme-driven multi-tenant system', 'Stable, predictable product behavior'] },
          { title: '🧪 QA Impact', items: ['Test once, reuse everywhere → reduced testing effort', 'Fewer regressions due to standardized components', 'Faster QA cycles with predictable UI behavior'] },
          { title: '🧑‍💼 Team Impact', items: ['Shift from feature-building to platform-building', 'Higher productivity with same team size', 'Reduced dependency on senior engineers'] },
          { title: '🧠 Strategic Impact', items: ['Moves from fragmented UI → unified design system', 'Enables true multi-tenant SaaS scalability', 'Foundation for Tier B & Tier C growth'] }
        ],
        oneLine: 'Turns UI development into a reusable platform that scales the business without scaling the team.'
      },
    },
    {
      id: 'kpi-3-reliability',
      title: 'KPI 3: Platform Observability, Performance & Release Engineering',
      chatgptLink: 'https://chatgpt.com/share/69da5ee5-90a4-83e8-830c-0cf592dbf2f5',
      goal: 'Establish a scalable and robust platform enabling full visibility, fast applications, automated pipelines, seamless distribution, and scalable mobile architecture.',
      description: 'Web = Execution Focus. Mobile = Research + Stabilization. Covers ELK Stack for web, Firebase for mobile, CI/CD foundations, and multi-tenant mobile architectural definitions.',
      metrics: [
        { name: 'ZDD & Firebase Dist.', target: 'Automated', current: 'In Progress' },
        { name: 'API Logging & ELK', target: '100% Core APIs', current: 'Pending' },
        { name: 'Alerting System', target: 'Active (Slack)', current: 'Pending' },
        { name: 'Web Performance', target: 'Optimised (TTFB/FCP)', current: 'Pending' },
        { name: 'App Performance', target: '< 3s load per tab', current: 'Pending' },
        { name: 'iOS App Store', target: 'All Tenants Live', current: 'Pending' },
        { name: 'Frontend Logging', target: 'Active & Alerting', current: 'Pending' }
      ],
      executionPhases: [
        { phase: 'Weeks 1-2: ZDD & App Dist', desc: 'Zero downtime deployments and App Distribution via Firebase.', status: 'current' },
        { phase: 'Weeks 3-5: Logging, ELK & Alerts', desc: 'JSON API logging, Crashlytics, ELK setup, and Slack alerting.', status: 'upcoming' },
        { phase: 'Weeks 6-8: Performance Optimization', desc: 'Web and App performance optimizations (Tabs load < 3s).', status: 'upcoming' },
        { phase: 'Weeks 9-10: iOS Mobile Builds', desc: 'GitHub Actions for iOS builds and TestFlight/App Store distribution.', status: 'upcoming' },
        { phase: 'Weeks 11-12: Frontend Observability', desc: 'Frontend logging evaluation and slow rendering alerts.', status: 'upcoming' }
      ],
      leadNotes: ['Add reflections and notes here...'],
      weeklyProgress: [
        { week: 'Week 1', focus: 'ZDD & Firebase distribution planning', status: 'in-progress', leadTasks: ['Finalise ZDD process using Github Actions', 'Add /api/health endpoint for all tenants', 'Rollback plan ready', 'Standardize App Distribution using Firebase for any app'], achievements: ['ZDD plan ready and sample deployment done (prudeno-mfd)', '/api/health added for all tenants', 'Rollback plan is ready', 'Firebase distribution plan ready and sample deployment done (humfauji)'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 2', focus: 'Execution: ZDD & Firebase distribution', status: 'upcoming', leadTasks: ['Add ZDD actions for all tenants on Production and deploy', 'Automate firebase distribution for NSW and Prudeno'], achievements: ['Successful deployment on Production; EC2 shows traefik containers', 'Firebase distribution automated for NSW and Prudeno'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 3', focus: 'Log coverage & Visibility', status: 'upcoming', leadTasks: ['Decide log levels and json log for each level', 'JSON api logging using winston/bunyan on web apps (info, warn, error)', 'Document Crashlytics logging for mobile app API errors', 'App -> tenant + version tagging'], achievements: ['Logs logged for each api route; All tenants start logging properly', 'Crashlytics logging documented', 'Tenant and version tagging active'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 4', focus: 'ELK setup (Prioritize Production)', status: 'upcoming', leadTasks: ['Pull logs from 1 tenant web app and show on Kibana', 'Show other 3 tenants web app logs on Kibana', 'Explore how to monitor Front-end logs for performance monitoring'], achievements: ['Logs pulled and visualized on Kibana for all 4 tenants', 'Front-end log monitoring approach defined'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 5', focus: 'Alerting Setup', status: 'upcoming', leadTasks: ['Configure alerts for anomalies/errors', 'Set up Slack notifications for critical alerts'], achievements: ['Alerting successfully configured', 'Real-time notifications working for critical errors'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 6', focus: 'Web Performance Optimization', status: 'upcoming', leadTasks: ['Analyze slow rendering web pages', 'Optimize web performance bottlenecks'], achievements: ['Visible improvement in load times', 'Performance metrics captured'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 7', focus: 'Web Performance Optimization (continue)', status: 'upcoming', leadTasks: ['Continue optimizing heavy endpoints', 'Reduce page load times and network waterfall'], achievements: ['Sustained performance gains on web apps', 'Target TTFB and FCP metrics met'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 8', focus: 'App performance Optimization', status: 'upcoming', leadTasks: ['Improve loading time for tabs (especially data heavy)'], achievements: ['No tab takes more than 3 seconds to load'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 9', focus: 'Mobile iOS builds', status: 'upcoming', leadTasks: ['Github Action to build iOS app', 'Put 1 tenant on iOS app store', 'Document all the process (including TestFlight)'], achievements: ['iOS build automated via GitHub Actions', '1 tenant successfully submitted to iOS App Store', 'Documentation complete for iOS builds and TestFlight'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 10', focus: 'iOS App Expansion', status: 'upcoming', leadTasks: ['Put 1 more tenant on iOS app store', 'Update Firebase to create iOS apps for all tenants'], achievements: ['2nd tenant on iOS app store', 'Firebase correctly generating iOS apps for all tenants'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 11', focus: 'Frontend logging planning', status: 'upcoming', leadTasks: ['Explore Frontend logging (compare 2 tools, finalise 1)', 'Try frontend logging for 1 tenant\'s 5 slowest screens', 'Document process'], achievements: ['Frontend logging tool finalised', 'Logging successfully implemented for 5 slowest screens on 1 tenant', 'Process fully documented'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 12', focus: 'Execute Frontend logging & Alerts', status: 'upcoming', leadTasks: ['Add full fledged frontend logging for 1 web app', 'Add alerts for slow rendering pages'], achievements: ['Full fledged frontend logging active for 1 web app', 'Alerts successfully added for slow rendering pages'], leadNotes: ['Add reflections and notes here...'] }
      ],
      impact: {
        sections: [
          { title: '🚀 Business Impact', items: ['Faster and safer releases → improved client experience and trust', 'Reduced production issues → lower churn and higher retention', 'Faster onboarding → scalable tenant growth without delays', 'Supports scaling to 50–100+ tenants without increasing support overhead'] },
          { title: '⚙️ Engineering Impact', items: ['Data-driven debugging → faster root cause resolution', 'Zero-downtime releases → higher deployment confidence', 'Standardized pipelines → predictable and repeatable releases', 'Reduced firefighting → more focus on core product development'] },
          { title: '📱 Platform Impact', items: ['Fully observable system across web and mobile', 'Zero-downtime deployment capability for all web apps', 'Scalable multi-tenant architecture across platforms', 'Consistent and reliable system behavior across environments'] },
          { title: '🧪 QA Impact', items: ['Better visibility into failures via logs and alerts → faster issue validation', 'Reduced regression risk due to standardized pipelines and deployments', 'Ability to test in production-like environments with confidence', 'Faster QA cycles with reliable builds and distribution'] },
          { title: '🧑‍💼 Team Impact', items: ['Reduced stress from production issues and firefighting', 'Clear workflows for deploy, monitor, and rollback', 'Improved developer confidence in releases', 'Less dependency on individual contributors'] },
          { title: '🧠 Strategic Impact', items: ['Enables enterprise-grade reliability required for Tier B and Tier C clients', 'Builds foundation for multi-tenant scale aligned with platform vision', 'Supports faster iteration without compromising stability', 'Strengthens platform maturity and long-term scalability'] }
        ],
        oneLine: 'Transforms the platform into a reliable, observable, and scalable system that supports rapid growth without increasing operational complexity.'
      },
    },
    {
      id: 'kpi-4-leadership',
      title: 'KPI 4: Leadership',
      chatgptLink: 'https://chatgpt.com/share/69da5f0e-6a0c-83e8-8b2d-41c4dae48930',
      goal: 'Build a self-sufficient frontend team with strong ownership (Web & Mobile) that independently delivers KPI 1, 2, 3 with zero downtime standard practice.',
      description: 'Web Owner & Mobile Owner handle deployments. High execution speed, low rework, strong autonomy. Devs execute flawlessly from QA to PROD.',
      metrics: [
        { name: 'Ownership Clarity', target: '100%', current: '100%' },
        { name: 'Dev Autonomy', target: '90%', current: '60%' },
        { name: 'Features/Dev/Week', target: '2+', current: '1' },
        { name: 'Lead Dependency', target: '<10%', current: '80%' },
        { name: 'Reopened Tickets', target: '<10%', current: '15%' },
        { name: 'Zero Downtime', target: 'PROD', current: 'Pending' }
      ],
      executionPhases: [
        { phase: 'Weeks 1-3: Setup & Alignment', desc: 'Detailed ownership boundaries, shift to ownership mindset, documented deployments.', status: 'current' },
        { phase: 'Weeks 4-6: Independent Delivery', desc: 'Reduce technical lead dependency, speed stabilization, independent QA deployments.', status: 'upcoming' },
        { phase: 'Weeks 7-10: Ownership Maturity & Success', desc: 'Cross domain contribution, System Efficiency, Zero Downtime validated in UAT/PROD.', status: 'upcoming' }
      ],
      leadNotes: ['Add reflections and notes here...'],
      weeklyProgress: [
        { week: 'Week 1', focus: 'Ownership Setup', status: 'upcoming', leadTasks: ['Assign Mobile & Web Owner', 'Define responsibilities clearly', 'Align deployment flow (QA→UAT→PROD)'], achievements: ['Ownership clarity: 100%', 'Deployment flow documented'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 2', focus: 'Autonomy Kickoff', status: 'upcoming', leadTasks: ['Devs propose solutions first', 'Lead avoids direct answers', 'Assign deployment ownership'], achievements: ['% tasks with dev-proposed approach ≥ 60%', 'Deployment ownership clarity: 100%'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 3', focus: 'KPI Alignment', status: 'upcoming', leadTasks: ['Align all work to KPI 1, 2, 3', 'Define deployment checklist (health check, env)'], achievements: ['100% tasks mapped to KPIs', 'Deployment checklist created'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 4', focus: 'Independent Delivery Start', status: 'upcoming', leadTasks: ['Devs execute features end-to-end', 'Devs perform QA deployments independently'], achievements: ['Independent delivery ≥ 50%', 'QA deployments done without lead'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 5', focus: 'Speed Stabilization', status: 'upcoming', leadTasks: ['Improve task breakdown', 'Standardize deployment commands/scripts'], achievements: ['2+ features/dev/week', 'Deployment time reduced'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 6', focus: 'Quality Enforcement', status: 'upcoming', leadTasks: ['Strong pre-QA validation by devs', 'Validate health checks (/api/health)'], achievements: ['Reopened tickets <15%', 'No failed deployments in QA'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 7', focus: 'Ownership Maturity', status: 'upcoming', leadTasks: ['Web owner handles web decisions', 'Devs handle UAT deployments independently'], achievements: ['Lead intervention <30%', 'Successful UAT deployments without issues'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 8', focus: 'Cross-Domain Contribution', status: 'upcoming', leadTasks: ['Cross-domain contributions', 'Cross-review deployment configs (Web ↔ Mobile)'], achievements: ['1 cross-domain contribution/dev', 'No deployment inconsistencies'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 9', focus: 'System Efficiency', status: 'upcoming', leadTasks: ['Identify bottlenecks', 'Implement zero-downtime strategy (Rolling, Health-based)'], achievements: ['2+ features/dev/week stable', 'Reopened tickets <10%', 'Zero downtime validated in staging/UAT'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 10', focus: 'Leadership Success State', status: 'upcoming', leadTasks: ['Lead steps back from execution', 'Achieve zero downtime production deployment'], achievements: ['Lead dependency <10%', 'Reopened tickets <10%', 'Zero downtime achieved in production'], leadNotes: ['Add reflections and notes here...'] }
      ],
      impact: {
        sections: [
          { title: '🚀 Business Impact', items: ['Faster feature delivery → 2x development speed', 'Faster onboarding → aligned with <1 day / <1 week tenant onboarding', 'Lower cost per tenant → no additional team scaling required', 'Enables scaling to 40–100+ tenants reliably'] },
          { title: '⚙️ Engineering Impact', items: ['Strong ownership → faster, parallel execution', 'Low rework (<10%) → higher efficiency', 'Reduced Tech Lead dependency → better scalability', 'Consistent architecture enforcement → no system drift'] },
          { title: '📱 Platform Impact', items: ['Config-driven multi-tenant system fully realized', 'Zero divergence across tenants (no branch chaos)', 'Zero-downtime deployments → stable releases', 'Consistent behavior across web and mobile'] },
          { title: '🧪 QA Impact', items: ['<10% reopen rate → higher first-time quality', 'Reduced back-and-forth between QA and dev', 'Focus shifts to edge-case validation', 'Faster and more predictable QA cycles'] },
          { title: '🧑‍💼 Team Impact', items: ['Developers become owners, not executors', 'Higher autonomy and decision-making ability', 'Reduced dependency on Tech Lead', 'More productive team without increasing size'] },
          { title: '🧠 Strategic Impact', items: ['Frontend becomes a scalable growth engine', 'Enables smooth expansion to Tier B and Tier C clients', 'Supports long-term platform scalability', 'Foundation for adding teams without chaos'] }
        ],
        oneLine: 'Builds an autonomous, ownership-driven team that scales product, platform, and business without scaling leadership dependency.'
      }
    }
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
      { id: 'kpi-1-standardization', icon: '📦', label: 'Monorepo Setup' },
      { id: 'kpi-2-ui-platform', icon: '🎨', label: 'Component Library' },
      { id: 'kpi-3-reliability', icon: '🚀', label: 'Observability' },
      { id: 'kpi-4-leadership', icon: '👥', label: 'Leadership' },
    ],
  },
]
