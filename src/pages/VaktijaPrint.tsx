import { prayerTimes2025 } from "@/data/prayerTimes2025";
import logo from "@/assets/logo.png";

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
  "3-19": "Bajram namaz 06:37",
};

const VaktijaPrint = () => {
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          html, body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #lovable-badge { display: none !important; }
        }
      `}</style>

      <div className="no-print fixed top-4 right-4 z-50">
        <button onClick={handlePrint} className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-emerald-800 font-semibold text-sm">
          🖨️ Štampaj / PDF
        </button>
      </div>

      <div className="bg-white mx-auto overflow-hidden" style={{ width: "210mm", height: "297mm", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <div className="h-full m-[3mm] border-[2.5px] border-emerald-800 rounded-md p-[2mm] flex flex-col">
          <div className="h-full border border-emerald-600 rounded p-[2mm] flex flex-col">

            {/* Compact header: logo + dua side by side */}
            <div className="flex items-center gap-3 mb-1">
              <img src={logo} alt="Et-Taqwa" className="h-14 w-14 flex-shrink-0" />
              <div className="text-center flex-1">
                <p className="text-[15px] leading-tight font-bold text-gray-800" style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif", direction: "rtl" }}>
                  ذَهَبَ الظَّمَأُ وَابْتَلَّتِ العُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللّٰهُ
                </p>
                <p className="text-[7.5px] text-gray-600 italic leading-tight">
                  Zehebez-zameu vebtelletil-'uruku ve sebetel-edžru inšaAllah.
                </p>
                <p className="text-[6.5px] text-gray-500 leading-tight">
                  Nestala je žeđ, natopile su se žile i nagrada je osigurana, ako Allah Uzvišeni htjedne.
                </p>
              </div>
              <div className="w-14 flex-shrink-0" />
            </div>

            {/* Title - compact */}
            <div className="text-center mb-1">
              <h1 className="text-xl font-black text-emerald-800 tracking-wide leading-none">VAKTIJA</h1>
              <p className="text-[9px] text-gray-700 font-semibold">2026/1447. (19. februar - 19. mart)</p>
            </div>

            {/* Table */}
            <div>
              <table className="w-full border-collapse text-[9.5px] leading-none">
                <thead>
                  <tr className="bg-emerald-800 text-white text-[8px]">
                    <th className="border border-emerald-700 px-0.5 py-1 font-bold text-center" style={{width:"4%"}}>R.</th>
                    <th className="border border-emerald-700 px-0.5 py-1 font-bold text-center" style={{width:"4%"}}></th>
                    <th className="border border-emerald-700 px-0.5 py-1 font-bold text-center" style={{width:"4%"}}>DAT.</th>
                    <th className="border border-emerald-700 px-1 py-1 font-bold text-left" style={{width:"24%"}}>MUBAREK DANI I NOĆI / PODACI</th>
                    <th className="border border-emerald-700 px-0.5 py-1 font-bold text-center" style={{width:"9%"}}>ZORA /<br/>IMSAK</th>
                    <th className="border border-emerald-700 px-0.5 py-1 font-bold text-center" style={{width:"9%"}}>IZL.<br/>SUNCA</th>
                    <th className="border border-emerald-700 px-0.5 py-1 font-bold text-center" style={{width:"9%"}}>PODNE</th>
                    <th className="border border-emerald-700 px-0.5 py-1 font-bold text-center" style={{width:"9%"}}>IKINDIJA</th>
                    <th className="border border-emerald-700 px-0.5 py-1 font-bold text-center" style={{width:"9%"}}>AKŠAM /<br/>IFTAR</th>
                    <th className="border border-emerald-700 px-0.5 py-1 font-bold text-center" style={{width:"9%"}}>JACIJA /<br/>TERAV.</th>
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
                        className={`${isSpecial ? "bg-amber-100 font-bold" : isFriday ? "bg-emerald-50 font-semibold" : day.ramazanDay % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                      >
                        <td className="border border-gray-300 px-0.5 py-[2.5px] text-center font-bold text-emerald-800">{day.ramazanDay}</td>
                        <td className={`border border-gray-300 px-0.5 py-[2.5px] text-center ${isFriday ? "text-emerald-700 font-bold" : "text-gray-600"}`}>{day.dayName}</td>
                        <td className="border border-gray-300 px-0.5 py-[2.5px] text-center font-semibold">{day.gDay}</td>
                        <td className={`border border-gray-300 px-1 py-[2.5px] text-left text-[8.5px] ${event ? "text-emerald-800 font-semibold" : "text-gray-400"}`}>
                          {event || ""}
                        </td>
                        <td className="border border-gray-300 px-0.5 py-[2.5px] text-center font-mono text-emerald-900 font-bold">{pt?.fajr || ""}</td>
                        <td className="border border-gray-300 px-0.5 py-[2.5px] text-center font-mono text-gray-600">{pt?.sunrise || ""}</td>
                        <td className="border border-gray-300 px-0.5 py-[2.5px] text-center font-mono">{pt?.dhuhr || ""}</td>
                        <td className="border border-gray-300 px-0.5 py-[2.5px] text-center font-mono">{pt?.asr || ""}</td>
                        <td className="border border-gray-300 px-0.5 py-[2.5px] text-center font-mono text-emerald-900 font-bold">{pt?.maghrib || ""}</td>
                        <td className="border border-gray-300 px-0.5 py-[2.5px] text-center font-mono">{pt?.isha || ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bajram + Sadaka in one line */}
            <div className="text-center mt-1 bg-emerald-50 border border-emerald-300 rounded py-1 px-1">
              <p className="text-[9px] font-bold text-emerald-900">
                Bajram namaz se klanja u petak 20. marta u 06:37 h
              </p>
            </div>
            <p className="text-[7px] text-gray-600 uppercase tracking-wider font-semibold text-center mt-0.5">
              Zekatom i sadekatul-fitrom pomažete humanitarne i obrazovne ustanove islamske zajednice
            </p>

            {/* Year + Info */}
            <div className="flex items-center justify-between mt-1 px-1">
              <span className="text-2xl font-black text-emerald-800 leading-none">2026.</span>
              <div className="text-center flex-1">
                <p className="text-[8px] text-gray-700 font-bold uppercase">Bosnischer Kulturverein Et-Taqwa</p>
                <p className="text-[7px] text-gray-500">Voitgasse 21, 1220 Wien · dzematettaqwa@gmail.com</p>
              </div>
              <span className="text-2xl font-black text-emerald-800 leading-none">1447.</span>
            </div>

            {/* Mosques */}
            <div className="mt-1 pt-1 border-t-2 border-emerald-800">
              <div className="grid grid-cols-4 gap-1 text-center">
                <div>
                  <p className="text-[7px] font-bold text-emerald-900 uppercase">Džemat El-Ihsan</p>
                  <p className="text-[6px] text-gray-600">Leopoldgasse 10, 1020 Wien</p>
                </div>
                <div>
                  <p className="text-[7px] font-bold text-emerald-900 uppercase">Džemat El-Ihsan</p>
                  <p className="text-[6px] text-gray-600">Troststraße 77, Wien</p>
                </div>
                <div>
                  <p className="text-[7px] font-bold text-emerald-900 uppercase">Kulturni Centar</p>
                  <p className="text-[6px] text-gray-600">"Sandžačka Bosna" Schöpfg. 44</p>
                </div>
                <div>
                  <p className="text-[7px] font-bold text-emerald-900 uppercase">Džemat "Sandžak"</p>
                  <p className="text-[6px] text-gray-600">Triester Str. 1, Wien</p>
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
