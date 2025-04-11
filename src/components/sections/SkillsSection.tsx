
import { 
  FigmaIcon, FileJson2, Server, Database, 
  Code, MonitorSmartphone, Layers, TerminalSquare 
} from 'lucide-react';

const SkillsSection = () => {
  const skills = [
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "Node.js", level: 70 },
  ];

  const technicalIcons = [
    { icon: <FileJson2 size={28} />, label: "HTML/CSS" },
    { icon: <Code size={28} />, label: "JavaScript" },
    { icon: <FigmaIcon size={28} />, label: "Figma" },
    { icon: <MonitorSmartphone size={28} />, label: "Responsive Design" },
    { icon: <Layers size={28} />, label: "React" },
    { icon: <Server size={28} />, label: "Node.js" },
    { icon: <Database size={28} />, label: "MongoDB" },
    { icon: <TerminalSquare size={28} />, label: "Git" },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {technicalIcons.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-portfolio-purple mb-3">
                {item.icon}
              </div>
              <p className="font-medium">{item.label}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-14">
          <h3 className="text-2xl font-bold mb-8 text-center text-portfolio-purple">Proficiency</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-portfolio-purple h-2.5 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
