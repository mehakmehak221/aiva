"use client";

import React from "react";
import Link from "next/link";
import { useProfile } from "./layout";
import { recentCalls, healthData, activity } from "@/data/dashboardData";

export default function DashboardPage() {
  const { data } = useProfile();

  return (
    <div className="flex flex-col gap-5">
      {/* ALERT BANNER */}
      <Link href="/dashboard/agent" className="bg-[var(--color-aiva-amber-bg)] border border-[rgba(245,166,35,0.25)] rounded-[11px] px-[15px] py-[11px] flex items-center gap-[10px] mb-4 cursor-pointer transition-all duration-200 hover:opacity-90">
        <span>⚠️</span>
        <div className="flex-1 text-[12px] text-[var(--color-aiva-amber)]">
          Agent IQ at <strong className="text-[#fbbf24]">{data.iq}%</strong> — upload your pricing sheet and add 3 more FAQ answers to reach 100% and improve conversion by ~23%.
        </div>
        <span className="text-[13px] text-[var(--color-aiva-amber)] shrink-0">→</span>
      </Link>

      {/* KPI GRID */}
      <div className="grid grid-cols-4 gap-[14px]">
        {data.kpis.map((kpi: any, i: number) => (
          <div key={i} className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[12px] p-4 flex flex-col justify-between h-[105px]">
            <div className="text-[12px] font-semibold text-[var(--color-aiva-muted)] uppercase tracking-[0.05em]">{kpi.l}</div>
            <div className={`font-jetbrains text-[28px] font-medium leading-[1.1] ${kpi.c}`}>{kpi.v}</div>
            <div className={`text-[11px] ${kpi.dir === "up" ? "text-[var(--color-aiva-green)]" : kpi.dir === "down" ? "text-[var(--color-aiva-red)]" : "text-[var(--color-aiva-muted)]"}`}>
              {kpi.dir === "up" ? "↑" : kpi.dir === "down" ? "↓" : "→"} {kpi.d} <span className="text-[var(--color-aiva-muted)]">vs prev</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-5">
        {/* CALL VOLUME */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Call Volume</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Inbound vs Outbound</div>
            </div>
            <Link href="/dashboard/calls" className="text-[11px] text-[var(--color-aiva-accent2)] cursor-pointer hover:underline">View all →</Link>
          </div>
          <div className="h-[140px] flex items-end justify-between px-2 mb-3">
            {data.callData.map((c: any, i: number) => {
              const maxV = Math.max(...data.callData.map((x: any) => x.o + x.i));
              const oh = Math.round((c.o / maxV) * 110);
              const ih = Math.round((c.i / maxV) * 110);
              const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              return (
                <div key={i} className="flex flex-col items-center gap-[6px] w-[32px]">
                  <div className="w-[18px] bg-[var(--color-aiva-border2)] rounded-[4px] flex flex-col justify-end overflow-hidden pb-[2px] items-center gap-[2px] h-[110px]">
                    <div style={{ height: `${oh}px` }} className="w-[14px] bg-[var(--color-aiva-accent)] opacity-85 rounded-[3px]"></div>
                    <div style={{ height: `${ih}px` }} className="w-[14px] bg-[var(--color-aiva-green)] opacity-85 rounded-[3px]"></div>
                  </div>
                  <div className="text-[10px] text-[var(--color-aiva-muted)]">{days[i]}</div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-[14px] justify-center text-[10px] text-[var(--color-aiva-muted)] pt-3 border-t border-[var(--color-aiva-border)]">
            <div className="flex items-center gap-1.5"><div className="w-[6px] h-[6px] rounded-full bg-[var(--color-aiva-accent)]"></div>Outbound</div>
            <div className="flex items-center gap-1.5"><div className="w-[6px] h-[6px] rounded-full bg-[var(--color-aiva-green)]"></div>Inbound</div>
          </div>
        </div>

        {/* CALL OUTCOMES */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Call Outcomes</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">This period</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="relative w-[110px] h-[110px] shrink-0">
              <svg viewBox="0 0 110 110" width="110" height="110">
                {(() => {
                  let offset = 0;
                  const circ = 2 * Math.PI * 38;
                  return data.outcomes.map((o: any, i: number) => {
                    const dash = (o.p / 100) * circ;
                    const gap = circ - dash;
                    const path = <circle key={i} cx="55" cy="55" r="38" fill="none" stroke={o.c} strokeWidth="13" strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset} transform="rotate(-90 55 55)" strokeLinecap="butt"/>;
                    offset += dash;
                    return path;
                  });
                })()}
                <text x="55" y="60" textAnchor="middle" fill="var(--color-aiva-text)" fontFamily="JetBrains Mono" fontSize="14" fontWeight="500">{data.outcomes[0].p}%</text>
              </svg>
            </div>
            <div className="flex-1 flex flex-col gap-2.5">
              {data.outcomes.map((o: any, i: number) => (
                <div key={i} className="flex items-center text-[11px]">
                  <div className="w-[6px] h-[6px] rounded-full mr-2 shrink-0" style={{ background: o.c }}></div>
                  <div className="flex-1 text-[var(--color-aiva-text)]">{o.l}</div>
                  <div className="font-jetbrains text-[12px] font-medium" style={{ color: o.c }}>{o.p}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-5 mt-1">
        {/* CONVERSION FUNNEL */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Conversion Funnel</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Calls → Leads → Won</div>
            </div>
          </div>
          <div>
            {data.funnel.map((f: any, i: number) => {
              const maxV = data.funnel[0].v;
              const pct = Math.round((f.v / maxV) * 100);
              const rate = i > 0 ? Math.round((f.v / data.funnel[i - 1].v) * 100) : 100;
              return (
                <div key={i} className="mb-2.5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[12px] font-semibold">{f.l}</span>
                    <div className="flex items-center gap-2">
                      {i > 0 && <span className="text-[10px] text-[var(--color-aiva-muted)] font-medium">→ {rate}%</span>}
                      <span className="font-jetbrains text-[12px] font-medium" style={{ color: f.c }}>{f.v.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="h-[6px] bg-[var(--color-aiva-border2)] rounded-[10px] overflow-hidden">
                    <div className="h-full rounded-[10px]" style={{ width: `${pct}%`, background: f.c }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* REVENUE IMPACT */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">{data.revLabel}</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">AI-attributed</div>
            </div>
            <Link href="/dashboard/reports" className="text-[11px] text-[var(--color-aiva-accent2)] cursor-pointer hover:underline">Full report →</Link>
          </div>
          {(() => {
            const revData = data.revData;
            const W = 380, H = 100, pad = 10;
            const maxV = Math.max(...revData);
            const minV = Math.min(...revData);
            const pts = revData.map((v: number, i: number) => {
              const x = pad + (i / (revData.length - 1)) * (W - pad * 2);
              const y = H - pad - ((v - minV) / (maxV - minV || 1)) * (H - pad * 2);
              return { x, y };
            });
            const pStr = pts.map((p: any) => `${p.x},${p.y}`).join(' ');
            return (
              <svg viewBox="0 0 380 110" className="w-full h-[110px]" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lg_lineChart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-aiva-accent)" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="var(--color-aiva-accent)" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <polygon points={`${pStr} ${pts[pts.length - 1].x},${H} ${pts[0].x},${H}`} fill="url(#lg_lineChart)"/>
                <polyline points={pStr} fill="none" stroke="var(--color-aiva-accent)" strokeWidth="2" strokeLinejoin="round"/>
                {pts.map((p: any, i: number) => (
                  <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--color-aiva-accent)" stroke="var(--color-aiva-bg)" strokeWidth="2"/>
                ))}
              </svg>
            );
          })()}
          <div className="flex justify-between mt-1.5">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
              <div key={i} className="text-[9px] text-[var(--color-aiva-muted)]">{d}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1fr_1fr] gap-5 mt-1">
        {/* RECENT CALLS */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Recent Calls</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Live feed</div>
            </div>
            <Link href="/dashboard/calls" className="text-[11px] text-[var(--color-aiva-accent2)] cursor-pointer hover:underline">All →</Link>
          </div>
          <div>
            {recentCalls.map((c, i) => (
              <div key={i} className={`flex items-center gap-2.5 py-[9px] ${i !== recentCalls.length - 1 ? 'border-b border-[var(--color-aiva-border)]' : ''} cursor-pointer transition-all duration-150 hover:opacity-80`}>
                <div className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center text-[12px] shrink-0" style={{ background: c.bg }}>{c.ic}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold whitespace-nowrap overflow-hidden text-ellipsis">{c.name}</div>
                  <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[1px]">{c.meta}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`font-jetbrains text-[11px] font-medium ${c.sc}`}>{c.dur}</div>
                  <div className="text-[10px] text-[var(--color-aiva-muted)] mt-[1px]">{c.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AGENT HEALTH */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Agent Health</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Performance</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[9px] mb-[14px]">
            {healthData.map((h, i) => (
              <div key={i} className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] p-[11px]">
                <div className="text-[10px] text-[var(--color-aiva-muted)] uppercase tracking-[0.07em] mb-1 font-semibold">{h.l}</div>
                <div className="font-jetbrains text-[17px] font-medium" style={{ color: h.c }}>{h.v}</div>
                <div className="h-[4px] bg-[var(--color-aiva-border2)] rounded-[10px] overflow-hidden mt-[5px]">
                  <div className="h-full rounded-[10px]" style={{ width: `${h.f}%`, background: h.c }}></div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {activity.map((a, i) => (
              <div key={i} className={`flex gap-2.5 py-2 text-[12px] ${i !== activity.length - 1 ? 'border-b border-[var(--color-aiva-border)]' : ''}`}>
                <div className="w-[7px] h-[7px] rounded-full shrink-0 mt-[3px]" style={{ background: a.d }}></div>
                <div className="flex-1 text-[var(--color-aiva-muted)] leading-[1.4]" dangerouslySetInnerHTML={{ __html: a.t.replace(/<strong/g, '<strong style="color:var(--color-aiva-text)"') }}></div>
                <div className="text-[10px] text-[var(--color-aiva-muted2)] shrink-0 font-jetbrains">{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* USAGE & BILLING */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Usage & Billing</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Current cycle</div>
            </div>
            <Link href="/dashboard/billing" className="text-[11px] text-[var(--color-aiva-accent2)] cursor-pointer hover:underline">Upgrade →</Link>
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
          <div className="pt-3 border-t border-[var(--color-aiva-border)] mt-1">
            <div className="flex justify-between items-center py-2.5 border-b border-[var(--color-aiva-border)]">
              <div className="text-[13px] text-[var(--color-aiva-muted)]">Next billing</div>
              <div className="font-jetbrains text-[13px] font-medium">Jun 15, 2026</div>
            </div>
            <div className="flex justify-between items-center pt-2.5">
              <div className="text-[13px] text-[var(--color-aiva-muted)]">Estimated</div>
              <div className="font-jetbrains text-[13px] font-medium text-[var(--color-aiva-green)]">{data.billing}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
