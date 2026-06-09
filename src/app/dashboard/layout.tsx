"use client";

import React, { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profileData } from "@/data/dashboardData";

interface ProfileContextType {
  currentProfile: string;
  switchProfile: (profile: string) => void;
  data: any;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [currentProfile, setCurrentProfile] = useState("seller");
  const data = profileData[currentProfile];
  const pathname = usePathname();

  const switchProfile = (profile: string) => {
    setCurrentProfile(profile);
  };

  const isPage = (path: string) => {
    if (path === "dashboard" && pathname === "/dashboard") return true;
    return pathname.includes(`/dashboard/${path}`);
  };

  return (
    <ProfileContext.Provider value={{ currentProfile, switchProfile, data }}>
      <div className="flex min-h-screen bg-[var(--color-aiva-bg)] text-[var(--color-aiva-text)] font-cabinet overflow-hidden h-screen">
        
        {/* ══ SIDEBAR ══ */}
        <div className="w-[220px] min-h-screen bg-[var(--color-aiva-s1)] border-r border-[var(--color-aiva-border)] flex flex-col fixed left-0 top-0 bottom-0 z-50">
          <div className="px-[18px] pt-[20px] pb-[14px] flex items-center gap-[10px] border-b border-[var(--color-aiva-border)]">
            <div className="text-[20px] font-black tracking-[-0.5px]">AI<span className="text-[var(--color-aiva-accent2)]">VA</span></div>
            <div className="text-[9px] font-bold bg-[var(--color-aiva-accent)] text-white px-1.5 py-0.5 rounded-[4px] tracking-[0.06em]">{data.badge}</div>
          </div>
          <div className="px-4 py-3 border-b border-[var(--color-aiva-border)] flex items-center gap-[10px]">
            <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center text-[14px] shrink-0" style={{ background: data.gradient }}>
              {data.avatar}
            </div>
            <div>
              <div className="text-[13px] font-bold leading-[1.2]">{data.name}</div>
              <div className="text-[10px] text-[var(--color-aiva-accent2)] font-medium">{data.plan}</div>
            </div>
          </div>
          
          <div className="flex-1 py-2 overflow-y-auto">
            <div className="px-4 pt-2.5 pb-1 text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--color-aiva-muted2)]">Main</div>
            <SidebarItem href="/dashboard" icon="⚡" label="Dashboard" active={isPage("dashboard")} />
            <SidebarItem href="/dashboard/calls" icon="📞" label="Calls" badge="12" active={isPage("calls")} />
            <SidebarItem href="/dashboard/conversations" icon="💬" label="Conversations" active={isPage("conversations")} />
            <SidebarItem href="/dashboard/leads" icon="👥" label="Leads" active={isPage("leads")} />
            <SidebarItem href="/dashboard/agent" icon="🤖" label="My Agent" active={isPage("agent")} />
            
            <div className="px-4 pt-2.5 pb-1 text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--color-aiva-muted2)]">Configure</div>
            <SidebarItem href="/dashboard/knowledge" icon="📚" label="Knowledge Base" active={isPage("knowledge")} />
            <SidebarItem href="/dashboard/integrations" icon="🔗" label="Integrations" active={isPage("integrations")} />
            <SidebarItem href="/dashboard/channels" icon="📡" label="Channels" active={isPage("channels")} />
            <SidebarItem href="/dashboard/billing" icon="💳" label="Billing" active={isPage("billing")} />
            
            <div className="px-4 pt-2.5 pb-1 text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--color-aiva-muted2)]">Agency</div>
            <SidebarItem href="/dashboard/clients" icon="🏢" label="Clients" badge="8" active={isPage("clients")} />
            <SidebarItem href="/dashboard/reports" icon="📊" label="Reports" active={isPage("reports")} />
            <SidebarItem href="/dashboard/settings" icon="⚙️" label="Settings" active={isPage("settings")} />
          </div>
          
          <div className="p-4 border-t border-[var(--color-aiva-border)]">
            <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border2)] rounded-[10px] p-[10px] px-3">
              <div className="text-[10px] text-[var(--color-aiva-muted)] mb-1.5 font-medium flex justify-between">
                <span>Agent IQ</span>
                <span className="font-jetbrains text-[12px]" style={{ color: data.iqColor }}>{data.iq}%</span>
              </div>
              <div className="h-[5px] bg-[var(--color-aiva-border2)] rounded-[10px] overflow-hidden mb-1">
                <div className="h-full rounded-[10px] transition-all duration-800 ease-in-out" style={{ width: `${data.iq}%`, background: data.iqColor }}></div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-[11px]" style={{ color: data.iqColor }}>
                  {data.iq >= 90 ? "Optimal" : data.iq >= 70 ? "Needs improvement" : "Needs configuration"}
                </div>
                <Link href="/dashboard/agent" className="text-[10px] text-[var(--color-aiva-accent2)] cursor-pointer underline underline-offset-2 hover:text-[var(--color-aiva-accent3)]">
                  Improve →
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* ══ MAIN CONTENT ══ */}
        <div className="ml-[220px] flex-1 flex flex-col h-screen overflow-hidden">
          {/* TOPBAR */}
          <div className="py-3.5 px-6 bg-[var(--color-aiva-s1)] border-b border-[var(--color-aiva-border)] flex items-center gap-3.5 shrink-0">
            <div className="text-[17px] font-black flex-1 tracking-[-0.3px] flex items-center">
              <span className="capitalize">{pathname === "/dashboard" ? "Dashboard" : pathname.split("/").pop()}</span>
              <span className="text-[var(--color-aiva-muted)] font-medium text-[13px] ml-2">Good morning, Carlos 👋</span>
            </div>
            
            <div className="flex gap-1 bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-lg p-1">
              <ProfileBtn id="seller" label="Seller" current={currentProfile} onClick={() => switchProfile("seller")} />
              <ProfileBtn id="agency" label="Agency" current={currentProfile} onClick={() => switchProfile("agency")} />
              <ProfileBtn id="b2b" label="B2B" current={currentProfile} onClick={() => switchProfile("b2b")} />
            </div>
            
            <select className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[7px] px-2.5 py-1.5 font-cabinet text-[12px] text-[var(--color-aiva-text)] outline-none cursor-pointer">
              <option value="today">Today</option>
              <option value="7d">7 days</option>
              <option value="30d">30 days</option>
              <option value="90d">90 days</option>
            </select>
            
            <button className="px-3.5 py-2 rounded-lg bg-[var(--color-aiva-s2)] text-[var(--color-aiva-text)] border border-[var(--color-aiva-border)] font-cabinet text-[12px] font-bold cursor-pointer transition-all duration-200 flex items-center gap-1.5 hover:border-[var(--color-aiva-border2)]">
              📤 Export
            </button>
            <button className="px-3.5 py-2 rounded-lg bg-[var(--color-aiva-accent)] text-white border-none shadow-[0_2px_10px_var(--color-aiva-glow)] font-cabinet text-[12px] font-bold cursor-pointer transition-all duration-200 flex items-center gap-1.5 hover:bg-[#5c3fe0] hover:-translate-y-[1px]">
              📞 New Campaign
            </button>
          </div>
          
          {/* PAGE CONTENT */}
          <div className="flex-1 overflow-y-auto px-[26px] pt-[22px] pb-[40px] relative">
            {children}
          </div>
        </div>
      </div>
    </ProfileContext.Provider>
  );
}

function SidebarItem({ href, icon, label, badge, active }: { href: string; icon: string; label: string; badge?: string; active: boolean }) {
  return (
    <Link href={href} className={`flex items-center gap-2.5 px-4 py-2 cursor-pointer transition-all duration-150 text-[13px] font-medium relative select-none ${active ? "text-[var(--color-aiva-text)] bg-[rgba(108,79,246,0.12)]" : "text-[var(--color-aiva-muted)] hover:text-[var(--color-aiva-text)] hover:bg-[rgba(255,255,255,0.03)]"}`}>
      {active && <div className="absolute left-0 top-[5px] bottom-[5px] w-[3px] bg-[var(--color-aiva-accent)] rounded-r-[3px]"></div>}
      <span className="text-[15px] w-5 text-center shrink-0">{icon}</span>
      <span>{label}</span>
      {badge && <span className="ml-auto text-[10px] font-bold bg-[var(--color-aiva-accent)] text-white px-1.5 py-0.5 rounded-[10px]">{badge}</span>}
    </Link>
  );
}

function ProfileBtn({ id, label, current, onClick }: { id: string; label: string; current: string; onClick: () => void }) {
  const active = current === id;
  return (
    <button 
      onClick={onClick}
      className={`px-3 py-1.5 rounded-[5px] text-[11px] font-bold cursor-pointer transition-all duration-150 border-none font-cabinet ${active ? "bg-[var(--color-aiva-accent)] text-white shadow-[0_2px_8px_var(--color-aiva-glow)]" : "bg-transparent text-[var(--color-aiva-muted)] hover:text-[var(--color-aiva-text)]"}`}
    >
      {label}
    </button>
  );
}
