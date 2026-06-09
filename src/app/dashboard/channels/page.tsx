"use client";

import React, { useState } from "react";

export default function ChannelsPage() {
  const [channels, setChannels] = useState([
    { ic: '📞', name: 'AI Voice Calls', desc: 'Make & receive calls · 50+ languages', stats: '2,841 calls this period', on: true },
    { ic: '💬', name: 'WhatsApp Business', desc: 'Messages, follow-ups & support', stats: '5,820 messages this period', on: true },
    { ic: '📱', name: 'SMS', desc: 'Reminders, confirmations & alerts', stats: '2,100 segments this period', on: false },
    { ic: '📧', name: 'Email', desc: 'Automated follow-ups & nurturing', stats: '31,200 emails this period', on: false },
  ]);

  const nums = [
    { num: '+1 (555) 042-8819', country: '🇺🇸 US', type: 'Local', status: 'Active' },
    { num: '+57 321 456-7890', country: '🇨🇴 CO', type: 'Mobile', status: 'Active' },
  ];

  const toggleChannel = (index: number) => {
    const newChannels = [...channels];
    newChannels[index].on = !newChannels[index].on;
    setChannels(newChannels);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-[18px]">
        <h2 className="text-[20px] font-black tracking-[-0.4px]">Channels</h2>
        <p className="text-[13px] text-[var(--color-aiva-muted)] mt-[3px]">Manage where your agent operates</p>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-5">
        {/* ACTIVE CHANNELS */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Active Channels</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Toggle to enable or disable</div>
            </div>
          </div>
          <div>
            {channels.map((c, i) => (
              <div key={i} className={`flex items-center gap-[12px] py-[13px] ${i !== channels.length - 1 ? 'border-b border-[var(--color-aiva-border)]' : ''}`}>
                <div className="text-[20px] shrink-0 w-[30px] text-center">{c.ic}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold">{c.name}</div>
                  <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[1px]">{c.desc}</div>
                  <div className="font-jetbrains text-[11px] text-[var(--color-aiva-muted2)] mt-[2px]">{c.stats}</div>
                </div>
                <div 
                  className={`w-[38px] h-[22px] rounded-[100px] relative transition-colors duration-200 cursor-pointer shrink-0 ${c.on ? 'bg-[var(--color-aiva-accent)]' : 'bg-[var(--color-aiva-border2)]'}`}
                  onClick={() => toggleChannel(i)}
                >
                  <div className={`absolute w-[16px] h-[16px] rounded-full bg-white top-[3px] transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.4)] ${c.on ? 'left-[19px]' : 'left-[3px]'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PHONE NUMBERS */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5 flex flex-col">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Phone Numbers</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Virtual numbers assigned</div>
            </div>
            <button className="px-[12px] py-[6px] rounded-[9px] bg-[var(--color-aiva-accent)] text-white border-none shadow-[0_2px_10px_var(--color-aiva-glow)] font-cabinet text-[11px] font-bold cursor-pointer transition-all duration-200 hover:bg-[#5c3fe0] hover:-translate-y-[1px]">
              + Add Number
            </button>
          </div>
          <div className="flex-1">
            {nums.map((n, i) => (
              <div key={i} className={`flex items-center gap-[10px] py-[11px] border-b border-[var(--color-aiva-border)]`}>
                <div className="text-[18px] shrink-0">{n.country[0] + n.country[1]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold">{n.num}</div>
                  <div className="text-[11px] text-[var(--color-aiva-muted)]">{n.country} · {n.type}</div>
                </div>
                <span className="inline-flex text-[10px] font-bold px-[8px] py-[2px] rounded-full whitespace-nowrap bg-[var(--color-aiva-green-bg)] text-[var(--color-aiva-green)]">
                  {n.status}
                </span>
                <span className="text-[var(--color-aiva-muted)] cursor-pointer tracking-widest px-2">⋯</span>
              </div>
            ))}
          </div>
          <div className="pt-[12px] mt-auto">
            <button className="w-full py-[10px] rounded-[9px] border border-[var(--color-aiva-border)] bg-[var(--color-aiva-s2)] text-[var(--color-aiva-muted)] font-cabinet text-[13px] font-bold cursor-pointer transition-all duration-200 hover:text-[var(--color-aiva-text)] hover:border-[var(--color-aiva-border2)] flex justify-center items-center">
              + Add Number · $1.65/mo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
