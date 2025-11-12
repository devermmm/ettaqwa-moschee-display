import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";
import { Shield, LogOut } from "lucide-react";

const AdminPanel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check admin status when session changes
        if (session?.user) {
          setTimeout(() => {
            checkAdminStatus(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        navigate("/auth");
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc("is_admin", {
        user_id: userId,
      });

      if (error) {
        console.error("Error checking admin status:", error);
        toast({
          title: "Fehler",
          description: "Fehler beim Überprüfen der Admin-Rechte",
          variant: "destructive",
        });
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(data);
      setLoading(false);

      if (!data) {
        toast({
          title: "Zugriff verweigert",
          description: "Sie haben keine Admin-Rechte. Danke.",
          variant: "destructive",
        });
        setTimeout(() => {
          handleLogout();
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsAdmin(false);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
    toast({
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Laden...</div>
      </div>
    );
  }

  if (!user || !session) {
    return null;
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted px-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-4">
            <Shield className="w-16 h-16 mx-auto text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Zugriff verweigert</h1>
          <p className="text-muted-foreground mb-6">
            Sie haben keine Admin-Rechte. Danke.
          </p>
          <Button onClick={handleLogout} className="w-full">
            Zurück zum Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">Admin Panel</h1>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </Button>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-muted rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Willkommen, Admin!</h2>
              <p className="text-muted-foreground mb-4">
                E-Mail: {user.email}
              </p>
              <p className="text-sm text-muted-foreground">
                Sie haben vollen Zugriff auf das Admin-Panel.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Benutzer verwalten</h3>
                <p className="text-sm text-muted-foreground">
                  Benutzer anzeigen und verwalten
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Inhalte verwalten</h3>
                <p className="text-sm text-muted-foreground">
                  Website-Inhalte bearbeiten
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Gebetszeiten</h3>
                <p className="text-sm text-muted-foreground">
                  Gebetszeiten aktualisieren
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Einstellungen</h3>
                <p className="text-sm text-muted-foreground">
                  System-Einstellungen verwalten
                </p>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
