import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TiptapEditor from '../components/TiptapEditor';
import { Project, DiaryEntry } from '../types';
import { LogOut, Plus, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CMSDashboardProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  projects: Project[];
  diaryEntries: DiaryEntry[];
  onUpdateProjects: (projects: Project[]) => void;
  onUpdateDiaries: (diaries: DiaryEntry[]) => void;
}

export default function CMSDashboard({
  theme,
  onThemeToggle,
  isAuthenticated,
  onLogin,
  onLogout,
  projects,
  diaryEntries,
  onUpdateProjects,
  onUpdateDiaries
}: CMSDashboardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Project form state
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imgSrc: '',
    role: '',
    technologies: '',
    overview: '',
    outcomes: '',
  });

  // Diary form state
  const [diaryDialogOpen, setDiaryDialogOpen] = useState(false);
  const [editingDiary, setEditingDiary] = useState<DiaryEntry | null>(null);
  const [diaryForm, setDiaryForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    visibility: 'public' as 'public' | 'private',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
      toast({
        title: "Login successful",
        description: "Welcome to the CMS dashboard!",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Project handlers
  const handleAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      imgSrc: '',
      role: '',
      technologies: '',
      overview: '',
      outcomes: '',
    });
    setProjectDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      imgSrc: project.imgSrc,
      role: project.role,
      technologies: project.technologies.join(', '),
      overview: project.overview,
      outcomes: project.outcomes,
    });
    setProjectDialogOpen(true);
  };

  const handleSaveProject = () => {
    const slug = projectForm.title.toLowerCase().replace(/\s+/g, '-');
    const newProject: Project = {
      id: editingProject?.id || Date.now().toString(),
      slug: editingProject?.slug || slug,
      title: projectForm.title,
      description: projectForm.description,
      imgSrc: projectForm.imgSrc || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      role: projectForm.role,
      technologies: projectForm.technologies.split(',').map(t => t.trim()),
      overview: projectForm.overview,
      outcomes: projectForm.outcomes,
      gallery: [projectForm.imgSrc || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop'],
      links: [],
    };

    if (editingProject) {
      onUpdateProjects(projects.map(p => p.id === editingProject.id ? newProject : p));
      toast({
        title: "Project updated",
        description: "Your project has been updated successfully.",
      });
    } else {
      onUpdateProjects([...projects, newProject]);
      toast({
        title: "Project created",
        description: "Your new project has been created successfully.",
      });
    }

    setProjectDialogOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      onUpdateProjects(projects.filter(p => p.id !== id));
      toast({
        title: "Project deleted",
        description: "The project has been deleted successfully.",
      });
    }
  };

  // Diary handlers
  const handleAddDiary = () => {
    setEditingDiary(null);
    setDiaryForm({
      title: '',
      excerpt: '',
      content: '',
      visibility: 'public',
    });
    setDiaryDialogOpen(true);
  };

  const handleEditDiary = (diary: DiaryEntry) => {
    setEditingDiary(diary);
    setDiaryForm({
      title: diary.title,
      excerpt: diary.excerpt,
      content: diary.content,
      visibility: diary.visibility,
    });
    setDiaryDialogOpen(true);
  };

  const handleSaveDiary = () => {
    const slug = diaryForm.title.toLowerCase().replace(/\s+/g, '-');
    const newDiary: DiaryEntry = {
      id: editingDiary?.id || Date.now().toString(),
      slug: editingDiary?.slug || slug,
      title: diaryForm.title,
      excerpt: diaryForm.excerpt,
      content: diaryForm.content,
      date: editingDiary?.date || new Date().toISOString().split('T')[0],
      visibility: diaryForm.visibility,
    };

    if (editingDiary) {
      onUpdateDiaries(diaryEntries.map(d => d.id === editingDiary.id ? newDiary : d));
      toast({
        title: "Diary entry updated",
        description: "Your diary entry has been updated successfully.",
      });
    } else {
      onUpdateDiaries([...diaryEntries, newDiary]);
      toast({
        title: "Diary entry created",
        description: "Your new diary entry has been created successfully.",
      });
    }

    setDiaryDialogOpen(false);
  };

  const handleDeleteDiary = (id: string) => {
    if (confirm('Are you sure you want to delete this diary entry?')) {
      onUpdateDiaries(diaryEntries.filter(d => d.id !== id));
      toast({
        title: "Diary entry deleted",
        description: "The diary entry has been deleted successfully.",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavBar currentPage="cms" theme={theme} onThemeToggle={onThemeToggle} />
        
        <main className="py-32 px-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">CMS Login</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enter your credentials to access the dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-foreground">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-background text-foreground border-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-background text-foreground border-border"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Login
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Demo credentials: admin / admin
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar currentPage="cms" theme={theme} onThemeToggle={onThemeToggle} />
      
      <main className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="font-headline text-4xl font-bold text-foreground">CMS Dashboard</h1>
            <Button 
              onClick={onLogout}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>

          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="portfolio" className="text-foreground">Portfolio</TabsTrigger>
              <TabsTrigger value="diaries" className="text-foreground">Diaries</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-headline text-2xl font-bold text-foreground">
                    Manage Portfolio Items
                  </h2>
                  <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={handleAddProject}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">
                          {editingProject ? 'Edit Project' : 'Add New Project'}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          Fill in the project details below
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="project-title" className="text-foreground">Title</Label>
                          <Input
                            id="project-title"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            className="bg-background text-foreground border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="project-description" className="text-foreground">Description</Label>
                          <Input
                            id="project-description"
                            value={projectForm.description}
                            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                            className="bg-background text-foreground border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="project-image" className="text-foreground">Image URL</Label>
                          <Input
                            id="project-image"
                            value={projectForm.imgSrc}
                            onChange={(e) => setProjectForm({ ...projectForm, imgSrc: e.target.value })}
                            className="bg-background text-foreground border-border"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="project-role" className="text-foreground">Role</Label>
                          <Input
                            id="project-role"
                            value={projectForm.role}
                            onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })}
                            className="bg-background text-foreground border-border"
                            placeholder="e.g., Full Stack Engineer"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="project-technologies" className="text-foreground">
                            Technologies (comma-separated)
                          </Label>
                          <Input
                            id="project-technologies"
                            value={projectForm.technologies}
                            onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                            className="bg-background text-foreground border-border"
                            placeholder="React, Node.js, PostgreSQL"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="project-overview" className="text-foreground">Overview</Label>
                          <TiptapEditor
                            content={projectForm.overview}
                            onChange={(content) => setProjectForm({ ...projectForm, overview: content })}
                            placeholder="Describe the project overview..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="project-outcomes" className="text-foreground">Outcomes</Label>
                          <TiptapEditor
                            content={projectForm.outcomes}
                            onChange={(content) => setProjectForm({ ...projectForm, outcomes: content })}
                            placeholder="Describe the project outcomes..."
                          />
                        </div>
                        <div className="flex gap-4 pt-4">
                          <Button
                            onClick={handleSaveProject}
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Save Project
                          </Button>
                          <Button
                            onClick={() => setProjectDialogOpen(false)}
                            variant="outline"
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-6">
                  {projects.map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <CardTitle className="text-foreground">{project.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-4">
                          <Button 
                            onClick={() => navigate(`/project/${project.slug}`)}
                            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                          >
                            View
                          </Button>
                          <Button 
                            onClick={() => handleEditProject(project)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button 
                            onClick={() => handleDeleteProject(project.id)}
                            variant="outline"
                            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="diaries">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-headline text-2xl font-bold text-foreground">
                    Manage Diary Entries
                  </h2>
                  <Dialog open={diaryDialogOpen} onOpenChange={setDiaryDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={handleAddDiary}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Entry
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">
                          {editingDiary ? 'Edit Diary Entry' : 'Add New Diary Entry'}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          Fill in the diary entry details below
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="diary-title" className="text-foreground">Title</Label>
                          <Input
                            id="diary-title"
                            value={diaryForm.title}
                            onChange={(e) => setDiaryForm({ ...diaryForm, title: e.target.value })}
                            className="bg-background text-foreground border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="diary-excerpt" className="text-foreground">Excerpt</Label>
                          <Input
                            id="diary-excerpt"
                            value={diaryForm.excerpt}
                            onChange={(e) => setDiaryForm({ ...diaryForm, excerpt: e.target.value })}
                            className="bg-background text-foreground border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="diary-content" className="text-foreground">Content</Label>
                          <TiptapEditor
                            content={diaryForm.content}
                            onChange={(content) => setDiaryForm({ ...diaryForm, content })}
                            placeholder="Write your diary entry..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="diary-visibility" className="text-foreground">Visibility</Label>
                          <Select
                            value={diaryForm.visibility}
                            onValueChange={(value: 'public' | 'private') => 
                              setDiaryForm({ ...diaryForm, visibility: value })
                            }
                          >
                            <SelectTrigger className="bg-background text-foreground border-border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-4 pt-4">
                          <Button
                            onClick={handleSaveDiary}
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Save Entry
                          </Button>
                          <Button
                            onClick={() => setDiaryDialogOpen(false)}
                            variant="outline"
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-6">
                  {diaryEntries.map((entry) => (
                    <Card key={entry.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-foreground">{entry.title}</CardTitle>
                            <CardDescription className="text-muted-foreground">
                              {new Date(entry.date).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <span 
                            className={`px-3 py-1 rounded-md text-sm ${
                              entry.visibility === 'public' 
                                ? 'bg-success text-white' 
                                : 'bg-gray-500 text-white'
                            }`}
                          >
                            {entry.visibility}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{entry.excerpt}</p>
                        <div className="flex gap-4">
                          <Button 
                            onClick={() => navigate(`/diary/${entry.slug}`)}
                            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                          >
                            View
                          </Button>
                          <Button 
                            onClick={() => handleEditDiary(entry)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button 
                            onClick={() => handleDeleteDiary(entry.id)}
                            variant="outline"
                            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
