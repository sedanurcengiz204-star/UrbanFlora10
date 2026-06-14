import React, { useState } from 'react';
import { Leaf, Mail, Lock, User as UserIcon, ArrowRight, Loader2 } from 'lucide-react';
import { User } from '../types';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface AuthScreenProps {
  onLoginSuccess: (user: User) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (activeTab === 'login') {
        if (!email || !password) {
          setError('Lütfen e-posta ve şifrenizi eksiksiz girin.');
          setIsLoading(false);
          return;
        }
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;
        
        // Fetch additional user profile from Firestore
        let displayName = email.split('@')[0];
        try {
          const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
          if (userDoc.exists()) {
            displayName = userDoc.data().name || displayName;
          }
        } catch (err) {
          console.warn("Could not fetch user profile from Firestore, using fallback.", err);
        }

        const loggedInUser: User = {
          uid: fbUser.uid,
          name: displayName,
          email: fbUser.email || email,
        };
        
        localStorage.setItem('urbanflora_user', JSON.stringify(loggedInUser));
        onLoginSuccess(loggedInUser);
      } else {
        if (!name || !email || !password) {
          setError('Lütfen tüm alanları eksiksiz doldurun.');
          setIsLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;

        // Save user profile in Firestore
        const newUserProfile = {
          uid: fbUser.uid,
          name,
          email,
          createdAt: serverTimestamp()
        };

        try {
          await setDoc(doc(db, 'users', fbUser.uid), newUserProfile);
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, `users/${fbUser.uid}`);
        }

        const registeredUser: User = {
          uid: fbUser.uid,
          name,
          email,
        };

        localStorage.setItem('urbanflora_user', JSON.stringify(registeredUser));
        onLoginSuccess(registeredUser);
      }
    } catch (err: any) {
      console.error(err);
      let errorMsg = 'Kimlik doğrulama hatası oluştu.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errorMsg = 'Hatalı e-posta adresi veya şifre.';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMsg = 'Bu e-posta adresi zaten kullanımda.';
      } else if (err.code === 'auth/weak-password') {
        errorMsg = 'Şifreniz en az 6 karakter olmalıdır.';
      } else if (err.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const fbUser = userCredential.user;

      // Save user profile in Firestore ONLY if it doesn't exist
      try {
        const userDocRef = doc(db, 'users', fbUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            uid: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Kaşif',
            email: fbUser.email || '',
            createdAt: serverTimestamp()
          });
        }
      } catch (err) {
        console.warn("Could not handle user profile write in Firestore", err);
      }

      const loggedInUser: User = {
        uid: fbUser.uid,
        name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Kaşif',
        email: fbUser.email || '',
      };

      localStorage.setItem('urbanflora_user', JSON.stringify(loggedInUser));
      onLoginSuccess(loggedInUser);
    } catch (err: any) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google ile giriş başarısız oldu.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#f8faf6] to-[#eff1ed] overflow-y-auto px-6 py-12 flex flex-col justify-start">
      {/* Brand logo header */}
      <div className="flex flex-col items-center text-center mt-6 mb-8">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-sm mb-4 animate-bounce">
          <Leaf className="text-emerald-700 animate-spin-slow" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-[#173809] tracking-tight font-sans">UrbanFlora</h1>
        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">Doğa Kaşifi Mobil Uygulaması</p>
      </div>

      {/* Tabs list slider */}
      <div className="bg-slate-200/60 backdrop-blur-sm p-1 rounded-full flex mb-6">
        <button
          type="button"
          onClick={() => {
            setActiveTab('login');
            setError('');
          }}
          className={`flex-1 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            activeTab === 'login'
              ? 'bg-[#326b00] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          Giriş Yap
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('register');
            setError('');
          }}
          className={`flex-1 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            activeTab === 'register'
              ? 'bg-[#326b00] text-white shadow-md'
              : 'text-slate-600 hover:text-[#326b00]'
          }`}
        >
          Kayıt Ol
        </button>
      </div>

      {/* Form panel */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          {activeTab === 'login' ? 'Üye Girişi' : 'Yeni Kaşif Kaydı'}
        </h2>

        {error && (
          <div className="bg-rose-50 text-rose-600 px-4 py-2.5 rounded-2xl text-xs font-semibold border border-rose-100 mb-1">
            {error}
          </div>
        )}

        {activeTab === 'register' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Ad Soyad</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <UserIcon size={16} />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ad soyad girin"
                className="w-full text-sm rounded-full border border-slate-200 pl-11 pr-4 py-3 bg-slate-50/50 outline-none focus:border-emerald-600 focus:bg-white transition"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase">E-posta</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Mail size={16} />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              placeholder="ornek@ornek.com"
              className="w-full text-sm rounded-full border border-slate-200 pl-11 pr-4 py-3 bg-slate-50/50 outline-none focus:border-emerald-600 focus:bg-white transition"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase">Şifre</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock size={16} />
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              className="w-full text-sm rounded-full border border-slate-200 pl-11 pr-4 py-3 bg-slate-50/50 outline-none focus:border-emerald-600 focus:bg-white transition"
            />
          </div>
        </div>

         <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-[#173809] hover:bg-[#326b00] active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-white py-3.5 mt-2 font-semibold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : activeTab === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
          {!isLoading && <ArrowRight size={16} />}
        </button>

        <div className="flex items-center my-1 select-none">
          <div className="flex-1 h-px bg-slate-200/80" />
          <span className="px-3 text-[10px] font-extrabold text-slate-400 tracking-wider">VEYA</span>
          <div className="flex-1 h-px bg-slate-200/80" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full rounded-full bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 disabled:opacity-50 text-slate-700 py-3 font-semibold text-sm tracking-wide shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.61 0 3.05.55 4.19 1.64l3.14-3.14C17.43 1.8 14.93 1 12 1 7.37 1 3.4 3.63 1.45 7.45l3.85 3C6.22 7.55 8.89 5.04 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.69 2.87c2.16-2 3.74-4.94 3.74-8.55z"
            />
            <path
              fill="#FBBC05"
              d="M5.3 14.5c-.24-.73-.38-1.5-.38-2.3s.14-1.57.38-2.3L1.45 7.45C.52 9.27 0 11.23 0 12.3s.52 3.03 1.45 4.85l3.85-3z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.69-2.87c-1.02.68-2.33 1.09-4.24 1.09-3.11 0-5.78-2.51-6.72-5.41l-3.85 3C3.4 20.37 7.37 23 12 23z"
            />
          </svg>
          Google ile Giriş Yap
        </button>
      </form>

      {/* Footer message */}
      <p className="mt-8 text-center text-xs text-slate-400 font-medium">
        Bir hesaba giriş yaptığınızda, doğa keşifleriniz yerel olarak kaydedilir.
      </p>
    </div>
  );
}
