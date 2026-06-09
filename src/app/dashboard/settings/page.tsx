"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [notifs, setNotifs] = useState([
    { name: "Daily Summary", desc: "Get a daily email with key metrics", on: true },
    { name: "New Lead Alerts", desc: "Instant notification for converted leads", on: true },
    { name: "Low Balance Warning", desc: "When usage reaches 85% of plan limit", on: true },
    { name: "Agent Errors", desc: "When fallback behavior is triggered", on: false },
    { name: "Product Updates", desc: "New features and platform changes", on: false },
  ]);

  const toggleNotif = (index: number) => {
    const newNotifs = [...notifs];
    newNotifs[index].on = !newNotifs[index].on;
    setNotifs(newNotifs);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-[18px]">
        <h2 className="text-[20px] font-black tracking-[-0.4px]">Settings</h2>
        <p className="text-[13px] text-[var(--color-aiva-muted)] mt-[3px]">Account, notifications and security</p>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-5">
        {/* ACCOUNT SETTINGS */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Account</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">Your profile information</div>
            </div>
          </div>
          
          <div className="mb-[14px]">
            <label className="block text-[11px] font-semibold text-[var(--color-aiva-muted)] tracking-[0.07em] uppercase mb-[6px]">Full Name</label>
            <input className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[13px] py-[11px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)]" defaultValue="Carlos Méndez" />
          </div>
          
          <div className="mb-[14px]">
            <label className="block text-[11px] font-semibold text-[var(--color-aiva-muted)] tracking-[0.07em] uppercase mb-[6px]">Email</label>
            <input className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[13px] py-[11px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)]" defaultValue="carlos@fashionexpress.com" />
          </div>
          
          <div className="mb-[14px]">
            <label className="block text-[11px] font-semibold text-[var(--color-aiva-muted)] tracking-[0.07em] uppercase mb-[6px]">Company</label>
            <input className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[13px] py-[11px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)]" defaultValue="Fashion Express" />
          </div>
          
          <div className="mb-[18px]">
            <label className="block text-[11px] font-semibold text-[var(--color-aiva-muted)] tracking-[0.07em] uppercase mb-[6px]">Time Zone</label>
            <select className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[13px] py-[11px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)] appearance-none">
              <option>America/Bogota (GMT-5)</option>
              <option>America/Mexico_City (GMT-6)</option>
              <option>America/New_York (GMT-5)</option>
              <option>Europe/Madrid (GMT+1)</option>
            </select>
          </div>
          
          <button className="w-full py-[12px] rounded-[9px] bg-[var(--color-aiva-accent)] text-white border-none shadow-[0_2px_10px_var(--color-aiva-glow)] font-cabinet text-[13px] font-bold cursor-pointer transition-all duration-200 hover:bg-[#5c3fe0] hover:-translate-y-[1px] flex justify-center items-center">
            Save Changes
          </button>
        </div>

        {/* NOTIFICATIONS & SECURITY */}
        <div className="bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[14px] p-5">
          <div className="flex items-center justify-between mb-[18px]">
            <div>
              <div className="text-[15px] font-black">Notifications</div>
              <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[2px]">What alerts you receive</div>
            </div>
          </div>
          
          <div>
            {notifs.map((n, i) => (
              <div key={i} className={`flex items-center justify-between py-[12px] ${i !== notifs.length - 1 ? 'border-b border-[var(--color-aiva-border)]' : ''}`}>
                <div>
                  <div className="text-[13px] font-semibold">{n.name}</div>
                  <div className="text-[11px] text-[var(--color-aiva-muted)] mt-[1px]">{n.desc}</div>
                </div>
                <div 
                  className={`w-[38px] h-[22px] rounded-[100px] relative transition-colors duration-200 cursor-pointer shrink-0 ${n.on ? 'bg-[var(--color-aiva-accent)]' : 'bg-[var(--color-aiva-border2)]'}`}
                  onClick={() => toggleNotif(i)}
                >
                  <div className={`absolute w-[16px] h-[16px] rounded-full bg-white top-[3px] transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.4)] ${n.on ? 'left-[19px]' : 'left-[3px]'}`}></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-[18px] mb-[12px]">
            <div>
              <div className="text-[13px] font-black">Security</div>
            </div>
          </div>
          
          <div className="mb-[14px]">
            <label className="block text-[11px] font-semibold text-[var(--color-aiva-muted)] tracking-[0.07em] uppercase mb-[6px]">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[13px] py-[11px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)]" />
          </div>
          
          <div className="mb-[18px]">
            <label className="block text-[11px] font-semibold text-[var(--color-aiva-muted)] tracking-[0.07em] uppercase mb-[6px]">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-[var(--color-aiva-s2)] border border-[var(--color-aiva-border)] rounded-[9px] px-[13px] py-[11px] font-cabinet text-[13px] text-[var(--color-aiva-text)] outline-none transition-all duration-200 focus:border-[var(--color-aiva-accent)] focus:ring-[3px] focus:ring-[var(--color-aiva-glow)]" />
          </div>
          
          <button className="w-full py-[11px] rounded-[9px] border border-[var(--color-aiva-border)] bg-[var(--color-aiva-s2)] text-[var(--color-aiva-muted)] font-cabinet text-[13px] font-bold cursor-pointer transition-all duration-200 hover:text-[var(--color-aiva-text)] hover:border-[var(--color-aiva-border2)] flex justify-center items-center">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
