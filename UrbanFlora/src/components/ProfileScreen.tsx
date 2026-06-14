import React from 'react';
import { LogOut, Award, Compass, Heart, ShieldCheck, Activity, MapPin, Globe, Sparkles } from 'lucide-react';
import { User, ActiveScreen } from '../types';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
  setScreen: (screen: ActiveScreen) => void;
}

export default function ProfileScreen({ user, onLogout, setScreen }: ProfileScreenProps) {
  const badges = [
    {
      id: 1,
      name: 'İlk Keşif',
      icon: 'eco',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      id: 2,
      name: 'Botanik Ustası',
      icon: 'stars',
      color: 'bg-amber-50 text-amber-700 border-amber-100',
    },
    {
      id: 3,
      name: 'Şehir Kaşifi',
      icon: 'travel_explore',
      color: 'bg-sky-50 text-sky-700 border-sky-100',
    },
    {
      id: 4,
      name: 'Flora Meraklısı',
      icon: 'military_tech',
      color: 'bg-violet-50 text-violet-700 border-violet-100',
    },
  ];

  const recentDiscoveries = [
    {
      id: 1,
      name: 'Tıbbi Lavanta',
      scientific: 'Lavandula angustifolia',
      location: 'Yıldız Parkı, İstanbul',
      image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=350&q=80',
    },
    {
      id: 2,
      name: 'Kırmızı Gül',
      scientific: 'Rosa rubiginosa',
      location: 'Moda Sahili, İstanbul',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=350&q=80',
    },
  ];

  return (
    <div className="w-full h-full bg-[#f8faf6] flex flex-col relative pb-24 overflow-hidden select-none">
      {/* Top Bar Header wrapper */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[#c3c8bb]/30 flex items-center justify-between px-6 z-30 select-none">
        <h1 className="text-lg font-bold text-[#173809] font-sans">Profilim</h1>
        
        <button
          onClick={onLogout}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-rose-50 text-rose-600 active:scale-95 transition-all outline-none"
          title="Çıkış Yap"
        >
          <LogOut size={18} />
        </button>
      </header>

      {/* Main scrolling layout */}
      <div className="flex-1 overflow-y-auto pt-20 px-6 space-y-6">
        
        {/* User identification avatar layout card */}
        <div className="flex flex-col items-center justify-center text-center mt-3 mb-2 space-y-2">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-slate-200 border-2 border-emerald-700 p-1 flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt={user.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center border-2 border-white text-[10px] font-bold">
              15
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">{user.name}</h2>
            <p className="text-xs text-slate-400 font-medium tracking-wide mt-0.5">{user.email}</p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#173809]/10 rounded-full border border-[#173809]/20">
            <Sparkles size={13} className="text-[#173809]" />
            <span className="text-xs font-bold text-[#173809]">5,240 Kaşif Puanı</span>
          </div>
        </div>

        {/* Bento stats grid panels */}
        <div className="grid grid-cols-2 gap-3 text-left">
          {/* Card 1: Toplam Keşif */}
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <Compass size={16} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none mb-1">
                Toplam Keşif
              </p>
              <p className="text-lg font-bold text-slate-800 leading-none">84 Adet</p>
            </div>
          </div>

          {/* Card 2: Seviye */}
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
              <Award size={16} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none mb-1">
                Aktif Rütbe
              </p>
              <p className="text-lg font-bold text-slate-800 leading-none">Seviye 15</p>
            </div>
          </div>

          {/* Wide card: Doğrulananlar */}
          <div className="col-span-2 bg-[#f8faf6] p-4 rounded-3xl border border-[#c3c8bb]/20 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none">
                Doğrulanan Keşif Oranı
              </p>
              <p className="text-base font-bold text-emerald-800 mt-1">62 / 84 Bitki Doğrulandı</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
          </div>
        </div>

        {/* Level progression bar details */}
        <div className="bg-slate-100/50 p-4 rounded-[24px] border border-slate-200/40 text-left space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Seviye 16 Rütbesine</span>
            <span className="font-bold text-slate-700">760 Puan Kaldı</span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#173809] rounded-full w-[70%] shadow-[0_0_6px_rgba(23,56,9,0.3)]" />
          </div>
        </div>

        {/* Kazanılan Rozetler Carousel list */}
        <div className="space-y-3 text-left">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">
            Kazanılan Rozetler
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-none snap-x pointer-events-auto">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex-shrink-0 flex flex-col items-center gap-1.5 snap-center text-center cursor-pointer"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-2 border-white shadow-md active:scale-95 transition-all ${badge.color}`}
                >
                  <Award size={28} />
                </div>
                <span className="text-[11px] font-bold text-slate-600 tracking-tight leading-none">
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Son Keşifler feed list */}
        <div className="space-y-4 text-left">
          <div className="flex justify-between items-center pl-1">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Son Keşiflerim</h3>
            <button
              onClick={() => setScreen('daily_discoveries')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900"
            >
              Tümünü Gör
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {recentDiscoveries.map((rec) => (
              <div
                key={rec.id}
                className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm flex items-center gap-3.5"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
                  <img src={rec.image} alt={rec.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow min-w-0 text-left">
                  <h4 className="text-sm font-bold text-slate-800 truncate">{rec.name}</h4>
                  <p className="text-[11px] text-slate-400 italic font-semibold truncate mt-0.5">{rec.scientific}</p>
                  
                  <div className="flex items-center gap-0.5 text-[10px] font-semibold text-slate-400 mt-1 whitespace-nowrap">
                    <MapPin size={10} className="text-slate-400" />
                    <span>{rec.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
