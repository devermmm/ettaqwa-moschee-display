import { prayerTimes2025 } from "@/data/prayerTimes2025";
import logo from "@/assets/logo.png";

// Ramadan 2026/1447: Feb 19 - Mar 19 (29 days)
// Prayer times for Vienna match the 2025 solar calendar dates
const ramadanDays: { ramazanDay: number; dayName: string; gDay: number; gMonth: number }[] = [];
const dayNamesBs = ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"];

(() => {
  const startDate = new Date(2026, 1, 19); // Feb 19, 2026
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

// Use 2025 solar data mapped to 2026 Ramadan dates (same solar position = same times)
const getPrayerTime = (gMonth: number, gDay: number) => {
  return prayerTimes2025[gMonth]?.[gDay];
};

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
  "3-19": "Bajram namaz 06:37",
  "3-20": "Džuma",
};

const VaktijaPrint = () => {
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .print-page { width: 210mm; height: 297mm; margin: 0; padding: 0; page-break-after: always; }
          #lovable-badge { display: none !important; }
        }
      `}</style>

      <div className="no-print fixed top-4 right-4 z-50">
        <button
          onClick={handlePrint}
          className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-emerald-800 font-semibold text-sm"
        >
          🖨️ Štampaj / PDF
        </button>
      </div>

      <div className="print-page bg-white mx-auto flex flex-col" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <div className="flex-1 m-[4mm] border-[3px] border-emerald-800 rounded-lg p-[3mm] flex flex-col">
          <div className="flex-1 border border-emerald-600 rounded p-[3mm] flex flex-col">

            {/* Logo - larger and separate */}
            <div className="flex justify-center mb-3">
              <img src={logo} alt="Et-Taqwa" className="h-20 w-auto" />
            </div>

            {/* Arabic Dua */}
            <div className="text-center mb-1">
              <p className="text-xl leading-snug font-bold text-gray-800" style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif", direction: "rtl" }}>
                ذَهَبَ الظَّمَأُ وَابْتَلَّتِ العُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللّٰهُ
              </p>
              <p className="text-[9px] text-gray-600 italic leading-tight mt-0.5">
                Zehebez-zameu vebtelletil-'uruku ve sebetel-edžru inšaAllah.
              </p>
              <p className="text-[8px] text-gray-500 leading-tight">
                Nestala je žeđ, natopile su se žile i nagrada je osigurana, ako Allah Uzvišeni htjedne.
              </p>
            </div>

            {/* Title */}
            <div className="text-center mb-1.5">
              <h1 className="text-2xl font-black text-emerald-800 tracking-wide">VAKTIJA</h1>
              <p className="text-xs text-gray-700 font-semibold">2026/1447. (19. februar - 19. mart)</p>
            </div>

            {/* Table */}
            <div className="flex-1">
              <table className="w-full border-collapse text-[11px] leading-snug">
                <thead>
                  <tr className="bg-emerald-800 text-white text-[9px]">
                    <th className="border border-emerald-700 px-1 py-1.5 font-bold text-center" style={{width:"4%"}}>R.</th>
                    <th className="border border-emerald-700 px-1 py-1.5 font-bold text-center" style={{width:"4%"}}></th>
                    <th className="border border-emerald-700 px-1 py-1.5 font-bold text-center" style={{width:"5%"}}>DAT.</th>
                    <th className="border border-emerald-700 px-1.5 py-1.5 font-bold text-left" style={{width:"24%"}}>MUBAREK DANI I NOĆI<br/>I DRUGI PODACI</th>
                    <th className="border border-emerald-700 px-1 py-1.5 font-bold text-center" style={{width:"9%"}}>ZORA /<br/>IMSAK</th>
                    <th className="border border-emerald-700 px-1 py-1.5 font-bold text-center" style={{width:"9%"}}>IZLAZAK<br/>SUNCA</th>
                    <th className="border border-emerald-700 px-1 py-1.5 font-bold text-center" style={{width:"9%"}}>PODNE</th>
                    <th className="border border-emerald-700 px-1 py-1.5 font-bold text-center" style={{width:"9%"}}>IKINDIJA</th>
                    <th className="border border-emerald-700 px-1 py-1.5 font-bold text-center" style={{width:"9%"}}>AKŠAM /<br/>IFTAR</th>
                    <th className="border border-emerald-700 px-1 py-1.5 font-bold text-center" style={{width:"9%"}}>JACIJA /<br/>TERAVIJA</th>
                  </tr>
                </thead>
                <tbody>
                  {ramadanDays.map((day) => {
                    const pt = getPrayerTime(day.gMonth, day.gDay);
                    const eventKey = `${day.gMonth}-${day.gDay}`;
                    const event = mubarekDani[eventKey];
                    const isFriday = day.dayName === "Pe";
                    const isSpecial = eventKey === "3-19" || eventKey === "2-19";

                    return (
                      <tr
                        key={day.ramazanDay}
                        className={`
                          ${isSpecial ? "bg-amber-100 font-bold" : isFriday ? "bg-emerald-50 font-semibold" : day.ramazanDay % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        `}
                      >
                        <td className="border border-gray-300 px-1 py-[3.5px] text-center font-bold text-emerald-800">{day.ramazanDay}</td>
                        <td className={`border border-gray-300 px-1 py-[3.5px] text-center ${isFriday ? "text-emerald-700 font-bold" : "text-gray-600"}`}>{day.dayName}</td>
                        <td className="border border-gray-300 px-1 py-[3.5px] text-center font-semibold">{day.gDay}</td>
                        <td className={`border border-gray-300 px-1.5 py-[3.5px] text-left text-[9.5px] ${event ? "text-emerald-800 font-semibold" : "text-gray-400"}`}>
                          {event || ""}
                        </td>
                        <td className="border border-gray-300 px-1 py-[3.5px] text-center font-mono text-emerald-900 font-bold">{pt?.fajr || ""}</td>
                        <td className="border border-gray-300 px-1 py-[3.5px] text-center font-mono text-gray-600">{pt?.sunrise || ""}</td>
                        <td className="border border-gray-300 px-1 py-[3.5px] text-center font-mono">{pt?.dhuhr || ""}</td>
                        <td className="border border-gray-300 px-1 py-[3.5px] text-center font-mono">{pt?.asr || ""}</td>
                        <td className="border border-gray-300 px-1 py-[3.5px] text-center font-mono text-emerald-900 font-bold">{pt?.maghrib || ""}</td>
                        <td className="border border-gray-300 px-1 py-[3.5px] text-center font-mono">{pt?.isha || ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bajram Notice */}
            <div className="text-center mt-2 bg-emerald-50 border border-emerald-300 rounded py-1.5 px-2">
              <p className="text-[10px] font-bold text-emerald-900">
                Bajram namaz se klanja u petak 20. marta u 06:37 h
              </p>
            </div>

            {/* Sadaka */}
            <div className="text-center mt-1">
              <p className="text-[8px] text-gray-600 uppercase tracking-wider font-semibold">
                Zekatom i sadekatul-fitrom pomažete humanitarne i obrazovne ustanove islamske zajednice
              </p>
            </div>

            {/* Year + Info */}
            <div className="flex items-center justify-between mt-2 px-2">
              <span className="text-3xl font-black text-emerald-800">2026.</span>
              <div className="text-center flex-1">
                <p className="text-[9px] text-gray-700 font-bold uppercase">Bosnischer Kulturverein Et-Taqwa</p>
                <p className="text-[8px] text-gray-500">Voitgasse 21, 1220 Wien</p>
                <p className="text-[8px] text-gray-500">E-mail: dzematettaqwa@gmail.com</p>
              </div>
              <span className="text-3xl font-black text-emerald-800">1447.</span>
            </div>

            {/* Mosque Listings */}
            <div className="mt-2 pt-1.5 border-t-2 border-emerald-800">
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <p className="text-[8px] font-bold text-emerald-900 uppercase">Džemat El-Ihsan</p>
                  <p className="text-[7px] text-gray-600">Leopoldgasse 10, 1020 Wien</p>
                  <p className="text-[7px] text-gray-500">Tel: 06431274A600</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-emerald-900 uppercase">Džemat El-Ihsan</p>
                  <p className="text-[7px] text-gray-600">Troststraße 77</p>
                  <p className="text-[7px] text-gray-500">Tel: 06811040160</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-emerald-900 uppercase">Kulturni Centar</p>
                  <p className="text-[7px] text-gray-600">"Sandžačka Bosna"</p>
                  <p className="text-[7px] text-gray-600">Schöpfgasse 44, 1210 Wien</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-emerald-900 uppercase">Džemat "Sandžak"</p>
                  <p className="text-[7px] text-gray-600">Triester Str. 1, 11000 Wien</p>
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
