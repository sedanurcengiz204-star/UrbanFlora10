import React from 'react';
import { ArrowLeft, Sparkles, Award, MapPin, CheckCircle, Lightbulb } from 'lucide-react';
import { ActiveScreen } from '../types';

interface DailyDiscoveriesProps {
  setScreen: (screen: ActiveScreen) => void;
}

export default function DailyDiscoveriesScreen({ setScreen }: DailyDiscoveriesProps) {
  const discoveries = [
    {
      id: 1,
      name: 'Sakura (Süs Kirazı)',
      scientific: 'Prunus serrulata',
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=400&q=80',
      location: 'Kadıköy Parkı',
      rarity: '⭐⭐⭐⭐',
      points: '+200',
    },
    {
      id: 2,
      name: 'Lale',
      scientific: 'Tulipa gesneriana',
      image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=400&q=80',
      location: 'Göztepe Parkı',
      rarity: '⭐⭐⭐',
      points: '+90',
    },
    {
      id: 3,
      name: 'Mavi Lavanta',
      scientific: 'Lavandula angustifolia',
      image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=400&q=80',
      location: 'Yürüyüş Yolu',
      rarity: '⭐⭐⭐',
      points: '+120',
    },
    {
      id: 4,
      name: 'Kırmızı Gül',
      scientific: 'Rosa spp.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
      location: 'Çiçek Bahçesi',
      rarity: '⭐⭐⭐',
      points: '+170',
    },
    {
      id: 5,
      name: 'Yabani Papatya',
      scientific: 'Matricaria chamomilla',
      image: 'https://images.unsplash.com/photo-1600077106724-946750eeaf3c?auto=format&fit=crop&w=400&q=80',
      location: 'Açık Çayır Bölgesi',
      rarity: '⭐⭐',
      points: '+100',
    },
  ];

  return (
    <div className="w-full h-full bg-[#f8faf6] flex flex-col relative pb-20 select-none">
      
      {/* Search Header Wrapper bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[#c3c8bb]/30 flex items-center px-4 z-30 select-none gap-2">
        <button
          onClick={() => setScreen('home')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 text-slate-700 outline-none"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-md font-bold text-[#173809] font-sans">Günün Keşifleri</h1>
      </header>

      {/* Main scrolling wrapper window */}
      <div className="flex-1 overflow-y-auto pt-20 px-6 space-y-6">
        
        {/* Intro */}
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Bugün için seçtiğimiz özel keşif rotaları ve nadide bitki türleri aşağıda listelenmiştir. Her keşif size puan kazandıracaktır.
        </p>

        {/* Featured Discovery Event Highlight Banner */}
        <div className="bg-[#2d4f1e] p-5 rounded-3xl shadow-md text-white/95 relative overflow-hidden flex flex-col border border-emerald-900/10">
          <div className="absolute top-[-10px] right-[-10px] opacity-15">
            <Sparkles size={110} />
          </div>
          <span className="text-[9px] uppercase tracking-widest text-[#aef67b] font-bold">ÖNE ÇIKAN KEŞİF GÖREVİ</span>
          <h2 className="text-xl font-bold mt-1.5 tracking-tight font-sans">Sakura Bahçesi</h2>
          <p className="text-xs text-slate-200 leading-normal mt-2 pr-4">
            Kadıköy Parkı'nda sınırlı sayıdaki kiraz ağacı bugün çiçek açtı. Bu keşif, ekstra +200 puan ve "Nadir Kaşif" rozeti getiriyor.
          </p>

          <div className="mt-4 pt-3 border-t border-white/10 flex justify-between gap-4 text-xs font-semibold text-[#aef67b]">
            <span>Nadirlik: 🌟 4/5</span>
            <span className="flex items-center gap-1">
              <Award size={14} />
              +200 Pts
            </span>
          </div>
        </div>

        {/* Discovery index lists */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Keşif Envanteri</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {discoveries.map((disc) => (
              <div
                key={disc.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="h-44 w-full relative">
                  <img src={disc.image} alt={disc.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-[#173809] text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wide">
                    {disc.points} PUAN
                  </div>
                </div>
                
                <div className="p-4 space-y-2 text-left">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{disc.name}</h4>
                    <p className="text-[11px] italic text-slate-400 font-semibold mt-0.5">{disc.scientific}</p>
                  </div>

                  <div className="flex justify-between items-center text-xs font-semibold text-slate-500 pt-1 border-t border-slate-50">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-emerald-700" />
                      {disc.location}
                    </span>
                    <span className="text-[10px] text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full font-bold">
                      {disc.rarity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Helpful Tips bento box */}
        <div className="bg-[#f0f4ee] p-5 rounded-3xl border border-[#c3c8bb]/20 text-left space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#173809] uppercase tracking-wider">
            <Lightbulb size={16} />
            <span>Kılavuz & İpuçları</span>
          </div>
          <ul className="text-xs text-slate-600 space-y-2 list-none">
            <li>• Bitkileri rüzgarsız, güneşin dik gelmediği sabah veya ikindi saatlerinde taratmak doğruluk payını artırır.</li>
            <li>• Yaprağın damarlarını net bir şekilde kadraja almak yapay zekanın türü saniyeler içinde tanımasını sağlar.</li>
            <li>• Keşfettiğiniz her yeni bitkiyi haritada diğer kaşiflerle paylaşarak onlara da öncülük edebilirsiniz.</li>
          </ul>
        </div>

      </div>

    </div>
  );
}
