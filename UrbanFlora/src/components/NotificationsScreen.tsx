import React from 'react';
import { ArrowLeft, Bell, CheckCircle2, Bookmark, Award, Clock } from 'lucide-react';
import { ActiveScreen } from '../types';

interface NotificationsScreenProps {
  setScreen: (screen: ActiveScreen) => void;
}

export default function NotificationsScreen({ setScreen }: NotificationsScreenProps) {
  const notificationsList = [
    {
      id: 1,
      title: 'Keşfiniz Onaylandı!',
      body: 'Yeni keşif kaydınız doğrulandı! Haritada yeni bir bitki keşfi için bağlantıya dokunun.',
      time: '2 saat önce',
      type: 'approval',
    },
    {
      id: 2,
      title: 'Favorilere Eklendi',
      body: 'Kaydettiğiniz bitki favoriler listesine eklendi. Harita görünümünden favorilerinizi kontrol edin.',
      time: 'Dün',
      type: 'favorite',
    },
    {
      id: 3,
      title: 'Yeni Başarım Kazanıldı!',
      body: 'Yeni bir bitki keşfi başarıyla tamamlandı! Daha fazla rozet kazanmak için keşif yapmaya devam edin.',
      time: '3 gün önce',
      type: 'achievement',
    },
  ];

  return (
    <div className="w-full h-full bg-[#f8faf6] flex flex-col relative pb-20 select-none">
      
      {/* Top Mobile App Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[#c3c8bb]/30 flex items-center px-4 z-30 select-none gap-2">
        <button
          onClick={() => setScreen('home')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 text-slate-700 outline-none"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-md font-bold text-[#173809] font-sans">Bildirimler</h1>
      </header>

      {/* Main scrolling wrapper */}
      <div className="flex-1 overflow-y-auto pt-20 px-6 space-y-4">
        <div className="flex items-center gap-2 mt-2">
          <Bell className="text-emerald-700" size={16} />
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Son Bildirimler</h2>
        </div>

        <div className="flex flex-col gap-3">
          {notificationsList.map((notif) => (
            <div
              key={notif.id}
              className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-shadow"
            >
              {/* Type indicator Icon */}
              <div className="mt-0.5 flex-shrink-0">
                {notif.type === 'approval' ? (
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <CheckCircle2 size={16} />
                  </div>
                ) : notif.type === 'favorite' ? (
                  <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
                    <Bookmark size={16} />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#fde68a]/30 text-amber-700 flex items-center justify-center border border-amber-250">
                    <Award size={16} />
                  </div>
                )}
              </div>

              {/* Text info and timestamps */}
              <div className="flex-1 space-y-1 text-left min-w-0">
                <h3 className="text-sm font-bold text-slate-800 tracking-tight">{notif.title}</h3>
                <p className="text-xs text-slate-500 leading-normal pr-1">{notif.body}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-1.5">
                  <Clock size={10} />
                  <span>{notif.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
