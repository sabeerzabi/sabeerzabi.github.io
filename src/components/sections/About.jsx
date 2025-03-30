import styles from "../styles/About.module.css";
import { useProfile } from "../../contexts/Profile";
import { useEffect, useState } from "react";

const colorClasses = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  violet: "bg-violet-500",
  orange: "bg-orange-500",
};

function AbountImage({ aboutImg }) {
  return (
    <div className="col-span-3">
      <div
        className={`${styles.aboutImg} h-50 w-50 brand-bg-light rounded-full`}
        style={{
          backgroundImage: `url(${aboutImg})`,
        }}
      ></div>
    </div>
  );
}

const ProgressBar = ({ name, progress, color }) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= progress) {
          clearInterval(interval);
          return progress;
        }
        return prev + 1;
      });
    }, 10); // Adjust timing for smooth animation

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <span className="text-sm font-semibold">{name}</span>
        <span className="text-sm">{currentProgress}%</span>
      </div>
      <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-300 ease-in-out ${
            colorClasses[color] || "bg-blue-500"
          }`}
          style={{ width: `${currentProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

function Services() {
  const { services } = useProfile();
  return services.map((service) => (
    <ProgressBar
      name={service.name}
      progress={service.percentage}
      color={service.bg_color}
      key={service.name}
    />
  ));
}

function AbountDetails({ aboutDescription }) {
  return (
    <div className="col-span-9">
      <div
        className={`${styles.triangleLeftMd} bg-white shadow-gray-300 shadow-md p-5 rounded-2xl`}
      >
        <div className="grid grid-flow-col grid-rows-1 grid-cols-2 gap-4">
          <p className="grid-cols-1">{aboutDescription}</p>
          <div className="grid-cols-1">
            <Services />
          </div>
        </div>
      </div>
    </div>
  );
}

function AbountProjects({ aboutProjects }) {
  return (
    <div
      className={`grid grid-flow-col grid-rows-1 grid-cols-${
        Object.keys(aboutProjects).length
      } gap-4`}
    >
      {Object.entries(aboutProjects).map(([projectName, details]) => (
        <div
          key={projectName}
          className={`${styles.projectItem} col-span-1 flex`}
        >
          <span className={`${styles.projectIcon} flex items-center`}>
            <img src={details.icon} alt={projectName} />
          </span>
          <span className="text-left ml-5">
            <h3 className="text-lg">{details.count} </h3>
            <p className="text-sm text-gray-500">
              {projectName.charAt(0).toUpperCase() + projectName.slice(1)}{" "}
              Projects
            </p>
          </span>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const { about } = useProfile();
  return (
    <section id="about" className="items-center flex">
      <div className="container mx-auto max-w-5xl handle-margin">
        <h2 className="section-title animate fadeInUp">About Me</h2>
        <div className="h-10"></div>
        <div className="flex flex-wrap">
          <div className="grid grid-flow-col grid-rows-1 grid-cols-12 gap-6">
            <AbountImage aboutImg={about.image} />
            <AbountDetails aboutDescription={about.description} />
          </div>
        </div>

        <div className="h-10"></div>
        <AbountProjects aboutProjects={about.projects} />
        <div className="h-20"></div>
      </div>
    </section>
  );
}
