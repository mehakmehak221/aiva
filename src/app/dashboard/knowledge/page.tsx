"use client";

import React from "react";
import { kbDocs, faqs } from "@/data/dashboardData";

export default function KnowledgePage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="mb-[18px]">
        <h2 className="text-[20px] font-black tracking-[-0.4px]">Knowledge Base</h2>
        <p className="text-[13px] text-[var(--color-aiva-muted)] mt-[3px]">Everything your agent knows about your business</p>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-5">
        {/* DOCUMENTS */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5 flex flex-col">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Documents</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Uploaded files & URLs</div>
            </div>
            <button className="px-[12px] py-[6px] rounded-[9px] bg-[var(--color-aiva-accent)] text-white border-none shadow-[0_2px_10px_var(--color-aiva-glow)] font-cabinet text-[11px] font-bold cursor-pointer transition-all duration-200 hover:bg-[#5c3fe0] hover:-translate-y-[1px]">
              + Add Source
            </button>
          </div>
          <div className="flex-1">
            {kbDocs.map((f, i) => (
              <div key={i} className="flex items-center gap-[10px] py-[10px] border-b border-[var(--color-aiva-border)]">
                <div className="text-[18px] shrink-0">{f.ic}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold">{f.name}</div>
                  <div className="text-[11px] text-[var(--color-aiva-muted)]">{f.size}</div>
                </div>
                <span className="inline-flex text-[10px] font-bold px-[8px] py-[2px] rounded-full whitespace-nowrap bg-[var(--color-aiva-green-bg)] text-[var(--color-aiva-green)]">
                  {f.status}
                </span>
                <span className="text-[var(--color-aiva-muted)] cursor-pointer text-[14px] ml-2 hover:text-white transition-colors">🗑️</span>
              </div>
            ))}
          </div>
          <div className="pt-[10px] mt-auto">
            <button className="w-full py-[10px] rounded-[9px] border border-[var(--color-aiva-border)] bg-[var(--color-aiva-s2)] text-[var(--color-aiva-muted)] font-cabinet text-[13px] font-bold cursor-pointer transition-all duration-200 hover:text-[var(--color-aiva-text)] hover:border-[var(--color-aiva-border2)] flex justify-center items-center">
              + Add Source
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5 flex flex-col">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">FAQ</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">12 questions trained</div>
            </div>
            <button className="px-[12px] py-[6px] rounded-[9px] bg-[var(--color-aiva-accent)] text-white border-none shadow-[0_2px_10px_var(--color-aiva-glow)] font-cabinet text-[11px] font-bold cursor-pointer transition-all duration-200 hover:bg-[#5c3fe0] hover:-translate-y-[1px]">
              + Add Q&A
            </button>
          </div>
          <div className="flex-1">
            {faqs.map((f, i) => (
              <div key={i} className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[13px] py-[11px] mb-[7px]">
                <div className="text-[12px] font-bold mb-[4px]">❓ {f.q}</div>
                <div className="text-[11px] text-[var(--color-aiva-muted)] leading-[1.5]">→ {f.a}</div>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-[4px]">
            <button className="w-full py-[10px] rounded-[9px] border border-[var(--color-aiva-border)] bg-[var(--color-aiva-s2)] text-[var(--color-aiva-muted)] font-cabinet text-[13px] font-bold cursor-pointer transition-all duration-200 hover:text-[var(--color-aiva-text)] hover:border-[var(--color-aiva-border2)] flex justify-center items-center">
              + Add Q&A
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
