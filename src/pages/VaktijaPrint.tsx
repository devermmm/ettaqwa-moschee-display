import { prayerTimes2025 } from "@/data/prayerTimes2025";
import logo from "@/assets/logo.png";

// Ramadan 2025: Feb 28 - Mar 29 (30 days)
const ramadanDays: { ramazanDay: number; dayName: string; gDay: number; gMonth: number }[] = [];

const dayNamesBs = ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"];

// Build Ramadan days array
(() => {
  const startDate = new Date(2025, 1, 28); // Feb 28, 2025
  for (let i = 0; i < 30; i++) {
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

// Islamic events during Ramadan 2025
const mubarekDani: Record<string, string> = {
  "2-28": "Ramazan 1446. Prvi dan posta",
  "3-7": "Džuma",
  "3-14": "Džuma",
  "3-21": "Džuma",
  "3-27": "Lejletul-kadr",
  "3-28": "Džuma",
  "3-30": "Ramazanski Bajram",
};

const VaktijaPrint = () => {
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-page { 
            width: 210mm; height: 297mm; margin: 0; padding: 0;
            page-break-after: always;
          }
          #lovable-badge { display: none !important; }
        }
      `}</style>

      {/* Print Button */}
      <div className="no-print fixed top-4 right-4 z-50">
        <button
          onClick={handlePrint}
          className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-emerald-800 font-semibold text-sm"
        >
          🖨️ Štampaj / PDF
        </button>
      </div>

      <div className="print-page bg-white mx-auto flex flex-col" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        {/* Decorative outer border */}
        <div className="flex-1 m-[6mm] border-[3px] border-emerald-800 rounded-lg p-[4mm] flex flex-col">
          {/* Inner border */}
          <div className="flex-1 border border-emerald-600 rounded p-[3mm] flex flex-col">

            {/* Header with Logo & Arabic Dua */}
            <div className="text-center mb-2">
              <img src={logo} alt="Et-Taqwa" className="mx-auto h-14 mb-1" />
              
              <p className="text-lg leading-snug font-bold text-gray-800" style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif", direction: "rtl" }}>
                ذَهَبَ الظَّمَأُ وَابْتَلَّتِ العُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللّٰهُ
              </p>
              <p className="text-[9px] text-gray-600 mt-0.5 italic leading-tight">
                Zehebez-zameu vebtelletil-'uruku ve sebetel-edžru inšaAllah.
              </p>
              <p className="text-[8px] text-gray-500 leading-tight">
                Nestala je žeđ, natopile su se žile i nagrada je osigurana, ako Allah Uzvišeni htjedne.
              </p>
            </div>

            {/* Title */}
            <div className="text-center mb-2">
              <h1 className="text-2xl font-black text-emerald-800 tracking-wide" style={{ fontVariant: "small-caps" }}>
                VAKTIJA
              </h1>
              <p className="text-xs text-gray-700 font-semibold">
                2025/1446. (28. februar - 29. mart)
              </p>
              <p className="text-[8px] text-gray-500">Beč / Wien — Bosnischer Kulturverein Et-Taqwa</p>
            </div>

            {/* Prayer Times Table */}
            <div className="flex-1">
              <table className="w-full border-collapse text-[8.5px]">
                <thead>
                  <tr className="bg-emerald-800 text-white">
                    <th className="border border-emerald-700 px-1 py-1 font-bold text-center w-[5%]">R.</th>
                    <th className="border border-emerald-700 px-1 py-1 font-bold text-center w-[4%]"></th>
                    <th className="border border-emerald-700 px-1 py-1 font-bold text-center w-[5%]">DAT.</th>
                    <th className="border border-emerald-700 px-1 py-1 font-bold text-left w-[22%]">MUBAREK DANI I NOĆI<br/>I DRUGI PODACI</th>
                    <th className="border border-emerald-700 px-1 py-1 font-bold text-center w-[9%]">ZORA /<br/>IMSAK</th>
                    <th className="border border-emerald-700 px-1 py-1 font-bold text-center w-[9%]">IZLAZAK<br/>SUNCA</th>
                    <th className="border border-emerald-700 px-1 py-1 font-bold text-center w-[9%]">PODNE</th>
                    <th className="border border-emerald-700 px-1 py-1 font-bold text-center w-[9%]">IKINDIJA</th>
                    <th className="border border-emerald-700 px-1 py-1 font-bold text-center w-[9%]">AKŠAM /<br/>IFTAR</th>
                    <th className="border border-emerald-700 px-1 py-1 font-bold text-center w-[9%]">JACIJA /<br/>TERAVIJA</th>
                  </tr>
                </thead>
                <tbody>
                  {ramadanDays.map((day) => {
                    const pt = prayerTimes2025[day.gMonth]?.[day.gDay];
                    const eventKey = `${day.gMonth}-${day.gDay}`;
                    const event = mubarekDani[eventKey];
                    const isFriday = day.dayName === "Pe";
                    const isEid = eventKey === "3-30";

                    return (
                      <tr
                        key={day.ramazanDay}
                        className={`
                          ${isFriday ? "bg-emerald-50 font-semibold" : day.ramazanDay % 2 === 0 ? "bg-gray-50" : "bg-white"}
                          ${isEid ? "bg-amber-100 font-bold" : ""}
                        `}
                      >
                        <td className="border border-gray-300 px-1 py-[2px] text-center font-bold text-emerald-800">{day.ramazanDay}</td>
                        <td className={`border border-gray-300 px-1 py-[2px] text-center ${isFriday ? "text-emerald-700 font-bold" : "text-gray-600"}`}>{day.dayName}</td>
                        <td className="border border-gray-300 px-1 py-[2px] text-center font-semibold">{day.gDay}</td>
                        <td className={`border border-gray-300 px-1 py-[2px] text-left ${event ? "text-emerald-800 font-semibold" : "text-gray-400"}`}>
                          {event || ""}
                        </td>
                        <td className="border border-gray-300 px-1 py-[2px] text-center font-mono text-emerald-900 font-bold">{pt?.fajr || ""}</td>
                        <td className="border border-gray-300 px-1 py-[2px] text-center font-mono text-gray-600">{pt?.sunrise || ""}</td>
                        <td className="border border-gray-300 px-1 py-[2px] text-center font-mono">{pt?.dhuhr || ""}</td>
                        <td className="border border-gray-300 px-1 py-[2px] text-center font-mono">{pt?.asr || ""}</td>
                        <td className="border border-gray-300 px-1 py-[2px] text-center font-mono text-emerald-900 font-bold">{pt?.maghrib || ""}</td>
                        <td className="border border-gray-300 px-1 py-[2px] text-center font-mono">{pt?.isha || ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bajram Notice */}
            <div className="text-center mt-2 bg-emerald-50 border border-emerald-300 rounded py-1.5 px-2">
              <p className="text-[9px] font-bold text-emerald-900">
                Bajram namaz se klanja u nedjelju 30. marta u 06:49 h
              </p>
            </div>

            {/* Sadaka Notice */}
            <div className="text-center mt-1">
              <p className="text-[7.5px] text-gray-600 uppercase tracking-wider font-semibold">
                Zekatom i sadekatul-fitrom pomažete humanitarne i obrazovne ustanove islamske zajednice
              </p>
            </div>

            {/* Year Display */}
            <div className="flex items-center justify-between mt-2 px-2">
              <span className="text-3xl font-black text-emerald-800">2025.</span>
              <div className="text-center flex-1">
                <p className="text-[8px] text-gray-700 font-bold uppercase">Bosnischer Kulturverein Et-Taqwa</p>
                <p className="text-[7px] text-gray-500">Voitgasse 21, 1220 Wien</p>
                <p className="text-[7px] text-gray-500">E-mail: dzematettaqwa@gmail.com</p>
              </div>
              <span className="text-3xl font-black text-emerald-800">1446.</span>
            </div>

            {/* Mosque Listings */}
            <div className="mt-2 pt-1.5 border-t-2 border-emerald-800">
              <div className="grid grid-cols-4 gap-1 text-center">
                <div>
                  <p className="text-[7px] font-bold text-emerald-900 uppercase">Džemat El-Ihsan</p>
                  <p className="text-[6.5px] text-gray-600">Leopoldgasse 10, 1020 Wien</p>
                  <p className="text-[6.5px] text-gray-500">Tel: 06431274A600</p>
                </div>
                <div>
                  <p className="text-[7px] font-bold text-emerald-900 uppercase">Džemat El-Ihsan</p>
                  <p className="text-[6.5px] text-gray-600">Troststraße 77 oder Ferbungasse</p>
                  <p className="text-[6.5px] text-gray-500">Tel: 06811040160</p>
                </div>
                <div>
                  <p className="text-[7px] font-bold text-emerald-900 uppercase">Kulturni Centar</p>
                  <p className="text-[6.5px] text-gray-600">"Sandžačka Bosna"</p>
                  <p className="text-[6.5px] text-gray-600">Schöpfgasse 44, 1210 Wien</p>
                </div>
                <div>
                  <p className="text-[7px] font-bold text-emerald-900 uppercase">Džemat "Sandžak"</p>
                  <p className="text-[6.5px] text-gray-600">Triester Str. 1, 11000 Wien</p>
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
