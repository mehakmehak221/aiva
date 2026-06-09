"use client";
import React, { useState, useEffect } from "react";

const WEIGHTS = { empresa: 20, docs: 30, faq: 25, canales: 10, crm: 15 };

const INITIAL_FAQ = [
  { q: "Do you ship across the US?", a: "Yes, we ship nationwide. Major cities in 1–2 business days, everywhere else in 3–5 days." },
  { q: "What payment methods do you accept?", a: "We accept debit/credit cards, PayPal, Apple Pay, Google Pay, and bank transfer." },
  { q: "How can I return or exchange a product?", a: "You have 30 days for returns. Item must be unused with tags. Contact us via WhatsApp or email." },
  { q: "Do you have plus sizes?", a: "Yes, we carry sizes XS to 3XL on most styles." },
  { q: "Can I track my order?", a: "Yes, we send your tracking number via WhatsApp and email once your order ships." },
];

const FILE_EXAMPLES = [
  { icon: "📄", name: "catalogo_productos.pdf", size: "2.4 MB", pts: 15 },
  { icon: "📊", name: "lista_precios_2026.xlsx", size: "890 KB", pts: 8 },
  { icon: "📋", name: "politica_devoluciones.docx", size: "340 KB", pts: 7 },
];

const CRM_NAMES: Record<string, string> = { hubspot: "HubSpot", sf: "Salesforce", pipe: "Pipedrive", ghl: "GoHighLevel", zoho: "Zoho CRM", notion: "Notion / Sheets" };

export default function OnboardingPage() {
  const [state, setState] = useState({ empresa: 0, docs: 0, faq: 0, canales: 0, crm: 0 });
  const [faqItems, setFaqItems] = useState(INITIAL_FAQ);
  const [fileList, setFileList] = useState<any[]>([]);
  const [channelVoz, setChannelVoz] = useState(true);
  const [channelWsp, setChannelWsp] = useState(true);
  const [channelSms, setChannelSms] = useState(false);
  const [channelEmail, setChannelEmail] = useState(false);
  const [selectedCrm, setSelectedCrm] = useState("hubspot");
  const [activeSection, setActiveSection] = useState("s-empresa");

  // Fake API states
  const [empresaSaving, setEmpresaSaving] = useState(false);
  const [empresaDone, setEmpresaDone] = useState(false);
  const [empresaError, setEmpresaError] = useState(false);

  const [docsSaving, setDocsSaving] = useState(false);
  const [docsDone, setDocsDone] = useState(false);
  const [docsMessage, setDocsMessage] = useState("");

  const [faqSaving, setFaqSaving] = useState(false);
  const [faqDone, setFaqDone] = useState(false);
  const [faqError, setFaqError] = useState(false);

  const [canalesSaving, setCanalesSaving] = useState(false);
  const [canalesDone, setCanalesDone] = useState(false);
  const [canalesError, setCanalesError] = useState(false);

  const [crmSaving, setCrmSaving] = useState(false);
  const [crmDone, setCrmDone] = useState(false);
  const [crmError, setCrmError] = useState(false);

  const [urlInput, setUrlInput] = useState("");
  const [crmKey, setCrmKey] = useState("");

  const [formEmpresa, setFormEmpresa] = useState({ nombre: "", industria: "", pais: "", desc: "", web: "" });

  const activeChannelsCount = [channelVoz, channelWsp, channelSms, channelEmail].filter(Boolean).length;
  const completeFaqCount = faqItems.filter((f) => f.q.length > 5 && f.a.length > 10).length;

  useEffect(() => {
    // Initial evaluation for defaults
    evaluateFaq();
    evaluateChannels();
  }, [channelVoz, channelWsp, channelSms, channelEmail, faqItems]);

  const evaluateFaq = () => {
    const complete = faqItems.filter((f) => f.q.length > 5 && f.a.length > 10).length;
    let s = 0;
    if (complete === 0) s = 0;
    else if (complete < 3) s = 25;
    else if (complete < 5) s = 60;
    else if (complete < 8) s = 85;
    else s = 100;
    setState((prev) => ({ ...prev, faq: s }));
  };

  const evaluateChannels = () => {
    const active = [channelVoz, channelWsp, channelSms, channelEmail].filter(Boolean).length;
    setState((prev) => ({ ...prev, canales: active >= 1 ? 100 : 0 }));
  };

  const calcScore = () => {
    let total = 0;
    (Object.keys(WEIGHTS) as Array<keyof typeof WEIGHTS>).forEach((k) => {
      total += (state[k] / 100) * WEIGHTS[k];
    });
    return Math.round(total);
  };

  const score = calcScore();
  const ringOffset = 238.76 - (score / 100) * 238.76;

  let ringColor = "var(--color-aiva-red)";
  let statusTxt = "Needs configuration";
  let tagTxt = "🔴 Not configured";
  let tagClass = "bg-[var(--color-aiva-accent)]/10 text-[var(--color-aiva-accent2)] border-[var(--color-aiva-accent)]/20";

  if (score >= 100) {
    ringColor = "var(--color-aiva-green)"; statusTxt = "Optimal for your business!"; tagTxt = "✅ 100% Ready"; tagClass = "bg-[var(--color-aiva-green-bg)] text-[var(--color-aiva-green)] border-[var(--color-aiva-green)]/20";
  } else if (score >= 75) {
    ringColor = "#a3e635"; statusTxt = "Almost optimal"; tagTxt = "🟢 Almost ready"; tagClass = "bg-[var(--color-aiva-green-bg)] text-[var(--color-aiva-green)] border-[var(--color-aiva-green)]/20";
  } else if (score >= 40) {
    ringColor = "var(--color-aiva-amber)"; statusTxt = "Partial configuration"; tagTxt = "🟡 Partially ready"; tagClass = "bg-[var(--color-aiva-amber-bg)] text-[var(--color-aiva-amber)] border-[var(--color-aiva-amber)]/20";
  }

  const getMissing = () => {
    const missing = [];
    if (state.empresa < 100) missing.push({ icon: "🏢", txt: "Complete your company details", sec: "s-empresa" });
    if (state.docs < 100) missing.push({ icon: "📚", txt: "Upload documents or add your website", sec: "s-docs" });
    if (state.faq < 100) missing.push({ icon: "💬", txt: "Add at least 5 FAQ questions", sec: "s-faq" });
    if (state.canales < 100) missing.push({ icon: "📡", txt: "Activate at least 1 channel", sec: "s-canales" });
    if (state.crm < 100) missing.push({ icon: "🔗", txt: "Connect your CRM to save leads", sec: "s-crm" });
    return missing;
  };
  const missingList = getMissing();

  const handleSaveEmpresa = () => {
    let s = 0;
    if (formEmpresa.nombre) s += 30;
    if (formEmpresa.industria) s += 25;
    if (formEmpresa.pais) s += 15;
    if (formEmpresa.desc.length > 20) s += 30;
    s = Math.min(s, 100);

    setState((prev) => ({ ...prev, empresa: s }));

    if (s >= 80) {
      setEmpresaError(false);
      setEmpresaSaving(true);
      setTimeout(() => {
        setEmpresaSaving(false);
        setEmpresaDone(true);
        setActiveSection("s-docs");
      }, 1800);
    } else {
      setEmpresaError(true);
    }
  };

  const simulateUpload = () => {
    const idx = fileList.filter((f) => !f.isUrl).length;
    if (idx >= FILE_EXAMPLES.length) return;
    const f = FILE_EXAMPLES[idx];
    setFileList((prev) => [...prev, f]);
    const newPts = idx === 0 ? 60 : idx === 1 ? 85 : 100;

    setDocsSaving(true);
    setDocsMessage(`Processing "${f.name}" — extracting products, pricing and policies…`);

    setTimeout(() => {
      setState((prev) => ({ ...prev, docs: newPts }));
      setDocsSaving(false);
      if (newPts >= 100) {
        setDocsDone(true);
        setActiveSection("s-faq");
      }
    }, 1600);
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    const newPts = Math.min(state.docs + 30, 100);
    setFileList((prev) => [...prev, { icon: "🔗", name: urlInput, size: "URL", isUrl: true }]);
    const val = urlInput;
    setUrlInput("");
    setDocsSaving(true);
    setDocsMessage(`Scanning "${val}" — extracting catalog and content…`);
    setTimeout(() => {
      setState((prev) => ({ ...prev, docs: newPts }));
      setDocsSaving(false);
      if (newPts >= 100) {
        setDocsDone(true);
        setActiveSection("s-faq");
      }
    }, 2000);
  };

  const handleFaqChange = (idx: number, field: "q" | "a", val: string) => {
    const updated = [...faqItems];
    updated[idx][field] = val;
    setFaqItems(updated);
  };

  const handleSaveFaq = () => {
    if (completeFaqCount < 5) {
      setFaqError(true);
      return;
    }
    setFaqError(false);
    setFaqSaving(true);
    setTimeout(() => {
      setState((prev) => ({ ...prev, faq: 100 }));
      setFaqSaving(false);
      setFaqDone(true);
      setActiveSection("s-canales");
    }, 2000);
  };

  const handleSaveCanales = () => {
    if (activeChannelsCount < 1) {
      setCanalesError(true);
      return;
    }
    setCanalesError(false);
    setCanalesSaving(true);
    setTimeout(() => {
      setCanalesSaving(false);
      setCanalesDone(true);
      setActiveSection("s-crm");
    }, 1500);
  };

  const handleSaveCrm = () => {
    if (crmKey.length < 8) {
      setCrmError(true);
      return;
    }
    setCrmError(false);
    setCrmSaving(true);
    setTimeout(() => {
      setState((prev) => ({ ...prev, crm: 100 }));
      setCrmSaving(false);
      setCrmDone(true);
    }, 2000);
  };

  const handleSkipCrm = () => {
    setState((prev) => ({ ...prev, crm: 0 }));
    setActiveSection("");
  };

  return (
    <div className="max-w-[680px] mx-auto pt-6 px-5 pb-[60px] relative z-10">
      {/* LOGO */}
      <div className="font-syne font-extrabold text-[22px] tracking-[-0.5px] mb-7 flex items-center gap-[10px]">
        AI<span className="text-[var(--color-aiva-accent2)]">VA</span>
        <div className="w-2 h-2 rounded-full bg-[var(--color-aiva-green)] shadow-[0_0_8px_var(--color-aiva-green)] animate-pulse"></div>
      </div>

      {/* BRAIN SCORE CARD */}
      <div className="bg-[var(--color-aiva-s1)] border border-[var(--color-aiva-border)] rounded-[20px] p-6 mb-6 relative overflow-hidden before:content-[''] before:absolute before:-top-[60px] before:-right-[60px] before:w-[200px] before:h-[200px] before:rounded-full before:bg-[radial-gradient(circle,rgba(124,92,252,0.08),transparent_70%)] before:pointer-events-none">
        <div className="flex items-start justify-between mb-5 gap-4">
          <div>
            <div className="text-[11px] font-medium tracking-widest uppercase text-[var(--color-aiva-muted)] mb-1">Agent Knowledge</div>
            <div className="font-syne text-[17px] font-bold">How ready is<br />your AI agent?</div>
            <div className="mt-2.5 flex gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wider border ${tagClass}`}>
                {tagTxt}
              </span>
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-center gap-1">
            <div className="relative w-[88px] h-[88px]">
              <svg viewBox="0 0 88 88" width="88" height="88" className="-rotate-90">
                <circle cx="44" cy="44" r="38" fill="none" stroke="var(--color-aiva-border2)" strokeWidth="6" />
                <circle cx="44" cy="44" r="38" fill="none" strokeWidth="6" strokeLinecap="round" className="transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]" strokeDasharray="238.76" strokeDashoffset={ringOffset} stroke={ringColor} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="font-syne text-[22px] font-extrabold leading-none transition-colors duration-500" style={{ color: ringColor }}>{score}%</div>
                <div className="text-[9px] tracking-wider uppercase text-[var(--color-aiva-muted)] mt-px">IQ</div>
              </div>
            </div>
            <div className="text-[11px] font-medium text-center transition-colors duration-500" style={{ color: ringColor }}>{statusTxt}</div>
          </div>
        </div>

        {/* MISSING BOX */}
        {missingList.length > 0 && score > 0 && (
          <div className="bg-[var(--color-aiva-red-bg)] border border-[var(--color-aiva-red)]/25 rounded-[14px] p-4 mb-5">
            <div className="flex items-center gap-2 font-syne text-[14px] font-bold text-[#f87171] mb-2.5">
              ⚠️ Missing key information
            </div>
            <div className="flex flex-col gap-2">
              {missingList.map((m, i) => (
                <div key={i} onClick={() => setActiveSection(m.sec)} className="flex items-center gap-2 text-[12px] text-red-400/90 py-2 px-2.5 bg-red-500/10 rounded-lg cursor-pointer hover:bg-red-500/20 transition-colors">
                  <span>{m.icon}</span>
                  <span className="flex-1">{m.txt}</span>
                  <span className="text-[12px] shrink-0">→</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEGMENT BARS */}
        <div className="flex flex-col gap-3">
          {(Object.keys(WEIGHTS) as Array<keyof typeof WEIGHTS>).map((k) => {
            const val = state[k];
            const earned = Math.round((val / 100) * WEIGHTS[k]);
            const isDone = val >= 100;
            const isPartial = val > 0 && val < 100;

            const segStyles = isDone ? "border-emerald-400/25 bg-emerald-400/5" : isPartial ? "border-amber-500/20" : "hover:border-[var(--color-aiva-border2)]";
            const barColor = isDone ? "var(--color-aiva-green)" : isPartial ? "var(--color-aiva-amber)" : "var(--color-aiva-red)";
            const ptsColor = isDone ? "var(--color-aiva-green)" : isPartial ? "var(--color-aiva-amber)" : "var(--color-aiva-muted)";

            let name, desc, icon, alertTxt, alertBtn;
            if (k === "empresa") { name = "Company details"; desc = "Name, industry, business description"; icon = "🏢"; alertTxt = "No data de empresa el agente no sabe de quién habla. Add nombre, industria y descripción para subir +20 pts."; alertBtn = "Complete now"; }
            else if (k === "docs") { name = "Documents and website"; desc = "PDF, PPTX, DOCX, XLSX or site/store URL"; icon = "📚"; alertTxt = "Without documents, the agent doesn't know your products or prices. Upload at least 1 file or your URL for +30 pts."; alertBtn = "Upload documents"; }
            else if (k === "faq") { name = "Business FAQ"; desc = "Frequently asked questions from your customers"; icon = "💬"; alertTxt = "Without FAQ, the agent will respond generically. Add at least 5 real customer questions for +25 pts."; alertBtn = "Add FAQ"; }
            else if (k === "canales") { name = "Active channels"; desc = "Voice, WhatsApp, SMS, Email"; icon = "📡"; alertTxt = "Activate at least 1 channel for the agent to operate. No channel means no communication. +10 pts."; alertBtn = "Activate channels"; }
            else { name = "CRM connected"; desc = "HubSpot, Salesforce, Pipedrive, GHL or other"; icon = "🔗"; alertTxt = "Without a CRM, the agent won't save the leads it generates. Connect your tool for +15 pts."; alertBtn = "Connect CRM"; }

            return (
              <div key={k} className={`bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-xl p-3.5 cursor-pointer transition-colors ${segStyles}`} onClick={() => setActiveSection(`s-${k}`)}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-[18px] shrink-0 w-8 text-center">{icon}</div>
                  <div className="flex-1">
                    <div className="text-[13px] font-medium mb-px">{name}</div>
                    <div className="text-[11px] text-[var(--color-aiva-muted)] leading-relaxed">{desc}</div>
                  </div>
                  <div className="font-syne text-[13px] font-bold shrink-0" style={{ color: ptsColor }}>+{earned} pts</div>
                </div>
                <div className="h-[5px] bg-[var(--color-aiva-border)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${val}%`, backgroundColor: barColor }}></div>
                </div>
                {val === 0 && (
                  <div className="mt-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-[12px] text-amber-400 leading-snug flex items-start gap-2">
                    <div className="shrink-0 mt-px">💡</div>
                    <div>
                      {alertTxt}<br />
                      <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-medium text-[var(--color-aiva-accent2)] bg-[var(--color-aiva-accent)]/10 border border-[var(--color-aiva-accent)]/20 px-2.5 py-1 rounded-md cursor-pointer hover:bg-[var(--color-aiva-accent)]/20 transition-colors" onClick={(e) => { e.stopPropagation(); setActiveSection(`s-${k}`); }}>➜ {alertBtn}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTIONS */}
      {/* 1. Empresa */}
      <SectionCard
        id="s-empresa" title="Your company" sub="Name, industry and description · +20 pts" num="1"
        isActive={activeSection === "s-empresa"} isDone={empresaDone}
        onClick={() => setActiveSection(activeSection === "s-empresa" ? "" : "s-empresa")}
      >
        <div className="h-4"></div>
        <div className="mb-3">
          <label className="block text-[11px] font-medium text-[var(--color-aiva-muted)] tracking-wider uppercase mb-1.5">Company name</label>
          <input type="text" placeholder="Ex: Fashion Express USA" className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-lg p-3 font-dm-sans text-[13px] text-[var(--color-aiva-text)] outline-none focus:border-[var(--color-aiva-accent)] focus:ring-3 focus:ring-[var(--color-aiva-glow)] transition-all placeholder:text-[var(--color-aiva-muted2)]"
            value={formEmpresa.nombre} onChange={(e) => { setFormEmpresa({ ...formEmpresa, nombre: e.target.value }); setEmpresaError(false); }} />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-[11px] font-medium text-[var(--color-aiva-muted)] tracking-wider uppercase mb-1.5">Industry</label>
            <select className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-lg p-3 font-dm-sans text-[13px] text-[var(--color-aiva-text)] outline-none focus:border-[var(--color-aiva-accent)] focus:ring-3 focus:ring-[var(--color-aiva-glow)] transition-all"
              value={formEmpresa.industria} onChange={(e) => { setFormEmpresa({ ...formEmpresa, industria: e.target.value }); setEmpresaError(false); }}>
              <option value="">Select...</option>
              <option>🛍️ Ecommerce</option>
              <option>🏥 Healthcare</option>
              <option>🏠 Real Estate</option>
              <option>📚 Education</option>
              <option>🏢 Marketing Agency</option>
              <option>💰 Finance / BFSI</option>
              <option>🏨 Hospitality</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-[var(--color-aiva-muted)] tracking-wider uppercase mb-1.5">Main country</label>
            <select className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-lg p-3 font-dm-sans text-[13px] text-[var(--color-aiva-text)] outline-none focus:border-[var(--color-aiva-accent)] focus:ring-3 focus:ring-[var(--color-aiva-glow)] transition-all"
              value={formEmpresa.pais} onChange={(e) => { setFormEmpresa({ ...formEmpresa, pais: e.target.value }); setEmpresaError(false); }}>
              <option value="">Select...</option>
              <option>🇲🇽 Mexico</option>
              <option>🇨🇴 Colombia</option>
              <option>🇦🇷 Argentina</option>
              <option>🇧🇷 Brazil</option>
              <option>🇺🇸 United States</option>
              <option>🇪🇸 Spain</option>
              <option>Otro</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-[11px] font-medium text-[var(--color-aiva-muted)] tracking-wider uppercase mb-1.5">What does your business do? (1–2 lines)</label>
          <textarea rows={2} placeholder="Ex: We sell women's clothing online with shipping across the US. 200+ SKUs and 24/7 support." className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-lg p-3 font-dm-sans text-[13px] text-[var(--color-aiva-text)] outline-none focus:border-[var(--color-aiva-accent)] focus:ring-3 focus:ring-[var(--color-aiva-glow)] transition-all placeholder:text-[var(--color-aiva-muted2)] resize-none"
            value={formEmpresa.desc} onChange={(e) => { setFormEmpresa({ ...formEmpresa, desc: e.target.value }); setEmpresaError(false); }}></textarea>
        </div>
        <div className="mb-3">
          <label className="block text-[11px] font-medium text-[var(--color-aiva-muted)] tracking-wider uppercase mb-1.5">Website (optional)</label>
          <input type="text" placeholder="https://tutienda.com" className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-lg p-3 font-dm-sans text-[13px] text-[var(--color-aiva-text)] outline-none focus:border-[var(--color-aiva-accent)] focus:ring-3 focus:ring-[var(--color-aiva-glow)] transition-all placeholder:text-[var(--color-aiva-muted2)]"
            value={formEmpresa.web} onChange={(e) => setFormEmpresa({ ...formEmpresa, web: e.target.value })} />
        </div>

        {empresaError && <div className="mt-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-[12px] text-amber-400 flex items-start gap-2"><div className="shrink-0">💡</div><div>Complete all fields so AIVA can configure itself correctly.</div></div>}
        {empresaSaving && <div className="flex items-center gap-2.5 bg-[var(--color-aiva-accent)]/10 border border-[var(--color-aiva-accent)]/20 rounded-lg p-3 text-[12px] text-[var(--color-aiva-accent2)] mt-2.5"><div className="w-3.5 h-3.5 border-2 border-[var(--color-aiva-accent)]/20 border-t-[var(--color-aiva-accent2)] rounded-full animate-spin shrink-0"></div>AIVA is reading your business and generating the agent profile…</div>}
        {empresaDone && <div className="flex items-center gap-2 bg-[var(--color-aiva-green-bg)] border border-[var(--color-aiva-green)]/25 rounded-lg p-3 text-[12px] text-[var(--color-aiva-green)] mt-2.5">✅ Profile generated — the agent knows who you are and what to talk about</div>}

        <button className="w-full p-3.5 rounded-xl border-none font-syne text-[14px] font-bold cursor-pointer bg-gradient-to-br from-[var(--color-aiva-accent)] to-[#9b5cfc] text-white shadow-[0_4px_20px_rgba(124,92,252,0.3)] transition-all hover:-translate-y-px hover:shadow-[0_6px_28px_rgba(124,92,252,0.45)] active:translate-y-0 mt-2 tracking-wide" onClick={handleSaveEmpresa}>Save and continue →</button>
      </SectionCard>

      {/* 2. Docs */}
      <SectionCard
        id="s-docs" title="Documents and website" sub="Upload archivos o pega una URL · +30 pts" num="2"
        isActive={activeSection === "s-docs"} isDone={docsDone}
        onClick={() => setActiveSection(activeSection === "s-docs" ? "" : "s-docs")}
      >
        <div className="h-4"></div>
        <div className="border-[1.5px] border-dashed border-[var(--color-aiva-border2)] rounded-xl p-5 text-center cursor-pointer transition-colors bg-[var(--color-aiva-s2)] mb-2.5 hover:border-[var(--color-aiva-accent)] hover:bg-[var(--color-aiva-accent)]/5" onClick={simulateUpload}>
          <div className="text-3xl mb-2">📂</div>
          <div className="font-syne text-[14px] font-semibold mb-1">Drag your files here</div>
          <div className="text-[11px] text-[var(--color-aiva-muted)] mb-3">Catalogs, pricing, policies, presentations…</div>
          <div className="flex gap-1.5 justify-center flex-wrap">
            {["PDF", "PPTX", "DOCX", "XLSX", "CSV", "TXT"].map(ext => (
              <span key={ext} className="text-[10px] font-semibold px-2 py-1 rounded bg-white/5 text-[var(--color-aiva-muted)] border border-[var(--color-aiva-border)] tracking-wider">{ext}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mb-2.5">
          <input type="text" placeholder="https://yourstore.com/products  or  Notion  or  Drive…" className="flex-1 bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-lg px-3.5 py-2.5 font-dm-sans text-[13px] text-[var(--color-aiva-text)] outline-none focus:border-[var(--color-aiva-accent)] focus:ring-3 focus:ring-[var(--color-aiva-glow)] transition-colors placeholder:text-[var(--color-aiva-muted2)]" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} />
          <button className="bg-[var(--color-aiva-accent)] border-none rounded-lg px-4 py-2.5 text-white font-syne text-[12px] font-bold cursor-pointer transition-all hover:bg-[#6d4ef0] hover:-translate-y-px whitespace-nowrap" onClick={handleAddUrl}>+ URL</button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {fileList.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-emerald-400/5 border border-emerald-400/15 rounded-lg px-3 py-2 text-[12px] animate-[fadeDown_0.3s_ease]">
              <span className="text-[15px] shrink-0">{f.icon}</span>
              <span className="flex-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis">{f.name}</span>
              <span className="text-[var(--color-aiva-muted)] text-[11px] shrink-0">{f.size}</span>
            </div>
          ))}
        </div>

        {docsSaving && <div className="flex items-center gap-2.5 bg-[var(--color-aiva-accent)]/10 border border-[var(--color-aiva-accent)]/20 rounded-lg p-3 text-[12px] text-[var(--color-aiva-accent2)] mt-2.5"><div className="w-3.5 h-3.5 border-2 border-[var(--color-aiva-accent)]/20 border-t-[var(--color-aiva-accent2)] rounded-full animate-spin shrink-0"></div>{docsMessage}</div>}
        {!docsSaving && fileList.length > 0 && !docsDone && <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-[12px] text-amber-400 mt-2.5"><span>📎</span>Upload {Math.ceil((100 - state.docs) / 15)} more file(s) or your URL to reach 100% on this module</div>}
        {docsDone && <div className="flex items-center gap-2 bg-[var(--color-aiva-green-bg)] border border-[var(--color-aiva-green)]/25 rounded-lg p-3 text-[12px] text-[var(--color-aiva-green)] mt-2.5">✅ {fileList.length} file(s) processed — the agent knows your products and pricing</div>}
      </SectionCard>

      {/* 3. FAQ */}
      <SectionCard
        id="s-faq" title="Business FAQ" sub="Real questions from your customers · +25 pts" num="3"
        isActive={activeSection === "s-faq"} isDone={faqDone}
        onClick={() => setActiveSection(activeSection === "s-faq" ? "" : "s-faq")}
      >
        <div className="h-4"></div>
        <div className="text-[12px] text-[var(--color-aiva-muted)] mb-3.5 leading-relaxed">
          Write the questions your customers ask most and the exact answer the agent should give. <strong className="text-[var(--color-aiva-text)]">Minimum 5 to unlock.</strong>
        </div>
        <div className="flex flex-col gap-2">
          {faqItems.map((f, i) => {
            const isOk = f.q.length > 5 && f.a.length > 10;
            return (
              <div key={i} className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-xl overflow-hidden mb-2">
                <div className="flex items-center gap-2.5 p-3">
                  <span className="text-[14px] shrink-0">❓</span>
                  <input type="text" placeholder="Write a frequently asked question…" className="flex-1 bg-transparent border-none font-dm-sans text-[13px] text-[var(--color-aiva-text)] outline-none font-medium placeholder:text-[var(--color-aiva-muted2)]" value={f.q} onChange={(e) => handleFaqChange(i, "q", e.target.value)} />
                  <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center text-[10px] shrink-0 transition-colors ${isOk ? "bg-[var(--color-aiva-green-bg)] border-[var(--color-aiva-green)]/40 text-[var(--color-aiva-green)]" : "border-[var(--color-aiva-border2)]"}`}>{isOk ? "✓" : ""}</div>
                </div>
                <div className="border-t border-[var(--color-aiva-border)] p-2.5 flex items-start gap-2">
                  <div className="text-[10px] font-semibold text-[var(--color-aiva-accent2)] tracking-wider uppercase shrink-0 mt-1">R:</div>
                  <textarea rows={2} placeholder="Exact answer the agent should give…" className="flex-1 bg-transparent border-none font-dm-sans text-[12px] text-[var(--color-aiva-muted)] outline-none resize-none min-h-[36px] placeholder:text-[var(--color-aiva-muted2)]" value={f.a} onChange={(e) => handleFaqChange(i, "a", e.target.value)}></textarea>
                </div>
              </div>
            );
          })}
        </div>
        <button className="w-full p-2.5 bg-[var(--color-aiva-accent)]/10 border-[1.5px] border-dashed border-[var(--color-aiva-accent)]/25 rounded-xl text-[var(--color-aiva-accent2)] font-syne text-[12px] font-semibold cursor-pointer transition-colors mt-1 hover:bg-[var(--color-aiva-accent)]/15 hover:border-[var(--color-aiva-accent)]/40" onClick={() => setFaqItems([...faqItems, { q: "", a: "" }])}>+ Add question</button>

        {faqError && <div className="mt-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-[12px] text-amber-400 flex items-start gap-2"><div className="shrink-0">⚠️</div><div>You need at least <strong>5 complete questions</strong> to save. You have {completeFaqCount}/5.</div></div>}
        {faqSaving && <div className="flex items-center gap-2.5 bg-[var(--color-aiva-accent)]/10 border border-[var(--color-aiva-accent)]/20 rounded-lg p-3 text-[12px] text-[var(--color-aiva-accent2)] mt-2.5"><div className="w-3.5 h-3.5 border-2 border-[var(--color-aiva-accent)]/20 border-t-[var(--color-aiva-accent2)] rounded-full animate-spin shrink-0"></div>Training the agent with your FAQ…</div>}
        {!faqSaving && completeFaqCount > 0 && !faqDone && completeFaqCount < 5 && <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-[12px] text-amber-400 mt-2.5"><span>💡</span>Add {5 - completeFaqCount} more question(s) to unlock the full module</div>}
        {faqDone && <div className="flex items-center gap-2 bg-[var(--color-aiva-green-bg)] border border-[var(--color-aiva-green)]/25 rounded-lg p-3 text-[12px] text-[var(--color-aiva-green)] mt-2.5">✅ FAQ trained — the agent responds with your exact words</div>}

        <button className="w-full p-3.5 rounded-xl border-none font-syne text-[14px] font-bold cursor-pointer bg-gradient-to-br from-[var(--color-aiva-accent)] to-[#9b5cfc] text-white shadow-[0_4px_20px_rgba(124,92,252,0.3)] transition-all hover:-translate-y-px hover:shadow-[0_6px_28px_rgba(124,92,252,0.45)] active:translate-y-0 mt-3.5 tracking-wide" onClick={handleSaveFaq}>Save FAQ →</button>
      </SectionCard>

      {/* 4. Channels */}
      <SectionCard
        id="s-canales" title="Canales de comunicación" sub="Where does the agent operate? · +10 pts" num="4"
        isActive={activeSection === "s-canales"} isDone={canalesDone}
        onClick={() => setActiveSection(activeSection === "s-canales" ? "" : "s-canales")}
      >
        <div className="h-4"></div>
        <div className="flex flex-col gap-2">
          <ChannelItem icon="📞" name="AI Voice Calls" desc="Make and receive calls · 50+ languages · Llama y recibe llamadas · 50+ idiomas · <1.5s latency" isOn={channelVoz} onToggle={() => setChannelVoz(!channelVoz)} />
          <ChannelItem icon="💬" name="WhatsApp Business" desc="Messages, follow-ups and support via WhatsApp" isOn={channelWsp} onToggle={() => setChannelWsp(!channelWsp)} />
          <ChannelItem icon="📱" name="SMS" desc="Reminders, confirmations and alerts" isOn={channelSms} onToggle={() => setChannelSms(!channelSms)} />
          <ChannelItem icon="📧" name="Email" desc="Automated follow-ups and nurturing" isOn={channelEmail} onToggle={() => setChannelEmail(!channelEmail)} />
        </div>

        {canalesError && <div className="mt-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-[12px] text-amber-400 flex items-start gap-2"><div className="shrink-0">⚠️</div><div>Activate at least 1 channel para que el agente pueda operar.</div></div>}
        {canalesSaving && <div className="flex items-center gap-2.5 bg-[var(--color-aiva-accent)]/10 border border-[var(--color-aiva-accent)]/20 rounded-lg p-3 text-[12px] text-[var(--color-aiva-accent2)] mt-2.5"><div className="w-3.5 h-3.5 border-2 border-[var(--color-aiva-accent)]/20 border-t-[var(--color-aiva-accent2)] rounded-full animate-spin shrink-0"></div>Activating channels and configuring numbers…</div>}
        {canalesDone && <div className="flex items-center gap-2 bg-[var(--color-aiva-green-bg)] border border-[var(--color-aiva-green)]/25 rounded-lg p-3 text-[12px] text-[var(--color-aiva-green)] mt-2.5">✅ Active channels y listos para recibir llamadas</div>}

        <button className="w-full p-3.5 rounded-xl border-none font-syne text-[14px] font-bold cursor-pointer bg-gradient-to-br from-[var(--color-aiva-accent)] to-[#9b5cfc] text-white shadow-[0_4px_20px_rgba(124,92,252,0.3)] transition-all hover:-translate-y-px hover:shadow-[0_6px_28px_rgba(124,92,252,0.45)] active:translate-y-0 mt-3.5 tracking-wide" onClick={handleSaveCanales}>Activate channels →</button>
      </SectionCard>

      {/* 5. CRM */}
      <SectionCard
        id="s-crm" title="Conectar CRM" sub="Auto-save leads · +15 pts" num="5"
        isActive={activeSection === "s-crm"} isDone={crmDone}
        onClick={() => setActiveSection(activeSection === "s-crm" ? "" : "s-crm")}
      >
        <div className="h-4"></div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <CrmCard id="hubspot" logo="🟠" name="HubSpot" type="OAuth · 1 click" isSelected={selectedCrm === "hubspot"} onClick={() => setSelectedCrm("hubspot")} />
          <CrmCard id="sf" logo="☁️" name="Salesforce" type="Enterprise" isSelected={selectedCrm === "sf"} onClick={() => setSelectedCrm("sf")} />
          <CrmCard id="pipe" logo="🟣" name="Pipedrive" type="API Key" isSelected={selectedCrm === "pipe"} onClick={() => setSelectedCrm("pipe")} />
          <CrmCard id="ghl" logo="🟡" name="GoHighLevel" type="API Key" isSelected={selectedCrm === "ghl"} onClick={() => setSelectedCrm("ghl")} />
          <CrmCard id="zoho" logo="🔵" name="Zoho CRM" type="OAuth" isSelected={selectedCrm === "zoho"} onClick={() => setSelectedCrm("zoho")} />
          <CrmCard id="notion" logo="⚫" name="Notion / Sheets" type="Direct link" isSelected={selectedCrm === "notion"} onClick={() => setSelectedCrm("notion")} />
        </div>
        <div className="mb-3">
          <label className="block text-[11px] font-medium text-[var(--color-aiva-muted)] tracking-wider uppercase mb-1.5">API Key de {CRM_NAMES[selectedCrm]}</label>
          <input type="password" placeholder="Paste your API key here…" className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-lg p-3 font-dm-sans text-[13px] text-[var(--color-aiva-text)] outline-none focus:border-[var(--color-aiva-accent)] focus:ring-3 focus:ring-[var(--color-aiva-glow)] transition-all placeholder:text-[var(--color-aiva-muted2)]" value={crmKey} onChange={(e) => setCrmKey(e.target.value)} />
        </div>
        <div className="text-[11px] text-[var(--color-aiva-muted)] -mt-1.5 mb-2.5 cursor-pointer underline underline-offset-4" onClick={handleSkipCrm}>Connect later</div>

        {crmError && <div className="mt-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-[12px] text-amber-400 flex items-start gap-2"><div className="shrink-0">🔑</div><div>Paste your API Key for {CRM_NAMES[selectedCrm]} to connect.</div></div>}
        {crmSaving && <div className="flex items-center gap-2.5 bg-[var(--color-aiva-accent)]/10 border border-[var(--color-aiva-accent)]/20 rounded-lg p-3 text-[12px] text-[var(--color-aiva-accent2)] mt-2.5"><div className="w-3.5 h-3.5 border-2 border-[var(--color-aiva-accent)]/20 border-t-[var(--color-aiva-accent2)] rounded-full animate-spin shrink-0"></div>Connecting to {CRM_NAMES[selectedCrm]} and syncing contacts…</div>}
        {crmDone && <div className="flex items-center gap-2 bg-[var(--color-aiva-green-bg)] border border-[var(--color-aiva-green)]/25 rounded-lg p-3 text-[12px] text-[var(--color-aiva-green)] mt-2.5">✅ {CRM_NAMES[selectedCrm]} connected — leads will be saved automatically</div>}

        <button className="w-full p-3.5 rounded-xl border-none font-syne text-[14px] font-bold cursor-pointer bg-gradient-to-br from-[#22d3a5] to-[#059669] text-white shadow-[0_4px_20px_rgba(34,211,165,0.3)] transition-all hover:-translate-y-px hover:shadow-[0_6px_28px_rgba(34,211,165,0.45)] active:translate-y-0 tracking-wide mt-2" onClick={handleSaveCrm}>Connect and finish 🚀</button>
      </SectionCard>
    </div>
  );
}

// ------------------------------------
// UI Sub-components
// ------------------------------------

function SectionCard({ id, title, sub, num, isActive, isDone, onClick, children }: any) {
  return (
    <div className={`bg-[var(--color-aiva-s1)] border rounded-2xl mb-4 overflow-hidden transition-colors duration-200 ${isActive ? "border-[var(--color-aiva-accent)]/35" : isDone ? "border-emerald-400/25" : "border-[var(--color-aiva-border)]"}`}>
      <div className="flex items-center gap-3 p-4 cursor-pointer select-none" onClick={onClick}>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-syne text-[12px] font-bold shrink-0 transition-all duration-200 ${isActive ? "bg-[var(--color-aiva-accent)] text-white shadow-[0_0_12px_var(--color-aiva-glow)]" : isDone ? "bg-[var(--color-aiva-green-bg)] text-[var(--color-aiva-green)] border border-emerald-400/30" : "bg-[var(--color-aiva-border)] text-[var(--color-aiva-muted)]"}`}>
          {isDone ? "✓" : num}
        </div>
        <div className="flex-1">
          <div className="font-syne text-[14px] font-bold">{title}</div>
          <div className="text-[11px] text-[var(--color-aiva-muted)] mt-0.5">{sub}</div>
        </div>
        <div className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full shrink-0 ${isActive ? "bg-[var(--color-aiva-accent)]/15 text-[var(--color-aiva-accent2)] border border-[var(--color-aiva-accent)]/25" : isDone ? "bg-[var(--color-aiva-green-bg)] text-[var(--color-aiva-green)] border border-emerald-400/20" : "bg-[var(--color-aiva-border)] text-[var(--color-aiva-muted)]"}`}>
          {isDone ? "Complete" : isActive ? "In progress" : "Pending"}
        </div>
      </div>
      {isActive && (
        <div className="px-4 pb-4 border-t border-[var(--color-aiva-border)] animate-[fadeDown_0.25s_ease]">
          {children}
        </div>
      )}
    </div>
  );
}

function ChannelItem({ icon, name, desc, isOn, onToggle }: any) {
  return (
    <div className={`flex items-center gap-3 bg-[var(--color-aiva-s2)] border-[1.5px] rounded-xl p-3 cursor-pointer transition-colors duration-200 hover:border-[var(--color-aiva-border2)] ${isOn ? "border-[var(--color-aiva-accent)]/35 bg-[var(--color-aiva-accent)]/5" : "border-[var(--color-aiva-border)]"}`} onClick={onToggle}>
      <div className="text-[18px] shrink-0">{icon}</div>
      <div className="flex-1">
        <div className="text-[13px] font-medium">{name}</div>
        <div className="text-[11px] text-[var(--color-aiva-muted)] mt-px">{desc}</div>
      </div>
      <div className={`w-9 h-5 rounded-full relative transition-colors duration-200 shrink-0 ${isOn ? "bg-[var(--color-aiva-accent)]" : "bg-[var(--color-aiva-border2)]"}`}>
        <div className={`absolute w-3.5 h-3.5 rounded-full bg-white top-[3px] transition-all duration-200 shadow-md ${isOn ? "left-[19px]" : "left-[3px]"}`}></div>
      </div>
    </div>
  );
}

function CrmCard({ logo, name, type, isSelected, onClick }: any) {
  return (
    <div className={`bg-[var(--color-aiva-s2)] border-[1.5px] rounded-xl p-3 cursor-pointer transition-colors duration-200 flex items-center gap-2.5 hover:border-[var(--color-aiva-border2)] ${isSelected ? "border-[var(--color-aiva-accent)] bg-[var(--color-aiva-accent)]/10" : "border-[var(--color-aiva-border)]"}`} onClick={onClick}>
      <div className="text-[20px] shrink-0">{logo}</div>
      <div className="flex-1">
        <div className="text-[12px] font-medium">{name}</div>
        <div className="text-[10px] text-[var(--color-aiva-muted)]">{type}</div>
      </div>
      <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center text-[9px] shrink-0 transition-all duration-200 ${isSelected ? "bg-[var(--color-aiva-accent)] border-[var(--color-aiva-accent)] text-white" : "border-[var(--color-aiva-border2)]"}`}>
        {isSelected ? "✓" : ""}
      </div>
    </div>
  );
}
