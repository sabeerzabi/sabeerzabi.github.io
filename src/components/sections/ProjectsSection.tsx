
import { useState, useEffect } from 'react';
import { useFetchData } from '@/hooks/useFetchData';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface Project {
  type: string;
  name: string;
  image: string;
  mini_image: string;
  company: string;
  location: string;
  year: string;
  detail: string[];
  tags: string[];
  url: string;
}

interface ProjectsResponse {
  success: boolean;
  data: Project[];
}

interface ConfigResponse {
  success: boolean;
  data: {
    paths: {
      dotsBg: string;
    };
  };
}

const ProjectsSection = () => {
  const { data: projectsData, status } = useFetchData<ProjectsResponse>('/data/projects.json');
  const { data: configData } = useFetchData<ConfigResponse>('/data/config.json');
  const [activeFilter, setActiveFilter] = useState('all');
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<string[]>(['all']);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showViewAll, setShowViewAll] = useState(false);
  const [showLess, setShowLess] = useState(false);

  // Set up filters and initial projects
  useEffect(() => {
    if (projectsData?.data) {
      // Extract unique tags for filters
      const allTags = new Set<string>();
      allTags.add('all');
      
      projectsData.data.forEach(project => {
        project.tags.forEach(tag => allTags.add(tag));
      });
      
      setFilters(Array.from(allTags));
      
      // Set initial displayed projects
      filterProjects('all', projectsData.data);
    }
  }, [projectsData]);

  // Filter projects based on active filter
  const filterProjects = (filter: string, projects: Project[] = projectsData?.data || []) => {
    let filtered = projects;
    
    if (filter !== 'all') {
      filtered = projects.filter(project => project.tags.includes(filter));
    }
    
    setDisplayedProjects(filtered);
    setActiveFilter(filter);
    setVisibleCount(6);
    setShowViewAll(filtered.length > 6);
    setShowLess(false);
  };

  // Handle filter click
  const handleFilterClick = (filter: string) => {
    filterProjects(filter);
  };

  // Handle view all click
  const handleViewAllClick = () => {
    setVisibleCount(displayedProjects.length);
    setShowViewAll(false);
    setShowLess(true);
  };

  // Handle show less click
  const handleShowLessClick = () => {
    setVisibleCount(6);
    setShowViewAll(true);
    setShowLess(false);
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-portfolio-purple relative flex items-center">
          <span className="relative w-8 h-8 mr-3">
            <span className="absolute -left-1 -top-1 w-full h-full" style={{ background: `url(${configData?.data?.paths?.dotsBg || "/icons/dots-bg.svg"})`, backgroundSize: 'cover' }}></span>
          </span>
          Projects
        </h2>
        
        {/* Project Filters */}
        <div className="project-filters flex flex-wrap justify-center mb-10">
          {status === 'loading' ? (
            Array(5).fill(0).map((_, index) => (
              <Skeleton key={index} className="h-10 w-24 mx-1 my-1 rounded-full" />
            ))
          ) : (
            filters.map((filter, index) => (
              <button
                key={index}
                className={`${activeFilter === filter ? 'active' : ''}`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))
          )}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {status === 'loading' ? (
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="project-card">
                <Skeleton className="h-48 w-full rounded-t-xl" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))
          ) : status === 'error' ? (
            <div className="col-span-full text-center text-red-500">
              Failed to load projects. Please try again later.
            </div>
          ) : displayedProjects.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No projects found for this filter.
            </div>
          ) : (
            displayedProjects.slice(0, visibleCount).map((project, index) => (
              <div key={index} className="project-card bg-white overflow-hidden rounded-xl shadow-md">
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={project.mini_image || project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-portfolio-purple mb-1">{project.name}</h3>
                  <p className="text-gray-600 text-sm">{project.company}</p>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* View All / Show Less Button */}
        <div className="text-center mt-10">
          {showViewAll && (
            <Button 
              onClick={handleViewAllClick}
              className="bg-portfolio-purple hover:bg-portfolio-purple/80 text-white"
            >
              View All
            </Button>
          )}
          
          {showLess && (
            <Button 
              onClick={handleShowLessClick}
              className="bg-portfolio-purple hover:bg-portfolio-purple/80 text-white"
            >
              Show Less
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
