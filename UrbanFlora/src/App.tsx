import React, { useState, useEffect } from 'react';
import { Home, Map, Camera, User as UserIcon, HelpCircle, Phone, Info, Laptop, Compass, Heart } from 'lucide-react';
import { ActiveScreen, User, Plant } from './types';
import { db, auth, handleFirestoreError, OperationType } from './lib/firebase';
import { collection, onSnapshot, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

// Importing custom components
import PhoneFrame from './components/PhoneFrame';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import AnalyzeScreen from './components/AnalyzeScreen';
import MapScreen from './components/MapScreen';
import NotificationsScreen from './components/NotificationsScreen';
import DailyDiscoveriesScreen from './components/DailyDiscoveriesScreen';
import ProfileScreen from './components/ProfileScreen';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<ActiveScreen>('auth');
  
  // Custom identified plant storage so users can add them to the map on the fly
  const [addedPlants, setAddedPlants] = useState<Plant[]>([]);
  
  // Custom selected plant to display in search screen's encyclopedia details format
  const [selectedPlantForEncyclopedia, setSelectedPlantForEncyclopedia] = useState<Plant | null>(null);

  // Interface options
  const [phoneColor, setPhoneColor] = useState('titanium');
  const [screenshotMode, setScreenshotMode] = useState(false);

  // Check login on startup and listen to Firebase auth state
  useEffect(() => {
    const stored = localStorage.getItem('urbanflora_user');
    if (stored) {
      try {
        const parsed: User = JSON.parse(stored);
        setUser(parsed);
        setScreen('home');
      } catch {
        // ignore
      }
    }

    const unsubscribeAuth = auth.onAuthStateChanged((fbUser) => {
      if (fbUser) {
        const updatedUser: User = {
          uid: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Kaşif',
          email: fbUser.email || '',
        };
        setUser(updatedUser);
        localStorage.setItem('urbanflora_user', JSON.stringify(updatedUser));
        setScreen(prev => (prev === 'auth' ? 'home' : prev));
      } else {
        setUser(null);
        localStorage.removeItem('urbanflora_user');
        setScreen('auth');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen to Firestore real-time plant uploads when authenticated
  useEffect(() => {
    if (!user) {
      setAddedPlants([]);
      return;
    }

    const path = 'plants';
    const unsubscribePlants = onSnapshot(
      collection(db, path),
      (snapshot) => {
        const plantsList: Plant[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          plantsList.push({
            id: Number(docSnap.id) || Date.now(),
            name: data.name,
            scientificName: data.scientificName,
            lat: data.lat,
            lng: data.lng,
            rarity: data.rarity,
            category: data.category,
            scope: data.scope,
            distance: data.distance,
            date: data.date,
            image: data.image,
            desc: data.desc,
            habitat: data.habitat,
            features: data.features,
            uploader: data.uploader,
          });
        });
        setAddedPlants(plantsList);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );

    return () => unsubscribePlants();
  }, [user]);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setScreen('home');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error", err);
    }
    localStorage.removeItem('urbanflora_user');
    setUser(null);
    setScreen('auth');
  };

  // Callback to add a newly scanned plant to our live Firestore collection
  const handleAddPlantToMap = async (newPlant: Plant) => {
    const plantIdString = String(newPlant.id);
    const plantDocRef = doc(db, 'plants', plantIdString);
    
    const plantData = {
      id: plantIdString,
      name: newPlant.name,
      scientificName: newPlant.scientificName,
      lat: newPlant.lat || 40.9922,
      lng: newPlant.lng || 29.0282,
      rarity: newPlant.rarity,
      category: newPlant.category,
      scope: newPlant.scope || 'local',
      distance: newPlant.distance || '10m',
      date: newPlant.date || 'Bugün',
      image: newPlant.image,
      desc: newPlant.desc,
      habitat: newPlant.habitat || '',
      features: newPlant.features || '',
      uploader: {
        name: user?.name || 'Kaşif',
        username: `@${user?.email.split('@')[0] || 'kasif'}`,
        avatar: newPlant.uploader?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        level: newPlant.uploader?.level || '15',
        followed: true
      },
      ownerId: user?.uid || auth.currentUser?.uid || 'anonymous',
      createdAt: serverTimestamp()
    };

    try {
      await setDoc(plantDocRef, plantData);
      setScreen('map');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `plants/${plantIdString}`);
    }
  };

  // Helper to deep link from popup inside home or profile directly to search/encyclopedia details
  const handleSelectPlantDetail = (plant: Plant) => {
    setSelectedPlantForEncyclopedia(plant);
    setScreen('search');
  };

  const clearSelectedPlantForEncyclopedia = () => {
    setSelectedPlantForEncyclopedia(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f2f5f1] via-[#e5eae1] to-[#cbd7ca] text-slate-800 flex flex-col md:flex-row items-center justify-center p-4 md:p-12 relative overflow-y-auto gap-8">
      
      {/* Soft overlay grids for decorative premium feel */}
      <div className="absolute inset-0 bg-[radial-gradient(#173809_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* LEFT COLUMN: Highly Informative Presentation & Interaction Guide Card */}
      <div className="max-w-xs md:max-w-sm w-full bg-white/70 backdrop-blur-md p-6 rounded-[32px] border border-white/40 shadow-xl flex flex-col gap-6 text-left shrink-0">
        <div className="space-y-1">
          <div className="w-12 h-12 bg-[#173809]/15 text-[#173809] rounded-2xl flex items-center justify-center">
            <Compass className="animate-spin-slow" size={24} />
          </div>
          <h2 className="text-xl font-extrabold text-[#173809] tracking-tight mt-3">UrbanFlora Simülatörü</h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Doğa Kaşifi mobil uygulamasını gerçekçi bir akıllı telefondaymış gibi deneyimleyin.
          </p>
        </div>

        {/* Dynamic tips inside guide */}
        <div className="space-y-3.5 pt-4 border-t border-slate-200/40">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <HelpCircle size={14} className="text-[#326b00]" />
            Nasıl Kullanılır?
          </h3>

          <ul className="text-xs text-slate-600 space-y-2.5 font-medium leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
              <span>
                <strong>Giriş Yapın:</strong> E-posta alanına istediğiniz adresi girerek uygulamayı başlatın.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
              <span>
                <strong>Taramayı Deneyin:</strong> Alttaki <Camera className="inline-block text-[#326b00] mx-0.5" size={12} /> butonundan kamerayı açın veya galeriden dosya sürükleyip bırakarak bitkileri tanımlayın.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
              <span>
                <strong>Haritayı Keşfedin:</strong> Keşfettiğiniz türleri "Haritaya Ekle" butonuna basarak Kadıköy haritasında gözlemleyin.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
              <span>
                <strong>Cihaz Özelleştirme:</strong> Telefonun üstündeki kontrol panellerinden telefon rengini değiştirerek tasarımı özelleştirebilirsiniz.
              </span>
            </li>
          </ul>
        </div>

        {/* Creator label info */}
        <div className="pt-4 border-t border-slate-200/40 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Laptop size={12} />
            Mobil Viewport
          </span>
          <span className="text-[#326b00]">UrbanFlora v1.4</span>
        </div>
      </div>

      {/* CENTER COLUMN: Awesome phone chassis holding the core viewport */}
      <div className="flex-1 flex justify-center items-center drop-shadow-3xl">
        <PhoneFrame
          phoneColor={phoneColor}
          setPhoneColor={setPhoneColor}
          screenshotMode={screenshotMode}
          setScreenshotMode={setScreenshotMode}
        >
          {/* Active app views routing */}
          <div className="w-full h-full relative">
            {screen === 'auth' || !user ? (
              <AuthScreen onLoginSuccess={handleLoginSuccess} />
            ) : (
              <>
                {/* Embedded screen windows */}
                <div className="w-full h-full">
                  {screen === 'home' && (
                    <HomeScreen
                      user={user}
                      setScreen={setScreen}
                      onSelectPlantDetail={handleSelectPlantDetail}
                    />
                  )}
                  {screen === 'search' && (
                    <SearchScreen
                      setScreen={setScreen}
                      selectedPlantForEncyclopedia={selectedPlantForEncyclopedia}
                      clearSelectedPlantForEncyclopedia={clearSelectedPlantForEncyclopedia}
                    />
                  )}
                  {screen === 'identify' && (
                    <AnalyzeScreen
                      setScreen={setScreen}
                      onAddPlantToMap={handleAddPlantToMap}
                    />
                  )}
                  {screen === 'map' && (
                    <MapScreen
                      setScreen={setScreen}
                      addedPlantList={addedPlants}
                      onSelectPlantDetail={handleSelectPlantDetail}
                    />
                  )}
                  {screen === 'profile' && (
                    <ProfileScreen
                      user={user}
                      onLogout={handleLogout}
                      setScreen={setScreen}
                    />
                  )}
                  {screen === 'notifications' && (
                    <NotificationsScreen setScreen={setScreen} />
                  )}
                  {screen === 'daily_discoveries' && (
                    <DailyDiscoveriesScreen setScreen={setScreen} />
                  )}
                </div>

                {/* BOTTOM TAB NAVIGATION BAR (Active when logged in and inside sub-screens, except detail modes) */}
                <nav className="absolute bottom-0 left-0 right-0 h-[72px] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-[#c3c8bb]/30 flex items-center justify-around px-2 z-30 select-none pb-3">
                  
                  {/* Tab 1: Home */}
                  <button
                    onClick={() => {
                      setScreen('home');
                      clearSelectedPlantForEncyclopedia();
                    }}
                    className={`flex flex-col items-center justify-center p-1 rounded-2xl w-14 transition-all duration-200 outline-none cursor-pointer ${
                      screen === 'home' || screen === 'notifications' || screen === 'daily_discoveries'
                        ? 'text-[#326b00] font-bold scale-105'
                        : 'text-slate-400 dark:text-zinc-500 hover:text-slate-600'
                    }`}
                  >
                    <Home size={20} className={screen === 'home' ? 'stroke-[2.5]' : 'stroke-2'} />
                    <span className="text-[9px] font-bold tracking-tight mt-0.5">Ana Sayfa</span>
                  </button>

                  {/* Tab 2: Map */}
                  <button
                    onClick={() => {
                      setScreen('map');
                      clearSelectedPlantForEncyclopedia();
                    }}
                    className={`flex flex-col items-center justify-center p-1 rounded-2xl w-14 transition-all duration-200 outline-none cursor-pointer ${
                      screen === 'map'
                        ? 'text-[#326b00] font-bold scale-105'
                        : 'text-slate-400 dark:text-zinc-500 hover:text-slate-600'
                    }`}
                  >
                    <Map size={20} className={screen === 'map' ? 'stroke-[2.5]' : 'stroke-2'} />
                    <span className="text-[9px] font-bold tracking-tight mt-0.5">Harita</span>
                  </button>

                  {/* Tab 3: Identify */}
                  <button
                    onClick={() => {
                      setScreen('identify');
                      clearSelectedPlantForEncyclopedia();
                    }}
                    className={`flex flex-col items-center justify-center p-1 rounded-2xl w-14 transition-all duration-200 outline-none cursor-pointer ${
                      screen === 'identify'
                        ? 'text-[#326b00] font-bold scale-105'
                        : 'text-slate-400 dark:text-zinc-500 hover:text-slate-600'
                    }`}
                  >
                    <Camera size={20} className={screen === 'identify' ? 'stroke-[2.5]' : 'stroke-2'} />
                    <span className="text-[9px] font-bold tracking-tight mt-0.5">Tanımla</span>
                  </button>

                  {/* Tab 4: Profile */}
                  <button
                    onClick={() => {
                      setScreen('profile');
                      clearSelectedPlantForEncyclopedia();
                    }}
                    className={`flex flex-col items-center justify-center p-1 rounded-2xl w-14 transition-all duration-200 outline-none cursor-pointer ${
                      screen === 'profile'
                        ? 'text-[#326b00] font-bold scale-105'
                        : 'text-slate-400 dark:text-zinc-500 hover:text-slate-600'
                    }`}
                  >
                    <UserIcon size={20} className={screen === 'profile' ? 'stroke-[2.5]' : 'stroke-2'} />
                    <span className="text-[9px] font-bold tracking-tight mt-0.5">Profil</span>
                  </button>

                </nav>
              </>
            )}
          </div>
        </PhoneFrame>
      </div>

    </div>
  );
}
