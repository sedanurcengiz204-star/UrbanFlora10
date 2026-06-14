import React, { useState, useEffect, useRef } from 'react';
import { Camera, Image as ImageIcon, Loader2, Verified, Info, MapPin, RefreshCw, ChevronDown, Check } from 'lucide-react';
import { ActiveScreen, Plant } from '../types';

interface AnalyzeScreenProps {
  setScreen: (screen: ActiveScreen) => void;
  onAddPlantToMap: (plant: Plant) => void;
}

export default function AnalyzeScreen({ setScreen, onAddPlantToMap }: AnalyzeScreenProps) {
  const [activeMod, setActiveMod] = useState<'kamera' | 'galeri'>('kamera');
  const [progress, setProgress] = useState(10);
  const [isScanning, setIsCharging] = useState(true);
  const [galleryImage, setGalleryImage] = useState<string | null>(null);
  
  // Expanded info panel state
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);

  // Active result state
  const [result, setResult] = useState<any>({
    name: 'Japon Gülü',
    scientificName: 'Hibiscus rosa-sinensis',
    confidence: 96,
    image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=400&q=80',
    description: 'Egzotik görünümlü, büyük ve canlı renkli çiçekleriyle bilinen Japon Gülü, sıcak iklimleri seven, park ve bahçelerde sıkça yetiştirilen popüler bir çalı bitkisidir.',
    details: {
      features: 'Canlı kırmızı, pembe ve beyaz tonlarında büyük gösterişli çiçeklere sahiptir.',
      leaves: 'Koyu yeşil, parlak, oval ve dişli yapraklara ev sahipliği yapar.',
      care: [
        'Doğrudan güneş alan, aydınlık ortamlarda daha verimli çiçeklenir.',
        'Toprağı düzenli nemli tutulmalı fakat kök çürümesini önlemek için süzek toprak tercih edilmelidir.',
        'İlkbahar sonu ve yaz aylarında organik bitki besini verilebilir.'
      ]
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scanning count up loop simulation
  useEffect(() => {
    let interval: any = null;
    if (isScanning && progress < 96) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 5 + 2);
          if (next >= 96) {
            clearInterval(interval);
            return 96;
          }
          return next;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isScanning, activeMod, galleryImage]);

  // Handle local simulation file upload identification
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setGalleryImage(dataUrl);
      setProgress(12);

      // Guess plant base on filename
      const lowercaseName = file.name.toLowerCase();
      let matchedResult = {
        name: 'Bilinmeyen Bitki',
        scientificName: 'Tanımlanamıyor',
        confidence: 52,
        image: dataUrl,
        description: 'Galerideki fotoğraf şu anda tam olarak tanınamıyor. Lütfen bitkiyi ortalayarak daha net bir açıdan çekmeyi deneyin.',
        details: {
          features: 'Fotoğraf kalitesi düşük veya yapraklar çok uzak olabilir.',
          leaves: 'Yaprak yapısı bulanık veya kapalı olabilir.',
          care: ['Bitkinin tamamını net kadraja alın.', 'Doğal gün ışığında çekin.', 'Farklı açılardan deneyin.']
        }
      };

      if (lowercaseName.includes('rose') || lowercaseName.includes('gulu') || lowercaseName.includes('gul')) {
        matchedResult = {
          name: 'Kırmızı Gül',
          scientificName: 'Rosa spp.',
          confidence: 96,
          image: dataUrl,
          description: 'Gül, bahçelerin ve çiçek aranjmanlarının en klasik çiçeğidir. Sayılmayacak kadar çok çeşidi vardır ve dikim alanlarında asil bir çehre oluşturur.',
          details: {
            features: 'Canlı koyu kırmızı gövde ve katmanlı yapılı kadife yapraklı çiçekler.',
            leaves: 'Dikenli gövdeleri ve her yöne yayılım sergileyen yeşil yaprakları mevcuttur.',
            care: [
              'Bol güneş alan ve hafif havadar mekanları sever.',
              'Düzenli ilaçlama ve yılda bir budama boyunu korumak için önerilir.'
            ]
          }
        };
      } else if (lowercaseName.includes('lavanta') || lowercaseName.includes('lavender')) {
        matchedResult = {
          name: 'Tıbbi Lavanta',
          scientificName: 'Lavandula angustifolia',
          confidence: 91,
          image: dataUrl,
          description: 'Lamiaceae ailesinden mor çiçek pürüzleri sunan aromatik çalı. Rahatlatıcı kokusuyla uyku ve stres terapilerinde lavanta yağı sıklıkla tercih edilir.',
          details: {
            features: 'Uzun, ince gri-yeşil sürgünleri ve dikey dairesel mor başakları bulunur.',
            leaves: 'Küçük ve doğrusal iğneli yapraklara sahiptir.',
            care: [
              'Aşırı sulamadan kaçınınız, kuraklığa yüksek toleransı vardır.',
              'Kumlu, fakir ve kireçli topraklarda dahi kolayca hayata tutunur.'
            ]
          }
        };
      } else if (lowercaseName.includes('lale') || lowercaseName.includes('tulip')) {
        matchedResult = {
          name: 'Lale',
          scientificName: 'Tulipa gesneriana',
          confidence: 92,
          image: dataUrl,
          description: 'Zambakgillerden soğanlı, kupa şeklinde tek çiçek açan geleneksel bahar süs bitkisidir. Geniş renk skalası vardır.',
          details: {
            features: 'Kupa/kadeh şeklinde tekli dik çiçek yapısı vardır.',
            leaves: 'Geniş, dik mızrak şeklinde sapsız yaprakları bulunur.',
            care: [
              'Doğrudan güneş görmeyen ve rüzgardan korunaklı serin alanları tercih eder.',
              'Toprağı hafif nemli kalmalı, soğanların çürümemesi için aşırı sulama yapılmamalıdır.'
            ]
          }
        };
      } else if (lowercaseName.includes('papatya') || lowercaseName.includes('daisy')) {
        matchedResult = {
          name: 'Yabani Papatya',
          scientificName: 'Matricaria chamomilla',
          confidence: 88,
          image: dataUrl,
          description: 'Çayırlarda doğal olarak yayılım gösteren, beyaz taç yapraklı ve sarı gözlü meşhur şifalı çay papatyasıdır.',
          details: {
            features: 'Güneş formu andıran dairesel sarı göbekli narin beyaz çiçekler.',
            leaves: 'Bitki gövdesi üzerinde ince parçalı narin tüysü yapraklar.',
            care: [
              'Güneşli meraları ve her türlü kurak toprağı sever.',
              'Kurutularak bitki çayı niyetine uykusuzluk çekenlere sunulur.'
            ]
          }
        };
      } else if (lowercaseName.includes('orchid') || lowercaseName.includes('orkide')) {
        matchedResult = {
          name: 'Zarif Orkide',
          scientificName: 'Orchidaceae',
          confidence: 94,
          image: dataUrl,
          description: 'Zarif kıvrımlı çiçekleriyle ev ve ofis peyzaj alanlarının en popüler elit çiçeğidir. Çoğu türü epifitiktir.',
          details: {
            features: 'Gösterişli ve simetrik yapılı muazzam renklerde çiçek açar.',
            leaves: 'Hafif kalın, deri kıvamında etsi yaprakları bulunur.',
            care: [
              'Bol nem ister, doğrudan yakıcı öğle güneşinden korunmalıdır.',
              'Hava köklerinin nefes alabilmesi için şeffaf saksılarda yetiştirilmesi uygundur.'
            ]
          }
        };
      } else if (lowercaseName.includes('ayçiçek') || lowercaseName.includes('sunflower') || lowercaseName.includes('aycicek')) {
        matchedResult = {
          name: 'Ayçiçeği',
          scientificName: 'Helianthus annuus',
          confidence: 93,
          image: dataUrl,
          description: 'Büyük sarı çiçek başlığıyla güneşe yönelen, yağlık ve çekirdeklik yetiştirilen heybetli yaz tarım bitkisidir.',
          details: {
            features: 'Geniş sarı taç yapraklı devasa disk çiçek başlığı mevcuttur.',
            leaves: 'Kalın, tüylü ve geniş kalp şeklinde yaprakları bulunur.',
            care: [
              'Tam gün kesintisiz güneş ışığına ihityacı vardır.',
              'Derin killi ve nem tutan topraklarda boyu 2.5 metreye kadar tırmanır.'
            ]
          }
        };
      }

      setResult(matchedResult);
    };
    reader.readAsDataURL(file);
  };

  const handleModSec = (mod: 'kamera' | 'galeri') => {
    setActiveMod(mod);
    setProgress(10);
    setIsDetailExpanded(false);
  };

  const handleAddToMapAction = () => {
    const freshPlant: Plant = {
      id: Date.now(),
      name: result.name,
      scientificName: result.scientificName,
      image: result.image,
      desc: result.description,
      rarity: result.confidence >= 90 ? 3 : 2,
      category: 'Çiçekler',
      lat: 40.9922 + (Math.random() - 0.5) * 0.01, // random offset around Kadikoy
      lng: 29.0282 + (Math.random() - 0.5) * 0.01,
      date: 'Bugün',
      distance: '10m',
      uploader: {
        name: 'Sen',
        username: '@urban_explorer',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        level: '15',
        followed: true
      }
    };
    onAddPlantToMap(freshPlant);
  };

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col relative pb-20 select-none">
      
      {/* Upper Mode Selector floating pill */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-lg">
        <button
          onClick={() => handleModSec('kamera')}
          className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all outline-none active:scale-95 ${
            activeMod === 'kamera'
              ? 'bg-[#173809] text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Camera size={14} />
          Kamera
        </button>
        <button
          onClick={() => handleModSec('galeri')}
          className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all outline-none active:scale-95 ${
            activeMod === 'galeri'
              ? 'bg-[#173809] text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <ImageIcon size={14} />
          Galeri
        </button>
      </div>

      {/* Camera Live Scan Simulation View */}
      {activeMod === 'kamera' ? (
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80"
            alt="Doğa Arkaplan"
            className="w-full h-full object-cover opacity-60"
          />
          
          {/* Overlay Corner Reticles for scanning */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <div className="relative w-64 h-64">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-[3.5px] border-l-[3.5px] border-[#aef67b] rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-[3.5px] border-r-[3.5px] border-[#aef67b] rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3.5px] border-l-[3.5px] border-[#aef67b] rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3.5px] border-r-[3.5px] border-[#aef67b] rounded-br-xl" />
              
              {/* Laser line effect */}
              <div className="absolute inset-x-0 h-1 bg-[#aef67b]/80 shadow-[0_0_12px_#aef67b] animate-scan" style={{
                animation: 'scan 3s infinite ease-in-out'
              }} />
            </div>
            
            <div className="mt-6 bg-[#173809]/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white flex items-center justify-center gap-2 border border-emerald-900/40">
              <Loader2 className="animate-spin text-[#aef67b]" size={14} />
              <span>Bitki taranıyor...</span>
            </div>
          </div>
        </div>
      ) : (
        /* Gallery Upload mode simulation */
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6 bg-zinc-900">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          
          {!galleryImage ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-11/12 max-w-sm rounded-[32px] border-2 border-dashed border-zinc-700 hover:border-emerald-600 bg-zinc-950/40 p-8 flex flex-col items-center text-center gap-4 cursor-pointer active:scale-98 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                <ImageIcon className="text-zinc-400" size={28} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Galeriden Çözümle</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-[200px] leading-relaxed mx-auto">
                  Telefonundan analiz etmek istediğin bitkinin resmini yükle
                </p>
              </div>
              <button
                type="button"
                className="px-6 py-2.5 bg-[#326b00] hover:bg-[#173809] text-white rounded-full text-xs font-bold shadow-md transition-all"
              >
                Fotoğraf Seç
              </button>
            </div>
          ) : (
            /* Selected File preview with viewfinder overlay */
            <div className="absolute inset-0 w-full h-full relative">
              <img src={galleryImage} alt="Uploaded" className="w-full h-full object-cover opacity-60" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                <div className="relative w-64 h-64">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-[3.5px] border-l-[3.5px] border-[#aef67b] rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-[3.5px] border-r-[3.5px] border-[#aef67b] rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3.5px] border-l-[3.5px] border-[#aef67b] rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3.5px] border-r-[3.5px] border-[#aef67b] rounded-br-xl" />
                  <div className="absolute inset-x-0 h-1 bg-[#aef67b]/80 shadow-[0_0_12px_#aef67b] animate-scan" style={{
                    animation: 'scan 3s infinite ease-in-out'
                  }} />
                </div>
                
                <div className="mt-6 bg-[#173809]/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white flex items-center justify-center gap-2 border border-emerald-900/40">
                  <Loader2 className="animate-spin text-[#aef67b]" size={14} />
                  <span>Fotoğraf inceleniyor...</span>
                </div>
              </div>

              {/* Change selected photo indicator floating picker */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-36 right-6 px-4 py-2 bg-black/60 shadow-lg text-white font-bold text-[10px] rounded-full border border-white/10 active:scale-95 transition-transform flex items-center gap-1 z-35"
              >
                <RefreshCw size={10} />
                Farklı Seç
              </button>
            </div>
          )}
        </div>
      )}

      {/* Slidable Result Bottom Card Drawer */}
      <div className="absolute bottom-24 inset-x-0 px-4 z-20 pointer-events-auto">
        <div className="max-w-sm mx-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-slate-100 dark:border-zinc-800 flex flex-col gap-4 max-h-[50vh] overflow-y-auto scrollbar-none">
          
          {/* Analysis indicator loading status bar */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
              <span>Yapay Zekâ Analiz</span>
              <span className="text-[#326b00]">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#326b00] transition-all duration-300 rounded-full shadow-inner"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Plant summary panel */}
          <div className="flex items-start gap-4">
            <div className="w-18 h-18 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50">
              <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <h2 className="text-md font-bold text-slate-800 dark:text-white truncate">{result.name}</h2>
              <p className="text-xs italic text-slate-400 font-semibold truncate mt-0.5">{result.scientificName}</p>
              
              <div className="flex items-center gap-1 mt-1.5 text-xs text-[#326b00] font-bold">
                <Verified size={14} className="fill-current text-emerald-500 text-white" />
                <span>%{result.confidence} Doğruluk</span>
              </div>
            </div>
          </div>

          {/* Collapsible expansion panel with metrics */}
          {isDetailExpanded && (
            <div className="text-left space-y-3 pt-3 border-t border-slate-100 dark:border-zinc-800 animate-fadeIn">
              <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 dark:bg-zinc-950/45 p-3 rounded-2xl">
                {result.description}
              </p>

              <div className="space-y-2">
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-slate-400">Çiçek Yapısı</h4>
                  <p className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mt-0.5">{result.details.features}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-slate-400">Yaprak Geometrisi</h4>
                  <p className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mt-0.5">{result.details.leaves}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 mb-1">Bakım & Kılavuz</h4>
                  <ul className="text-xs font-medium text-slate-600 dark:text-zinc-400 space-y-1">
                    {result.details.care.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-1">
                        <Check size={12} className="text-[#326b00] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Action Trigger Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsDetailExpanded(!isDetailExpanded)}
              className="flex-1 h-11 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 rounded-full text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center justify-center gap-1 transition-all active:scale-95 outline-none"
            >
              <Info size={14} />
              {isDetailExpanded ? 'Gizle' : 'Detaylar'}
              <ChevronDown size={14} className={`transition-transform duration-200 ${isDetailExpanded ? 'rotate-180' : ''}`} />
            </button>
            
            <button
              onClick={handleAddToMapAction}
              className="flex-1 h-11 bg-[#173809] hover:bg-[#326b00] text-white rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 outline-none"
            >
              <MapPin size={14} />
              Haritaya Ekle
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
