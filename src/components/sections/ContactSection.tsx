import { useInView } from "react-intersection-observer";
import { useFetchData } from "@/hooks/useFetchData";
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
      mapBg: string;
    };
  };
}

const ContactSection = () => {
  const { data: aboutData, status: aboutStatus } =
    useFetchData<AboutResponse>("/data/about.json");
  const { data: configData } =
    useFetchData<ConfigResponse>("/data/config.json");
  const { translations } = useLanguage();
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = translations?.contact || {};

  return (
    <section id="contact" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background map image */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-2/5 h-4/5 opacity-10"
        style={{
          backgroundImage: `url('${
            configData?.data?.paths?.mapBg || "/icons/map.svg"
          }')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2
          ref={sectionRef}
          className={`section-title fade-up ${sectionInView ? "visible" : ""}`}
        >
          {t.title || "Contact Me"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="md:col-span-2">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-gray-700 font-medium block mb-2"
                  >
                    {t.name || "Your Name"}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="contact-input"
                    placeholder={t.name || "Your Name"}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-gray-700 font-medium block mb-2"
                  >
                    {t.email || "Your Email"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="contact-input"
                    placeholder={t.email || "Your Email"}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="text-gray-700 font-medium block mb-2"
                >
                  {t.subject || "Subject"}
                </label>
                <input
                  type="text"
                  id="subject"
                  className="contact-input"
                  placeholder={t.subject || "Subject"}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-gray-700 font-medium block mb-2"
                >
                  {t.message || "Your Message"}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="contact-input resize-none"
                  placeholder={t.message || "Your Message"}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary">
                {t.send_message || "Send Message"}
              </button>
            </form>
          </div>

          <div>
            <div
              className="bg-gray-50 p-6 rounded-xl shadow-sm h-full"
              style={{
                backgroundImage: `url('${
                  configData?.data?.paths?.mapBg || "/icons/map.svg"
                }')`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h3 className="text-xl font-bold text-portfolio-primary mb-6">
                {t.contact || "Contact"}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-portfolio-primary/10 p-3 rounded-full text-portfolio-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {t.address || "Address"}
                    </h4>
                    <p className="text-gray-600">
                      {aboutData?.data?.adress || "Kerala, India"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-portfolio-primary/10 p-3 rounded-full text-portfolio-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {t.phone || "Phone"}
                    </h4>
                    <p className="text-gray-600">
                      {aboutData?.data?.phone || "+91000000000"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-portfolio-primary/10 p-3 rounded-full text-portfolio-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {t.email_label || "Email"}
                    </h4>
                    <p className="text-gray-600">
                      {aboutData?.data?.email || "sabeerca@example.com"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
