"use client";

import React from "react";
import { leadsData } from "@/data/dashboardData";

export default function LeadsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="mb-[18px]">
        <h2 className="text-[20px] font-black tracking-[-0.4px]">Leads</h2>
        <p className="text-[13px] text-[var(--color-aiva-muted)] mt-[3px]">AI-generated leads ready for follow-up</p>
      </div>

      <div className="grid grid-cols-4 gap-[14px]">
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[12px] p-4 flex flex-col justify-between h-[105px]">
          <div className="text-[12px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.05em]">Total Leads</div>
          <div className="font-jetbrains text-[28px] font-medium leading-[1.1] text-[var(--color-aiva-green)]">347</div>
          <div className="text-[11px] text-[var(--color-aiva-green)]">↑ +31%</div>
        </div>
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[12px] p-4 flex flex-col justify-between h-[105px]">
          <div className="text-[12px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.05em]">Converted</div>
          <div className="font-jetbrains text-[28px] font-medium leading-[1.1] text-[var(--color-aiva-blue)]">94</div>
          <div className="text-[11px] text-[var(--color-aiva-green)]">↑ 27% CVR</div>
        </div>
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[12px] p-4 flex flex-col justify-between h-[105px]">
          <div className="text-[12px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.05em]">Pending Follow-up</div>
          <div className="font-jetbrains text-[28px] font-medium leading-[1.1] text-[var(--color-aiva-amber)]">128</div>
          <div className="text-[11px] text-[var(--color-aiva-muted)]">→ In queue</div>
        </div>
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[12px] p-4 flex flex-col justify-between h-[105px]">
          <div className="text-[12px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.05em]">Avg Lead Score</div>
          <div className="font-jetbrains text-[28px] font-medium leading-[1.1] text-[var(--color-aiva-accent3)]">74</div>
          <div className="text-[11px] text-[var(--color-aiva-green)]">↑ +8pts</div>
        </div>
      </div>

      <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5 mb-[14px]">
        <div className="flex items-center justify-between mb-[18px]">
          <div>
            <div className="text-[15px] font-black">Lead Database</div>
            <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Click to view full profile & call history</div>
          </div>
          <div className="flex gap-[8px]">
            <input className="w-[180px] bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[11px] py-[7px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 placeholder:text-[var(--color-aiva-muted2)] focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)]" placeholder="🔍 Search leads…" />
            <select className="w-[130px] bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[10px] py-[7px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)] appearance-none">
              <option>All stages</option>
              <option>Interested</option>
              <option>Converted</option>
              <option>Callback</option>
            </select>
            <button className="px-[12px] py-[7px] rounded-[9px] bg-[var(--color-aiva-accent)] text-white border-none shadow-[0_2px_10px_var(--color-aiva-glow)] font-cabinet text-[13px] font-bold cursor-pointer transition-all duration-200 hover:bg-[#5c3fe0] hover:-translate-y-[1px]">
              + New Campaign
            </button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.08em] text-[var(--color-aiva-muted)] font-semibold border-b border-[var(--color-aiva-border)]">
              <th className="pb-[10px] pl-[10px] font-semibold">Name</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Phone</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Channel</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Status</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Score</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Duration</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Time</th>
              <th className="pb-[10px] pl-[10px] font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {leadsData.map((l, i) => (
              <tr key={i} className="transition-colors duration-150 cursor-pointer hover:bg-[rgba(255,255,255,0.02)] border-b border-[var(--color-aiva-border)] last:border-0 group">
                <td className="py-[9px] px-[10px] text-[12px] align-middle">
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center text-[11px] shrink-0" style={{ background: "linear-gradient(135deg,var(--color-aiva-accent),#a855f7)" }}>
                      {l.name[0]}
                    </div>
                    {l.name}
                  </div>
                </td>
                <td className="py-[9px] px-[10px] align-middle font-jetbrains text-[11px]">{l.phone}</td>
                <td className="py-[9px] px-[10px] align-middle text-[12px]">{l.ch}</td>
                <td className="py-[9px] px-[10px] align-middle">
                  <span className={`inline-flex text-[10px] font-bold px-[8px] py-[2px] rounded-full whitespace-nowrap ${l.status === "Converted" ? "bg-[var(--color-aiva-blue-bg)] text-[var(--color-aiva-blue)]" : l.status === "Interested" ? "bg-[var(--color-aiva-green-bg)] text-[var(--color-aiva-green)]" : l.status === "Callback" ? "bg-[var(--color-aiva-amber-bg)] text-[var(--color-aiva-amber)]" : "bg-[var(--color-aiva-red-bg)] text-[var(--color-aiva-red)]"}`}>
                    {l.status}
                  </span>
                </td>
                <td className="py-[9px] px-[10px] align-middle">
                  <div className="flex items-center gap-[6px]">
                    <div className="w-[44px] h-[4px] bg-[var(--color-aiva-border2)] rounded-[10px] overflow-hidden">
                      <div className="h-full rounded-[10px]" style={{ width: `${l.score}%`, background: l.score > 80 ? 'var(--color-aiva-green)' : l.score > 50 ? 'var(--color-aiva-amber)' : 'var(--color-aiva-red)' }}></div>
                    </div>
                    <span className="font-jetbrains text-[11px]" style={{ color: l.score > 80 ? 'var(--color-aiva-green)' : l.score > 50 ? 'var(--color-aiva-amber)' : 'var(--color-aiva-red)' }}>{l.score}</span>
                  </div>
                </td>
                <td className="py-[9px] px-[10px] align-middle font-jetbrains text-[11px]">{l.dur}</td>
                <td className="py-[9px] px-[10px] align-middle text-[var(--color-aiva-muted)] text-[11px]">{l.time}</td>
                <td className="py-[9px] px-[10px] align-middle">
                  <span className="text-[11px] text-[var(--color-aiva-accent2)] cursor-pointer hover:underline">Transcript →</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
