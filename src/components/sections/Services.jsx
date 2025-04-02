import { useProfile } from "../../contexts/Profile";
import styles from "../styles/Services.module.css";

const colorClasses = {
  white: "text-white",
  black: "text-black-500",
};

const bgColorClasses = {
  blue: "bg-blue-400",
  red: "bg-red-400",
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  violet: "bg-violet-500",
  orange: "bg-orange-400",
};

const bgShadowClasses = {
  blue: "shadow-blue-400/50",
  red: "shadow-red-400/50",
  green: "shadow-green-400/50",
  yellow: "shadow-yellow-400/50",
  violet: "shadow-violet-400/50",
  orange: "shadow-orange-400/50",
};
function Service({ service }) {
  return (
    <div
      className={`
        ${styles.service} 
        ${bgColorClasses[service.bg_color]} 
        ${bgShadowClasses[service.bg_color]} 
        ${colorClasses[service.color]}
        shadow-md 
        rounded-lg
        text-center
        align-middle
      `}
    >
      <img
        className={`${styles.image} mx-auto`}
        src={service.icon}
        alt={service.name}
      />
      <h3>{service.name}</h3>
      <p>{service.description}</p>
    </div>
  );
}

export default function Services() {
  const { services } = useProfile();
  return (
    <section id="services" className="items-center flex">
      <div className="container mx-auto max-w-5xl px-2 md:px-6 lg:px-8 handle-margin">
        <h2 className="section-title animate fadeInUp">Services</h2>
        <div className="h-10"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services
            .filter((service) => service.visible)
            .map((service) => (
              <Service service={service} key={service.name} />
            ))}
        </div>
      </div>
    </section>
  );
}
