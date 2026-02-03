import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, MapPin, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

const QiblaPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const calculateQiblaDirection = (lat: number, lng: number): number => {
    const userLatRad = (lat * Math.PI) / 180;
    const kaabaLatRad = (KAABA_LAT * Math.PI) / 180;
    const lngDiff = ((KAABA_LNG - lng) * Math.PI) / 180;

    const y = Math.sin(lngDiff);
    const x = Math.cos(userLatRad) * Math.tan(kaabaLatRad) - Math.sin(userLatRad) * Math.cos(lngDiff);
    
    let qibla = Math.atan2(y, x) * (180 / Math.PI);
    return (qibla + 360) % 360;
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(language === "bs" ? "Lokacija nije podržana" : "Standort nicht unterstützt");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setQiblaDirection(calculateQiblaDirection(latitude, longitude));
        setIsLoading(false);
      },
      () => {
        setError(language === "bs" ? "Pristup lokaciji odbijen" : "Standortzugriff verweigert");
        setIsLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, [language]);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setDeviceHeading(event.alpha);
      }
    };

    if (typeof (DeviceOrientationEvent as any).requestPermission !== 'function') {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const requestOrientationPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', (event: DeviceOrientationEvent) => {
            if (event.alpha !== null) {
              setDeviceHeading(event.alpha);
            }
          });
        }
      } catch (err) {
        console.error('Orientation permission denied');
      }
    }
  };

  const needleRotation = qiblaDirection !== null ? qiblaDirection - deviceHeading : 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* iOS Navigation Bar */}
      <div className="bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="safe-area-inset-top" />
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate("/app")} className="flex items-center gap-1 text-primary">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-[17px]">{language === "bs" ? "Nazad" : "Zurück"}</span>
          </button>
          <h1 className="font-semibold text-[17px] text-foreground absolute left-1/2 -translate-x-1/2">
            {language === "bs" ? "Kible" : "Qibla"}
          </h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {isLoading ? (
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === "bs" ? "Učitavanje..." : "Laden..."}
            </p>
          </div>
        ) : error ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-2">{error}</p>
            <p className="text-sm text-muted-foreground/60">
              {language === "bs" 
                ? "Omogućite pristup lokaciji" 
                : "Bitte Standortzugriff aktivieren"}
            </p>
          </div>
        ) : (
          <>
            {/* Compass */}
            <div className="relative w-72 h-72">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-border" />
              
              {/* Inner Circle with rotation */}
              <motion.div
                className="absolute inset-4 rounded-full bg-card border border-border shadow-lg"
                style={{ rotate: -deviceHeading }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                {/* Cardinal Points */}
                {['N', 'E', 'S', 'W'].map((dir, i) => (
                  <span
                    key={dir}
                    className="absolute text-sm font-bold text-muted-foreground"
                    style={{
                      top: i === 0 ? '12px' : i === 2 ? 'auto' : '50%',
                      bottom: i === 2 ? '12px' : 'auto',
                      left: i === 3 ? '12px' : i === 1 ? 'auto' : '50%',
                      right: i === 1 ? '12px' : 'auto',
                      transform: i === 0 || i === 2 ? 'translateX(-50%)' : 'translateY(-50%)',
                    }}
                  >
                    {dir}
                  </span>
                ))}
              </motion.div>

              {/* Qibla Arrow */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ rotate: needleRotation }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <div className="relative w-full h-full">
                  {/* Arrow */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-3 h-3 bg-amber-500 rotate-45 shadow-lg" />
                    <div className="w-1 h-20 bg-gradient-to-b from-amber-500 to-transparent" />
                  </div>
                  
                  {/* Center Kaaba */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-xl bg-foreground flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🕋</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Direction Info */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm mb-1">
                {language === "bs" ? "Smjer Kible" : "Qibla-Richtung"}
              </p>
              <p className="text-4xl font-bold text-foreground tabular-nums">
                {qiblaDirection?.toFixed(0)}°
              </p>
            </div>

            {/* iOS Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={requestOrientationPermission}
              className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium"
            >
              {language === "bs" ? "Aktiviraj kompas" : "Kompass aktivieren"}
            </motion.button>

            <p className="mt-4 text-sm text-muted-foreground/60 text-center max-w-xs">
              {language === "bs" 
                ? "Okrenite uređaj dok strelica ne pokazuje gore" 
                : "Drehen Sie das Gerät, bis der Pfeil nach oben zeigt"}
            </p>
          </>
        )}
      </div>

      {/* Location Info */}
      {userLocation && (
        <div className="text-center pb-8">
          <p className="text-xs text-muted-foreground/40">
            📍 {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  );
};

export default QiblaPage;
