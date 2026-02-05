import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

const Speisekarte = () => {
  const handlePrint = () => {
    window.print();
  };

  const grillJela = [
    { naziv: "Ćevapi 10 kom", preis: "12€" },
    { naziv: "Punjena pljeskavica 200g + trapist", preis: "8€" },
    { naziv: "Piletina batak i bjelo meso", preis: "8€" },
    { naziv: "Kobasica roštilska + pommes i salata", preis: "8€" },
    { naziv: "Teletina 200g + pommes ili riža", preis: "13€" },
  ];

  const slatko = [
    { naziv: "Baklava", preis: "2€" },
    { naziv: "Tulumba", preis: "1,50€" },
    { naziv: "Hurmašica", preis: "1,50€" },
  ];

  const ostalePonude = [
    { naziv: "Burek (tepsija)", preis: "15€" },
    { naziv: "Čorba", preis: "3€" },
  ];

  const MenuItem = ({ item }: { item: { naziv: string; preis: string } }) => (
    <div className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white rounded-xl px-5 py-3 border-2 border-emerald-200 shadow-sm">
      <span className="text-lg font-semibold text-emerald-800">{item.naziv}</span>
      <span className="text-xl font-bold text-emerald-600 bg-white px-4 py-1 rounded-full border border-emerald-300">{item.preis}</span>
    </div>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="bg-emerald-600 rounded-xl px-6 py-3 mb-4">
      <h3 className="text-2xl font-bold text-white text-center">{title}</h3>
    </div>
  );

  const PageHeader = () => (
    <div className="text-center mb-6">
      <img src={logo} alt="Et-Taqwa" className="h-16 mx-auto mb-2" />
      <h1 className="text-3xl font-bold text-emerald-800 tracking-wider">DŽEMAT ET-TAQWA</h1>
      <p className="text-xl font-arabic text-emerald-600 mb-2">مسجد التقوى</p>
      
      {/* Decorative Divider */}
      <div className="flex items-center justify-center gap-3">
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-emerald-500" />
        <span className="text-emerald-600 text-xl">☪</span>
        <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-emerald-500" />
      </div>
    </div>
  );

  const PageFooter = ({ showKinder = false }: { showKinder?: boolean }) => (
    <div className="mt-auto text-center">
      {showKinder && (
        <div className="bg-emerald-100 rounded-xl py-3 px-6 mb-4 inline-block">
          <p className="text-xl font-bold text-emerald-700">
            Dječija porcija: <span className="text-emerald-600">5€</span>
          </p>
        </div>
      )}
      
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-emerald-400" />
        <span className="text-emerald-500 text-lg">☪</span>
        <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-emerald-400" />
      </div>
      
      <p className="text-lg font-bold text-emerald-800">Afijet olsun! • Prijatno!</p>
    </div>
  );

  return (
    <>
      <style>{`
        @media print {
          @page {
            margin: 0;
            size: A4 portrait;
          }
          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-container {
            width: 210mm !important;
            height: 297mm !important;
            page-break-after: always;
          }
          .print-container:last-child {
            page-break-after: avoid;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-emerald-900 flex flex-col items-center justify-center p-4 print:p-0 print:m-0 print:bg-white gap-8 print:gap-0">
        
        {/* Print Button */}
        <div className="fixed top-4 right-4 z-50 no-print">
          <Button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
            <Printer className="w-4 h-4 mr-2" />
            Drucken / PDF
          </Button>
        </div>

        {/* Page 1 - Seite 1 (Menü 1-3) */}
        <div className="print-container w-[210mm] h-[297mm] bg-gradient-to-b from-emerald-50 to-white shadow-2xl print:shadow-none relative overflow-hidden flex flex-col">
          
          {/* Decorative Border */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-4 border-[4px] border-emerald-600 rounded-2xl" />
            <div className="absolute inset-6 border-2 border-emerald-300 rounded-xl" />
            
            {/* Corner Ornaments */}
            <div className="absolute top-2 left-2 w-10 h-10 border-l-4 border-t-4 border-emerald-500 rounded-tl-xl" />
            <div className="absolute top-2 right-2 w-10 h-10 border-r-4 border-t-4 border-emerald-500 rounded-tr-xl" />
            <div className="absolute bottom-2 left-2 w-10 h-10 border-l-4 border-b-4 border-emerald-500 rounded-bl-xl" />
            <div className="absolute bottom-2 right-2 w-10 h-10 border-r-4 border-b-4 border-emerald-500 rounded-br-xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full px-10 py-8 flex flex-col">
            <PageHeader />
            
            {/* Grill Menu */}
            <div className="flex-1 flex flex-col justify-center">
              <SectionTitle title="Jela sa Roštila" />
              <div className="flex flex-col gap-3">
                {grillJela.map((item, index) => (
                  <MenuItem key={index} item={item} />
                ))}
              </div>
            </div>
            
            <PageFooter />
          </div>
        </div>

        {/* Page 2 - Seite 2 (Menü 4-6) */}
        <div className="print-container w-[210mm] h-[297mm] bg-gradient-to-b from-emerald-50 to-white shadow-2xl print:shadow-none relative overflow-hidden flex flex-col">
          
          {/* Decorative Border */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-4 border-[4px] border-emerald-600 rounded-2xl" />
            <div className="absolute inset-6 border-2 border-emerald-300 rounded-xl" />
            
            {/* Corner Ornaments */}
            <div className="absolute top-2 left-2 w-10 h-10 border-l-4 border-t-4 border-emerald-500 rounded-tl-xl" />
            <div className="absolute top-2 right-2 w-10 h-10 border-r-4 border-t-4 border-emerald-500 rounded-tr-xl" />
            <div className="absolute bottom-2 left-2 w-10 h-10 border-l-4 border-b-4 border-emerald-500 rounded-bl-xl" />
            <div className="absolute bottom-2 right-2 w-10 h-10 border-r-4 border-b-4 border-emerald-500 rounded-br-xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full px-10 py-8 flex flex-col">
            <PageHeader />
            
            {/* Slatko Section */}
            <div className="flex-1 flex flex-col justify-center gap-8">
              <div>
                <SectionTitle title="Slatko" />
                <div className="flex flex-col gap-3">
                  {slatko.map((item, index) => (
                    <MenuItem key={index} item={item} />
                  ))}
                </div>
              </div>
              
              {/* Ostale Ponude Section */}
              <div>
                <SectionTitle title="Ostale Ponude" />
                <div className="flex flex-col gap-3">
                  {ostalePonude.map((item, index) => (
                    <MenuItem key={index} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            <PageFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default Speisekarte;
