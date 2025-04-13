
import { useState, useEffect } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/context/LanguageContext";
import FadeInSection from "@/components/ui/fade-in-section";

interface Certificate {
  name: string;
  image: string;
  source: string;
  url: string;
}

interface CertificatesResponse {
  success: boolean;
  data: Certificate[];
}

const CertificatesSection = () => {
  const { data: certificatesData, status } = useFetchData<CertificatesResponse>("/data/certificates.json");
  const { translations } = useLanguage();
  const [selectedSource, setSelectedSource] = useState<string>("All");
  const [sources, setSources] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showViewAll, setShowViewAll] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Extract unique sources from certificates
  useEffect(() => {
    if (certificatesData?.data) {
      const uniqueSources = ["All", ...new Set(certificatesData.data.map(cert => cert.source))];
      setSources(uniqueSources);
      
      // Set initial state for view more/less buttons
      setShowViewAll(certificatesData.data.length > 6);
    }
  }, [certificatesData]);

  // Filter certificates by selected source
  const filteredCertificates = certificatesData?.data
    ? selectedSource === "All"
      ? certificatesData.data
      : certificatesData.data.filter(cert => cert.source === selectedSource)
    : [];

  // Handle view all click
  const handleViewAllClick = () => {
    setVisibleCount(filteredCertificates.length);
    setShowViewAll(false);
    setShowLess(true);
  };

  // Handle show less click
  const handleShowLessClick = () => {
    setVisibleCount(6);
    setShowViewAll(true);
    setShowLess(false);
  };

  // Get translated content
  const t = translations?.certificates || {
    title: "Certificates",
    view_all: "View All",
    show_less: "Show Less",
    filter_by: "Filter by source"
  };

  return (
    <section id="certificates" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 
          ref={ref} 
          className={`section-title fade-up font-rubik font-bold ${inView ? "visible" : ""}`}
        >
          {t.title || "Certificates"}
        </h2>

        {/* Source Filter */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 mb-10">
          {sources.map((source, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedSource(source);
                setVisibleCount(6);
                setShowViewAll(true);
                setShowLess(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSource === source
                  ? "bg-portfolio-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {source}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {status === "loading" ? (
            Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))
          ) : status === "error" ? (
            <div className="col-span-full text-center text-red-500">
              Failed to load certificates. Please try again later.
            </div>
          ) : filteredCertificates.length > 0 ? (
            filteredCertificates.slice(0, visibleCount).map((certificate, index) => (
              <FadeInSection key={index}>
                <a
                  href={certificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={certificate.image}
                      alt={certificate.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1">{certificate.name}</h3>
                    <p className="text-sm text-gray-600">
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {certificate.source}
                      </span>
                    </p>
                  </div>
                </a>
              </FadeInSection>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No certificates found for the selected filter.
            </div>
          )}
        </div>

        {/* View All / Show Less Button */}
        <div className="text-center mt-10">
          {showViewAll && filteredCertificates.length > visibleCount && (
            <button 
              onClick={handleViewAllClick} 
              className="bg-portfolio-primary hover:bg-portfolio-primary/90 text-white px-6 py-2 rounded-md transition-colors"
            >
              {t.view_all || "View All"}
            </button>
          )}

          {showLess && (
            <button 
              onClick={handleShowLessClick} 
              className="bg-portfolio-primary hover:bg-portfolio-primary/90 text-white px-6 py-2 rounded-md transition-colors"
            >
              {t.show_less || "Show Less"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
