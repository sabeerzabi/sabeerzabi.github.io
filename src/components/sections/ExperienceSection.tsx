
const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Education & Experience</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-portfolio-purple">Education</h3>
            
            <div className="space-y-0">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="pt-1">
                  <span className="inline-block px-3 py-1 bg-portfolio-pink text-white text-xs rounded-full mb-2">2015 - 2019</span>
                  <h4 className="text-xl font-semibold">Bachelor of Computer Science</h4>
                  <p className="text-gray-600">University of Technology</p>
                  <p className="mt-2 text-gray-700">
                    Graduated with honors. Specialized in web technologies and software development.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="pt-1">
                  <span className="inline-block px-3 py-1 bg-portfolio-pink text-white text-xs rounded-full mb-2">2013 - 2015</span>
                  <h4 className="text-xl font-semibold">Associate Degree in IT</h4>
                  <p className="text-gray-600">Community College</p>
                  <p className="mt-2 text-gray-700">
                    Studied fundamentals of programming, networking, and database management.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="pt-1">
                  <span className="inline-block px-3 py-1 bg-portfolio-pink text-white text-xs rounded-full mb-2">2011 - 2013</span>
                  <h4 className="text-xl font-semibold">High School Diploma</h4>
                  <p className="text-gray-600">Science Academy</p>
                  <p className="mt-2 text-gray-700">
                    Graduated with distinction in mathematics and computer science.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Experience */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-portfolio-purple">Experience</h3>
            
            <div className="space-y-0">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="pt-1">
                  <span className="inline-block px-3 py-1 bg-portfolio-pink text-white text-xs rounded-full mb-2">2022 - Present</span>
                  <h4 className="text-xl font-semibold">Senior Frontend Developer</h4>
                  <p className="text-gray-600">TechGlobal Inc.</p>
                  <p className="mt-2 text-gray-700">
                    Leading the frontend development team, implementing modern UI/UX designs using React and TypeScript.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="pt-1">
                  <span className="inline-block px-3 py-1 bg-portfolio-pink text-white text-xs rounded-full mb-2">2019 - 2022</span>
                  <h4 className="text-xl font-semibold">Web Developer</h4>
                  <p className="text-gray-600">Digital Solutions LLC</p>
                  <p className="mt-2 text-gray-700">
                    Developed and maintained client websites and web applications using JavaScript frameworks.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="pt-1">
                  <span className="inline-block px-3 py-1 bg-portfolio-pink text-white text-xs rounded-full mb-2">2018 - 2019</span>
                  <h4 className="text-xl font-semibold">Junior Developer</h4>
                  <p className="text-gray-600">StartUp Innovation</p>
                  <p className="mt-2 text-gray-700">
                    Assisted in developing website features and fixing bugs for various client projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
