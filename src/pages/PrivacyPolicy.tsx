import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">
          {language === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
        </h1>
        
        <div className="prose prose-lg dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === 'de' ? '1. Verantwortlicher' : '1. Data Controller'}
            </h2>
            <p className="text-muted-foreground">
              Et-Taqwa Moschee<br />
              Roonstraße 22<br />
              89073 Ulm<br />
              Deutschland
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === 'de' ? '2. Erhobene Daten' : '2. Data Collection'}
            </h2>
            <p className="text-muted-foreground mb-4">
              {language === 'de' 
                ? 'Diese App erhebt und speichert folgende Daten:'
                : 'This app collects and stores the following data:'}
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                {language === 'de'
                  ? 'Keine personenbezogenen Daten werden ohne Ihre Zustimmung erhoben'
                  : 'No personal data is collected without your consent'}
              </li>
              <li>
                {language === 'de'
                  ? 'Gebetszeiten werden lokal auf Ihrem Gerät gespeichert'
                  : 'Prayer times are stored locally on your device'}
              </li>
              <li>
                {language === 'de'
                  ? 'Keine Standortdaten werden erhoben'
                  : 'No location data is collected'}
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === 'de' ? '3. Zweck der Datenverarbeitung' : '3. Purpose of Data Processing'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'de'
                ? 'Die App dient ausschließlich der Anzeige von Gebetszeiten und Informationen über die Et-Taqwa Moschee. Es werden keine Daten zu Werbezwecken verwendet.'
                : 'The app is used solely to display prayer times and information about the Et-Taqwa Mosque. No data is used for advertising purposes.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === 'de' ? '4. Datenweitergabe' : '4. Data Sharing'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'de'
                ? 'Ihre Daten werden nicht an Dritte weitergegeben, verkauft oder für andere Zwecke verwendet.'
                : 'Your data will not be shared with third parties, sold, or used for other purposes.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === 'de' ? '5. Ihre Rechte' : '5. Your Rights'}
            </h2>
            <p className="text-muted-foreground mb-4">
              {language === 'de'
                ? 'Sie haben das Recht auf:'
                : 'You have the right to:'}
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>{language === 'de' ? 'Auskunft über Ihre gespeicherten Daten' : 'Information about your stored data'}</li>
              <li>{language === 'de' ? 'Berichtigung unrichtiger Daten' : 'Correction of inaccurate data'}</li>
              <li>{language === 'de' ? 'Löschung Ihrer Daten' : 'Deletion of your data'}</li>
              <li>{language === 'de' ? 'Einschränkung der Verarbeitung' : 'Restriction of processing'}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === 'de' ? '6. Kontakt' : '6. Contact'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'de'
                ? 'Bei Fragen zum Datenschutz kontaktieren Sie uns bitte unter:'
                : 'For questions about data protection, please contact us at:'}
              <br /><br />
              E-Mail: info@ettaqwa-ulm.de
            </p>
          </section>

          <section className="mb-8">
            <p className="text-sm text-muted-foreground">
              {language === 'de' ? 'Stand: Januar 2026' : 'Last updated: January 2026'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
