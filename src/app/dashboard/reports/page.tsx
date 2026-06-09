"use client";

import React from "react";

export default function ReportsPage() {
  const calls = [84, 92, 78, 120, 110, 145, 138, 95, 160, 175, 142, 158];
  const leads = [22, 28, 19, 38, 31, 44, 41, 29, 51, 58, 44, 49];
  const won = [6, 8, 5, 11, 9, 13, 12, 8, 15, 17, 13, 14];
  const W = 400, H = 110, pad = 12;
  const allVals = [...calls, ...leads, ...won];
  const maxV = Math.max(...allVals);

  const mkLine = (data: number[], col: string) => {
    const pts = data.map((v, i) => ({
      x: pad + (i / (data.length - 1)) * (W - pad * 2),
      y: H - pad - ((v / maxV)) * (H - pad * 2)
    }));
    return (
      <g>
        <polyline points={pts.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke={col} strokeWidth="1.8" strokeLinejoin="round" opacity="0.9"/>
        {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={col}/>)}
      </g>
    );
  };

  const hrs = ['9am', '10', '11', '12', '1pm', '2', '3', '4', '5', '6'];
  const dys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const hmapData = dys.map(() => 
    hrs.map(() => Math.floor(Math.random() * 100))
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-[18px]">
        <h2 className="text-[20px] font-black tracking-[-0.4px]">Reports</h2>
        <p className="text-[13px] text-[var(--color-aiva-muted)] mt-[3px]">Detailed analytics and exportable insights</p>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-5">
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Performance Over Time</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Calls, leads, conversions</div>
            </div>
            <select className="w-[130px] bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[10px] py-[6px] font-cabinet text-[11px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] appearance-none">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
          </div>
          <svg viewBox="0 0 400 120" className="w-full h-[120px]" preserveAspectRatio="none">
            {mkLine(calls, 'var(--color-aiva-accent)')}
            {mkLine(leads, 'var(--color-aiva-green)')}
            {mkLine(won, 'var(--color-aiva-amber)')}
          </svg>
          <div className="flex gap-[14px] justify-center text-[10px] text-[var(--color-aiva-muted)] mt-[8px]">
            <div className="flex items-center gap-1.5"><div className="w-[6px] h-[6px] rounded-full bg-[var(--color-aiva-accent)]"></div>Calls</div>
            <div className="flex items-center gap-1.5"><div className="w-[6px] h-[6px] rounded-full bg-[var(--color-aiva-green)]"></div>Leads</div>
            <div className="flex items-center gap-1.5"><div className="w-[6px] h-[6px] rounded-full bg-[var(--color-aiva-amber)]"></div>Converted</div>
          </div>
        </div>

        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Top Performing Hours</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Best times to call</div>
            </div>
          </div>
          <div className="grid gap-[3px] grid-cols-[30px_repeat(10,1fr)]">
            <div></div>
            {hrs.map((h, i) => <div key={i} className="text-[9px] text-[var(--color-aiva-muted)] text-center">{h}</div>)}
            {dys.map((day, i) => (
              <React.Fragment key={i}>
                <div className="text-[9px] text-[var(--color-aiva-muted)] flex items-center justify-end pr-1">{day}</div>
                {hmapData[i].map((val, j) => {
                  const o = val / 100;
                  const c = o > 0.8 ? 'var(--color-aiva-green)' : o > 0.5 ? 'var(--color-aiva-accent)' : o > 0.2 ? 'var(--color-aiva-border2)' : 'var(--color-aiva-s3)';
                  return <div key={j} className="h-[12px] rounded-[3px] transition-colors duration-200 cursor-crosshair hover:border hover:border-white" style={{ background: c, opacity: o > 0.2 ? 1 : 0.4 }}></div>;
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5 mb-[14px]">
        <div className="flex items-center justify-between mb-[18px]">
          <div>
            <div className="text-[15px] font-black">Summary Report</div>
            <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Key metrics at a glance</div>
          </div>
          <div className="flex gap-[8px]">
            <button className="px-[12px] py-[7px] rounded-[9px] border border-[var(--color-aiva-border)] bg-[var(--color-aiva-s2)] text-[var(--color-aiva-muted)] font-cabinet text-[13px] font-bold cursor-pointer transition-all duration-200 hover:text-[var(--color-aiva-text)] hover:border-[var(--color-aiva-border2)]">
              📧 Email Report
            </button>
            <button className="px-[12px] py-[7px] rounded-[9px] bg-[var(--color-aiva-accent)] text-white border-none shadow-[0_2px_10px_var(--color-aiva-glow)] font-cabinet text-[13px] font-bold cursor-pointer transition-all duration-200 hover:bg-[#5c3fe0] hover:-translate-y-[1px]">
              📤 Export PDF
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[12px]">
          <div className="bg-[var(--color-aiva-s3)] border border-[var(--color-aiva-border)] rounded-[8px] p-[14px]">
            <div className="text-[12px] text-[var(--color-aiva-muted)] mb-[2px]">Conversion Rate</div>
            <div className="font-jetbrains text-[22px] text-[var(--color-aiva-green)]">24.8%</div>
          </div>
          <div className="bg-[var(--color-aiva-s3)] border border-[var(--color-aiva-border)] rounded-[8px] p-[14px]">
            <div className="text-[12px] text-[var(--color-aiva-muted)] mb-[2px]">Cost per Lead</div>
            <div className="font-jetbrains text-[22px] text-[var(--color-aiva-accent2)]">$12.40</div>
          </div>
          <div className="bg-[var(--color-aiva-s3)] border border-[var(--color-aiva-border)] rounded-[8px] p-[14px]">
            <div className="text-[12px] text-[var(--color-aiva-muted)] mb-[2px]">Avg Call Duration</div>
            <div className="font-jetbrains text-[22px] text-[var(--color-aiva-blue)]">4m 12s</div>
          </div>
        </div>
      </div>
    </div>
  );
}
