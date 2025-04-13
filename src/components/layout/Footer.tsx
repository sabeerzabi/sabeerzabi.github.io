import { useFetchData } from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SocialMedia {
  name: string;
  url: string;
  icon_class: string;
}

interface SocialMediaResponse {
  success: boolean;
  data: SocialMedia[];
}

interface AboutResponse {
  success: boolean;
  data: {
    roles: string[];
  };
}

interface ConfigResponse {
  success: boolean;
  data: {
    paths: {
      logo: string;
    };
  };
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data: socialMediasData, status: socialStatus } =
    useFetchData<SocialMediaResponse>("/data/en/social-medias.json");
  const { data: aboutData } = useFetchData<AboutResponse>(
    "/data/en/about.json"
  );
  const { data: configData } =
    useFetchData<ConfigResponse>("/data/config.json");

  const getIconClass = (iconClass: string) => {
    return iconClass.replace("fa-", "");
  };

  return (
    <footer className="bg-portfolio-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img
              src={configData?.data?.paths?.logo || "/icons/logo.svg"}
              alt="Sabeer"
              className="h-10 mb-2"
            />
            {aboutData?.data?.roles && aboutData.data.roles.length > 0 ? (
              <p className="text-white/70 mt-1">{aboutData.data.roles[0]}</p>
            ) : (
              <p className="text-white/70 mt-1">Web Developer & UI Designer</p>
            )}
          </div>

          <div className="flex space-x-3 rtl:space-x-reverse">
            {socialStatus === "loading" ? (
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className="w-10 h-10 rounded-full" />
                ))
            ) : socialMediasData?.data ? (
              socialMediasData.data.slice(0, 5).map((socialMedia, index) => (
                <a
                  key={index}
                  href={socialMedia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  title={socialMedia.name}
                >
                  <FontAwesomeIcon
                    icon={["fab", getIconClass(socialMedia.icon_class) as any]}
                  />
                </a>
              ))
            ) : (
              <div className="text-white/80">
                Social media links unavailable
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 text-center text-white/70">
          <p>© {currentYear} Sabeer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
