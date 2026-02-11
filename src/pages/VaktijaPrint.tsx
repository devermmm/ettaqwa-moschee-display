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

      <div style={{
        width: "210mm",
        height: "297mm",
        background: "white",
        margin: "0 auto",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxSizing: "border-box",
        padding: "4mm",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Outer decorative border */}
        <div style={{
          flex: 1,
          border: "2.5px solid #065f46",
          borderRadius: "8px",
          padding: "2.5mm",
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
            padding: "2.5mm",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            overflow: "hidden",
          }}>

            {/* ===== HEADER ===== */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "6px", flexShrink: 0 }}>
              <img src={logo} alt="Et-Taqwa" style={{ height: "56px", width: "56px", flexShrink: 0, borderRadius: "4px" }} />
              <div style={{ textAlign: "center", flex: 1 }}>
                <p style={{ fontSize: "19px", fontWeight: "bold", color: "#1f2937", fontFamily: "'Amiri', 'Traditional Arabic', serif", direction: "rtl", lineHeight: 1.3, margin: 0 }}>
                  ذَهَبَ الظَّمَأُ وَابْتَلَّتِ العُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللّٰهُ
                </p>
                <p style={{ fontSize: "9.5px", color: "#4b5563", fontStyle: "italic", margin: "2px 0 0 0" }}>
                  Zehebez-zameu vebtelletil-'uruku ve sebetel-edžru inšaAllah.
                </p>
                <p style={{ fontSize: "8.5px", color: "#6b7280", margin: "1px 0 0 0" }}>
                  Nestala je žeđ, natopile su se žile i nagrada je osigurana, ako Allah Uzvišeni htjedne.
                </p>
              </div>
              <div style={{ width: "56px", flexShrink: 0 }} />
            </div>

            {/* ===== TITLE ===== */}
            <div style={{ textAlign: "center", marginBottom: "6px", flexShrink: 0 }}>
              <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#065f46", letterSpacing: "5px", lineHeight: 1, margin: 0 }}>VAKTIJA</h1>
              <p style={{ fontSize: "11.5px", color: "#374151", fontWeight: 600, margin: "3px 0 0 0" }}>RAMAZAN 2026 / 1447. h. &nbsp;(19. februar – 19. mart)</p>
            </div>

            {/* ===== TABLE ===== */}
            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12.5px", flex: 1, tableLayout: "fixed" }}>
                <thead>
                  <tr style={{ backgroundColor: "#065f46", color: "white", fontSize: "9.5px" }}>
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
                        <td style={{ border: "1px solid #d1d5db", textAlign: "left", paddingLeft: "5px", fontSize: "10px", color: event ? "#065f46" : "transparent", fontWeight: event ? 600 : 400, verticalAlign: "middle" }}>
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
            <div style={{ flexShrink: 0, marginTop: "4px" }}>
              {/* Bajram */}
              <div style={{ textAlign: "center", backgroundColor: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: "4px", padding: "5px 8px" }}>
                <p style={{ fontSize: "12.5px", fontWeight: 700, color: "#064e3b", margin: 0, letterSpacing: "0.3px" }}>
                  Bajram namaz se klanja u petak 20. marta u 06:37 h
                </p>
              </div>

              {/* Sadaka */}
              <p style={{ fontSize: "8.5px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600, textAlign: "center", margin: "4px 0" }}>
                Zekatom i sadekatul-fitrom pomažete humanitarne i obrazovne ustanove islamske zajednice
              </p>

              {/* Year + Verein */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2px", marginBottom: "4px" }}>
                <span style={{ fontSize: "30px", fontWeight: 900, color: "#065f46", lineHeight: 1 }}>2026.</span>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <p style={{ fontSize: "12px", color: "#1f2937", fontWeight: 700, textTransform: "uppercase", margin: 0, letterSpacing: "0.5px" }}>Bosnischer Kulturverein Et-Taqwa</p>
                  <p style={{ fontSize: "9.5px", color: "#4b5563", margin: "2px 0 0 0" }}>Voitgasse 21, 1220 Wien &nbsp;•&nbsp; dzematettaqwa@gmail.com</p>
                </div>
                <span style={{ fontSize: "30px", fontWeight: 900, color: "#065f46", lineHeight: 1 }}>1447.</span>
              </div>

              {/* Mosques */}
              <div style={{ borderTop: "2px solid #065f46", paddingTop: "5px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px", textAlign: "center" }}>
                  <div>
                    <p style={{ fontSize: "9.5px", fontWeight: 700, color: "#064e3b", textTransform: "uppercase", margin: 0, lineHeight: 1.3 }}>Džemat El-Ihsan</p>
                    <p style={{ fontSize: "8.5px", color: "#374151", margin: "1px 0 0 0", lineHeight: 1.3 }}>Leopoldgasse 10, 1020 Wien</p>
                    <p style={{ fontSize: "8.5px", color: "#6b7280", margin: 0, lineHeight: 1.3 }}>Tel: 06431274A600</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "9.5px", fontWeight: 700, color: "#064e3b", textTransform: "uppercase", margin: 0, lineHeight: 1.3 }}>Džemat El-Ihsan</p>
                    <p style={{ fontSize: "8.5px", color: "#374151", margin: "1px 0 0 0", lineHeight: 1.3 }}>Troststraße 77</p>
                    <p style={{ fontSize: "8.5px", color: "#6b7280", margin: 0, lineHeight: 1.3 }}>Tel: 06811040160</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "9.5px", fontWeight: 700, color: "#064e3b", textTransform: "uppercase", margin: 0, lineHeight: 1.3 }}>Kulturni Centar</p>
                    <p style={{ fontSize: "8.5px", color: "#374151", margin: "1px 0 0 0", lineHeight: 1.3 }}>"Sandžačka Bosna"</p>
                    <p style={{ fontSize: "8.5px", color: "#374151", margin: 0, lineHeight: 1.3 }}>Schöpfgasse 44, 1210 Wien</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "9.5px", fontWeight: 700, color: "#064e3b", textTransform: "uppercase", margin: 0, lineHeight: 1.3 }}>Džemat "Sandžak"</p>
                    <p style={{ fontSize: "8.5px", color: "#374151", margin: "1px 0 0 0", lineHeight: 1.3 }}>Triester Str. 1, 11000 Wien</p>
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
