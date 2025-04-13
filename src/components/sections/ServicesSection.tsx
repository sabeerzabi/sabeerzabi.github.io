import { useFetchData } from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/context/LanguageContext";
import { Progress } from "@/components/ui/progress";

interface ServiceData {
  name: string;
  description: string;
  icon: string;
  bg_color: string;
  visible: boolean;
  color: string;
  percentage: number;
  progress_color: string;
  progress_bg_color: string;
}

interface ServicesResponse {
  success: boolean;
  data: ServiceData[];
}

interface ConfigResponse {
  success: boolean;
  data: {
    paths: {
      dotsBg: string;
    };
    colors: {
      progress: {
        green: string;
        blue: string;
        pink: string;
        yellow: string;
        violet: string;
      };
    };
  };
}

const ServicesSection = () => {
  const { data: servicesData, status } = useFetchData<ServicesResponse>(
    "/data/services.json"
  );
  const { data: configData } =
    useFetchData<ConfigResponse>("/data/config.json");
  const { translations } = useLanguage();
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Get only the visible services
  const visibleServices =
    servicesData?.data?.filter((service) => service.visible) || [];

  const t = translations?.services || {};

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2
          ref={sectionRef}
          className={`section-title fade-up font-rubik font-bold ${sectionInView ? "visible" : ""}`}
        >
          {t.title || "Services"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {status === "loading" ? (
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 text-center shadow-md"
                >
                  <Skeleton className="w-24 h-24 mx-auto mb-6 rounded-full" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-20 w-full mx-auto mb-4" />
                  <Skeleton className="h-2 w-full mx-auto" />
                </div>
              ))
          ) : status === "error" ? (
            <div className="col-span-full text-center text-red-500">
              Failed to load services. Please try again later.
            </div>
          ) : visibleServices.length > 0 ? (
            visibleServices.map((service, index) => (
              <div
                key={index}
                className="service-card"
                style={{
                  color: service.color || "white",
                  backgroundColor: service.bg_color || "white",
                  borderRadius: "0.75rem",
                }}
              >
                <div className="p-6">
                  <div className="mb-4 w-24 h-24 mx-auto flex items-center justify-center bg-white/10 rounded-full">
                    <img
                      src={service.icon}
                      alt={service.name}
                      className="w-16 h-16"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                  <p className="mb-6 opacity-90">{service.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Progress 
                        value={service.percentage} 
                        animateOnScroll={true} 
                        className="bg-white/20"
                        style={{ backgroundColor: service.progress_bg_color }}
                      />
                    </div>
                    <span className="text-xs font-medium whitespace-nowrap">
                      {service.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No services available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
