"use client";

import React from "react";
import { clientsData } from "@/data/dashboardData";

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="mb-[18px]">
        <h2 className="text-[20px] font-black tracking-[-0.4px]">Clients</h2>
        <p className="text-[13px] text-[var(--color-aiva-muted)] mt-[3px]">Manage all your agency clients from one place</p>
      </div>

      <div className="grid grid-cols-4 gap-[14px]">
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[12px] p-4 flex flex-col justify-between h-[105px]">
          <div className="text-[12px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.05em]">Active Clients</div>
          <div className="font-jetbrains text-[28px] font-medium leading-[1.1] text-[#c4b0ff]">8</div>
          <div className="text-[11px] text-[var(--color-aiva-green)]">↑ +2 this month</div>
        </div>
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[12px] p-4 flex flex-col justify-between h-[105px]">
          <div className="text-[12px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.05em]">Total MRR</div>
          <div className="font-jetbrains text-[28px] font-medium leading-[1.1] text-[var(--color-aiva-green)]">$7,992</div>
          <div className="text-[11px] text-[var(--color-aiva-green)]">↑ +$999</div>
        </div>
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[12px] p-4 flex flex-col justify-between h-[105px]">
          <div className="text-[12px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.05em]">Avg Client IQ</div>
          <div className="font-jetbrains text-[28px] font-medium leading-[1.1] text-[var(--color-aiva-blue)]">81%</div>
          <div className="text-[11px] text-[var(--color-aiva-green)]">↑ +9pp</div>
        </div>
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[12px] p-4 flex flex-col justify-between h-[105px]">
          <div className="text-[12px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.05em]">Total Calls (All)</div>
          <div className="font-jetbrains text-[28px] font-medium leading-[1.1] text-[var(--color-aiva-amber)]">9,442</div>
          <div className="text-[11px] text-[var(--color-aiva-green)]">↑ +28%</div>
        </div>
      </div>

      <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5 mb-[14px]">
        <div className="flex items-center justify-between mb-[18px]">
          <div>
            <div className="text-[15px] font-black">Client Roster</div>
            <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Click a client to manage their agent</div>
          </div>
          <button className="px-[12px] py-[7px] rounded-[9px] bg-[var(--color-aiva-accent)] text-white border-none shadow-[0_2px_10px_var(--color-aiva-glow)] font-cabinet text-[13px] font-bold cursor-pointer transition-all duration-200 hover:bg-[#5c3fe0] hover:-translate-y-[1px]">
            + New Client
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.08em] text-[var(--color-aiva-muted)] font-semibold border-b border-[var(--color-aiva-border)]">
              <th className="pb-[10px] pl-[10px] font-semibold">Client</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Industry</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Calls</th>
              <th className="pb-[10px] pl-[10px] font-semibold">MRR</th>
              <th className="pb-[10px] pl-[10px] font-semibold">IQ Score</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Status</th>
              <th className="pb-[10px] pl-[10px] font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {clientsData.map((c, i) => {
              const ic = c.iq >= 80 ? 'var(--color-aiva-green)' : c.iq >= 65 ? 'var(--color-aiva-amber)' : 'var(--color-aiva-red)';
              return (
                <tr key={i} className="transition-colors duration-150 cursor-pointer hover:bg-[rgba(255,255,255,0.02)] border-b border-[var(--color-aiva-border)] last:border-0 group">
                  <td className="py-[9px] px-[10px] text-[12px] align-middle">
                    <div className="flex items-center gap-[8px]">
                      <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center text-[11px] shrink-0" style={{ background: "linear-gradient(135deg,var(--color-aiva-accent),#a855f7)" }}>
                        {c.name[0]}
                      </div>
                      {c.name}
                    </div>
                  </td>
                  <td className="py-[9px] px-[10px] align-middle text-[var(--color-aiva-muted)] text-[12px]">{c.industry}</td>
                  <td className="py-[9px] px-[10px] align-middle font-jetbrains text-[11px]">{c.calls}</td>
                  <td className="py-[9px] px-[10px] align-middle font-jetbrains text-[11px] text-[var(--color-aiva-green)]">{c.rev}</td>
                  <td className="py-[9px] px-[10px] align-middle">
                    <div className="flex items-center gap-[6px]">
                      <div className="w-[44px] h-[4px] bg-[var(--color-aiva-border2)] rounded-[10px] overflow-hidden">
                        <div className="h-full rounded-[10px]" style={{ width: `${c.iq}%`, background: ic }}></div>
                      </div>
                      <span className="font-jetbrains text-[11px]" style={{ color: ic }}>{c.iq}%</span>
                    </div>
                  </td>
                  <td className="py-[9px] px-[10px] align-middle">
                    <span className={`inline-flex text-[10px] font-bold px-[8px] py-[2px] rounded-full whitespace-nowrap ${c.status === "Active" ? "bg-[var(--color-aiva-green-bg)] text-[var(--color-aiva-green)]" : c.status === "Onboarding" ? "bg-[var(--color-aiva-blue-bg)] text-[var(--color-aiva-blue)]" : "bg-[var(--color-aiva-amber-bg)] text-[var(--color-aiva-amber)]"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-[9px] px-[10px] align-middle">
                    <span className="text-[11px] text-[var(--color-aiva-accent2)] cursor-pointer hover:underline">Manage →</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
