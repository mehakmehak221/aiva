"use client";

import React from "react";
import { useProfile } from "../layout";
import { leadsData } from "@/data/dashboardData";

export default function CallsPage() {
  const { data } = useProfile();
  
  // Combine leads data logic as in HTML (concat leadsData with itself sliced)
  const callsData = leadsData.concat(leadsData.slice(0, 3));

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-[18px]">
        <h2 className="text-[20px] font-black tracking-[-0.4px]">All Calls</h2>
        <p className="text-[13px] text-[var(--color-aiva-muted)] mt-[3px]">Complete call history with transcripts and recordings</p>
      </div>

      <div className="grid grid-cols-4 gap-[14px]">
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[12px] p-4 flex flex-col justify-between h-[105px]">
          <div className="text-[12px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.05em]">Total Calls</div>
          <div className="font-jetbrains text-[28px] font-medium leading-[1.1] text-[var(--color-aiva-accent3)]">{data.kpis[0].v}</div>
          <div className="text-[11px] text-[var(--color-aiva-green)]">↑ +18% vs last period</div>
        </div>
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[12px] p-4 flex flex-col justify-between h-[105px]">
          <div className="text-[12px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.05em]">Answered</div>
          <div className="font-jetbrains text-[28px] font-medium leading-[1.1] text-[var(--color-aiva-green)]">947</div>
          <div className="text-[11px] text-[var(--color-aiva-green)]">↑ 73.7% answer rate</div>
        </div>
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[12px] p-4 flex flex-col justify-between h-[105px]">
          <div className="text-[12px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.05em]">Avg Duration</div>
          <div className="font-jetbrains text-[28px] font-medium leading-[1.1] text-[var(--color-aiva-blue)]">4:12</div>
          <div className="text-[11px] text-[var(--color-aiva-green)]">↑ +0:22</div>
        </div>
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[12px] p-4 flex flex-col justify-between h-[105px]">
          <div className="text-[12px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.05em]">Voicemails Left</div>
          <div className="font-jetbrains text-[28px] font-medium leading-[1.1] text-[var(--color-aiva-amber)]">94</div>
          <div className="text-[11px] text-[var(--color-aiva-muted)]">→ 7.3% of total</div>
        </div>
      </div>

      <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5 mb-[14px]">
        <div className="flex items-center justify-between mb-[18px]">
          <div>
            <div className="text-[15px] font-black">Call Log</div>
            <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Click any call to view transcript</div>
          </div>
          <div className="flex gap-[8px]">
            <input className="w-[180px] bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[11px] py-[7px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 placeholder:text-[var(--color-aiva-muted2)] focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)]" placeholder="🔍 Search calls…" />
            <select className="w-[140px] bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[10px] py-[7px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)] appearance-none">
              <option>All statuses</option>
              <option>Interested</option>
              <option>Converted</option>
              <option>Callback</option>
              <option>No Answer</option>
            </select>
            <button className="px-[12px] py-[7px] rounded-[9px] border border-[var(--color-aiva-border)] bg-[var(--color-aiva-s2)] text-[var(--color-aiva-muted)] font-cabinet text-[13px] font-bold cursor-pointer transition-all duration-200 hover:text-[var(--color-aiva-text)] hover:border-[var(--color-aiva-border2)]">
              Export
            </button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.08em] text-[var(--color-aiva-muted)] font-semibold border-b border-[var(--color-aiva-border)]">
              <th className="pb-[10px] pl-[10px] font-semibold">Contact</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Phone</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Direction</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Outcome</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Duration</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Date</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Recording</th>
            </tr>
          </thead>
          <tbody>
            {callsData.map((l, i) => (
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
                <td className="py-[9px] px-[10px] align-middle">
                  <span className={`inline-flex text-[10px] font-bold px-[8px] py-[2px] rounded-full whitespace-nowrap ${i % 3 === 0 ? "bg-[var(--color-aiva-blue-bg)] text-[var(--color-aiva-blue)]" : "bg-[var(--color-aiva-amber-bg)] text-[var(--color-aiva-amber)]"}`}>
                    {i % 3 === 0 ? "📞 Outbound" : "📲 Inbound"}
                  </span>
                </td>
                <td className="py-[9px] px-[10px] align-middle">
                  <span className={`inline-flex text-[10px] font-bold px-[8px] py-[2px] rounded-full whitespace-nowrap ${l.status === "Converted" ? "bg-[var(--color-aiva-blue-bg)] text-[var(--color-aiva-blue)]" : l.status === "Interested" ? "bg-[var(--color-aiva-green-bg)] text-[var(--color-aiva-green)]" : l.status === "Callback" ? "bg-[var(--color-aiva-amber-bg)] text-[var(--color-aiva-amber)]" : "bg-[var(--color-aiva-red-bg)] text-[var(--color-aiva-red)]"}`}>
                    {l.status}
                  </span>
                </td>
                <td className="py-[9px] px-[10px] align-middle font-jetbrains text-[11px]">{l.dur}</td>
                <td className="py-[9px] px-[10px] align-middle text-[var(--color-aiva-muted)] text-[11px]">{l.time}</td>
                <td className="py-[9px] px-[10px] align-middle">
                  <span className="text-[11px] text-[var(--color-aiva-accent2)] cursor-pointer hover:underline">▶ Play</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
