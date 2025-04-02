import styles from "../styles/About.module.css";
import { useProfile } from "../../contexts/Profile";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const colorClasses = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  violet: "bg-violet-500",
  orange: "bg-orange-500",
};

function AboutImage({ aboutImg }) {
  return (
    <div
      className={`${styles.aboutImg} h-40 w-40 brand-bg-light mx-auto mb-5 rounded-full`}
      style={{
        backgroundImage: `url(${aboutImg})`,
      }}
    ></div>
  );
}

function ProgressBar({ name, progress, color }) {
  const [currentProgress, setCurrentProgress] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      setCurrentProgress(progress);
    }
  }, [inView, progress]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between">
        <span className="text-sm font-semibold">{name}</span>
        <span className="text-sm">{currentProgress}%</span>
      </div>
      <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-300 ease-in-out ${
            colorClasses[color] || "bg-blue-500"
          } ${styles.barActive}`}
          style={{ width: `${currentProgress}%` }}
        ></div>
      </div>
    </div>
  );
}

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

function AboutDetails({ aboutDescription }) {
  return (
    <div className="col-span-3">
      <div
        className={`${styles.triangleLeftMd} bg-white shadow-gray-300 shadow-md p-5 rounded-2xl`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="grid-cols-1 order-last md:order-first mr-5">
            {aboutDescription}
          </div>
          <div className="grid-cols-1 order-first md:order-last">
            <Services />
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutProjects({ aboutProjects }) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-10"
    >
      {Object.entries(aboutProjects).map(([projectName, details]) => (
        <div key={projectName} className={`${styles.projectItem} flex p-4`}>
          <span className="flex items-center">
            <img src={details.icon} alt={projectName} className="w-10 h-10" />
          </span>
          <span className="text-left ml-5">
            <h3 className="text-lg">
              {inView ? (
                <CountUp start={0} end={details.count} duration={2} />
              ) : (
                0
              )}
            </h3>
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
      <div className="container mx-auto max-w-5xl  px-2 md:px-6 lg:px-8 handle-margin">
        <h2 className="section-title animate fadeInUp">About Me</h2>
        <div className="h-10"></div>
        <div className="flex flex-wrap">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <AboutImage aboutImg={about.image} />
            <AboutDetails aboutDescription={about.description} />
          </div>
        </div>

        <div className="h-10"></div>
        <AboutProjects aboutProjects={about.projects} />
      </div>
    </section>
  );
}
