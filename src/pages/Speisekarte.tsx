import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

const Speisekarte = () => {
  const handlePrint = () => {
    window.print();
  };

  const menusSeite1 = [
    {
      nummer: 1,
      titel: "Gulaš Meni",
      hauptgericht: "Domaći gulaš",
      beilage: "Pire ili makaroni",
      extras: "Salata • Hljeb",
      preis: "9€",
    },
    {
      nummer: 2,
      titel: "Paprikaš Meni",
      hauptgericht: "Pileći ili teleći paprikaš",
      beilage: "",
      extras: "Salata • Hljeb",
      preis: "8€",
    },
    {
      nummer: 3,
      titel: "Dinstana Teletina",
      hauptgericht: "Nježna dinstana teletina",
      beilage: "Riža, pire ili krompir",
      extras: "Salata • Hljeb",
      preis: "12€",
    },
  ];

  const menusSeite2 = [
    {
      nummer: 4,
      titel: "Piletina u Sosu",
      hauptgericht: "Sočna piletina u sosu",
      beilage: "Pire, riža ili krompir",
      extras: "Salata • Hljeb",
      preis: "9€",
    },
    {
      nummer: 5,
      titel: "Punjena Pljeskavica",
      hauptgericht: "Punjena pljeskavica",
      beilage: "Pire",
      extras: "Salata • Hljeb",
      preis: "9€",
    },
    {
      nummer: 6,
      titel: "Pohovana Šnicla",
      hauptgericht: "Hrskava pohovana šnicla",
      beilage: "Pomfrit",
      extras: "Salata • Hljeb",
      preis: "8€",
    },
  ];

  const MenuCard = ({ menu }: { menu: typeof menusSeite1[0] }) => (
    <div className="bg-white rounded-xl shadow-md border border-emerald-200 flex items-center gap-4 px-5 py-4">
      {/* Menu Number */}
      <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-xl">{menu.nummer}</span>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-emerald-800">{menu.titel}</h3>
        <p className="text-base text-emerald-700">{menu.hauptgericht}</p>
        {menu.beilage && (
          <p className="text-sm text-emerald-600">
            Prilog: {menu.beilage}
          </p>
        )}
        <p className="text-sm text-emerald-500">{menu.extras}</p>
      </div>
      
      {/* Price */}
      <div className="flex-shrink-0 bg-emerald-600 text-white px-4 py-2 rounded-lg text-xl font-bold">
        {menu.preis}
      </div>
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
      
      <h2 className="text-2xl font-bold text-emerald-700 mt-3">
        Ponuda za Ponijeti
      </h2>
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
            
            {/* Menus */}
            <div className="flex-1 flex flex-col gap-5 justify-center">
              {menusSeite1.map((menu) => (
                <MenuCard key={menu.nummer} menu={menu} />
              ))}
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
            
            {/* Menus */}
            <div className="flex-1 flex flex-col gap-5 justify-center">
              {menusSeite2.map((menu) => (
                <MenuCard key={menu.nummer} menu={menu} />
              ))}
            </div>
            
            <PageFooter showKinder={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Speisekarte;
