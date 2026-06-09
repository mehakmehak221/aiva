"use client";

import React from "react";
import { integrations } from "@/data/dashboardData";

export default function IntegrationsPage() {
  const renderGrid = (items: any[]) => (
    <div className="grid grid-cols-[1fr_1fr] gap-[10px]">
      {items.map((it, i) => (
        <div key={i} className={`bg-[var(--color-aiva-s2)] border-[1.5px] ${it.connected ? 'border-[rgba(16,217,160,0.3)] bg-[rgba(16,217,160,0.04)]' : 'border-[var(--color-aiva-border)]'} rounded-[11px] p-[14px] flex items-center gap-[12px] transition-all duration-200 cursor-pointer hover:border-[var(--color-aiva-border2)]`}>
          <div className="text-[24px] shrink-0">{it.logo}</div>
          <div className="flex-1">
            <div className="text-[13px] font-bold">{it.name}</div>
            <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[1px]">{it.desc}</div>
          </div>
          <div className="ml-auto shrink-0">
            {it.connected ? (
              <span className="inline-flex text-[10px] font-bold px-[8px] py-[2px] rounded-full whitespace-nowrap bg-[var(--color-aiva-green-bg)] text-[var(--color-aiva-green)]">
                ✓ Connected
              </span>
            ) : (
              <button className="px-[10px] py-[4px] rounded-[6px] border border-[var(--color-aiva-border)] bg-[var(--color-aiva-s2)] text-[var(--color-aiva-muted)] font-cabinet text-[10px] font-bold cursor-pointer transition-all duration-200 hover:text-[var(--color-aiva-text)] hover:border-[var(--color-aiva-border2)]">
                Connect
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-[18px]">
        <h2 className="text-[20px] font-black tracking-[-0.4px]">Integrations</h2>
        <p className="text-[13px] text-[var(--color-aiva-muted)] mt-[3px]">Connect your tools and automate your workflow</p>
      </div>

      <div className="mb-[14px]">
        <div className="text-[13px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.07em] mb-[10px]">CRM & Sales</div>
        {renderGrid(integrations.CRM)}
      </div>

      <div className="mb-[14px]">
        <div className="text-[13px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.07em] mb-[10px]">Communication</div>
        {renderGrid(integrations.Comm)}
      </div>

      <div>
        <div className="text-[13px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.07em] mb-[10px]">E-commerce & Other</div>
        {renderGrid(integrations.Other)}
      </div>
    </div>
  );
}
