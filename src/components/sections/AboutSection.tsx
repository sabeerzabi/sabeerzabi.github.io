import { useState, useEffect } from "react";
import { Clock, MapPin, Mail, Phone } from "lucide-react";
import { useFetchData } from "@/hooks/useFetchData";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/context/LanguageContext";

interface AboutData {
  name: string;
  description: string;
  image: string;
  adress: string;
  email: string;
  phone: string;
  experience: string;
  roles: string[];
  projects: {
    laravel: { count: number; icon: string };
    codeiginter: { count: number; icon: string };
    "core-php": { count: number; icon: string };
    wordpress: { count: number; icon: string };
  };
}

interface AboutResponse {
  success: boolean;
  data: AboutData;
}

interface ConfigResponse {
  success: boolean;
  data: {
    paths: {
      dotsBg: string;
    };
    colors: {
      primary: string;
    };
  };
}

const AboutSection = () => {
  const { data: aboutData, status: aboutStatus } = useFetchData<AboutResponse>(
    "/data/en/about.json"
  );
  const { data: configData } =
    useFetchData<ConfigResponse>("/data/config.json");
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { translations } = useLanguage();

  // For animated counters
  const [counts, setCounts] = useState({
    laravel: 0,
    codeiginter: 0,
    "core-php": 0,
    wordpress: 0,
  });

  useEffect(() => {
    if (sectionRef && aboutData?.data?.projects) {
      const {
        laravel,
        codeiginter,
        "core-php": corePhp,
        wordpress,
      } = aboutData.data.projects;

      // Reset counts when coming into view
      setCounts({
        laravel: 0,
        codeiginter: 0,
        "core-php": 0,
        wordpress: 0,
      });

      // Animate counts from 0 to target
      const interval = setInterval(() => {
        setCounts((prev) => {
          const newCounts = { ...prev };
          let allComplete = true;

          if (newCounts.laravel < laravel.count) {
            newCounts.laravel += 1;
            allComplete = false;
          }
          if (newCounts.codeiginter < codeiginter.count) {
            newCounts.codeiginter += 1;
            allComplete = false;
          }
          if (newCounts["core-php"] < corePhp.count) {
            newCounts["core-php"] += 1;
            allComplete = false;
          }
          if (newCounts.wordpress < wordpress.count) {
            newCounts.wordpress += 1;
            allComplete = false;
          }

          if (allComplete) {
            clearInterval(interval);
          }

          return newCounts;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [sectionRef, aboutData]);

  const primaryColor = configData?.data?.colors?.primary || "#7E5FEC";
  const t = translations?.about || {};

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2
          ref={sectionRef}
          className={`section-title fade-up ${sectionInView ? "visible" : ""}`}
        >
          {t.title || "About"}
        </h2>

        <div className="flex flex-col md:flex-row gap-10 mt-12">
          {/* Profile Image */}
          <div className="md:w-1/3 flex justify-center">
            {aboutStatus === "loading" ? (
              <Skeleton className="rounded-full w-64 h-64" />
            ) : (
              <div
                className="rounded-full overflow-hidden border-4 border-portfolio-purple/20 w-64 h-64"
                style={{ backgroundColor: primaryColor }}
              >
                <img
                  src={
                    aboutData?.data?.image ||
                    "/lovable-uploads/4247e634-839f-43bf-bb4f-ccd4688dd08b.png"
                  }
                  alt={aboutData?.data?.name || "Profile image"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* About Information */}
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold mb-4 text-portfolio-primary">
              Who am I?
            </h3>
            {aboutStatus === "loading" ? (
              <>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />
              </>
            ) : (
              <p className="text-gray-700 mb-6">
                {aboutData?.data?.description}
              </p>
            )}

            {/* Project Count Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {aboutStatus === "loading"
                ? Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-24 rounded-lg" />
                    ))
                : aboutData?.data?.projects
                ? Object.entries(aboutData.data.projects).map(
                    ([key, value]) => (
                      <Card
                        key={key}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-4 text-center">
                          <img
                            src={value.icon}
                            alt={key}
                            className="w-10 h-10 mx-auto mb-2"
                          />
                          <p className="text-2xl font-bold text-portfolio-primary">
                            {sectionRef
                              ? counts[key as keyof typeof counts]
                              : 0}
                          </p>
                          <p className="text-sm text-gray-500">
                            {key.charAt(0).toUpperCase() +
                              key.slice(1).replace("-", " ") +
                              " "}
                            projects
                          </p>
                        </CardContent>
                      </Card>
                    )
                  )
                : null}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Clock className="text-portfolio-purple" />
                <div>
                  <h4 className="font-semibold">Experience</h4>
                  <p className="text-gray-600">
                    {aboutData?.data?.experience || "5+ Years"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="text-portfolio-purple" />
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-600">
                    {aboutData?.data?.adress || "Kerala, India"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="text-portfolio-purple" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">
                    {aboutData?.data?.email || "sabeer@example.com"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="text-portfolio-purple" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-600">
                    {aboutData?.data?.phone || "+91 963 374 3391"}
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

export default AboutSection;
