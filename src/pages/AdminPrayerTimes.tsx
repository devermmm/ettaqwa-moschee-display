import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Save, ArrowLeft, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface PrayerTimeEntry {
  id?: string;
  date: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

const AdminPrayerTimes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [formData, setFormData] = useState<PrayerTimeEntry>({
    date: format(new Date(), "yyyy-MM-dd"),
    fajr: "",
    sunrise: "",
    dhuhr: "",
    asr: "",
    maghrib: "",
    isha: "",
  });

  useEffect(() => {
    checkAdminStatus();
    fetchPrayerTimes();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (roles?.role !== "admin") {
      toast({
        title: "Zugriff verweigert",
        description: "Sie haben keine Admin-Berechtigung.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  const fetchPrayerTimes = async () => {
    const { data, error } = await supabase
      .from("prayer_times")
      .select("*")
      .order("date", { ascending: false })
      .limit(30);

    if (error) {
      console.error("Error fetching prayer times:", error);
      return;
    }

    setPrayerTimes(data || []);
  };

  const loadPrayerTimeForDate = async (date: string) => {
    setSelectedDate(date);
    const { data } = await supabase
      .from("prayer_times")
      .select("*")
      .eq("date", date)
      .single();

    if (data) {
      setFormData({
        id: data.id,
        date: data.date,
        fajr: data.fajr,
        sunrise: data.sunrise,
        dhuhr: data.dhuhr,
        asr: data.asr,
        maghrib: data.maghrib,
        isha: data.isha,
      });
    } else {
      setFormData({
        date,
        fajr: "",
        sunrise: "",
        dhuhr: "",
        asr: "",
        maghrib: "",
        isha: "",
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      if (formData.id) {
        // Update existing
        const { error } = await supabase
          .from("prayer_times")
          .update({
            fajr: formData.fajr,
            sunrise: formData.sunrise,
            dhuhr: formData.dhuhr,
            asr: formData.asr,
            maghrib: formData.maghrib,
            isha: formData.isha,
          })
          .eq("id", formData.id);

        if (error) throw error;

        toast({
          title: "Erfolgreich aktualisiert",
          description: `Gebetszeiten für ${format(new Date(formData.date), "dd.MM.yyyy", { locale: de })} wurden aktualisiert.`,
        });
      } else {
        // Insert new
        const { error } = await supabase
          .from("prayer_times")
          .insert({
            date: formData.date,
            fajr: formData.fajr,
            sunrise: formData.sunrise,
            dhuhr: formData.dhuhr,
            asr: formData.asr,
            maghrib: formData.maghrib,
            isha: formData.isha,
          });

        if (error) throw error;

        toast({
          title: "Erfolgreich gespeichert",
          description: `Gebetszeiten für ${format(new Date(formData.date), "dd.MM.yyyy", { locale: de })} wurden hinzugefügt.`,
        });
      }

      fetchPrayerTimes();
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message || "Ein Fehler ist aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?")) return;

    const { error } = await supabase.from("prayer_times").delete().eq("id", id);

    if (error) {
      toast({
        title: "Fehler",
        description: "Löschen fehlgeschlagen.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Gelöscht",
      description: "Gebetszeiten wurden gelöscht.",
    });

    fetchPrayerTimes();
    setFormData({
      date: selectedDate,
      fajr: "",
      sunrise: "",
      dhuhr: "",
      asr: "",
      maghrib: "",
      isha: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin")}
          className="text-white hover:bg-white/10 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zum Admin-Panel
        </Button>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Clock className="w-6 h-6" />
              Gebetszeiten verwalten
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-white/80">Datum auswählen</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => loadPrayerTimeForDate(e.target.value)}
                className="bg-white/10 border-white/30 text-white mt-1"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white/80">Fajr</Label>
                <Input
                  type="time"
                  value={formData.fajr}
                  onChange={(e) => setFormData({ ...formData, fajr: e.target.value })}
                  className="bg-white/10 border-white/30 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-white/80">Sonnenaufgang</Label>
                <Input
                  type="time"
                  value={formData.sunrise}
                  onChange={(e) => setFormData({ ...formData, sunrise: e.target.value })}
                  className="bg-white/10 border-white/30 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-white/80">Dhuhr</Label>
                <Input
                  type="time"
                  value={formData.dhuhr}
                  onChange={(e) => setFormData({ ...formData, dhuhr: e.target.value })}
                  className="bg-white/10 border-white/30 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-white/80">Asr</Label>
                <Input
                  type="time"
                  value={formData.asr}
                  onChange={(e) => setFormData({ ...formData, asr: e.target.value })}
                  className="bg-white/10 border-white/30 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-white/80">Maghrib</Label>
                <Input
                  type="time"
                  value={formData.maghrib}
                  onChange={(e) => setFormData({ ...formData, maghrib: e.target.value })}
                  className="bg-white/10 border-white/30 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-white/80">Isha</Label>
                <Input
                  type="time"
                  value={formData.isha}
                  onChange={(e) => setFormData({ ...formData, isha: e.target.value })}
                  className="bg-white/10 border-white/30 text-white mt-1"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleSave}
                disabled={saving || !formData.fajr || !formData.dhuhr}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Wird gespeichert..." : "Speichern"}
              </Button>
              {formData.id && (
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(formData.id!)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Löschen
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Gespeicherte Gebetszeiten
            </CardTitle>
          </CardHeader>
          <CardContent>
            {prayerTimes.length === 0 ? (
              <p className="text-white/60 text-center py-4">
                Keine gespeicherten Gebetszeiten. Die Zeiten werden aus der PDF-Datei geladen.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-2">Datum</th>
                      <th className="text-center py-2 px-2">Fajr</th>
                      <th className="text-center py-2 px-2">Aufg.</th>
                      <th className="text-center py-2 px-2">Dhuhr</th>
                      <th className="text-center py-2 px-2">Asr</th>
                      <th className="text-center py-2 px-2">Magh.</th>
                      <th className="text-center py-2 px-2">Isha</th>
                      <th className="text-center py-2 px-2">Aktion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prayerTimes.map((pt) => (
                      <tr key={pt.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-2 px-2">
                          {format(new Date(pt.date), "dd.MM.yyyy", { locale: de })}
                        </td>
                        <td className="text-center py-2 px-2">{pt.fajr}</td>
                        <td className="text-center py-2 px-2">{pt.sunrise}</td>
                        <td className="text-center py-2 px-2">{pt.dhuhr}</td>
                        <td className="text-center py-2 px-2">{pt.asr}</td>
                        <td className="text-center py-2 px-2">{pt.maghrib}</td>
                        <td className="text-center py-2 px-2">{pt.isha}</td>
                        <td className="text-center py-2 px-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => loadPrayerTimeForDate(pt.date)}
                            className="text-white/80 hover:text-white hover:bg-white/10"
                          >
                            Bearbeiten
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPrayerTimes;
