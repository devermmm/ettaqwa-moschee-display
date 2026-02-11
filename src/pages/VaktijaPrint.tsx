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

      <div className="bg-white mx-auto overflow-hidden" style={{ width: "210mm", height: "297mm", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", boxSizing: "border-box" }}>
        <div style={{ height: "100%", margin: "3mm", border: "2.5px solid #065f46", borderRadius: "6px", padding: "2mm", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
          <div style={{ flex: 1, border: "1px solid #059669", borderRadius: "4px", padding: "2mm", display: "flex", flexDirection: "column", boxSizing: "border-box", overflow: "hidden" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2px", flexShrink: 0 }}>
              <img src={logo} alt="Et-Taqwa" style={{ height: "50px", width: "50px", flexShrink: 0 }} />
              <div style={{ textAlign: "center", flex: 1 }}>
                <p style={{ fontSize: "14px", fontWeight: "bold", color: "#1f2937", fontFamily: "'Amiri', 'Traditional Arabic', serif", direction: "rtl", lineHeight: 1.2 }}>
                  ذَهَبَ الظَّمَأُ وَابْتَلَّتِ العُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللّٰهُ
                </p>
                <p style={{ fontSize: "7px", color: "#4b5563", fontStyle: "italic" }}>
                  Zehebez-zameu vebtelletil-'uruku ve sebetel-edžru inšaAllah.
                </p>
                <p style={{ fontSize: "6px", color: "#6b7280" }}>
                  Nestala je žeđ, natopile su se žile i nagrada je osigurana, ako Allah Uzvišeni htjedne.
                </p>
              </div>
              <div style={{ width: "50px", flexShrink: 0 }} />
            </div>

            {/* Title */}
            <div style={{ textAlign: "center", marginBottom: "3px", flexShrink: 0 }}>
              <h1 style={{ fontSize: "18px", fontWeight: 900, color: "#065f46", letterSpacing: "2px", lineHeight: 1, margin: 0 }}>VAKTIJA</h1>
              <p style={{ fontSize: "8px", color: "#374151", fontWeight: 600, margin: 0 }}>2026/1447. (19. februar - 19. mart)</p>
            </div>

            {/* Table */}
            <div style={{ flex: 1, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "9px", height: "100%", tableLayout: "fixed" }}>
                <thead>
                  <tr style={{ backgroundColor: "#065f46", color: "white", fontSize: "7.5px" }}>
                    <th style={{ border: "1px solid #047857", padding: "2px 1px", fontWeight: "bold", textAlign: "center", width: "4%" }}>R.</th>
                    <th style={{ border: "1px solid #047857", padding: "2px 1px", fontWeight: "bold", textAlign: "center", width: "4%" }}></th>
                    <th style={{ border: "1px solid #047857", padding: "2px 1px", fontWeight: "bold", textAlign: "center", width: "4%" }}>DAT.</th>
                    <th style={{ border: "1px solid #047857", padding: "2px 1px", fontWeight: "bold", textAlign: "left", width: "24%", paddingLeft: "4px" }}>MUBAREK DANI I NOĆI<br/>I DRUGI PODACI</th>
                    <th style={{ border: "1px solid #047857", padding: "2px 1px", fontWeight: "bold", textAlign: "center", width: "9%" }}>ZORA /<br/>IMSAK</th>
                    <th style={{ border: "1px solid #047857", padding: "2px 1px", fontWeight: "bold", textAlign: "center", width: "9%" }}>IZLAZAK<br/>SUNCA</th>
                    <th style={{ border: "1px solid #047857", padding: "2px 1px", fontWeight: "bold", textAlign: "center", width: "9%" }}>PODNE</th>
                    <th style={{ border: "1px solid #047857", padding: "2px 1px", fontWeight: "bold", textAlign: "center", width: "9%" }}>IKINDIJA</th>
                    <th style={{ border: "1px solid #047857", padding: "2px 1px", fontWeight: "bold", textAlign: "center", width: "9%" }}>AKŠAM /<br/>IFTAR</th>
                    <th style={{ border: "1px solid #047857", padding: "2px 1px", fontWeight: "bold", textAlign: "center", width: "9%" }}>JACIJA /<br/>TERAVIJA</th>
                  </tr>
                </thead>
                <tbody>
                  {ramadanDays.map((day) => {
                    const pt = getPrayerTime(day.gMonth, day.gDay);
                    const eventKey = `${day.gMonth}-${day.gDay}`;
                    const event = mubarekDani[eventKey];
                    const isFriday = day.dayName === "Pe";
                    const isFirst = eventKey === "2-19";

                    const bg = isFirst ? "#fef3c7" : isFriday ? "#ecfdf5" : day.ramazanDay % 2 === 0 ? "#f9fafb" : "#ffffff";
                    const fw = isFirst || isFriday ? "600" : "normal";

                    return (
                      <tr key={day.ramazanDay} style={{ backgroundColor: bg, fontWeight: fw }}>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontWeight: "bold", color: "#065f46" }}>{day.ramazanDay}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", color: isFriday ? "#047857" : "#6b7280", fontWeight: isFriday ? "bold" : "normal" }}>{day.dayName}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontWeight: 600 }}>{day.gDay}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "left", paddingLeft: "4px", fontSize: "8px", color: event ? "#065f46" : "#d1d5db", fontWeight: event ? 600 : "normal" }}>
                          {event || ""}
                        </td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontFamily: "monospace", color: "#064e3b", fontWeight: "bold" }}>{pt?.fajr || ""}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontFamily: "monospace", color: "#6b7280" }}>{pt?.sunrise || ""}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontFamily: "monospace" }}>{pt?.dhuhr || ""}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontFamily: "monospace" }}>{pt?.asr || ""}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontFamily: "monospace", color: "#064e3b", fontWeight: "bold" }}>{pt?.maghrib || ""}</td>
                        <td style={{ border: "1px solid #d1d5db", textAlign: "center", fontFamily: "monospace" }}>{pt?.isha || ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div style={{ flexShrink: 0 }}>
              <div style={{ textAlign: "center", marginTop: "4px", backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "4px", padding: "4px" }}>
                <p style={{ fontSize: "9px", fontWeight: "bold", color: "#064e3b", margin: 0 }}>
                  Bajram namaz se klanja u petak 20. marta u 06:37 h
                </p>
              </div>

              <p style={{ fontSize: "6.5px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, textAlign: "center", margin: "3px 0" }}>
                Zekatom i sadekatul-fitrom pomažete humanitarne i obrazovne ustanove islamske zajednice
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
                <span style={{ fontSize: "24px", fontWeight: 900, color: "#065f46", lineHeight: 1 }}>2026.</span>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <p style={{ fontSize: "7.5px", color: "#374151", fontWeight: "bold", textTransform: "uppercase", margin: 0 }}>Bosnischer Kulturverein Et-Taqwa</p>
                  <p style={{ fontSize: "6.5px", color: "#6b7280", margin: 0 }}>Voitgasse 21, 1220 Wien</p>
                  <p style={{ fontSize: "6.5px", color: "#6b7280", margin: 0 }}>E-mail: dzematettaqwa@gmail.com</p>
                </div>
                <span style={{ fontSize: "24px", fontWeight: 900, color: "#065f46", lineHeight: 1 }}>1447.</span>
              </div>

              <div style={{ marginTop: "4px", paddingTop: "4px", borderTop: "2px solid #065f46" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "4px", textAlign: "center" }}>
                  <div>
                    <p style={{ fontSize: "7px", fontWeight: "bold", color: "#064e3b", textTransform: "uppercase", margin: 0 }}>Džemat El-Ihsan</p>
                    <p style={{ fontSize: "6px", color: "#6b7280", margin: 0 }}>Leopoldgasse 10, 1020 Wien</p>
                    <p style={{ fontSize: "6px", color: "#9ca3af", margin: 0 }}>Tel: 06431274A600</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "7px", fontWeight: "bold", color: "#064e3b", textTransform: "uppercase", margin: 0 }}>Džemat El-Ihsan</p>
                    <p style={{ fontSize: "6px", color: "#6b7280", margin: 0 }}>Troststraße 77 oder Ferbungasse</p>
                    <p style={{ fontSize: "6px", color: "#9ca3af", margin: 0 }}>Tel: 06811040160</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "7px", fontWeight: "bold", color: "#064e3b", textTransform: "uppercase", margin: 0 }}>Kulturni Centar</p>
                    <p style={{ fontSize: "6px", color: "#6b7280", margin: 0 }}>"Sandžačka Bosna"</p>
                    <p style={{ fontSize: "6px", color: "#6b7280", margin: 0 }}>Schöpfgasse 44, 1210 Wien</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "7px", fontWeight: "bold", color: "#064e3b", textTransform: "uppercase", margin: 0 }}>Džemat "Sandžak"</p>
                    <p style={{ fontSize: "6px", color: "#6b7280", margin: 0 }}>Triester Str. 1, 11000 Wien</p>
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
