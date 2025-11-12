import { useEffect, useState, FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";
import { ArrowLeft, Plus, Edit, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

const postSchema = z.object({
  title: z.string().min(1, "Titel ist erforderlich").max(200, "Titel zu lang"),
  content: z.string().min(1, "Text ist erforderlich").max(5000, "Text zu lang"),
});

const AdminPostManagement = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
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

  useEffect(() => {
    if (isAdmin) {
      fetchPosts();
    }
  }, [isAdmin]);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc("is_admin", {
        user_id: userId,
      });

      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(data);
      setLoading(false);

      if (!data) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsAdmin(false);
      setLoading(false);
    }
  };

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
      toast({
        title: "Fehler",
        description: "Posts konnten nicht geladen werden",
        variant: "destructive",
      });
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fehler",
        description: "Bild darf maximal 5MB groß sein",
        variant: "destructive",
      });
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        processImageFile(file);
      } else {
        toast({
          title: "Fehler",
          description: "Bitte nur Bilddateien hochladen.",
          variant: "destructive",
        });
      }
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Fehler",
        description: "Bild konnte nicht hochgeladen werden",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      postSchema.parse({ title, content });

      let imageUrl = editingPost?.image_url || null;

      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      if (editingPost) {
        const { error } = await supabase
          .from('posts')
          .update({
            title: title.trim(),
            content: content.trim(),
            image_url: imageUrl,
          })
          .eq('id', editingPost.id);

        if (error) throw error;

        toast({
          title: "Erfolg",
          description: "Post erfolgreich aktualisiert",
        });
      } else {
        const { error } = await supabase
          .from('posts')
          .insert({
            title: title.trim(),
            content: content.trim(),
            image_url: imageUrl,
            created_by: user?.id,
          });

        if (error) throw error;

        toast({
          title: "Erfolg",
          description: "Post erfolgreich erstellt",
        });
      }

      resetForm();
      fetchPosts();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validierungsfehler",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        console.error('Error saving post:', error);
        toast({
          title: "Fehler",
          description: "Post konnte nicht gespeichert werden",
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setImagePreview(post.image_url);
    setShowForm(true);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Möchten Sie diesen Post wirklich löschen?")) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Erfolg",
        description: "Post erfolgreich gelöscht",
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Fehler",
        description: "Post konnte nicht gelöscht werden",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingPost(null);
    setTitle("");
    setContent("");
    setImageFile(null);
    setImagePreview(null);
  };

  if (loading || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">Neuigkeiten verwalten</h1>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            {showForm ? "Formular schließen" : "Neue Neuigkeit"}
          </Button>
        </div>

        {showForm && (
          <Card className="p-6 mb-8 bg-gradient-to-br from-muted/30 to-muted/50 border-2 shadow-lg">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              {editingPost ? (
                <>
                  <Edit className="w-5 h-5" />
                  Neuigkeit bearbeiten
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Neue Neuigkeit erstellen
                </>
              )}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Titel</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titel eingeben..."
                  className="text-base"
                  required
                  maxLength={200}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Inhalt</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Inhalt eingeben..."
                  rows={6}
                  className="text-base resize-none"
                  required
                  maxLength={5000}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bild (optional)</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                    isDragging
                      ? 'border-primary bg-primary/5 scale-[1.02]'
                      : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-3">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Vorschau"
                          className="max-w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImageFile(null);
                            setImagePreview(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 bg-primary/10 rounded-full">
                          <Upload className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <p className="text-base font-medium mb-1">
                            Bild hier ablegen oder klicken
                          </p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG bis zu 5MB
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={submitting} className="flex-1 sm:flex-none">
                  {submitting ? "Wird gespeichert..." : editingPost ? "Aktualisieren" : "Erstellen"}
                </Button>
                {editingPost && (
                  <Button type="button" variant="outline" onClick={resetForm} className="flex-1 sm:flex-none">
                    Abbrechen
                  </Button>
                )}
              </div>
            </form>
          </Card>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Alle Neuigkeiten ({posts.length})
          </h2>
          {posts.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <ImageIcon className="w-12 h-12" />
                <p className="text-lg">Noch keine Neuigkeiten vorhanden</p>
                <p className="text-sm">Erstellen Sie Ihre erste Neuigkeit</p>
              </div>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 whitespace-pre-wrap line-clamp-3">
                      {post.content}
                    </p>
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="max-w-full sm:max-w-md rounded-lg mb-4 shadow-sm"
                      />
                    )}
                    <p className="text-sm text-muted-foreground">
                      Erstellt am: {new Date(post.created_at).toLocaleDateString("de-DE", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                    <Button
                      onClick={() => handleEdit(post)}
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Bearbeiten
                    </Button>
                    <Button
                      onClick={() => handleDelete(post.id)}
                      variant="destructive"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Löschen
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPostManagement;
