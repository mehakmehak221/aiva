export const profileData: Record<string, any> = {
  seller: {
    name: "Fashion Express",
    avatar: "🛍️",
    gradient: "linear-gradient(135deg,#7c3aed,#db2777)",
    badge: "SELLER",
    plan: "Growth · $1,599/mo",
    kpis: [
      { l: "Total Calls", v: "1,284", d: "+18%", dir: "up", c: "text-[#c4b0ff]" },
      { l: "Leads Generated", v: "347", d: "+31%", dir: "up", c: "text-[var(--color-aiva-green)]" },
      { l: "Conversion Rate", v: "27%", d: "+4.2pp", dir: "up", c: "text-[var(--color-aiva-blue)]" },
      { l: "Revenue Attributed", v: "$48.2K", d: "+22%", dir: "up", c: "text-[var(--color-aiva-amber)]" },
    ],
    callData: [
      { o: 48, i: 22 },
      { o: 62, i: 31 },
      { o: 41, i: 18 },
      { o: 75, i: 35 },
      { o: 55, i: 28 },
      { o: 88, i: 42 },
      { o: 71, i: 39 },
    ],
    outcomes: [
      { l: "Interested", p: 38, c: "var(--color-aiva-green)" },
      { l: "Not Interested", p: 29, c: "var(--color-aiva-red)" },
      { l: "Callback", p: 19, c: "var(--color-aiva-amber)" },
      { l: "No Answer", p: 14, c: "var(--color-aiva-muted)" },
    ],
    funnel: [
      { l: "Total Calls", v: 1284, c: "var(--color-aiva-accent)" },
      { l: "Answered", v: 947, c: "var(--color-aiva-blue)" },
      { l: "Interested", v: 483, c: "var(--color-aiva-amber)" },
      { l: "Leads", v: 347, c: "var(--color-aiva-green)" },
      { l: "Converted", v: 94, c: "var(--color-aiva-green2)" },
    ],
    revData: [4200, 5100, 3800, 6200, 5800, 7100, 8200],
    revLabel: "Revenue Attributed",
    iq: 72,
    usage: [
      { i: "📞", l: "Voice Minutes", u: 2841, t: 4000, c: "var(--color-aiva-accent)" },
      { i: "💬", l: "WhatsApp", u: 5820, t: 8000, c: "var(--color-aiva-green)" },
      { i: "📱", l: "SMS", u: 2100, t: 5000, c: "var(--color-aiva-blue)" },
      { i: "📧", l: "Email", u: 31200, t: 50000, c: "var(--color-aiva-amber)" },
    ],
    billing: "$1,599.00",
    iqColor: "var(--color-aiva-amber)",
  },
  agency: {
    name: "Growth Agency",
    avatar: "🏢",
    gradient: "linear-gradient(135deg,#0f6e56,#059669)",
    badge: "AGENCY",
    plan: "Agency Pro · $2,199/mo",
    kpis: [
      { l: "Active Clients", v: "8", d: "+2 this month", dir: "up", c: "text-[#c4b0ff]" },
      { l: "Total Calls (All)", v: "9,442", d: "+28%", dir: "up", c: "text-[var(--color-aiva-green)]" },
      { l: "Agency MRR", v: "$7,992", d: "+$999", dir: "up", c: "text-[var(--color-aiva-amber)]" },
      { l: "Avg Client IQ", v: "81%", d: "+9pp", dir: "up", c: "text-[var(--color-aiva-blue)]" },
    ],
    callData: [
      { o: 380, i: 210 },
      { o: 440, i: 260 },
      { o: 510, i: 290 },
      { o: 480, i: 310 },
      { o: 620, i: 340 },
      { o: 700, i: 380 },
      { o: 660, i: 420 },
    ],
    outcomes: [
      { l: "Interested", p: 41, c: "var(--color-aiva-green)" },
      { l: "Not Interested", p: 26, c: "var(--color-aiva-red)" },
      { l: "Callback", p: 21, c: "var(--color-aiva-amber)" },
      { l: "No Answer", p: 12, c: "var(--color-aiva-muted)" },
    ],
    funnel: [
      { l: "Total Calls", v: 9442, c: "var(--color-aiva-accent)" },
      { l: "Answered", v: 7180, c: "var(--color-aiva-blue)" },
      { l: "Qualified", v: 3890, c: "var(--color-aiva-amber)" },
      { l: "Leads", v: 2841, c: "var(--color-aiva-green)" },
      { l: "Converted", v: 941, c: "var(--color-aiva-green2)" },
    ],
    revData: [5200, 5800, 6400, 6400, 7200, 7200, 7992],
    revLabel: "Agency MRR",
    iq: 88,
    usage: [
      { i: "📞", l: "Voice (Pool)", u: 21400, t: 24000, c: "var(--color-aiva-amber)" },
      { i: "💬", l: "WhatsApp (Pool)", u: 11200, t: 16000, c: "var(--color-aiva-green)" },
      { i: "📱", l: "SMS (Pool)", u: 6100, t: 8000, c: "var(--color-aiva-blue)" },
      { i: "📧", l: "Email (Pool)", u: 42000, t: 60000, c: "var(--color-aiva-accent2)" },
    ],
    billing: "$2,199.00",
    iqColor: "var(--color-aiva-green)",
  },
  b2b: {
    name: "TechCorp B2B",
    avatar: "💼",
    gradient: "linear-gradient(135deg,#1d4ed8,#0891b2)",
    badge: "B2B",
    plan: "Enterprise · $3,999/mo",
    kpis: [
      { l: "Total Calls", v: "4,188", d: "+23%", dir: "up", c: "text-[#c4b0ff]" },
      { l: "Appointments Set", v: "241", d: "+38%", dir: "up", c: "text-[var(--color-aiva-blue)]" },
      { l: "Pipeline Value", v: "$1.2M", d: "+$180K", dir: "up", c: "text-[var(--color-aiva-green)]" },
      { l: "First Call Res.", v: "68%", d: "+11pp", dir: "up", c: "text-[var(--color-aiva-amber)]" },
    ],
    callData: [
      { o: 180, i: 90 },
      { o: 220, i: 110 },
      { o: 195, i: 88 },
      { o: 280, i: 140 },
      { o: 310, i: 160 },
      { o: 380, i: 190 },
      { o: 350, i: 180 },
    ],
    outcomes: [
      { l: "Qualified Lead", p: 34, c: "var(--color-aiva-green)" },
      { l: "Not Qualified", p: 28, c: "var(--color-aiva-red)" },
      { l: "Appointment", p: 22, c: "var(--color-aiva-blue)" },
      { l: "No Answer", p: 16, c: "var(--color-aiva-muted)" },
    ],
    funnel: [
      { l: "Total Calls", v: 4188, c: "var(--color-aiva-accent)" },
      { l: "Answered", v: 3210, c: "var(--color-aiva-blue)" },
      { l: "Qualified", v: 1480, c: "var(--color-aiva-amber)" },
      { l: "Appointments", v: 812, c: "var(--color-aiva-green)" },
      { l: "Won Deals", v: 241, c: "var(--color-aiva-green2)" },
    ],
    revData: [180000, 210000, 195000, 280000, 310000, 380000, 420000],
    revLabel: "Pipeline Value",
    iq: 91,
    usage: [
      { i: "📞", l: "Voice Minutes", u: 28100, t: 30000, c: "var(--color-aiva-red)" },
      { i: "💬", l: "WhatsApp", u: 12000, t: 20000, c: "var(--color-aiva-green)" },
      { i: "📱", l: "SMS", u: 8800, t: 15000, c: "var(--color-aiva-blue)" },
      { i: "📧", l: "Email", u: 88000, t: 150000, c: "var(--color-aiva-amber)" },
    ],
    billing: "$3,999.00",
    iqColor: "var(--color-aiva-green)",
  },
};

export const leadsData = [
  { name: "Sarah Mitchell", phone: "+1 (555) 021-4839", ch: "📞 Voice", status: "Interested", score: 92, dur: "5:22", time: "2m ago" },
  { name: "James Rodriguez", phone: "+1 (555) 847-2011", ch: "💬 WhatsApp", status: "Callback", score: 74, dur: "3:08", time: "14m ago" },
  { name: "Emily Chen", phone: "+1 (555) 334-9021", ch: "📞 Voice", status: "Converted", score: 98, dur: "7:44", time: "31m ago" },
  { name: "Michael Torres", phone: "+1 (555) 112-8833", ch: "📱 SMS", status: "Not Interested", score: 22, dur: "1:12", time: "1h ago" },
  { name: "Aisha Johnson", phone: "+1 (555) 990-4421", ch: "📞 Voice", status: "Interested", score: 87, dur: "6:01", time: "2h ago" },
  { name: "David Kim", phone: "+1 (555) 778-3311", ch: "💬 WhatsApp", status: "Converted", score: 95, dur: "4:33", time: "3h ago" },
  { name: "Maria Lopez", phone: "+1 (555) 234-5678", ch: "📞 Voice", status: "Callback", score: 68, dur: "2:44", time: "4h ago" },
];

export const clientsData = [
  { name: "Moda Express", industry: "Ecommerce", calls: "2,841", rev: "$2,199", iq: 94, status: "Active" },
  { name: "Dental Plus", industry: "Healthcare", calls: "1,922", rev: "$999", iq: 88, status: "Active" },
  { name: "HomePro Realty", industry: "Real Estate", calls: "1,544", rev: "$1,599", iq: 72, status: "Active" },
  { name: "EduFlex Online", industry: "Education", calls: "1,211", rev: "$699", iq: 65, status: "Needs attention" },
  { name: "FinVault", industry: "Finance", calls: "988", rev: "$1,599", iq: 91, status: "Active" },
  { name: "FitLife Gym", industry: "Fitness", calls: "542", rev: "$269", iq: 58, status: "Needs attention" },
  { name: "LegalPro", industry: "Legal", calls: "394", rev: "$699", iq: 83, status: "Active" },
  { name: "TravelNow", industry: "Travel", calls: "211", rev: "$269", iq: 47, status: "Onboarding" },
];

export const recentCalls = [
  { name: "Sarah Mitchell", meta: "Interested · Voice", dur: "5:22", time: "2m ago", bg: "var(--color-aiva-green-bg)", ic: "📞", sc: "text-[var(--color-aiva-green)]" },
  { name: "James Rodriguez", meta: "Callback · WhatsApp", dur: "3:08", time: "14m ago", bg: "var(--color-aiva-amber-bg)", ic: "💬", sc: "text-[var(--color-aiva-amber)]" },
  { name: "Emily Chen", meta: "Converted · Voice", dur: "7:44", time: "31m ago", bg: "var(--color-aiva-blue-bg)", ic: "📞", sc: "text-[var(--color-aiva-blue)]" },
  { name: "Michael Torres", meta: "Not Interested · SMS", dur: "1:12", time: "1h ago", bg: "var(--color-aiva-red-bg)", ic: "📱", sc: "text-[var(--color-aiva-red)]" },
  { name: "Aisha Johnson", meta: "Interested · Voice", dur: "6:01", time: "2h ago", bg: "var(--color-aiva-green-bg)", ic: "📞", sc: "text-[var(--color-aiva-green)]" },
];

export const healthData = [
  { l: "Uptime", v: "99.9%", f: 99, c: "var(--color-aiva-green)" },
  { l: "Avg Latency", v: "1.2s", f: 88, c: "var(--color-aiva-blue)" },
  { l: "Accuracy", v: "94%", f: 94, c: "var(--color-aiva-accent2)" },
  { l: "CSAT", v: "4.7/5", f: 94, c: "var(--color-aiva-amber)" },
];

export const activity = [
  { d: "var(--color-aiva-green)", t: "<strong>Emily Chen</strong> converted after 7m 44s call", time: "31m" },
  { d: "var(--color-aiva-accent2)", t: "FAQ updated — <strong>3 new answers</strong> added", time: "1h" },
  { d: "var(--color-aiva-blue)", t: "<strong>HubSpot</strong> synced — 12 new contacts pushed", time: "2h" },
  { d: "var(--color-aiva-amber)", t: "Campaign <strong>\"Summer Sale\"</strong> completed — 320 calls", time: "5h" },
  { d: "var(--color-aiva-red)", t: "Overage alert — voice at <strong>89%</strong> of plan", time: "8h" },
];

export const integrations = {
  CRM: [
    { logo: "🟠", name: "HubSpot", desc: "Contacts, deals & notes", connected: true },
    { logo: "☁️", name: "Salesforce", desc: "Enterprise CRM", connected: false },
    { logo: "🟣", name: "Pipedrive", desc: "Sales pipeline", connected: false },
    { logo: "🟡", name: "GoHighLevel", desc: "Agency CRM", connected: false },
    { logo: "🔵", name: "Zoho CRM", desc: "All-in-one CRM", connected: false },
    { logo: "⚫", name: "Notion / Sheets", desc: "Custom database", connected: false },
  ],
  Comm: [
    { logo: "📱", name: "Twilio", desc: "SMS & Voice infrastructure", connected: true },
    { logo: "💚", name: "WhatsApp API", desc: "Meta Business API", connected: true },
    { logo: "📧", name: "SendGrid", desc: "Email delivery", connected: true },
    { logo: "🔔", name: "Slack", desc: "Team notifications", connected: false },
  ],
  Other: [
    { logo: "🛍️", name: "Shopify", desc: "Ecommerce store", connected: false },
    { logo: "🛒", name: "WooCommerce", desc: "WordPress store", connected: false },
    { logo: "🟠", name: "MercadoLibre", desc: "LATAM marketplace", connected: false },
    { logo: "📊", name: "Zapier", desc: "Workflow automation", connected: false },
  ],
};

export const faqs = [
  { q: "Do you ship internationally?", a: "Yes, we ship to 40+ countries. Delivery 7–14 days." },
  { q: "What payment methods do you accept?", a: "Visa, Mastercard, PayPal, Apple Pay, bank transfer." },
  { q: "How do I return a product?", a: "30-day returns. Item must be unused with original tags." },
  { q: "Do you have plus sizes?", a: "Yes, XS to 3XL on most styles." },
  { q: "Can I track my order?", a: "Yes, tracking link sent by WhatsApp when shipped." },
];

export const kbDocs = [
  { ic: "📄", name: "product_catalog_2026.pdf", size: "2.4 MB", status: "Trained" },
  { ic: "📊", name: "pricing_sheet.xlsx", size: "890 KB", status: "Trained" },
  { ic: "🔗", name: "fashionexpress.com", size: "URL", status: "Trained" },
  { ic: "📋", name: "return_policy.docx", size: "340 KB", status: "Trained" },
];

export const iqSegments = [
  { ic: "🏢", l: "Company Data", p: 100, pts: 20, c: "var(--color-aiva-green)" },
  { ic: "📚", l: "Documents & Website", p: 80, pts: 24, c: "var(--color-aiva-amber)", alert: "Upload pricing sheet for +6 pts" },
  { ic: "💬", l: "FAQ", p: 60, pts: 15, c: "var(--color-aiva-amber)", alert: "Add 3 more answers for +10 pts" },
  { ic: "📡", l: "Channels", p: 100, pts: 10, c: "var(--color-aiva-green)" },
  { ic: "🔗", l: "CRM Connected", p: 100, pts: 15, c: "var(--color-aiva-green)" },
];

export const invoices = [
  { id: "INV-0042", date: "May 15, 2026", amount: "$1,599.00", status: "Paid" },
  { id: "INV-0041", date: "Apr 15, 2026", amount: "$1,599.00", status: "Paid" },
  { id: "INV-0040", date: "Mar 15, 2026", amount: "$1,742.10", status: "Paid" },
  { id: "INV-0039", date: "Feb 15, 2026", amount: "$1,599.00", status: "Paid" },
  { id: "INV-0038", date: "Jan 15, 2026", amount: "$1,599.00", status: "Paid" },
];

export const plans = [
  { name: "Starter", price: "$269", cycle: "/mo", feats: ["700 voice min", "1,000 WSP msgs", "500 SMS", "5,000 emails"], current: false },
  { name: "Business", price: "$699", cycle: "/mo", feats: ["2,000 voice min", "3,000 WSP msgs", "2,000 SMS", "20,000 emails"], current: false },
  { name: "Growth", price: "$1,599", cycle: "/mo", feats: ["4,000 voice min", "8,000 WSP msgs", "5,000 SMS", "50,000 emails"], current: true },
  { name: "Enterprise", price: "$3,999", cycle: "/mo", feats: ["9,000 voice min", "20,000 WSP msgs", "15,000 SMS", "150,000 emails"], current: false },
];
