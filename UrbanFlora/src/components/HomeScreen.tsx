import React, { useState } from 'react';
import {
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  MapPin,
  Camera,
  Layers,
  Sparkles,
  Info,
  Award,
  Clock,
  X,
  Plus
} from 'lucide-react';
import { User, ActiveScreen, Plant } from '../types';

interface HomeScreenProps {
  user: User;
  setScreen: (screen: ActiveScreen) => void;
  onSelectPlantDetail: (plant: Plant) => void;
}

export default function HomeScreen({ user, setScreen, onSelectPlantDetail }: HomeScreenProps) {
  const [selectedLocalPlant, setSelectedLocalPlant] = useState<any | null>(null);

  // Local flower details dictionary for the popup
  const flowerDetails: Record<string, any> = {
    sakura: {
      name: 'Sakura',
      scientific: 'Prunus serrulata',
      description: 'Kadıköy Parkı’nda açan nadir kiraz çiçeği. Pembe çiçekleri, baharın en güzel keşfi olarak ekstra puan kazandırır.',
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=600&q=80',
      location: 'Kadıköy Parkı',
      rarity: '⭐⭐⭐',
      uploader: 'Selin Doğa Fotoğrafçısı',
      source: 'Uygulama içi keşif galerisi',
      points: '+200',
      date: '13 Haziran 2026'
    },
    gul: {
      name: 'Gül',
      scientific: 'Rosa spp.',
      description: 'Yeni açmış canlı derin kırmızı renkli gül. Yaprakları üzerindeki sabah çiği taneleriyle romantik bir botanik karesi oluşturur.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      location: 'Moda Parkı',
      rarity: '⭐⭐',
      uploader: 'Dr. Ahmet Öz',
      source: 'Topluluk Yüklemesi',
      points: '+120',
      date: '14 Haziran 2026'
    },
    lavanta: {
      name: 'Lavanta',
      scientific: 'Lavandula angustifolia',
      description: 'Yürüyüş yolunda bulunan mor lavanta tarlası. Sakin bir keşif ve hoş koku deneyimi sunar.',
      image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80',
      location: 'Yürüyüş Yolu',
      rarity: '⭐⭐',
      uploader: 'Derya Keşif Rehberi',
      source: 'Kullanıcı önerisi',
      points: '+120',
      date: '11 Haziran 2026'
    },
    sarmasik: {
      name: 'İngiliz Sarmaşığı',
      scientific: 'Hedera helix',
      description: 'Taş duvarları ve ağaç köklerini saran canlı yeşil yapraklarıyla dikkat çeken yakın keşif. Şehrin korunaklı bölgelerinde kolayca bulunur.',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80',
      location: 'Sokak kenarı ve duvar dipleri',
      rarity: '⭐⭐',
      uploader: 'Doğa Koruma Ekibi',
      source: 'Yerel keşif kaydı',
      points: '+90',
      date: '13 Haziran 2026'
    },
    mantar: {
      name: 'Orman Mantarı',
      scientific: 'Agaricus campestris',
      description: 'Nemli orman zemininde beliren yaban mantarı. Zehirli türlerden uzak durularak incelenmesi önerilir.',
      image: 'https://images.unsplash.com/photo-1501535033-a59013c4ec4e?auto=format&fit=crop&w=600&q=80',
      location: 'Moss kaplı orman içi',
      rarity: '⭐',
      uploader: 'Yaren Mantarcı',
      source: 'Fotoğraf kulübü paylaşımı',
      points: '+70',
      date: '12 Haziran 2026'
    },
    eglerti: {
      name: 'Eğrelti Otu',
      scientific: 'Polypodium vulgare',
      description: 'Gölge alanlarda yayılan yeşil eğrelti otu. Nemli bahçe ve park köşelerinde sık bulunan bir doğal keşif.',
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80',
      location: 'Park gölgesi ve çimen altı',
      rarity: '⭐⭐',
      uploader: 'Mert Doğa Gözlemcisi',
      source: 'Yerel keşif kaydı',
      points: '+100',
      date: '11 Haziran 2026'
    }
  };

  const handleOpenDetail = (key: string) => {
    setSelectedLocalPlant(flowerDetails[key]);
  };

  return (
    <div className="w-full h-full bg-[#f8faf6] flex flex-col relative pb-28 overflow-hidden select-none">
      
      {/* Dynamic Header App Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[#c3c8bb]/30 flex items-center justify-between px-6 z-30 select-none">
        <h1 className="text-xl font-bold text-[#173809] font-sans tracking-tight">UrbanFlora</h1>
        
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setScreen('search')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-all text-slate-700"
            title="Arama"
          >
            <Search size={20} />
          </button>
          
          <button
            onClick={() => setScreen('notifications')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-all text-slate-700 relative"
            title="Bildirimler"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
        </div>
      </header>

      {/* Main content viewport */}
      <div className="flex-1 overflow-y-auto pt-20 px-6 space-y-6">
        
        {/* Welcome Section */}
        <div className="mt-2">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight">
            Merhaba, {user.name}!
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Bugün çevrendeki bitkileri keşfetmeye hazır mısın?
          </p>
        </div>

        {/* Level Progression Card */}
        <div className="bg-[#2d4f1e] p-5 rounded-3xl shadow-lg relative overflow-hidden group border border-[#3c6629]/20 text-white flex flex-col">
          {/* Abstract background symbol leaf */}
          <div className="absolute top-[-10px] right-[-20px] w-36 h-36 opacity-10 pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
            <Sparkles size={140} />
          </div>

          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#aedb95] uppercase">
                Keşif Puanı Özeti
              </span>
              <h3 className="text-lg font-bold mt-1 text-[#fff]">Gümüş Kaşif</h3>
            </div>
            <div className="bg-white/10 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1 text-xs font-semibold">
              <TrendingUp size={12} className="text-[#aedb95]" />
              <span>450 Puan</span>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            <div className="flex justify-between text-xs font-semibold text-emerald-200">
              <span className="text-slate-200">Günlük İlerleme</span>
              <span>450 / 500 Puan</span>
            </div>
            <div className="w-full h-2.5 bg-white/15 rounded-full overflow-hidden">
              <div className="h-full bg-[#aef67b] rounded-full w-[90%] shadow-[0_0_8px_rgba(174,246,123,0.5)] transition-all duration-1000" />
            </div>
            <p className="text-[11px] text-emerald-100/80 italic font-medium pt-1">
              Yeni seviyeye (Seviye 16) son 50 puan kaldı!
            </p>
          </div>
        </div>

        {/* Günün Keşifleri (Horizontal Cards) */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Günün Keşifleri</h3>
            <button
              onClick={() => setScreen('daily_discoveries')}
              className="text-xs font-bold text-[#173809] hover:text-[#326b00] flex items-center gap-0.5 active:scale-95 transition-all"
            >
              Tümü
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Horizontal scroll holder */}
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-none snap-x snap-mandatory">
            
            {/* Cards 1: Sakura */}
            <div
              onClick={() => handleOpenDetail('sakura')}
              className="w-56 flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 cursor-pointer snap-start active:scale-98 transition-all hover:shadow-lg"
            >
              <div className="h-40 w-full relative">
                <img
                  src="https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=400&q=80"
                  alt="Sakura"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-[#326b00]">
                  Nadirlik: ⭐⭐⭐
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-slate-800">Sakura</h4>
                <p className="text-xs text-slate-500 italic mt-0.5">Prunus serrulata</p>
              </div>
            </div>

            {/* Cards 2: Gül */}
            <div
              onClick={() => handleOpenDetail('gul')}
              className="w-56 flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 cursor-pointer snap-start active:scale-98 transition-all hover:shadow-lg"
            >
              <div className="h-40 w-full relative">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
                  alt="Gül"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-[#326b00]">
                  Nadirlik: ⭐⭐
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-slate-800">Kırmızı Gül</h4>
                <p className="text-xs text-slate-500 italic mt-0.5">Rosa spp.</p>
              </div>
            </div>

            {/* Cards 3: Lavanta */}
            <div
              onClick={() => handleOpenDetail('lavanta')}
              className="w-56 flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 cursor-pointer snap-start active:scale-98 transition-all hover:shadow-lg"
            >
              <div className="h-40 w-full relative">
                <img
                  src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=400&q=80"
                  alt="Lavanta"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-[#326b00]">
                  Nadirlik: ⭐⭐
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-slate-800">Lavanta</h4>
                <p className="text-xs text-slate-500 italic mt-0.5">Lavandula angustifolia</p>
              </div>
            </div>

          </div>
        </div>

        {/* Yakındaki Türler (Vertical Cards) */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Yakındaki Türler</h3>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full">
              <MapPin size={12} className="text-[#326b00]" />
              <span>Kadıköy, İst</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* Item 1 */}
            <button
              onClick={() => handleOpenDetail('sarmasik')}
              className="w-full bg-white rounded-2xl p-3 border border-slate-100 flex items-center gap-4 text-left active:scale-[0.99] transition-all hover:shadow-md cursor-pointer outline-none"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=150&q=80"
                  alt="Sarmaşık"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800">İngiliz Sarmaşığı</h4>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-0.5">
                  <MapPin size={10} />
                  250 metre mesafede
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0 pr-1">
                <span className="bg-emerald-50 text-emerald-700 font-bold text-[9px] uppercase px-2.5 py-1 rounded-full tracking-wide">
                  Flora
                </span>
                <ChevronRight size={14} className="text-slate-400" />
              </div>
            </button>

            {/* Item 2 */}
            <button
              onClick={() => handleOpenDetail('mantar')}
              className="w-full bg-white rounded-2xl p-3 border border-slate-100 flex items-center gap-4 text-left active:scale-[0.99] transition-all hover:shadow-md cursor-pointer outline-none"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1501535033-a59013c4ec4e?auto=format&fit=crop&w=150&q=80"
                  alt="Mantar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800">Orman Mantarı</h4>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-0.5">
                  <MapPin size={10} />
                  420 metre mesafede
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0 pr-1">
                <span className="bg-amber-50 text-amber-700 font-bold text-[9px] uppercase px-2.5 py-1 rounded-full tracking-wide">
                  Fungi
                </span>
                <ChevronRight size={14} className="text-slate-400" />
              </div>
            </button>

            {/* Item 3 */}
            <button
              onClick={() => handleOpenDetail('eglerti')}
              className="w-full bg-white rounded-2xl p-3 border border-slate-100 flex items-center gap-4 text-left active:scale-[0.99] transition-all hover:shadow-md cursor-pointer outline-none"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=150&q=80"
                  alt="Eğrelti Otu"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800">Eğrelti Otu</h4>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-0.5">
                  <MapPin size={10} />
                  1.2 km mesafede
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0 pr-1">
                <span className="bg-emerald-50 text-emerald-700 font-bold text-[9px] uppercase px-2.5 py-1 rounded-full tracking-wide">
                  Flora
                </span>
                <ChevronRight size={14} className="text-slate-400" />
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Floating Action Button (FAB) for Camera identification */}
      <button
        onClick={() => setScreen('identify')}
        className="fixed right-6 bottom-24 w-14 h-14 bg-[#326b00] hover:bg-[#173809] text-white rounded-full shadow-xl flex items-center justify-center active:scale-90 transition-transform duration-200 z-[35]"
        title="Hızlı Tarama"
      >
        <Camera size={26} />
      </button>

      {/* Interactive Detail Modal Block Popup */}
      {selectedLocalPlant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-[32px] bg-white p-5 border border-slate-100 shadow-2xl flex flex-col gap-4 animate-scaleUp overflow-y-auto max-h-[85vh]">
            
            {/* Close */}
            <button
              onClick={() => setSelectedLocalPlant(null)}
              className="absolute top-4 right-4 rounded-full bg-slate-100 hover:bg-slate-200 p-1.5 text-slate-600 transition-colors z-20"
            >
              <X size={16} />
            </button>

            {/* Image */}
            <div className="relative h-44 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                src={selectedLocalPlant.image}
                alt={selectedLocalPlant.name}
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-800">
                Nadirlik: {selectedLocalPlant.rarity}
              </div>
            </div>

            {/* Header description */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#326b00]">
                Keşif Detayı
              </span>
              <h2 className="text-lg font-bold text-slate-800">{selectedLocalPlant.name}</h2>
              <p className="text-xs italic text-slate-400 font-medium">{selectedLocalPlant.scientific}</p>
            </div>

            {/* Description text */}
            <p className="text-xs text-slate-600 leading-relaxed font-normal bg-slate-50 p-3 rounded-2xl border border-slate-100">
              {selectedLocalPlant.description}
            </p>

            {/* Info Metrics grid */}
            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="bg-[#f8faf6] p-3 rounded-2xl border border-[#c3c8bb]/20">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Konum</span>
                <p className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-0.5">
                  <MapPin size={10} className="text-emerald-700" />
                  {selectedLocalPlant.location}
                </p>
              </div>
              <div className="bg-[#f8faf6] p-3 rounded-2xl border border-[#c3c8bb]/20">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Keşif Puanı</span>
                <p className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-0.5">
                  <Award size={10} className="text-amber-600" />
                  {selectedLocalPlant.points}
                </p>
              </div>
              <div className="bg-[#f8faf6] p-3 rounded-2xl border border-[#c3c8bb]/20">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Kaydeden</span>
                <p className="text-xs font-bold text-slate-800 mt-1 truncate" title={selectedLocalPlant.uploader}>
                  {selectedLocalPlant.uploader}
                </p>
              </div>
              <div className="bg-[#f8faf6] p-3 rounded-2xl border border-[#c3c8bb]/20">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Zaman</span>
                <p className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-0.5">
                  <Clock size={10} className="text-slate-500" />
                  {selectedLocalPlant.date}
                </p>
              </div>
            </div>

            {/* Footer trigger button overlay inside modal */}
            <button
              onClick={() => {
                // Convert popup item layout to actual search screen or map location focus
                const tempPlant: Plant = {
                  id: 999,
                  name: selectedLocalPlant.name,
                  scientificName: selectedLocalPlant.scientific,
                  image: selectedLocalPlant.image,
                  category: 'Çiçekler',
                  desc: selectedLocalPlant.description,
                  rarity: selectedLocalPlant.rarity.length,
                };
                setSelectedLocalPlant(null);
                onSelectPlantDetail(tempPlant);
              }}
              className="w-full py-2.5 rounded-full bg-[#173809] hover:bg-[#326b00] text-white font-bold text-xs shadow-md transition-all active:scale-95 text-center"
            >
              Ansiklopedik Detayı İncele
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
