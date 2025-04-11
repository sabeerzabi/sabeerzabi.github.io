
import { useState } from 'react';

// Define project types
type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  url: string;
};

const ProjectsSection = () => {
  // Sample project data
  const projects: Project[] = [
    { id: 1, title: "E-commerce Website", category: "web", image: "https://via.placeholder.com/600x400/7E4EF3/FFFFFF?text=E-commerce+Website", url: "#" },
    { id: 2, title: "Portfolio Design", category: "design", image: "https://via.placeholder.com/600x400/FFD166/333333?text=Portfolio+Design", url: "#" },
    { id: 3, title: "Mobile App UI", category: "ui-ux", image: "https://via.placeholder.com/600x400/FF6B90/FFFFFF?text=Mobile+App+UI", url: "#" },
    { id: 4, title: "Blog Platform", category: "web", image: "https://via.placeholder.com/600x400/7E4EF3/FFFFFF?text=Blog+Platform", url: "#" },
    { id: 5, title: "Dashboard Design", category: "design", image: "https://via.placeholder.com/600x400/FFD166/333333?text=Dashboard+Design", url: "#" },
    { id: 6, title: "Social Media App", category: "ui-ux", image: "https://via.placeholder.com/600x400/FF6B90/FFFFFF?text=Social+Media+App", url: "#" },
    { id: 7, title: "Business Website", category: "web", image: "https://via.placeholder.com/600x400/7E4EF3/FFFFFF?text=Business+Website", url: "#" },
    { id: 8, title: "Product Design", category: "design", image: "https://via.placeholder.com/600x400/FFD166/333333?text=Product+Design", url: "#" },
    { id: 9, title: "Travel App", category: "ui-ux", image: "https://via.placeholder.com/600x400/FF6B90/FFFFFF?text=Travel+App", url: "#" },
  ];
  
  // Filter options
  const categories = ["all", "web", "design", "ui-ux"];
  const [filter, setFilter] = useState("all");
  
  // Filter projects based on selected category
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Projects</h2>
        
        {/* Filter Buttons */}
        <div className="project-filters flex flex-wrap justify-center mb-10">
          {categories.map(category => (
            <button
              key={category}
              className={`${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <a href={project.url} key={project.id} className="project-card group">
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-portfolio-purple/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {/* View All Projects Button */}
        <div className="text-center mt-10">
          <a href="#" className="btn-primary">View All Projects</a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
