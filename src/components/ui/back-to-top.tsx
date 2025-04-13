import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Back to top"
          role="button"
        >
          <ArrowUp size={24} />
        </div>
      )}
    </>
  );
};

export default BackToTop;
