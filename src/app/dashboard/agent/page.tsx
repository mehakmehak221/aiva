"use client";

import React from "react";
import { useProfile } from "../layout";
import { iqSegments } from "@/data/dashboardData";

export default function AgentPage() {
  const { data } = useProfile();
  
  const circ = 238.76;
  const off = circ - ((data.iq / 100) * circ);

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-[18px]">
        <h2 className="text-[20px] font-black tracking-[-0.4px]">My Agent</h2>
        <p className="text-[13px] text-[var(--color-aiva-muted)] mt-[3px]">Configure your AI agent's knowledge, personality and behavior</p>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-5">
        {/* AGENT IQ SCORE */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Agent IQ Score</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">How much your agent knows about your business</div>
            </div>
          </div>
          <div className="flex items-center gap-[20px] mb-[18px]">
            <div className="relative w-[90px] h-[90px] shrink-0">
              <svg viewBox="0 0 90 90" width="90" height="90" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="45" cy="45" r="38" fill="none" stroke="var(--color-aiva-border2)" strokeWidth="7" />
                <circle cx="45" cy="45" r="38" fill="none" stroke={data.iqColor} strokeWidth="7" strokeLinecap="round" strokeDasharray="238.76" strokeDashoffset={off} className="transition-all duration-1000 ease-in-out" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="font-jetbrains text-[20px] font-medium" style={{ color: data.iqColor }}>{data.iq}%</div>
                <div className="text-[9px] text-[var(--color-aiva-muted)] tracking-[0.06em]">IQ</div>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold mb-[4px]" style={{ color: data.iqColor }}>
                {data.iq >= 90 ? "Optimal" : data.iq >= 70 ? "Needs Improvement" : "Needs Configuration"}
              </div>
              <div className="text-[12px] text-[var(--color-aiva-muted)] leading-[1.5]">
                Complete all modules below to reach 100% and unlock your agent's full potential.
              </div>
            </div>
          </div>
          
          <div>
            {iqSegments.map((s, i) => (
              <div key={i} className={`bg-[var(--color-aiva-s2)] border ${s.p >= 100 ? 'border-[rgba(16,217,160,0.25)]' : 'border-[var(--color-aiva-border)]'} rounded-[10px] px-[14px] py-[12px] mb-[8px] cursor-pointer transition-all duration-200 hover:border-[var(--color-aiva-border2)]`}>
                <div className="flex items-center gap-[10px] mb-[6px]">
                  <div className="text-[16px] shrink-0">{s.ic}</div>
                  <div className="text-[13px] font-semibold flex-1">{s.l}</div>
                  <div className="font-jetbrains text-[12px] font-semibold" style={{ color: s.c }}>+{s.pts} pts</div>
                </div>
                <div className="h-[4px] bg-[var(--color-aiva-border2)] rounded-[10px] overflow-hidden">
                  <div className="h-full rounded-[10px] transition-all duration-800" style={{ width: `${s.p}%`, background: s.c }}></div>
                </div>
                {s.alert && (
                  <div className="text-[11px] text-[var(--color-aiva-amber)] mt-[6px] px-[10px] py-[7px] bg-[var(--color-aiva-amber-bg)] rounded-[6px]">
                    💡 {s.alert}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AGENT PERSONALITY */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Agent Personality</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Tone, language and behavior</div>
            </div>
          </div>
          
          <div className="mb-[14px]">
            <label className="block text-[11px] font-semibold text-[var(--color-aiva-muted)] tracking-[0.07em] uppercase mb-[6px]">Agent Name</label>
            <input className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[13px] py-[11px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)]" defaultValue="AIVA Assistant" placeholder="Your AI agent's name" />
          </div>
          
          <div className="mb-[14px]">
            <label className="block text-[11px] font-semibold text-[var(--color-aiva-muted)] tracking-[0.07em] uppercase mb-[6px]">Tone of Voice</label>
            <select className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[13px] py-[11px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)] appearance-none">
              <option>Professional & Friendly</option>
              <option>Formal & Corporate</option>
              <option>Casual & Conversational</option>
              <option>Energetic & Sales-focused</option>
            </select>
          </div>
          
          <div className="mb-[14px]">
            <label className="block text-[11px] font-semibold text-[var(--color-aiva-muted)] tracking-[0.07em] uppercase mb-[6px]">Primary Language</label>
            <select className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[13px] py-[11px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)] appearance-none">
              <option>English (US)</option>
              <option>Spanish (LATAM)</option>
              <option>Portuguese (BR)</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          
          <div className="mb-[14px]">
            <label className="block text-[11px] font-semibold text-[var(--color-aiva-muted)] tracking-[0.07em] uppercase mb-[6px]">Fallback Behavior</label>
            <select className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[13px] py-[11px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)] appearance-none">
              <option>Transfer to human agent</option>
              <option>Schedule a callback</option>
              <option>Leave voicemail</option>
              <option>Send WhatsApp follow-up</option>
            </select>
          </div>
          
          <div className="mb-[18px]">
            <label className="block text-[11px] font-semibold text-[var(--color-aiva-muted)] tracking-[0.07em] uppercase mb-[6px]">Max Call Duration</label>
            <select className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[13px] py-[11px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)] appearance-none" defaultValue="10 minutes">
              <option>5 minutes</option>
              <option value="10 minutes">10 minutes</option>
              <option>15 minutes</option>
              <option>Unlimited</option>
            </select>
          </div>
          
          <button className="w-full py-[12px] rounded-[9px] bg-[var(--color-aiva-accent)] text-white border-none shadow-[0_2px_10px_var(--color-aiva-glow)] font-cabinet text-[13px] font-bold cursor-pointer transition-all duration-200 hover:bg-[#5c3fe0] hover:-translate-y-[1px] flex justify-center items-center">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
