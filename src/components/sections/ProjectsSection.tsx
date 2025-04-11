
import { useState, useEffect } from 'react';
import { useFetchData } from '@/hooks/useFetchData';

// Define project types
type Project = {
  name: string;
  image: string;
  "image-mini": string;
  tags: string[];
  company: string;
};

type ProjectsResponse = {
  success: boolean;
  data: Project[];
};

const ProjectsSection = () => {
  // Fetch project data from the JSON file
  const { data, status, error } = useFetchData<ProjectsResponse>('/data/projects.json');
  
  // Filter options
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState<string[]>(["all"]);
  
  // Extract unique categories from project tags
  useEffect(() => {
    if (data?.data) {
      const uniqueTags = new Set<string>();
      uniqueTags.add("all");
      
      data.data.forEach(project => {
        project.tags.forEach(tag => uniqueTags.add(tag));
      });
      
      setCategories(Array.from(uniqueTags));
    }
  }, [data]);
  
  // Filter projects based on selected category
  const filteredProjects = !data?.data ? [] : 
    filter === "all" 
      ? data.data 
      : data.data.filter(project => project.tags.includes(filter));
  
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Projects</h2>
        
        {/* Loading State */}
        {status === 'loading' && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-portfolio-purple"></div>
          </div>
        )}
        
        {/* Error State */}
        {status === 'error' && (
          <div className="text-center py-10">
            <p className="text-red-500">Failed to load projects. Please try again later.</p>
          </div>
        )}
        
        {status === 'success' && (
          <>
            {/* Filter Buttons */}
            <div className="project-filters flex flex-wrap justify-center mb-10">
              {categories.map(category => (
                <button
                  key={category}
                  className={`${filter === category ? 'active' : ''}`}
                  onClick={() => setFilter(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <div key={index} className="project-card group">
                  <div className="relative overflow-hidden rounded-xl">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-portfolio-purple/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white text-xl font-bold mb-2">{project.name}</h3>
                      <p className="text-white/90 text-sm">{project.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View All Projects Button */}
            <div className="text-center mt-10">
              <button 
                className="btn-primary"
                onClick={() => setFilter('all')}
                disabled={filter === 'all'}
              >
                View All Projects
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
