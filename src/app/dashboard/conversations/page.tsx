"use client";

import React from "react";

export default function ConversationsPage() {
  const convs = [
    { name: "Sarah Mitchell", ch: "💬 WhatsApp", msg: "Thank you! I will check the tracking link.", time: "2m ago", bg: "var(--color-aiva-green-bg)" },
    { name: "James Rodriguez", ch: "📧 Email", msg: "Can you tell me more about the return policy?", time: "18m ago", bg: "var(--color-aiva-blue-bg)" },
    { name: "Emily Chen", ch: "💬 WhatsApp", msg: "Perfect, I will proceed with the order.", time: "45m ago", bg: "var(--color-aiva-amber-bg)" },
    { name: "Carlos Pérez", ch: "📱 SMS", msg: "What is the delivery time to Mexico?", time: "1h ago", bg: "var(--color-aiva-s2)" },
  ];

  const outcomes = [
    { l: "WhatsApp", p: 52, c: "var(--color-aiva-green)" }, 
    { l: "Email", p: 28, c: "var(--color-aiva-blue)" },
    { l: "SMS", p: 14, c: "var(--color-aiva-amber)" }, 
    { l: "In-app", p: 6, c: "var(--color-aiva-accent2)" }
  ];

  const rates = [
    { l: "WhatsApp", r: 78, c: "var(--color-aiva-green)" }, 
    { l: "Email", r: 34, c: "var(--color-aiva-blue)" }, 
    { l: "SMS", r: 61, c: "var(--color-aiva-amber)" }
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-[18px]">
        <h2 className="text-[20px] font-black tracking-[-0.4px]">Conversations</h2>
        <p className="text-[13px] text-[var(--color-aiva-muted)] mt-[3px]">WhatsApp, SMS and Email threads</p>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-5">
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Active Threads</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Last 7 days</div>
            </div>
            <div className="text-[11px] text-[var(--color-aiva-accent2)] cursor-pointer hover:underline">View all →</div>
          </div>
          <div>
            {convs.map((c, i) => (
              <div key={i} className={`flex items-center gap-[10px] py-[9px] border-b border-[var(--color-aiva-border)] cursor-pointer transition-all duration-150 hover:opacity-80 last:border-0`}>
                <div className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center text-[12px] shrink-0" style={{ background: c.bg }}>{c.ch[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold">{c.name} <span className="text-[10px] text-[var(--color-aiva-muted)] font-normal">{c.ch}</span></div>
                  <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[1px] max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">{c.msg}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-[var(--color-aiva-muted)] mt-[1px]">{c.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Channel Breakdown</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Messages sent by channel</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="relative w-[110px] h-[110px] shrink-0">
              <svg viewBox="0 0 110 110" width="110" height="110">
                {(() => {
                  let offset = 0;
                  const circ = 2 * Math.PI * 38;
                  return outcomes.map((o: any, i: number) => {
                    const dash = (o.p / 100) * circ;
                    const gap = circ - dash;
                    const path = <circle key={i} cx="55" cy="55" r="38" fill="none" stroke={o.c} strokeWidth="13" strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset} transform="rotate(-90 55 55)" strokeLinecap="butt"/>;
                    offset += dash;
                    return path;
                  });
                })()}
                <text x="55" y="60" textAnchor="middle" fill="var(--color-aiva-text)" fontFamily="JetBrains Mono" fontSize="14" fontWeight="500">{outcomes[0].p}%</text>
              </svg>
            </div>
            <div className="flex-1 flex flex-col gap-2.5">
              {outcomes.map((o: any, i: number) => (
                <div key={i} className="flex items-center text-[11px]">
                  <div className="w-[6px] h-[6px] rounded-full mr-2 shrink-0" style={{ background: o.c }}></div>
                  <div className="flex-1 text-[var(--color-aiva-text)]">{o.l}</div>
                  <div className="font-jetbrains text-[12px] font-medium" style={{ color: o.c }}>{o.p}%</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-[14px] pt-[12px] border-t border-[var(--color-aiva-border)]">
            <div className="text-[13px] font-black mb-[10px]">Response Rates</div>
            {rates.map((r, i) => (
              <div key={i} className="mb-[9px]">
                <div className="flex justify-between text-[12px] mb-[3px]">
                  <span className="text-[var(--color-aiva-muted)]">{r.l}</span>
                  <span className="font-jetbrains" style={{ color: r.c }}>{r.r}%</span>
                </div>
                <div className="h-[4px] bg-[var(--color-aiva-border2)] rounded-[10px] overflow-hidden">
                  <div className="h-full rounded-[10px]" style={{ width: `${r.r}%`, background: r.c }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
