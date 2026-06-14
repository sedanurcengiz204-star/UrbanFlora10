import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Zap, Volume2, RotateCcw } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  phoneColor: string;
  setPhoneColor: (color: string) => void;
  screenshotMode: boolean;
  setScreenshotMode: (mode: boolean) => void;
}

export default function PhoneFrame({
  children,
  phoneColor,
  setPhoneColor,
  screenshotMode,
  setScreenshotMode,
}: PhoneFrameProps) {
  const [isOn, setIsOn] = useState(true);
  const [time, setTime] = useState('');
  const [battery, setBattery] = useState(100);
  const [isCharging, setIsCharging] = useState(true);

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');
      let minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Battery drain simulation
  useEffect(() => {
    const bInterval = setInterval(() => {
      setBattery((prev) => {
        if (prev <= 10) return 100; // recharge loop
        return prev - 1;
      });
    }, 15000);
    return () => clearInterval(bInterval);
  }, []);

  const bgColorsList = {
    titanium: 'border-zinc-300 bg-zinc-400 shadow-zinc-600/40',
    gold: 'border-amber-200 bg-amber-400 shadow-amber-600/30',
    purple: 'border-violet-400 bg-violet-600 shadow-violet-600/30',
    black: 'border-slate-800 bg-slate-900 shadow-black/50',
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 select-none">
      {/* Upper Color Switch Toolbar */}
      <div className="mb-4 flex items-center gap-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
        <span className="text-xs font-semibold text-slate-500">Cihaz Rengi:</span>
        <div className="flex gap-2">
          {Object.keys(bgColorsList).map((color) => {
            const isSelected = color === phoneColor;
            return (
              <button
                key={color}
                onClick={() => setPhoneColor(color)}
                className={`w-6 h-6 rounded-full border-2 transition-transform active:scale-90 ${
                  color === 'titanium'
                    ? 'bg-zinc-300 border-zinc-500'
                    : color === 'gold'
                    ? 'bg-amber-200 border-amber-500'
                    : color === 'purple'
                    ? 'bg-violet-300 border-violet-600'
                    : 'bg-slate-800 border-slate-950'
                } ${isSelected ? 'scale-110 ring-2 ring-emerald-500 ring-offset-1' : 'opacity-80'}`}
                title={color.toUpperCase()}
              />
            );
          })}
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <button
          onClick={() => setIsOn(!isOn)}
          className={`px-3 py-1 text-xs rounded-full border font-medium transition-all flex items-center gap-1 ${
            isOn
              ? 'bg-rose-50 text-rose-600 border-rose-200 active:bg-rose-100'
              : 'bg-emerald-50 text-emerald-600 border-emerald-200 active:bg-emerald-100'
          }`}
        >
          <Zap size={12} />
          {isOn ? 'Gücü Kapat' : 'Gücü Aç'}
        </button>
      </div>

      {/* Main Outer Smartphone Chassis */}
      <div className="relative flex items-center justify-center">
        {/* Physical buttons - Left Side (Volume Keys) */}
        <div className="absolute left-[-4px] top-32 flex flex-col gap-4 z-40">
          <div className="w-[4px] h-10 bg-zinc-600/70 border-l border-white/20 rounded-l-md active:translate-x-[2px] transition-transform cursor-pointer" />
          <div className="w-[4px] h-12 bg-zinc-600/70 border-l border-white/20 rounded-l-md active:translate-x-[2px] transition-transform cursor-pointer" />
          <div className="w-[4px] h-12 bg-zinc-600/70 border-l border-white/20 rounded-l-md active:translate-x-[2px] transition-transform cursor-pointer" />
        </div>

        {/* Physical buttons - Right Side (Power Button) */}
        <button
          onClick={() => setIsOn(!isOn)}
          className="absolute right-[-4px] top-40 w-[4px] h-18 bg-zinc-600/70 border-r border-white/20 rounded-r-md active:translate-x-[-2px] transition-transform z-40 outline-none"
          title="Güç Tuşu"
        />

        {/* Outer Bezel Wrapper */}
        <div
          className={`w-[410px] h-[835px] rounded-[58px] p-[10px] border-4 transition-all duration-500 ease-out shadow-2xl relative ${
            bgColorsList[phoneColor as keyof typeof bgColorsList] || bgColorsList.titanium
          }`}
        >
          {/* Internal Bezel Line & Screen Border */}
          <div className="w-full h-full bg-slate-950 rounded-[48px] p-[3px] shadow-inner overflow-hidden relative border border-slate-950">
            
            {/* Glossy Reflection Highlight Overlay */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/[0.04] to-transparent pointer-events-none z-40 rounded-[45px]" />
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none z-40" />

            {/* Simulated Black Screen / Power Off Cover */}
            {!isOn && (
              <div
                onClick={() => setIsOn(true)}
                className="absolute inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center cursor-pointer select-none"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-pulse shadow-md transition-all active:scale-95">
                  <Zap size={28} className="text-emerald-400" />
                </div>
                <p className="mt-4 text-xs font-medium text-slate-400">Telefonu açmak için dokunun</p>
                <p className="mt-1 text-[10px] text-slate-600">veya sağdaki Güç Tuşuna tıklayın</p>
              </div>
            )}

            {/* Screen Content Window */}
            <div className="w-full h-full bg-slate-50 dark:bg-zinc-900 rounded-[45px] relative overflow-hidden flex flex-col select-none">
              
              {/* STATUS BAR (Standard mobile layout) */}
              <div className="h-12 w-full px-8 absolute top-0 left-0 right-0 z-40 flex items-center justify-between text-slate-800 dark:text-white select-none pointer-events-none font-sans font-semibold text-[13px]">
                {/* Time */}
                <div className="pl-1 drop-shadow-sm font-medium tracking-tight">
                  {time || '10:00'}
                </div>

                {/* Dynamic Space Holder for Dynamic Island */}
                <div className="w-28" />

                {/* Status Icons */}
                <div className="flex items-center gap-1.5 drop-shadow-sm pr-1">
                  <Signal size={14} className="stroke-[2.5]" />
                  <span className="text-[10px] font-bold tracking-widest mr-0.5">5G</span>
                  <Wifi size={14} className="stroke-[2.5]" />
                  <div className="flex items-center gap-0.5 ml-0.5 relative">
                    <Battery size={18} className="stroke-[2]" />
                    <div
                      className="absolute left-[3px] top-[4.5px] h-[5px] bg-slate-800 dark:bg-white rounded-[1px] transition-all"
                      style={{ width: `${(battery / 100) * 10}px` }}
                    />
                  </div>
                </div>
              </div>

              {/* DYNAMIC ISLAND (Notch mockup) */}
              <div className="absolute top-[11px] left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-black hover:bg-zinc-950 cursor-pointer h-[28px] w-[110px] hover:w-[130px] rounded-full flex items-center justify-between px-3 transition-all duration-300 shadow-md">
                {/* Camera lens indicator dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-indigo-950" />
                </div>
                
                {/* Status pulse */}
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-400 font-mono">FLOW</span>
                </div>
              </div>

              {/* CORE APP VIEWPORT */}
              <div className="flex-1 overflow-hidden relative">
                {children}
              </div>

              {/* HOME INDICATOR (System Gesture Bar) */}
              <div className="h-6 w-full absolute bottom-0 left-0 right-0 z-40 flex items-center justify-center pointer-events-none select-none">
                <div className="w-32 h-1 bg-slate-800/80 dark:bg-white/80 rounded-full" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
