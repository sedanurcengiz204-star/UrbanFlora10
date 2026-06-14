import React, { useState } from 'react';
import { Search, ArrowLeft, Heart, Sparkles, BookOpen, AlertCircle, Bookmark } from 'lucide-react';
import { ActiveScreen, Plant } from '../types';
import { plantsDatabase } from '../data/plants';

interface SearchScreenProps {
  setScreen: (screen: ActiveScreen) => void;
  selectedPlantForEncyclopedia?: Plant | null;
  clearSelectedPlantForEncyclopedia?: () => void;
}

const CATEGORIES = [
  'Tümü',
  'Süs bitkisi',
  'Şifa bitkisi',
  'Baharat',
  'Ağaç / Orman bitkisi',
  'Tropikal bitki'
];

export default function SearchScreen({
  setScreen,
  selectedPlantForEncyclopedia,
  clearSelectedPlantForEncyclopedia
}: SearchScreenProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewingDetailPlant, setViewingDetailPlant] = useState<Plant | null>(
    selectedPlantForEncyclopedia || null
  );

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Filter logic
  const filteredPlants = plantsDatabase.filter((plant) => {
    const matchesQuery =
      plant.name.toLowerCase().includes(query.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(query.toLowerCase()) ||
      plant.category.toLowerCase().includes(query.toLowerCase()) ||
      plant.desc.toLowerCase().includes(query.toLowerCase());

    if (selectedCategory === 'Tümü') return matchesQuery;
    return matchesQuery && plant.category.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 5));
  });

  const handleBack = () => {
    if (viewingDetailPlant) {
      setViewingDetailPlant(null);
      if (clearSelectedPlantForEncyclopedia) {
        clearSelectedPlantForEncyclopedia();
      }
    } else {
      setScreen('home');
    }
  };

  return (
    <div className="w-full h-full bg-[#f8faf6] flex flex-col relative pb-20 select-none">
      
      {/* Top Search App Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[#c3c8bb]/30 flex items-center px-4 z-30 select-none gap-2">
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 text-slate-700 outline-none"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-md font-bold text-[#173809] font-sans truncate pr-4">
          {viewingDetailPlant ? viewingDetailPlant.name : 'Bitki Ara'}
        </h1>
      </header>

      {/* Main Container Viewport */}
      {viewingDetailPlant ? (
        /* Detailed Encyclopedia Page */
        <div className="flex-1 overflow-y-auto pt-20 px-6 pb-8 space-y-6">
          <div className="relative h-56 rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex-shrink-0">
            <img
              src={viewingDetailPlant.image || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80'}
              alt={viewingDetailPlant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={(e) => toggleFavorite(viewingDetailPlant.id, e)}
                className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-md border border-slate-100 flex items-center justify-center text-rose-500 font-bold active:scale-90 transition-transform"
              >
                <Heart size={18} fill={favorites.includes(viewingDetailPlant.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800 shadow-sm">
              {viewingDetailPlant.category}
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight">
              {viewingDetailPlant.name}
            </h2>
            <p className="text-sm italic text-slate-500 font-medium">
              {viewingDetailPlant.scientificName}
            </p>
          </div>

          <div className="bg-white/90 p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#326b00]">
              <BookOpen size={14} />
              <span>Bitki Açıklaması</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {viewingDetailPlant.desc}
            </p>
          </div>

          {viewingDetailPlant.features && (
            <div className="bg-emerald-50/50 p-5 rounded-3xl border border-emerald-100/50 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#173809]">
                <Sparkles size={14} />
                <span>Öne Çıkan Özellikler</span>
              </div>
              <p className="text-xs text-[#2a441e] leading-relaxed font-medium">
                {viewingDetailPlant.features}
              </p>
            </div>
          )}

          {/* Quick Care Bento Box */}
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 grid grid-cols-2 gap-2 text-left">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GÜNEŞ</span>
              <p className="text-xs font-bold text-slate-700 mt-1">Güneş / Yarı Gölge</p>
            </div>
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SULAMA</span>
              <p className="text-xs font-bold text-slate-700 mt-1">Düzenli / Haftada 2</p>
            </div>
          </div>
        </div>
      ) : (
        /* Library Index Screen */
        <div className="flex-1 overflow-y-auto pt-20 px-6 space-y-6">
          <div className="space-y-1">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Botanik Ansiklopedisi</p>
            <p className="text-sm text-slate-500 font-medium">
              Bitki adı veya özellik girerek çevrende kayıtlı tüm bitkileri bulabilirsin.
            </p>
          </div>

          {/* Search bar inputs */}
          <div className="relative pointer-events-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Lavanta, Gül, Aloe Vera, Kavun..."
              className="w-full text-xs font-medium rounded-full border border-slate-200 pl-11 pr-4 py-3 bg-white shadow-sm outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 placeholder-slate-400 transition"
            />
          </div>

          {/* Category micro slider chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-6 px-6 scrollbar-none snap-x pointer-events-auto">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border outline-none snap-start active:scale-95 ${
                    isActive
                      ? 'bg-[#173809] text-white border-transparent shadow-md'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-150'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* List display */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                {query || selectedCategory !== 'Tümü' ? 'Arama Sonuçları' : 'Öne Çıkan Bitkiler'}
              </h3>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                {filteredPlants.length} kayıt
              </span>
            </div>

            {filteredPlants.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl border border-slate-150 shadow-sm gap-2">
                <AlertCircle size={28} className="text-slate-400 animate-pulse mt-2" />
                <h4 className="text-sm font-bold text-slate-800">Bitki Bulunamadı</h4>
                <p className="text-xs text-slate-500 max-w-[200px]">
                  Lütfen kelime hecesini kontrol edin veya kategori filtresini sıfırlayın.
                </p>
                <button
                  onClick={() => {
                    setQuery('');
                    setSelectedCategory('Tümü');
                  }}
                  className="mt-2 text-xs font-bold text-[#326b00]"
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredPlants.map((plant) => (
                  <div
                    key={plant.id}
                    onClick={() => setViewingDetailPlant(plant)}
                    className="bg-white rounded-3xl p-3 border border-slate-100 flex items-center gap-3.5 hover:shadow-md cursor-pointer transition-all active:scale-[0.99]"
                  >
                    <div className="w-18 h-18 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-sm font-bold text-slate-800 truncate" title={plant.name}>
                          {plant.name}
                        </h4>
                        <button
                          onClick={(e) => toggleFavorite(plant.id, e)}
                          className="text-slate-300 hover:text-rose-500 flex-shrink-0 select-none outline-none active:scale-90"
                        >
                          <Heart
                            size={14}
                            fill={favorites.includes(plant.id) ? '#ea580c' : 'none'}
                            className={favorites.includes(plant.id) ? 'text-rose-500' : ''}
                          />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400 italic font-medium truncate mt-0.5">
                        {plant.scientificName}
                      </p>
                      <div className="mt-1 flex gap-1">
                        <span className="text-[9px] font-bold bg-[#f1f5f0] text-[#173809] uppercase px-2 py-0.5 rounded-full">
                          {plant.category}
                        </span>
                        {plant.rarity >= 2 && (
                          <span className="text-[9px] font-bold bg-amber-50 text-amber-700 uppercase px-2 py-0.5 rounded-full">
                            ★ Popüler
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
