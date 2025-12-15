import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TiptapEditor from '../components/TiptapEditor';
import { Project, DiaryEntry, Skill, Experience } from '../types';
import { 
  createProject, updateProject, deleteProject, 
  createDiary, updateDiary, deleteDiary,
  createSkill, updateSkill, deleteSkill,
  createExperience, updateExperience, deleteExperience
} from '@/api/content';
import { LogOut, Plus, Pencil, Trash2, LayoutDashboard, FolderOpen, BookOpen, GraduationCap, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CMSDashboardProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  projects: Project[];
  diaryEntries: DiaryEntry[];
  skills: Skill[];
  experiences: Experience[];
  onUpdateProjects: () => void;
  onUpdateDiaries: () => void;
  onUpdateSkills: () => void;
  onUpdateExperiences: () => void;
}

export default function CMSDashboard({
  theme,
  onThemeToggle,
  isAuthenticated,
  onLogout,
  projects,
  diaryEntries,
  skills,
  experiences,
  onUpdateProjects,
  onUpdateDiaries,
  onUpdateSkills,
  onUpdateExperiences
}: CMSDashboardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Project form state
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    img_src: '',
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

  // Skill form state
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillForm, setSkillForm] = useState({
    category: '',
    items: '',
  });

  // Experience form state
  const [experienceDialogOpen, setExperienceDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [experienceForm, setExperienceForm] = useState({
    title: '',
    company: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  // Project handlers
  const handleAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      img_src: '',
      role: '',
      technologies: '',
      overview: '',
      outcomes: '',
    });
    setProjectDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    console.log('Editing project:', project);
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      img_src: project.img_src,
      role: project.role,
      technologies: project.technologies.join(', '),
      overview: project.overview,
      outcomes: project.outcomes,
    });
    setProjectDialogOpen(true);
  };

  const handleSaveProject = async () => {
    console.log('Saving project, editingProject:', editingProject);
    const slug = projectForm.title.toLowerCase().replace(/\s+/g, '-');
    const newProject: Project = {
      id: editingProject?.id || Date.now().toString(),
      slug: editingProject?.slug || slug,
      title: projectForm.title,
      description: projectForm.description,
      img_src: projectForm.img_src || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      role: projectForm.role,
      technologies: projectForm.technologies.split(',').map(t => t.trim()),
      overview: projectForm.overview,
      outcomes: projectForm.outcomes,
      gallery: [projectForm.img_src || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop'],
      links: [],
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, newProject);
        toast({
          title: "Project updated",
          description: "Your project has been updated successfully.",
        });
      } else {
        await createProject({ ...newProject, id: undefined }); // Backend assigns ID
        toast({
          title: "Project created",
          description: "Your new project has been created successfully.",
        });
      }
      onUpdateProjects();
    } catch (error) {
       console.error(error);
       toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive"
       });
    }

    setProjectDialogOpen(false);
  };

  const handleDeleteProject = async (id: string | number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        onUpdateProjects();
        toast({
          title: "Project deleted",
          description: "The project has been deleted successfully.",
        });
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete project", variant: "destructive" });
      }
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

  const handleSaveDiary = async () => {
    const slug = diaryForm.title.toLowerCase().replace(/\s+/g, '-');
    const newDiary: DiaryEntry = {
      id: editingDiary?.id || Date.now().toString(),
      slug: editingDiary?.slug || slug,
      title: diaryForm.title,
      excerpt: diaryForm.excerpt,
      content: diaryForm.content,
      date: editingDiary?.date || new Date().toISOString(),
      visibility: diaryForm.visibility,
    };

    try {
      if (editingDiary) {
        await updateDiary(editingDiary.id, newDiary);
        toast({
          title: "Diary entry updated",
          description: "Your diary entry has been updated successfully.",
        });
      } else {
        await createDiary({ ...newDiary, id: undefined });
        toast({
          title: "Diary entry created",
          description: "Your new diary entry has been created successfully.",
        });
      }
      onUpdateDiaries();
    } catch (error) {
       toast({ title: "Error", description: "Failed to save diary", variant: "destructive" });
    }

    setDiaryDialogOpen(false);
  };

  const handleDeleteDiary = async (id: string | number) => {
    if (confirm('Are you sure you want to delete this diary entry?')) {
      try {
        await deleteDiary(id);
        onUpdateDiaries();
        toast({
          title: "Diary entry deleted",
          description: "The diary entry has been deleted successfully.",
        });
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete diary", variant: "destructive" });
      }
    }
  };

  // Skill handlers
  const handleAddSkill = () => {
    setEditingSkill(null);
    setSkillForm({ category: '', items: '' });
    setSkillDialogOpen(true);
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillForm({ 
      category: skill.category, 
      items: skill.items.join(', ')
    });
    setSkillDialogOpen(true);
  };

  const handleSaveSkill = async () => {
    const newSkill: Skill = {
      id: editingSkill?.id || Date.now(),
      category: skillForm.category,
      items: skillForm.items.split(',').map(i => i.trim()).filter(i => i),
    };

    try {
      if (editingSkill) {
        await updateSkill(editingSkill.id, newSkill);
        toast({ title: "Skill updated", description: "Skill updated successfully." });
      } else {
        await createSkill({ ...newSkill, id: undefined });
        toast({ title: "Skill created", description: "New skill created successfully." });
      }
      onUpdateSkills();
      setSkillDialogOpen(false);
    } catch {
      toast({ title: "Error", description: "Failed to save skill", variant: "destructive" });
    }
  };

  const handleDeleteSkill = async (id: string | number) => {
    if (confirm('Delete this skill category?')) {
      try {
        await deleteSkill(id);
        onUpdateSkills();
        toast({ title: "Skill deleted", description: "Skill deleted successfully." });
      } catch {
        toast({ title: "Error", description: "Failed to delete skill", variant: "destructive" });
      }
    }
  };

  // Experience handlers
  const handleAddExperience = () => {
    setEditingExperience(null);
    setExperienceForm({ title: '', company: '', start_date: '', end_date: '', description: '' });
    setExperienceDialogOpen(true);
  };

  const handleEditExperience = (exp: Experience) => {
    setEditingExperience(exp);
    setExperienceForm({
      title: exp.title,
      company: exp.company,
      start_date: exp.start_date.split('T')[0], // concise YYYY-MM-DD
      end_date: exp.end_date ? exp.end_date.split('T')[0] : '',
      description: exp.description,
    });
    setExperienceDialogOpen(true);
  };

  const handleSaveExperience = async () => {
    if (!experienceForm.start_date) {
      toast({ title: "Validation Error", description: "Start Date is required.", variant: "destructive" });
      return;
    }

    const newExp: Experience = {
      id: editingExperience?.id || Date.now(),
      title: experienceForm.title,
      company: experienceForm.company,
      start_date: new Date(experienceForm.start_date).toISOString(),
      end_date: experienceForm.end_date ? new Date(experienceForm.end_date).toISOString() : null,
      description: experienceForm.description,
    };

    try {
      if (editingExperience) {
        await updateExperience(editingExperience.id, newExp);
        toast({ title: "Experience updated", description: "Experience updated successfully." });
      } else {
        await createExperience({ ...newExp, id: undefined });
        toast({ title: "Experience created", description: "Experience created successfully." });
      }
      onUpdateExperiences();
      setExperienceDialogOpen(false);
    } catch {
      toast({ title: "Error", description: "Failed to save experience", variant: "destructive" });
    }
  };

  const handleDeleteExperience = async (id: string | number) => {
    if (confirm('Delete this experience?')) {
      try {
        await deleteExperience(id);
        onUpdateExperiences();
        toast({ title: "Experience deleted", description: "Experience deleted successfully." });
      } catch {
        toast({ title: "Error", description: "Failed to delete experience", variant: "destructive" });
      }
    }
  };

  // View state
  const [activeView, setActiveView] = useState<'overview' | 'projects' | 'diaries' | 'skills' | 'experience'>('overview');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Sidebar Items
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'diaries', label: 'Diaries', icon: BookOpen },
    { id: 'skills', label: 'Skills', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border h-screen fixed left-0 top-0 overflow-y-auto hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6" />
            CMS Admin
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Button 
            onClick={onLogout}
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen bg-background/50">
        {/* Mobile Header (TODO: Add functionality if needed) */}
        
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
             <div>
              <h2 className="text-3xl font-bold text-foreground capitalize">{activeView}</h2>
              <p className="text-muted-foreground">Manage your content and portfolio settings</p>
             </div>
             <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={onThemeToggle}>
                   {theme === 'light' ? '🌙' : '☀️'}
                </Button>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  JS
                </div>
             </div>
          </div>

          {/* View Content */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeView === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Projects', value: projects.length, icon: FolderOpen, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                  { label: 'Diary Entries', value: diaryEntries.length, icon: BookOpen, color: 'text-green-500', bg: 'bg-green-500/10' },
                  { label: 'Skill Categories', value: skills.length, icon: GraduationCap, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                  { label: 'Experience', value: experiences.length, icon: Briefcase, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                ].map((stat, i) => (
                  <Card key={i} className="border-border hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        +0% from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Recent Activity or Quick Actions could go here */}
                <Card className="md:col-span-2 lg:col-span-4 mt-6">
                    <CardHeader>
                        <CardTitle>Welcome back!</CardTitle>
                        <CardDescription>Select a module from the sidebar to start managing your content.</CardDescription>
                    </CardHeader>
                </Card>
              </div>
            )}

            {activeView === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-border shadow-sm">
                  <div className="space-y-1">
                     <h3 className="font-semibold text-lg">Projects Library</h3>
                     <p className="text-sm text-muted-foreground">Showcase your work</p>
                  </div>
                   <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={handleAddProject} className="shadow-lg shadow-primary/20">
                        <Plus className="w-5 h-5 mr-2" />
                        New Project
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
                            value={projectForm.img_src}
                            onChange={(e) => setProjectForm({ ...projectForm, img_src: e.target.value })}
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

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="group hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                      <div className="h-40 w-full overflow-hidden rounded-t-lg bg-muted relative">
                           {project.img_src && <img src={project.img_src} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <div className="flex gap-2 w-full">
                                    <Button size="sm" onClick={() => handleEditProject(project)} className="flex-1 bg-white/90 text-black hover:bg-white"><Pencil className="w-4 h-4 mr-2" /> Edit</Button>
                                    <Button size="sm" onClick={() => handleDeleteProject(project.id)} variant="destructive" className="flex-1"><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
                                </div>
                           </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="truncate">{project.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'diaries' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-border">
                   <div>
                       <h3 className="font-semibold text-lg">Diary Entries</h3>
                       <p className="text-sm text-muted-foreground">Thoughts & Updates</p>
                   </div>
                   <Dialog open={diaryDialogOpen} onOpenChange={setDiaryDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={handleAddDiary} className="shadow-lg">
                        <Plus className="w-5 h-5 mr-2" />
                        New Entry
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">
                          {editingDiary ? 'Edit Diary Entry' : 'Add New Diary Entry'}
                        </DialogTitle>
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
                
                <div className="space-y-4">
                  {diaryEntries.map((entry) => (
                    <Card key={entry.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-foreground">{entry.title}</CardTitle>
                            <CardDescription className="text-muted-foreground">
                              {new Date(entry.date).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <span 
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              entry.visibility === 'public' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                            }`}
                          >
                            {entry.visibility.toUpperCase()}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{entry.excerpt}</p>
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => navigate(`/diary/${entry.slug}`)}
                            variant="secondary"
                          >
                            View
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleEditDiary(entry)}
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleDeleteDiary(entry.id)}
                            variant="outline"
                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
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
            )}

            {activeView === 'skills' && (
              <div className="space-y-6">
                 <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-border">
                   <div>
                       <h3 className="font-semibold text-lg">Skills & Tech Stack</h3>
                       <p className="text-sm text-muted-foreground">Manage your expertise</p>
                   </div>
                  <Dialog open={skillDialogOpen} onOpenChange={setSkillDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={handleAddSkill}>
                        <Plus className="w-5 h-5 mr-2" /> Add Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-background border-border">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">
                          {editingSkill ? 'Edit Skill' : 'Add Skill'}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-foreground">Category</Label>
                          <Input 
                            value={skillForm.category} 
                            onChange={e => setSkillForm({ ...skillForm, category: e.target.value })}
                            placeholder="e.g. Frontend"
                            className="bg-background text-foreground border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-foreground">Items (comma separated)</Label>
                          <Input 
                            value={skillForm.items} 
                            onChange={e => setSkillForm({ ...skillForm, items: e.target.value })}
                            placeholder="React, TypeScript, Next.js"
                            className="bg-background text-foreground border-border"
                          />
                        </div>
                        <div className="flex gap-4 pt-4">
                          <Button onClick={handleSaveSkill} className="flex-1">Save</Button>
                          <Button onClick={() => setSkillDialogOpen(false)} variant="outline" className="flex-1">Cancel</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {skills.map(skill => (
                    <Card key={skill.id} className="hover:border-primary/50 transition-colors">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-foreground">{skill.category}</CardTitle>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => handleEditSkill(skill)}><Pencil className="w-4 h-4 text-muted-foreground" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDeleteSkill(skill.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {skill.items.map((item, i) => (
                            <span key={i} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">{item}</span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'experience' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-border">
                   <div>
                       <h3 className="font-semibold text-lg">Professional Experience</h3>
                       <p className="text-sm text-muted-foreground">Work history and roles</p>
                   </div>
                  <Dialog open={experienceDialogOpen} onOpenChange={setExperienceDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={handleAddExperience}>
                        <Plus className="w-5 h-5 mr-2" /> Add Experience
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-border">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">{editingExperience ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-foreground">Title</Label>
                          <Input 
                            value={experienceForm.title} 
                            onChange={e => setExperienceForm({ ...experienceForm, title: e.target.value })}
                            className="bg-background text-foreground border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-foreground">Company</Label>
                          <Input 
                            value={experienceForm.company} 
                            onChange={e => setExperienceForm({ ...experienceForm, company: e.target.value })}
                            className="bg-background text-foreground border-border"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-foreground">Start Date</Label>
                            <Input 
                              type="date"
                              value={experienceForm.start_date} 
                              onChange={e => setExperienceForm({ ...experienceForm, start_date: e.target.value })}
                              className="bg-background text-foreground border-border"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-foreground">End Date</Label>
                            <Input 
                              type="date"
                              value={experienceForm.end_date} 
                              onChange={e => setExperienceForm({ ...experienceForm, end_date: e.target.value })}
                              className="bg-background text-foreground border-border"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-foreground">Description</Label>
                          <TiptapEditor 
                            content={experienceForm.description} 
                            onChange={c => setExperienceForm({ ...experienceForm, description: c })}
                          />
                        </div>
                        <div className="flex gap-4 pt-4">
                          <Button onClick={handleSaveExperience} className="flex-1">Save</Button>
                          <Button onClick={() => setExperienceDialogOpen(false)} variant="outline" className="flex-1">Cancel</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid gap-4">
                  {experiences.map(exp => (
                    <Card key={exp.id} className="hover:border-primary/50 transition-all">
                      <CardHeader className="flex flex-row items-start justify-between">
                         <div>
                            <CardTitle className="text-xl text-foreground mb-1">{exp.title}</CardTitle>
                            <p className="text-md font-medium text-primary">{exp.company}</p>
                            <CardDescription className="text-muted-foreground mt-1">
                              {new Date(exp.start_date).toLocaleDateString()} - {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}
                            </CardDescription>
                         </div>
                         <div className="flex gap-2">
                           <Button size="icon" variant="ghost" onClick={() => handleEditExperience(exp)}><Pencil className="w-4 h-4" /></Button>
                           <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDeleteExperience(exp.id)}><Trash2 className="w-4 h-4" /></Button>
                         </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
  );
}
