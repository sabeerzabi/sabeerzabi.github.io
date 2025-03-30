import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // Import FaArrowUp icon

export default function MoveToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        // Show button after scrolling down 100px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: adds smooth scrolling animation
    });
  };

  return (
    <>
      {isVisible && ( // Conditionally render the button
        <button // Changed from <a> to <button> and using onClick
          onClick={scrollToTop}
          id="return-to-top"
          className="fixed bottom-4 right-4 bg-violet-600 text-white rounded-full p-3 hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
        >
          <FaArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
