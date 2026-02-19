import { prayerTimes2025 } from "@/data/prayerTimes2025";
import logo from "@/assets/logo.png";
import { useRef, useState } from "react";
import { domToPng } from "modern-screenshot";
import { Download, Printer, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ramadanDays: { ramazanDay: number; dayName: string; gDay: number; gMonth: number }[] = [];
const dayNamesBs = ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"];

(() => {
  const startDate = new Date(2026, 1, 19);
  for (let i = 0; i < 29; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    ramadanDays.push({
      ramazanDay: i + 1,
      dayName: dayNamesBs[d.getDay()],
      gDay: d.getDate(),
      gMonth: d.getMonth() + 1,
    });
  }
})();

const getPrayerTime = (gMonth: number, gDay: number) => prayerTimes2025[gMonth]?.[gDay];

const mubarekDani: Record<string, string> = {
  "2-19": "Ramazan 1447. Prvi dan posta",
  "2-20": "Džuma",
  "2-27": "Džuma. Godišnjica zločina u Šrpcima",
  "3-1": "Ramazan 1447",
  "3-2": "Pun Mjesec 12:38",
  "3-6": "Džuma",
  "3-7": "Dan pobjede na Bedru",
  "3-10": "Ulazak u I'tikaf. Fethu-Mekke",
  "3-13": "Džuma",
  "3-16": "Lejletul-kadr",
};

const VaktijaPrint = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const handlePrint = () => window.print();
  const handleDownloadImage = async () => {
    if (!printRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await domToPng(printRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = "Vaktija-Ramazan-2026.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Screenshot failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          html, body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .mobile-view { display: none !important; }
          .print-view { display: flex !important; }
          #lovable-badge { display: none !important; }
        }
        @media screen {
          .print-view { position: absolute; left: -9999px; top: 0; }
        }
      `}</style>

      {/* ===== MOBILE-FRIENDLY VIEW ===== */}
      <div className="mobile-view min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950">
        {/* Header */}
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-emerald-950/80 border-b border-emerald-500/20">
          <div className="flex items-center justify-between px-4 py-3">
            <Link to="/news" className="flex items-center gap-2 text-emerald-200 active:opacity-70">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Nazad</span>
            </Link>
            <h1 className="text-lg font-bold text-white tracking-wide">VAKTIJA</h1>
            <div className="w-16" />
          </div>
        </div>

        <div className="px-4 py-5 space-y-5">
          {/* Title Card */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <img src={logo} alt="Et-Taqwa" className="w-12 h-12 rounded-xl" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-widest">VAKTIJA</h2>
            <p className="text-emerald-300 text-sm font-semibold mt-1">RAMAZAN 2026 / 1447. h.</p>
            <p className="text-emerald-400/60 text-xs mt-0.5">19. februar – 19. mart</p>
          </div>

          {/* Download Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={handleDownloadImage} 
              disabled={downloading}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white py-3.5 rounded-2xl font-semibold text-sm shadow-lg shadow-emerald-900/50 transition-colors disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              {downloading ? "Preuzimanje..." : "📥 Preuzmi sliku"}
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 bg-emerald-800/50 hover:bg-emerald-700/50 active:bg-emerald-800/70 text-emerald-200 px-5 py-3.5 rounded-2xl font-semibold text-sm border border-emerald-500/30 transition-colors"
            >
              <Printer className="w-5 h-5" />
              PDF
            </button>
          </div>

          {/* Iftar Dua */}
          <div className="bg-emerald-800/30 backdrop-blur-sm rounded-2xl border border-emerald-500/20 p-4 text-center">
            <p className="text-lg font-bold text-white font-arabic" style={{ direction: "rtl" }}>
              ذَهَبَ الظَّمَأُ وَابْتَلَّتِ العُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللّٰهُ
            </p>
            <p className="text-emerald-300/70 text-xs mt-2 italic">
              Nestala je žeđ, natopile su se žile i nagrada je osigurana, ako Allah Uzvišeni htjedne.
            </p>
          </div>

          {/* Prayer Times Table - Mobile optimized */}
          <div className="bg-emerald-800/20 backdrop-blur-sm rounded-2xl border border-emerald-500/20 overflow-hidden">
            {/* Table Header */}
            <div className="bg-emerald-700/50 px-3 py-2.5 grid grid-cols-[2rem_2rem_1fr_3.2rem_3.2rem_3.2rem_3.2rem] md:grid-cols-[2.5rem_3rem_1fr_4rem_4rem_4rem_4rem] gap-1 md:gap-2 text-[10px] md:text-xs font-bold text-emerald-100 text-center">
              <span>R.</span>
              <span>DAT.</span>
              <span className="text-left pl-1">IMSAK</span>
              <span>☀️</span>
              <span>🕐</span>
              <span>🌅</span>
              <span>🌙</span>
            </div>

            {/* Table Rows */}
            {ramadanDays.map((day) => {
              const pt = getPrayerTime(day.gMonth, day.gDay);
              const eventKey = `${day.gMonth}-${day.gDay}`;
              const event = mubarekDani[eventKey];
              const isFriday = day.dayName === "Pe";
              const isFirst = eventKey === "2-19";

              return (
                <div key={day.ramazanDay}>
                  <div className={`px-3 py-2 md:py-3 grid grid-cols-[2rem_2rem_1fr_3.2rem_3.2rem_3.2rem_3.2rem] md:grid-cols-[2.5rem_3rem_1fr_4rem_4rem_4rem_4rem] gap-1 md:gap-2 items-center text-xs md:text-sm border-t border-emerald-500/10 ${
                    isFirst ? "bg-amber-500/10" : isFriday ? "bg-emerald-500/10" : ""
                  }`}>
                    <span className="text-emerald-300 font-bold text-center">{day.ramazanDay}</span>
                    <span className="text-emerald-200/70 text-center text-[10px]">{day.gDay}.{day.gMonth}</span>
                    <span className="text-white font-bold font-mono pl-1">{pt?.fajr || ""}</span>
                    <span className="text-emerald-200/50 font-mono text-center text-[10px]">{pt?.sunrise || ""}</span>
                    <span className="text-emerald-200/70 font-mono text-center text-[10px]">{pt?.dhuhr || ""}</span>
                    <span className="text-white font-bold font-mono text-center">{pt?.maghrib || ""}</span>
                    <span className="text-emerald-200/70 font-mono text-center text-[10px]">{pt?.isha || ""}</span>
                  </div>
                  {event && (
                    <div className="px-3 pb-1.5 -mt-0.5">
                      <span className="text-[10px] text-emerald-400 font-medium">{event}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bajram Notice */}
          <div className="bg-emerald-600/20 border border-emerald-400/30 rounded-2xl p-4 text-center">
            <p className="text-white font-bold text-sm">
              🕌 Bajram namaz se klanja u petak 20. marta u 06:37 h
            </p>
          </div>

          {/* Footer Info */}
          <div className="text-center space-y-2 pb-6">
            <p className="text-emerald-300/40 text-[10px] uppercase tracking-wider font-semibold">
              Zekatom i sadekatul-fitrom pomažete humanitarne i obrazovne ustanove islamske zajednice
            </p>
            <div>
              <p className="text-emerald-200 text-sm font-bold uppercase tracking-wide">Bosnischer Kulturverein Et-Taqwa</p>
              <p className="text-emerald-300/60 text-xs">Voitgasse 21, 1220 Wien • dzematettaqwa@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== A4 PRINT/SCREENSHOT VIEW (hidden off-screen, used for download) ===== */}
      <div ref={printRef} data-vaktija className="print-view" style={{
        width: "210mm",
        height: "297mm",
        background: "white",
        margin: "0 auto",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxSizing: "border-box",
        padding: "3mm",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Outer decorative border */}
        <div style={{
          flex: 1,
          border: "2.5px solid #065f46",
          borderRadius: "8px",
          padding: "2mm",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          overflow: "hidden",
        }}>
          {/* Inner border */}
          <div style={{
            flex: 1,
            border: "1px solid #10b981",
            borderRadius: "5px",
            padding: "2mm",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            overflow: "hidden",
          }}>

            {/* ===== HEADER ===== */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "5px", flexShrink: 0 }}>
              <img src={logo} alt="Et-Taqwa" style={{ height: "58px", width: "58px", flexShrink: 0, borderRadius: "4px" }} />
              <div style={{ textAlign: "center", flex: 1 }}>
                <p style={{ fontSize: "21px", fontWeight: "bold", color: "#1f2937", fontFamily: "'Amiri', 'Traditional Arabic', serif", direction: "rtl", lineHeight: 1.3, margin: 0 }}>
                  ذَهَبَ الظَّمَأُ وَابْتَلَّتِ العُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللّٰهُ
                </p>
                <p style={{ fontSize: "10.5px", color: "#4b5563", fontStyle: "italic", margin: "2px 0 0 0" }}>
                  Zehebez-zameu vebtelletil-'uruku ve sebetel-edžru inšaAllah.
                </p>
                <p style={{ fontSize: "9.5px", color: "#6b7280", margin: "1px 0 0 0" }}>
                  Nestala je žeđ, natopile su se žile i nagrada je osigurana, ako Allah Uzvišeni htjedne.
                </p>
              </div>
              <div style={{ width: "58px", flexShrink: 0 }} />
            </div>

            {/* ===== TITLE ===== */}
            <div style={{ textAlign: "center", marginBottom: "5px", flexShrink: 0 }}>
              <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#065f46", letterSpacing: "6px", lineHeight: 1, margin: 0 }}>VAKTIJA</h1>
              <p style={{ fontSize: "13px", color: "#374151", fontWeight: 600, margin: "3px 0 0 0" }}>RAMAZAN 2026 / 1447. h. &nbsp;(19. februar – 19. mart)</p>
            </div>

            {/* ===== TABLE ===== */}
            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", flex: 1, tableLayout: "fixed" }}>
                <thead>
                  <tr style={{ backgroundColor: "#065f46", color: "white", fontSize: "10.5px" }}>
                    <th style={{ border: "1px solid #047857", padding: "3px 1px", fontWeight: 700, textAlign: "center", width: "4%" }}>R.</th>
                    <th style={{ border: "1px solid #047857", padding: "3px 1px", fontWeight: 700, textAlign: "center", width: "4.5%" }}>DAN</th>
                    <th style={{ border: "1px solid #047857", padding: "3px 1px", fontWeight: 700, textAlign: "center", width: "4%" }}>DAT.</th>
                    <th style={{ border: "1px solid #047857", padding: "3px 1px", fontWeight: 700, textAlign: "left", width: "23%", paddingLeft: "5px" }}>MUBAREK DANI I NOĆI<br/>I DRUGI PODACI</th>
                    <th style={{ border: "1px solid #047857", padding: "3px 1px", fontWeight: 700, textAlign: "center", width: "9.5%" }}>ZORA /<br/>IMSAK</th>
                    <th style={{ border: "1px solid #047857", padding: "3px 1px", fontWeight: 700, textAlign: "center", width: "9.5%" }}>IZLAZAK<br/>SUNCA</th>
                    <th style={{ border: "1px solid #047857", padding: "3px 1px", fontWeight: 700, textAlign: "center", width: "9%" }}>PODNE</th>
                    <th style={{ border: "1px solid #047857", padding: "3px 1px", fontWeight: 700, textAlign: "center", width: "9%" }}>IKINDIJA</th>
                    <th style={{ border: "1px solid #047857", padding: "3px 1px", fontWeight: 700, textAlign: "center", width: "9.5%" }}>AKŠAM /<br/>IFTAR</th>
                    <th style={{ border: "1px solid #047857", padding: "3px 1px", fontWeight: 700, textAlign: "center", width: "9%" }}>JACIJA /<br/>TERAVIJA</th>
                  </tr>
                </thead>
                <tbody>
                  {ramadanDays.map((day) => {
                    const pt = getPrayerTime(day.gMonth, day.gDay);
                    const eventKey = `${day.gMonth}-${day.gDay}`;
                    const event = mubarekDani[eventKey];
                    const isFriday = day.dayName === "Pe";
                    const isFirst = eventKey === "2-19";
                    const bg = isFirst ? "#fef9c3" : isFriday ? "#ecfdf5" : day.ramazanDay % 2 === 0 ? "#f8fafc" : "#ffffff";

                    return (
                      <tr key={day.ramazanDay} style={{ backgroundColor: bg }}>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontWeight: 700, color: "#065f46", verticalAlign: "middle" }}>{day.ramazanDay}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", color: isFriday ? "#047857" : "#4b5563", fontWeight: isFriday ? 700 : 500, verticalAlign: "middle" }}>{day.dayName}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontWeight: 600, verticalAlign: "middle" }}>{day.gDay}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "left", paddingLeft: "5px", fontSize: "11.5px", color: event ? "#065f46" : "transparent", fontWeight: event ? 600 : 400, verticalAlign: "middle" }}>
                          {event || "–"}
                        </td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontFamily: "monospace", color: "#064e3b", fontWeight: 700, verticalAlign: "middle" }}>{pt?.fajr || ""}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontFamily: "monospace", color: "#6b7280", verticalAlign: "middle" }}>{pt?.sunrise || ""}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontFamily: "monospace", color: "#1f2937", verticalAlign: "middle" }}>{pt?.dhuhr || ""}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontFamily: "monospace", color: "#1f2937", verticalAlign: "middle" }}>{pt?.asr || ""}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontFamily: "monospace", color: "#064e3b", fontWeight: 700, verticalAlign: "middle" }}>{pt?.maghrib || ""}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontFamily: "monospace", color: "#1f2937", verticalAlign: "middle" }}>{pt?.isha || ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ===== FOOTER ===== */}
            <div style={{ flexShrink: 0, marginTop: "3px" }}>
              <div style={{ textAlign: "center", backgroundColor: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: "4px", padding: "4px 8px" }}>
                <p style={{ fontSize: "17px", fontWeight: 700, color: "#064e3b", margin: 0, letterSpacing: "0.3px" }}>
                  Bajram namaz se klanja u petak 20. marta u 06:37 h
                </p>
              </div>
              <p style={{ fontSize: "9.5px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600, textAlign: "center", margin: "3px 0" }}>
                Zekatom i sadekatul-fitrom pomažete humanitarne i obrazovne ustanove islamske zajednice
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2px", marginBottom: "3px" }}>
                <span style={{ fontSize: "34px", fontWeight: 900, color: "#065f46", lineHeight: 1 }}>2026.</span>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <p style={{ fontSize: "13px", color: "#1f2937", fontWeight: 700, textTransform: "uppercase", margin: 0, letterSpacing: "0.5px" }}>Bosnischer Kulturverein Et-Taqwa</p>
                  <p style={{ fontSize: "10.5px", color: "#4b5563", margin: "2px 0 0 0" }}>Voitgasse 21, 1220 Wien &nbsp;•&nbsp; dzematettaqwa@gmail.com</p>
                </div>
                <span style={{ fontSize: "34px", fontWeight: 900, color: "#065f46", lineHeight: 1 }}>1447.</span>
              </div>
              <div style={{ borderTop: "2px solid #065f46", paddingTop: "4px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px", textAlign: "center" }}>
                  <div>
                    <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#064e3b", textTransform: "uppercase", margin: 0, lineHeight: 1.3 }}>Džemat El-Iman</p>
                    <p style={{ fontSize: "9.5px", color: "#374151", margin: "1px 0 0 0", lineHeight: 1.3 }}>Leopoldgasse 10, 1020 Wien</p>
                    <p style={{ fontSize: "9.5px", color: "#6b7280", margin: 0, lineHeight: 1.3 }}>Tel: 004312766660</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#064e3b", textTransform: "uppercase", margin: 0, lineHeight: 1.3 }}>Džemat El-Ihsan</p>
                    <p style={{ fontSize: "9.5px", color: "#374151", margin: "1px 0 0 0", lineHeight: 1.3 }}>Troststraße 77, Ecke Ferkomgasse</p>
                    <p style={{ fontSize: "9.5px", color: "#6b7280", margin: 0, lineHeight: 1.3 }}>Tel: 068110401609</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#064e3b", textTransform: "uppercase", margin: 0, lineHeight: 1.3 }}>Kulturni Centar</p>
                    <p style={{ fontSize: "9.5px", color: "#374151", margin: "1px 0 0 0", lineHeight: 1.3 }}>"Sandžak Bosna"</p>
                    <p style={{ fontSize: "9.5px", color: "#374151", margin: 0, lineHeight: 1.3 }}>Scheydgasse 44, 1210 Wien</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#064e3b", textTransform: "uppercase", margin: 0, lineHeight: 1.3 }}>Džemat "Sandžak"</p>
                    <p style={{ fontSize: "9.5px", color: "#374151", margin: "1px 0 0 0", lineHeight: 1.3 }}>Triester Str. 1, 1100 Wien</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default VaktijaPrint;
