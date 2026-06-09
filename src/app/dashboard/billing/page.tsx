"use client";

import React, { useState } from "react";
import { useProfile } from "../layout";
import { invoices, plans } from "@/data/dashboardData";

export default function BillingPage() {
  const { data } = useProfile();
  const [showPlans, setShowPlans] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-[18px]">
        <h2 className="text-[20px] font-black tracking-[-0.4px]">Billing</h2>
        <p className="text-[13px] text-[var(--color-aiva-muted)] mt-[3px]">Manage your plan, usage and payment methods</p>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-5">
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Current Plan</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">{data.plan}</div>
            </div>
            <button 
              onClick={() => setShowPlans(!showPlans)}
              className="px-[12px] py-[6px] rounded-[9px] bg-[var(--color-aiva-accent)] text-white border-none shadow-[0_2px_10px_var(--color-aiva-glow)] font-cabinet text-[11px] font-bold cursor-pointer transition-all duration-200 hover:bg-[#5c3fe0] hover:-translate-y-[1px]"
            >
              {showPlans ? "Hide Plans" : "Upgrade"}
            </button>
          </div>
          <div>
            {[
              { l: 'Plan', v: data.plan }, 
              { l: 'Billing cycle', v: 'Monthly · auto-renew' },
              { l: 'Next charge', v: 'Jun 15, 2026' }, 
              { l: 'Amount', v: data.billing },
              { l: 'Payment method', v: 'Visa ending in 4242' },
            ].map((r, i) => (
              <div key={i} className="flex justify-between items-center py-[10px] border-b border-[var(--color-aiva-border)] last:border-0">
                <div className="text-[13px] text-[var(--color-aiva-muted)]">{r.l}</div>
                <div className="font-jetbrains text-[13px] font-medium">{r.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Usage This Cycle</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Resets Jun 15, 2026</div>
            </div>
          </div>
          <div>
            {data.usage.map((u: any, i: number) => {
              const p = Math.round((u.u / u.t) * 100);
              const warn = p > 85;
              const color = warn ? 'var(--color-aiva-red)' : u.c;
              return (
                <div key={i} className="flex items-center gap-2.5 mb-[11px]">
                  <div className="text-[15px] w-[22px] text-center shrink-0">{u.i}</div>
                  <div className="flex-1">
                    <div className="text-[12px] font-semibold mb-[2px] flex justify-between">
                      <span>{u.l}</span>
                      <span className="font-jetbrains text-[11px]" style={{ color }}>{p}%</span>
                    </div>
                    <div className="h-[5px] bg-[var(--color-aiva-border2)] rounded-[10px] overflow-hidden">
                      <div className="h-full rounded-[10px] transition-all duration-1000 ease-in-out" style={{ width: `${p}%`, background: color }}></div>
                    </div>
                    <div className="text-[10px] text-[var(--color-aiva-muted)] mt-[2px] flex justify-between">
                      <span>{u.u.toLocaleString()} used</span>
                      <span>{u.t.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showPlans && (
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5 mb-[14px]">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Change Plan</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Select the plan that fits your needs</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-[10px]">
            {plans.map((p, i) => (
              <div key={i} className={`border-[1.5px] rounded-[12px] p-[16px] transition-all duration-200 cursor-pointer relative ${p.current ? 'border-[var(--color-aiva-accent)] bg-[rgba(108,79,246,0.06)]' : 'border-[var(--color-aiva-border)] hover:border-[var(--color-aiva-border2)]'}`}>
                {p.current && (
                  <div className="absolute top-[10px] right-[10px] text-[9px] font-bold bg-[var(--color-aiva-accent)] text-white px-[6px] py-[2px] rounded-[4px]">CURRENT</div>
                )}
                <div className="text-[14px] font-extrabold mb-[3px]">{p.name}</div>
                <div className="font-jetbrains text-[22px] font-medium mb-[6px]">{p.price}<span className="text-[11px] text-[var(--color-aiva-muted)]">{p.cycle}</span></div>
                <div className="mt-[10px] flex flex-col gap-[5px]">
                  {p.feats.map((f, j) => (
                    <div key={j} className="text-[11px] text-[var(--color-aiva-muted)] flex items-center gap-[6px]">✓ {f}</div>
                  ))}
                </div>
                <button className={`w-full py-[10px] rounded-[9px] font-cabinet text-[13px] font-bold cursor-pointer transition-all duration-200 mt-[12px] flex justify-center items-center ${p.current ? 'border border-[var(--color-aiva-border)] bg-[var(--color-aiva-s2)] text-[var(--color-aiva-muted)]' : 'bg-[var(--color-aiva-accent)] text-white border-none shadow-[0_2px_10px_var(--color-aiva-glow)] hover:bg-[#5c3fe0] hover:-translate-y-[1px]'}`}>
                  {p.current ? 'Current Plan' : 'Select'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
        <div className="flex items-center justify-between mb-[18px]">
          <div>
            <div className="text-[15px] font-black">Invoice History</div>
            <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Last 6 months</div>
          </div>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.08em] text-[var(--color-aiva-muted)] font-semibold border-b border-[var(--color-aiva-border)]">
              <th className="pb-[10px] pl-[10px] font-semibold">Invoice</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Date</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Amount</th>
              <th className="pb-[10px] pl-[10px] font-semibold">Status</th>
              <th className="pb-[10px] pl-[10px] font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={i} className="transition-colors duration-150 cursor-pointer hover:bg-[rgba(255,255,255,0.02)] border-b border-[var(--color-aiva-border)] last:border-0">
                <td className="py-[9px] px-[10px] font-jetbrains text-[11px]">{inv.id}</td>
                <td className="py-[9px] px-[10px] text-[var(--color-aiva-muted)] text-[12px]">{inv.date}</td>
                <td className="py-[9px] px-[10px] font-jetbrains text-[11px]">{inv.amount}</td>
                <td className="py-[9px] px-[10px]">
                  <span className="inline-flex text-[10px] font-bold px-[8px] py-[2px] rounded-full whitespace-nowrap bg-[var(--color-aiva-green-bg)] text-[var(--color-aiva-green)]">
                    {inv.status}
                  </span>
                </td>
                <td className="py-[9px] px-[10px]">
                  <span className="text-[11px] text-[var(--color-aiva-accent2)] cursor-pointer hover:underline">Download →</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
