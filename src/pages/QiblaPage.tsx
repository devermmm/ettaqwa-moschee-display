import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Navigation, MapPin, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

// Kaaba coordinates (Mecca)
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
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Calculate Qibla direction from user's location
  const calculateQiblaDirection = (lat: number, lng: number): number => {
    const userLatRad = (lat * Math.PI) / 180;
    const kaabaLatRad = (KAABA_LAT * Math.PI) / 180;
    const lngDiff = ((KAABA_LNG - lng) * Math.PI) / 180;

    const y = Math.sin(lngDiff);
    const x = Math.cos(userLatRad) * Math.tan(kaabaLatRad) - Math.sin(userLatRad) * Math.cos(lngDiff);
    
    let qibla = Math.atan2(y, x) * (180 / Math.PI);
    qibla = (qibla + 360) % 360;
    
    return qibla;
  };

  // Get user's location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError(language === "bs" ? "Geolokacija nije podržana" : "Geolokalisierung nicht unterstützt");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        const direction = calculateQiblaDirection(latitude, longitude);
        setQiblaDirection(direction);
        setIsLoading(false);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setPermissionDenied(true);
        }
        setError(language === "bs" ? "Pristup lokaciji odbijen" : "Standortzugriff verweigert");
        setIsLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, [language]);

  // Handle device orientation (compass)
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Alpha gives the compass direction
      if (event.alpha !== null) {
        setDeviceHeading(event.alpha);
      }
    };

    // Request permission on iOS 13+
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      // This will be triggered by user interaction
    } else {
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

  // Calculate the rotation for the compass needle
  const needleRotation = qiblaDirection !== null ? qiblaDirection - deviceHeading : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-accent flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary/95 backdrop-blur-xl border-b border-white/10 px-4 py-4"
      >
        <div className="flex items-center gap-4">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/app")}
            className="p-2 rounded-full bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-white">
              {language === "bs" ? "Kible" : "Qibla"}
            </h1>
            <p className="text-white/70 text-sm">
              {language === "bs" ? "Smjer prema Meki" : "Richtung nach Mekka"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
            <p className="text-white/70">
              {language === "bs" ? "Učitavanje lokacije..." : "Standort wird geladen..."}
            </p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-6"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-white/50" />
            </div>
            <p className="text-white/70 mb-4">{error}</p>
            {permissionDenied && (
              <p className="text-white/50 text-sm">
                {language === "bs" 
                  ? "Molimo omogućite pristup lokaciji u postavkama" 
                  : "Bitte aktivieren Sie den Standortzugriff in den Einstellungen"}
              </p>
            )}
          </motion.div>
        ) : (
          <>
            {/* Compass */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-72 h-72 md:w-80 md:h-80"
            >
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white/20" />
              
              {/* Compass markings */}
              <div className="absolute inset-4 rounded-full border-2 border-white/10">
                {/* Cardinal directions */}
                {['N', 'E', 'S', 'W'].map((dir, i) => (
                  <div
                    key={dir}
                    className="absolute text-white/50 font-bold text-lg"
                    style={{
                      top: i === 0 ? '8px' : i === 2 ? 'auto' : '50%',
                      bottom: i === 2 ? '8px' : 'auto',
                      left: i === 3 ? '8px' : i === 1 ? 'auto' : '50%',
                      right: i === 1 ? '8px' : 'auto',
                      transform: i === 0 || i === 2 ? 'translateX(-50%)' : 'translateY(-50%)',
                    }}
                  >
                    {dir}
                  </div>
                ))}
              </div>

              {/* Rotating compass disc */}
              <motion.div
                className="absolute inset-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                style={{ rotate: -deviceHeading }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                {/* Degree markings */}
                {[...Array(36)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 bg-white/20"
                    style={{
                      height: i % 9 === 0 ? '12px' : '6px',
                      top: '0',
                      left: '50%',
                      transformOrigin: '50% 120px',
                      transform: `translateX(-50%) rotate(${i * 10}deg)`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Qibla indicator (Kaaba icon) */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ rotate: needleRotation }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <div className="relative w-full h-full">
                  {/* Arrow pointing to Qibla */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-3 h-3 bg-amber-400 rotate-45 shadow-lg shadow-amber-400/50" />
                    <div className="w-1 h-24 bg-gradient-to-b from-amber-400 to-transparent" />
                  </div>
                  
                  {/* Kaaba symbol at center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-lg bg-black border-2 border-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/30">
                    <span className="text-amber-400 text-2xl">🕋</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Direction Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <p className="text-white/50 text-sm mb-2">
                {language === "bs" ? "Smjer Kible" : "Qibla-Richtung"}
              </p>
              <p className="text-4xl font-bold text-white">
                {qiblaDirection?.toFixed(1)}°
              </p>
              <p className="text-white/60 mt-4 text-sm max-w-xs">
                {language === "bs" 
                  ? "Okrenite uređaj dok zlatna strelica ne pokazuje gore" 
                  : "Drehen Sie das Gerät, bis der goldene Pfeil nach oben zeigt"}
              </p>
            </motion.div>

            {/* iOS Permission Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileTap={{ scale: 0.95 }}
              onClick={requestOrientationPermission}
              className="mt-6 px-6 py-3 rounded-full bg-white/10 text-white text-sm"
            >
              {language === "bs" ? "Aktiviraj kompas" : "Kompass aktivieren"}
            </motion.button>
          </>
        )}
      </div>

      {/* Location Info */}
      {userLocation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 text-center"
        >
          <p className="text-white/30 text-xs">
            📍 {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default QiblaPage;
