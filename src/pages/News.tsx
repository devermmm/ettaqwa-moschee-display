import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

const News = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();

    // Setup realtime subscription
    const channel = supabase
      .channel('posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts'
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'bs' ? 'bs-BA' : 'de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            {language === 'bs' ? 'Novosti' : 'Neuigkeiten'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {language === 'bs'
              ? 'Ostanite u toku sa najnovijim vijestima iz naše zajednice'
              : 'Bleiben Sie auf dem Laufenden mit den neuesten Nachrichten aus unserer Gemeinde'}
          </p>
        </motion.div>

        {/* Vaktija Download Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <Link to="/kalender">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.01] group cursor-pointer">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-10 translate-x-10" />
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Ramazan 2026 / 1447. h.</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {language === 'bs' ? 'Vaktija za Ramazan' : 'Vaktija für Ramadan'}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {language === 'bs' ? 'Preuzmi kao sliku ili PDF' : 'Als Bild oder PDF herunterladen'}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Download className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {loading ? (
          <div className="text-center text-2xl">
            {language === 'bs' ? 'Učitavanje...' : 'Laden...'}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-xl text-muted-foreground">
            {language === 'bs' ? 'Nema objava' : 'Keine Beiträge vorhanden'}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="overflow-hidden h-full hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02] group"
                  onClick={() => navigate(`/news/${post.id}`)}
                >
                  {post.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 min-h-[4rem]">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground whitespace-pre-wrap line-clamp-3 mb-4">
                      {post.content}
                    </p>
                    <div className="flex items-center text-primary font-medium">
                      {language === "bs" ? "Pročitaj više" : "Mehr lesen"}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
