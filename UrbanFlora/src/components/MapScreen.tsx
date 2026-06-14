import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Search,
  Plus,
  Minus,
  Navigation,
  Info,
  Layers,
  Sparkles,
  UserCheck,
  UserPlus,
  Compass,
  X,
  Map as MapIcon,
  Moon,
  Sun,
  Award,
  BookOpen,
  ShieldCheck
} from 'lucide-react';
import { ActiveScreen, Plant } from '../types';
import { mapPlantsData } from '../data/plants';

interface MapScreenProps {
  setScreen: (screen: ActiveScreen) => void;
  addedPlantList: Plant[];
  onSelectPlantDetail: (plant: Plant) => void;
}

export default function MapScreen({ setScreen, addedPlantList, onSelectPlantDetail }: MapScreenProps) {
  // Combine static map data + newly identified custom user plants
  const [plants, setPlants] = useState<Plant[]>([]);

  // Dragging and viewport states
  const [zoom, setZoom] = useState(2); // 1 to 4 zoom factor
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Custom filter and scope controls
  const [currentScope, setCurrentScope] = useState<'local' | 'turkey' | 'global'>('local');
  const [currentFilter, setCurrentFilter] = useState<string>('Tümü');
  const [searchQuery, setQuery] = useState('');
  
  // Selected plant bottom sheet state
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [activeLayer, setActiveLayer] = useState<'sokak' | 'karanlik' | 'uydu'>('sokak');
  const [toast, setToast] = useState<string | null>(null);
  
  // Event state
  const [showEvent, setShowEvent] = useState(true);

  // Initialize and merge added plants
  useEffect(() => {
    // Merge static database with customized ones
    const merged = [...mapPlantsData];
    addedPlantList.forEach((ap) => {
      // Prevent duplicates
      if (!merged.some((p) => p.name === ap.name && p.lat === ap.lat)) {
        merged.push(ap);
      }
    });
    setPlants(merged);

    // Initial alert if added plant is focused
    if (addedPlantList.length > 0) {
      const lastAdded = addedPlantList[addedPlantList.length - 1];
      showCustomToast(`Haritaya eklendi: ${lastAdded.name}!`);
      // auto select
      setSelectedPlant(lastAdded);
      flyToPlantCoords(lastAdded);
    }
  }, [addedPlantList]);

  const showCustomToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Coordinates mapping logic to represent coordinates beautifully as pixels on our vector canvas
  // Central Coordinate: Kadıköy (40.9922, 29.0282) or Turkey offsets
  const mapCenterLat = 40.9922;
  const mapCenterLng = 29.0282;

  const getPixelCoords = (lat: number, lng: number) => {
    // Base scale per pixel
    const scaleBase = 450 * zoom; 
    
    let xOffset = 0;
    let yOffset = 0;

    if (currentScope === 'local') {
      // Localized scale centered on Kadikoy
      xOffset = (lng - mapCenterLng) * scaleBase * 14;
      yOffset = (mapCenterLat - lat) * scaleBase * 14;
    } else if (currentScope === 'turkey') {
      // Focused scale centered on Turkey center
      const capLat = 38.9637;
      const capLng = 35.2433;
      xOffset = (lng - capLng) * scaleBase * 1.5;
      yOffset = (capLat - lat) * scaleBase * 1.5;
    } else {
      // Global scale
      xOffset = (lng - 0) * scaleBase * 0.16;
      yOffset = (25 - lat) * scaleBase * 0.16;
    }

    const centerX = 195 + pan.x; // Half of mobile viewport width (390 / 2)
    const centerY = 350 + pan.y; // Centered vertically

    return {
      x: centerX + xOffset,
      y: centerY + yOffset
    };
  };

  const flyToPlantCoords = (plant: Plant) => {
    if (!plant.lat || !plant.lng) return;
    
    // Smoothly pan map to put coordinates back on center
    let targetPanX = 0;
    let targetPanY = 0;

    if (currentScope === 'local') {
      targetPanX = -(plant.lng - mapCenterLng) * 450 * zoom * 14;
      targetPanY = (plant.lat - mapCenterLat) * 450 * zoom * 14;
    } else if (currentScope === 'turkey') {
      targetPanX = -(plant.lng - 35.2433) * 450 * zoom * 1.5;
      targetPanY = (plant.lat - 38.9637) * 450 * zoom * 1.5;
    } else {
      targetPanX = -(plant.lng - 0) * 450 * zoom * 0.16;
      targetPanY = (plant.lat - 25) * 450 * zoom * 0.16;
    }

    setPan({ x: targetPanX, y: targetPanY });
  };

  // Dragging event handlers
  const handleStartDrag = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX - pan.x, y: clientY - pan.y });
  };

  const handleDrag = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    setPan({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handleEndDrag = () => {
    setIsDragging(false);
  };

  // Filtering list
  const filteredMapPlants = plants.filter((plant) => {
    if (!plant.lat || !plant.lng) return false;

    // Filter by active scope
    if (currentScope === 'local' && plant.scope === 'global') return false;
    if (currentScope === 'turkey' && plant.scope !== 'turkey') return false;
    if (currentScope === 'global' && plant.scope === 'turkey') return false;

    // Filter by chip category
    if (currentFilter === 'Nadir' && plant.rarity < 3) return false;
    if (currentFilter === 'Ağaçlar' && plant.category !== 'Ağaçlar') return false;
    if (currentFilter === 'Çiçekler' && plant.category !== 'Çiçekler') return false;

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      return plant.name.toLowerCase().includes(q) || plant.scientificName.toLowerCase().includes(q);
    }

    return true;
  });

  const handleScopeChange = (scope: 'local' | 'turkey' | 'global') => {
    setCurrentScope(scope);
    setPan({ x: 0, y: 0 }); // reset pan
    setZoom(scope === 'local' ? 2 : scope === 'turkey' ? 1.5 : 1.2);
    setSelectedPlant(null);

    const scopeLabels = {
      local: 'Kadıköy ve çevresi',
      turkey: 'Türkiye Geneli 🇹🇷',
      global: 'Dünya Geneli',
    };
    showCustomToast(`${scopeLabels[scope]} kapsama alanı açıldı.`);
  };

  const handleFollowToggle = () => {
    if (!selectedPlant || !selectedPlant.uploader) return;
    const isFollowing = selectedPlant.uploader.followed;
    
    // Toggle follow status in state reactively
    const updatedPlants = plants.map((p) => {
      if (p.uploader && p.uploader.username === selectedPlant.uploader?.username) {
        return {
          ...p,
          uploader: { ...p.uploader, followed: !isFollowing }
        };
      }
      return p;
    });
    setPlants(updatedPlants);
    
    // Sync current selection
    setSelectedPlant({
      ...selectedPlant,
      uploader: { ...selectedPlant.uploader, followed: !isFollowing }
    });

    showCustomToast(
      !isFollowing
        ? `${selectedPlant.uploader.username} takip edildi!`
        : `${selectedPlant.uploader.username} takipten çıkarıldı.`
    );
  };

  return (
    <div className="w-full h-full relative overflow-hidden select-none bg-slate-100 flex flex-col font-sans">
      
      {/* Dynamic Vector Map Canvas viewport wrapper */}
      <div
        onMouseDown={(e) => handleStartDrag(e.clientX, e.clientY)}
        onMouseMove={(e) => handleDrag(e.clientX, e.clientY)}
        onMouseUp={handleEndDrag}
        onMouseLeave={handleEndDrag}
        onTouchStart={(e) => handleStartDrag(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handleDrag(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={handleEndDrag}
        className={`w-full h-full absolute inset-0 z-0 cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
      >
        {/* Dynamic Vector Canvas Rendering styled based on Sokak/Karanlik/Uydu theme selection */}
        <svg className="w-full h-full pointer-events-none">
          {/* Base background water grid */}
          <rect
            width="100%"
            height="100%"
            fill={
              activeLayer === 'sokak'
                ? '#e3ece1'
                : activeLayer === 'karanlik'
                ? '#111411'
                : '#0b1d07'
            }
          />

          {/* Grids and roads rendering under high-end scale pan translation */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Sea Sea shore polygon details */}
            {currentScope === 'local' && (
              <>
                {/* Coastal Sea filling */}
                <path
                  d="M -1000,450 C -400,320 150,560 1100,500 L 1100,1000 L -1000,1000 Z"
                  fill={
                    activeLayer === 'sokak'
                      ? '#add8e6/45'
                      : activeLayer === 'karanlik'
                      ? '#10212e'
                      : '#081721'
                  }
                  className="transition-colors duration-500"
                />
                
                {/* Greens Parks polygons */}
                <circle
                  cx="120"
                  cy="200"
                  r="140"
                  fill={
                    activeLayer === 'sokak'
                      ? '#d1e7c4'
                      : activeLayer === 'karanlik'
                      ? '#1a2814'
                      : '#0d2208'
                  }
                  className="transition-colors duration-500"
                />
                <circle
                  cx="440"
                  cy="120"
                  r="90"
                  fill={
                    activeLayer === 'sokak'
                      ? '#d1e7c4'
                      : activeLayer === 'karanlik'
                      ? '#1a2814'
                      : '#0d2208'
                  }
                  className="transition-colors duration-500"
                />
                <circle
                  cx="195"
                  cy="350"
                  r="6"
                  fill="#ffffff"
                  className="animate-ping"
                />

                {/* Major streets paths grid representing Kadikoy lines */}
                <line
                  x1="-500"
                  y1="100"
                  x2="900"
                  y2="300"
                  stroke={activeLayer === 'sokak' ? '#ffffff' : activeLayer === 'karanlik' ? '#222920' : '#1f2e1a'}
                  strokeWidth="8"
                />
                <line
                  x1="100"
                  y1="-200"
                  x2="300"
                  y2="800"
                  stroke={activeLayer === 'sokak' ? '#ffffff' : activeLayer === 'karanlik' ? '#222920' : '#1f2e1a'}
                  strokeWidth="10"
                />
                <line
                  x1="400"
                  y1="50"
                  x2="-100"
                  y2="600"
                  stroke={activeLayer === 'sokak' ? '#ffffff' : activeLayer === 'karanlik' ? '#222920' : '#1f2e1a'}
                  strokeWidth="6"
                />

                {/* Local park details */}
                <text
                  x="120"
                  y="200"
                  fontSize="12"
                  fill={activeLayer === 'sokak' ? '#446733' : '#aef67b'}
                  fontWeight="bold"
                  opacity="0.6"
                  fontFamily="sans-serif"
                >
                  Kadıköy Parkı
                </text>
                <text
                  x="440"
                  y="120"
                  fontSize="10"
                  fill={activeLayer === 'sokak' ? '#446733' : '#aef67b'}
                  fontWeight="bold"
                  opacity="0.6"
                  fontFamily="sans-serif"
                >
                  Göztepe Parkı
                </text>
              </>
            )}

            {currentScope === 'turkey' && (
              <>
                {/* Sea Borders for Turkey */}
                <path
                  d="M -500,280 Q 200,320 900,280 L 1000,-100 L -600,-100 Z"
                  fill={activeLayer === 'sokak' ? '#bcd4e6' : activeLayer === 'karanlik' ? '#0d1821' : '#081721'}
                  opacity="0.75"
                />
                <path
                  d="M -500,420 Q 200,380 900,421 L 1000,900 L -600,900 Z"
                  fill={activeLayer === 'sokak' ? '#bcd4e6' : activeLayer === 'karanlik' ? '#0d1821' : '#081721'}
                  opacity="0.75"
                />
                
                {/* Cities label dots */}
                <circle cx="0" cy="350" r="10" fill={activeLayer === 'sokak' ? '#446733' : '#aef67b'} opacity="0.3" />
                <circle cx="200" cy="310" r="15" fill={activeLayer === 'sokak' ? '#446733' : '#aef67b'} opacity="0.3" />
                <circle cx="350" cy="380" r="12" fill={activeLayer === 'sokak' ? '#446733' : '#aef67b'} opacity="0.3" />
                
                <text x="170" y="325" fontSize="10" fill="#ffffff" fontWeight="bold" opacity="0.9">ANKARA</text>
                <text x="-40" y="365" fontSize="10" fill="#ffffff" fontWeight="bold" opacity="0.9">İSTANBUL</text>
              </>
            )}

            {currentScope === 'global' && (
              <>
                {/* Landmass continents outline */}
                <circle cx="-160" cy="300" r="120" fill={activeLayer === 'sokak' ? '#c4e2bd' : '#142511'} opacity="0.8" />
                <circle cx="160" cy="350" r="140" fill={activeLayer === 'sokak' ? '#c4e2bd' : '#142511'} opacity="0.8" />
                <circle cx="-40" cy="500" r="110" fill={activeLayer === 'sokak' ? '#c4e2bd' : '#142511'} opacity="0.8" />
                
                <text x="-180" y="300" fontSize="10" fill="#888" fontWeight="bold">AMERİKA</text>
                <text x="140" y="350" fontSize="10" fill="#888" fontWeight="bold">ASYA</text>
                <text x="-60" y="500" fontSize="10" fill="#888" fontWeight="bold">AFRİKA</text>
              </>
            )}
          </g>
        </svg>
      </div>

      {/* Floating Header Actions controls overlay */}
      <div id="search-overlay" className="absolute top-2 w-[calc(100%-32px)] left-4 z-20 flex flex-col gap-3 max-w-sm pointer-events-none items-center mt-14">
        
        {/* Scope pill controller */}
        <div className="flex bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-full p-1 shadow-lg pointer-events-auto border border-slate-100 dark:border-zinc-800">
          <button
            onClick={() => handleScopeChange('local')}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-wide cursor-pointer ${
              currentScope === 'local'
                ? 'bg-[#173809] text-white shadow-sm'
                : 'text-slate-600 dark:text-zinc-400 hover:text-[#173809]'
            }`}
          >
            Yakınımdakiler
          </button>
          
          <button
            onClick={() => handleScopeChange('turkey')}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-wide cursor-pointer ${
              currentScope === 'turkey'
                ? 'bg-[#173809] text-white shadow-sm'
                : 'text-slate-600 dark:text-zinc-400 hover:text-[#173809]'
            }`}
          >
            🇹🇷 Türkiye
          </button>
          
          <button
            onClick={() => handleScopeChange('global')}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-wide cursor-pointer ${
              currentScope === 'global'
                ? 'bg-[#173809] text-white shadow-sm'
                : 'text-slate-600 dark:text-zinc-400 hover:text-[#173809]'
            }`}
          >
            Dünya
          </button>
        </div>

        {/* Global floating search bar within map */}
        <div className="relative group w-full pointer-events-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Bitki veya keşif ara..."
            className="w-full pl-11 pr-4 py-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-slate-150 dark:border-zinc-800 rounded-full shadow-md text-xs font-semibold focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-800 dark:text-white"
          />
        </div>

        {/* Categories slider chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full pointer-events-auto select-none">
          {['Tümü', 'Nadir', 'Çiçekler', 'Ağaçlar'].map((chip) => {
            const isActive = currentFilter === chip;
            return (
              <button
                key={chip}
                onClick={() => {
                  setCurrentFilter(chip);
                  setSelectedPlant(null);
                }}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[11px] font-bold shadow-sm transition-all active:scale-95 outline-none ${
                  isActive
                    ? 'bg-[#173809] text-white border-transparent'
                    : 'bg-white/95 dark:bg-zinc-900/95 text-slate-600 dark:text-zinc-400 border border-slate-150 dark:border-zinc-800'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

      </div>

      {/* Floating Event Promotion Banner */}
      {showEvent && currentScope === 'local' && (
        <div className="absolute top-48 left-4 right-4 z-20 transition-all duration-300 transform scale-100 max-w-sm mx-auto">
          <div className="bg-[#2d4f1e]/95 text-white p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 shadow-md">
              <Award size={20} className="text-white animate-bounce" />
            </div>
            
            <div
              className="flex-grow cursor-pointer text-left"
              onClick={() => {
                // Focus camera on Kadikoy center park where event exists
                setPan({ x: -10, y: 40 });
                setZoom(2.5);
                showCustomToast('Etkinlik bölgesine uçuluyor...');
              }}
            >
              <p className="text-[9px] font-bold uppercase tracking-wider text-teal-200">KADIKÖY ETKİNLİK</p>
              <h3 className="font-bold text-xs leading-tight">Nadir Bitki Avı</h3>
              <p className="text-[10px] text-emerald-100">Kadıköy Parkı içinde özel Sakura avı!</p>
            </div>
            
            <button
              onClick={() => setShowEvent(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-90"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Live Map Pins absolute overlaid */}
      <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
        {filteredMapPlants.map((plant) => {
          if (!plant.lat || !plant.lng) return null;
          const pixel = getPixelCoords(plant.lat, plant.lng);

          const isSelected = selectedPlant && selectedPlant.id === plant.id;

          return (
            <div
              key={plant.id}
              onClick={() => {
                setSelectedPlant(plant);
                flyToPlantCoords(plant);
              }}
              style={{
                top: `${pixel.y}px`,
                left: `${pixel.x}px`,
                transform: 'translate(-50%, -100%)',
              }}
              className="absolute pointer-events-auto cursor-pointer flex flex-col items-center group active:scale-90 transition-transform select-none"
            >
              {/* Pulse Ring for selected/rare item */}
              {(isSelected || plant.rarity >= 3) && (
                <div className={`absolute w-12 h-12 rounded-full -inset-4 animate-ping opacity-25 pointer-events-none ${
                  plant.rarity >= 3 ? 'bg-amber-600' : 'bg-emerald-600'
                }`} />
              )}

              {/* Pin Icon Bubble shape */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-10 p-0.5 transition-all ${
                isSelected
                  ? 'bg-rose-600 scale-110'
                  : plant.rarity >= 3
                  ? 'bg-amber-600'
                  : 'bg-[#173809]'
              }`}>
                {plant.image ? (
                  <img src={plant.image} alt={plant.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <MapPin className="text-white" size={16} />
                )}
              </div>

              {/* Micro always visible text tag underneath */}
              <div className="bg-white/95 px-2 py-0.5 rounded-full shadow-sm text-[9px] font-bold text-slate-800 border border-slate-100 mt-1 truncate max-w-[80px]">
                {plant.name}
              </div>

              {/* Triangle pointer */}
              <div className="w-2 h-2 bg-white rotate-45 border-r border-b border-slate-100 shadow-sm top-[-5px] absolute" />
            </div>
          );
        })}
      </div>

      {/* Floating System Controllers (Zoom + Layer selection + Home coordinates resetting) */}
      <div className="absolute right-4 bottom-48 flex flex-col gap-2 z-20">
        <button
          onClick={() => {
            setZoom((p) => Math.min(p + 0.25, 4));
          }}
          className="w-12 h-12 bg-white/95 dark:bg-zinc-900/95 shadow-md flex items-center justify-center rounded-2xl text-slate-700 dark:text-white hover:bg-slate-50 border border-slate-150 dark:border-zinc-800 active:scale-90 transition-all cursor-pointer outline-none"
          title="Yakınlaştır"
        >
          <Plus size={18} />
        </button>
        <button
          onClick={() => {
            setZoom((p) => Math.max(p - 0.25, 1));
          }}
          className="w-12 h-12 bg-white/95 dark:bg-zinc-900/95 shadow-md flex items-center justify-center rounded-2xl text-slate-700 dark:text-white hover:bg-slate-50 border border-slate-150 dark:border-zinc-800 active:scale-90 transition-all cursor-pointer outline-none"
          title="Uzaklaştır"
        >
          <Minus size={18} />
        </button>
        <button
          onClick={() => {
            setPan({ x: 0, y: 0 });
            setZoom(2);
            setCurrentScope('local');
            setSelectedPlant(null);
            showCustomToast('Kadıköy konumuna dönüldü.');
          }}
          className="w-12 h-12 bg-[#173809] hover:bg-[#326b00] shadow-md flex items-center justify-center rounded-2xl text-white active:scale-90 transition-all cursor-pointer outline-none"
          title="Merkez Konum"
        >
          <Compass size={18} />
        </button>
        <button
          onClick={() => setShowLayerMenu(!showLayerMenu)}
          className="w-12 h-12 bg-white/95 dark:bg-zinc-900/95 shadow-md flex items-center justify-center rounded-2xl text-slate-700 dark:text-white hover:bg-slate-50 border border-slate-150 dark:border-zinc-800 active:scale-90 transition-all cursor-pointer outline-none"
          title="Katmanlar"
        >
          <Layers size={18} />
        </button>
      </div>

      {/* Layer Changer floating overlay popup */}
      {showLayerMenu && (
        <div className="absolute right-4 bottom-96 bg-white/95 dark:bg-zinc-900/95 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 z-30 w-36 flex flex-col gap-1.5 animate-fadeIn">
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest pl-1 leading-none">Map Themes</span>
          <button
            onClick={() => {
              setActiveLayer('sokak');
              setShowLayerMenu(false);
            }}
            className={`w-full py-2 px-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-1.5 ${
              activeLayer === 'sokak' ? 'bg-[#173809]/15 text-[#173809]' : 'text-slate-700 dark:text-zinc-300'
            }`}
          >
            <MapIcon size={12} />
            Sokak Haritası
          </button>
          <button
            onClick={() => {
              setActiveLayer('karanlik');
              setShowLayerMenu(false);
            }}
            className={`w-full py-2 px-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-1.5 ${
              activeLayer === 'karanlik' ? 'bg-[#173809]/15 text-[#173809]' : 'text-slate-700 dark:text-zinc-300'
            }`}
          >
            <Moon size={12} />
            Muted Karanlık
          </button>
          <button
            onClick={() => {
              setActiveLayer('uydu');
              setShowLayerMenu(false);
            }}
            className={`w-full py-2 px-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-1.5 ${
              activeLayer === 'uydu' ? 'bg-[#173809]/15 text-[#173809]' : 'text-slate-700 dark:text-zinc-300'
            }`}
          >
            <Sun size={12} />
            Tropikal Uydu
          </button>
        </div>
      )}

      {/* Dynamic Toast system */}
      {toast && (
        <div className="absolute top-44 left-1/2 -translate-x-1/2 z-[35] bg-slate-900/90 text-white rounded-full px-5 py-2.5 text-xs font-bold shadow-xl backdrop-blur-sm flex items-center justify-center gap-1.5 border border-white/10 animate-slideDown">
          <Sparkles size={14} className="text-[#aef67b] animate-spin" />
          <span>{toast}</span>
        </div>
      )}

      {/* Selected Plant details drawer bottom drawer matches harita.html */}
      {selectedPlant && (
        <div className="absolute bottom-4 left-4 right-4 z-[25] animate-scaleUp">
          <div className="max-w-sm mx-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-slate-120 dark:border-zinc-800 flex flex-col gap-3 relative text-left">
            
            {/* Close button icon */}
            <button
              onClick={() => setSelectedPlant(null)}
              className="absolute top-4 right-4 rounded-full bg-slate-100 hover:bg-slate-200 p-1 text-slate-500"
            >
              <X size={14} />
            </button>

            {/* Badges indicators row */}
            <div className="flex gap-2">
              <span className="bg-emerald-50 text-emerald-800 font-extrabold text-[9px] uppercase tracking-wide px-2.5 py-1 rounded-full">
                {selectedPlant.category}
              </span>
              {selectedPlant.rarity >= 3 && (
                <span className="bg-amber-50 text-amber-800 font-extrabold text-[9px] uppercase tracking-wide px-2.5 py-1 rounded-full">
                  🌟 Nadir Tür
                </span>
              )}
            </div>

            {/* Hero details card */}
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-100 border border-slate-100">
                <img src={selectedPlant.image} alt={selectedPlant.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">{selectedPlant.name}</h4>
                <p className="text-[11px] italic text-slate-400 font-bold truncate mt-0.5">{selectedPlant.scientificName}</p>
                <div className="text-[9px] text-[#326b00] font-bold mt-1 uppercase tracking-wide">
                  Mesafe: {selectedPlant.distance || 'Görüntüleniyor'}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-normal line-clamp-2">
              {selectedPlant.desc}
            </p>

            {/* Uploader profile card */}
            {selectedPlant.uploader && (
              <div className="bg-[#f8faf6] dark:bg-zinc-950/40 p-2 border border-slate-100 dark:border-zinc-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-slate-100">
                    <img src={selectedPlant.uploader.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5 leading-none">
                      <span className="text-[10px] font-bold text-slate-800 dark:text-white">{selectedPlant.uploader.name}</span>
                      <ShieldCheck size={11} className="text-emerald-700" />
                    </div>
                    <span className="text-[9px] text-slate-400 leading-none">{selectedPlant.uploader.username}</span>
                  </div>
                </div>

                <button
                  onClick={handleFollowToggle}
                  className={`px-3 py-1 text-[9px] font-extrabold uppercase rounded-full border transition-all flex items-center justify-center gap-1 ${
                    selectedPlant.uploader.followed
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {selectedPlant.uploader.followed ? <UserCheck size={10} /> : <UserPlus size={10} />}
                  <span>{selectedPlant.uploader.followed ? 'Takipte' : 'Takip Et'}</span>
                </button>
              </div>
            )}

            {/* Actions triggers */}
            <div className="flex gap-2">
              <button
                onClick={() => onSelectPlantDetail(selectedPlant)}
                className="flex-1 h-9 rounded-full bg-[#173809] hover:bg-[#326b00] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all outline-none"
              >
                <BookOpen size={12} />
                Detaylı Bilgi
              </button>
              <button
                onClick={() => {
                  alert(
                    `${selectedPlant.name} için canlı rota çiziliyor...\nMesafe: ${selectedPlant.distance || 'Yakınınızda'}\n\nDoğayı koruyarak ilerleyin!`
                  );
                }}
                className="flex-1 h-9 rounded-full border border-slate-200 text-slate-700 dark:text-white text-xs font-bold flex items-center justify-center gap-1 hover:bg-slate-50 transition-all outline-none"
              >
                <Navigation size={12} className="text-emerald-700" />
                Yol Tarifi
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
