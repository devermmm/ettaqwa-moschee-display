import { useRef } from "react";
import logo from "@/assets/logo.png";
import PosterExportActions from "@/components/poster/PosterExportActions";

const brutto = [
  { artikel: "Hühnerbrustfilet 1kg vac.pack TK", preis: "€7,50" },
  { artikel: "Global Grill Hühner Kebap TK 300g", preis: "€4,50" },
  { artikel: "Asia Grill Rind Kebap TK 300g", preis: "€4,80" },
  { artikel: "Chicken Wings TK 800g/pckg", preis: "€7,00" },
  { artikel: "Berto Falafel ca. 1kg – 50 Stk/pack", preis: "€7,25" },
  { artikel: "Chicken Burger 150g · 10 Stk/pckg", preis: "€12,40" },
  { artikel: "Rind Burger 14cm 10 Stk · 100g/pckg", preis: "€11,55" },
  { artikel: "Rindgulasch geschnitten TK 1kg vac.pac", preis: "€15,00" },
  { artikel: "Rind Faschiertes 90/10 1kg vac.pac TK", preis: "€12,00" },
  { artikel: "Rindfleisch 1kg vac.pac TK", preis: "€12,90" },
];

const netto = [
  { artikel: "Leberkäse mit Käse pro kg", preis: "€10,00" },
  { artikel: "Leberkäse ohne Käse pro kg", preis: "€10,00" },
  { artikel: "Jausenwurst 700g", preis: "€8,00" },
  { artikel: "Jausenwurst 1500g", preis: "€16,00" },
  { artikel: "Rind Salami 800g", preis: "€11,00" },
  { artikel: "Frankfurter 900g", preis: "€7,00" },
  { artikel: "Kreiner 800g", preis: "€8,00" },
  { artikel: "Käsekreiner 750g", preis: "€9,00" },
  { artikel: "Cabanosi 500g", preis: "€7,50" },
  { artikel: "Extrawurst 800g", preis: "€6,50" },
  { artikel: "Extrawurst 1500g", preis: "€12,00" },
  { artikel: "Hühnerflügel geräuchert", preis: "€8,50" },
  { artikel: "Hühnerkeule geräuchert", preis: "€8,50" },
  { artikel: "Hühnerfilet geräuchert", preis: "€13,50" },
  { artikel: "Ganzes Huhn ca. 3–3,5kg", preis: "€6,00" },
  { artikel: "Ganze Pute ca. 7–8kg", preis: "€9,00" },
  { artikel: "Ganze Ente ca. 2,8–3,6kg", preis: "€9,00" },
  { artikel: "Medovniczek 1700g", preis: "€16,00" },
  { artikel: "Medovniczek 800g", preis: "€10,00" },
  { artikel: "Blütenhonig 125g", preis: "€4,50" },
  { artikel: "Blütenhonig 250g", preis: "€5,50" },
  { artikel: "Blütenhonig 500g", preis: "€9,00" },
  { artikel: "Waldhonig 125g", preis: "€4,50" },
  { artikel: "Waldhonig 250g", preis: "€5,50" },
  { artikel: "Waldhonig 500g", preis: "€9,00" },
  { artikel: "Blüten-Akazienhonig 125g", preis: "€4,50" },
  { artikel: "Blüten-Akazienhonig 250g", preis: "€5,50" },
  { artikel: "Blüten-Akazienhonig 500g", preis: "€9,00" },
];

const Row = ({ artikel, preis }: { artikel: string; preis: string }) => (
  <div className="flex items-center justify-between border-b border-emerald-200/70 py-[3px] px-3">
    <span className="text-[11px] font-medium text-emerald-900 leading-tight pr-2">{artikel}</span>
    <span className="text-[11px] font-bold text-emerald-700 tabular-nums whitespace-nowrap">{preis}</span>
  </div>
);

const SectionHeader = ({ title, label }: { title: string; label: string }) => (
  <div className="bg-emerald-600 px-3 py-1.5 flex items-center justify-between rounded-t-lg">
    <span className="text-white font-bold text-sm tracking-wide">{title}</span>
    <span className="text-emerald-100 text-[10px] font-semibold tracking-wider">{label}</span>
  </div>
);

const Einkaufsliste = () => {
  const posterRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-emerald-900 flex flex-col items-center justify-center p-4 gap-4">
      <PosterExportActions captureRef={posterRef} filename="einkaufsliste-et-taqwa.png" />

      <div className="w-full overflow-auto">
        <div
          ref={posterRef}
          className="mx-auto w-[210mm] h-[297mm] bg-gradient-to-b from-emerald-50 to-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-3 border-[5px] border-emerald-700 rounded-2xl" />
            <div className="absolute inset-6 border-2 border-emerald-400/60 rounded-xl" />
            <div className="absolute top-1.5 left-1.5 w-12 h-12 border-l-4 border-t-4 border-emerald-600 rounded-tl-2xl" />
            <div className="absolute top-1.5 right-1.5 w-12 h-12 border-r-4 border-t-4 border-emerald-600 rounded-tr-2xl" />
            <div className="absolute bottom-1.5 left-1.5 w-12 h-12 border-l-4 border-b-4 border-emerald-600 rounded-bl-2xl" />
            <div className="absolute bottom-1.5 right-1.5 w-12 h-12 border-r-4 border-b-4 border-emerald-600 rounded-br-2xl" />
          </div>

          <div className="relative z-10 h-full px-10 py-6 flex flex-col">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-3">
              <img src={logo} alt="Et-Taqwa" className="h-14 mb-1" />
              <h1 className="text-lg font-bold text-emerald-800 tracking-[0.2em]">DŽEMAT ET-TAQWA</h1>
              <p className="text-base font-arabic text-emerald-600">مسجد التقوى</p>
              <h2 className="text-2xl font-bold text-emerald-800 tracking-wide mt-1">EINKAUFSLISTE</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-emerald-500" />
                <span className="text-emerald-600 text-base">☪</span>
                <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-emerald-500" />
              </div>
            </div>

            {/* Brutto */}
            <div className="bg-white rounded-xl border-2 border-emerald-500 shadow-sm overflow-hidden mb-3">
              <SectionHeader title="ARTIKEL" label="BRUTTO-PREIS" />
              <div className="px-1 py-1">
                {brutto.map((item, i) => (
                  <Row key={i} {...item} />
                ))}
              </div>
            </div>

            {/* Netto */}
            <div className="bg-white rounded-xl border-2 border-emerald-500 shadow-sm overflow-hidden flex-1">
              <SectionHeader title="ARTIKEL" label="NETTO-PREIS" />
              <div className="px-1 py-1">
                {netto.map((item, i) => (
                  <Row key={i} {...item} />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-emerald-400" />
              <span className="text-emerald-500 text-sm">☪</span>
              <p className="text-xs font-semibold text-emerald-800 tracking-wide">Preise vorbehaltlich Änderungen</p>
              <span className="text-emerald-500 text-sm">☪</span>
              <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Einkaufsliste;

