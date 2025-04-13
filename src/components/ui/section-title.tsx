
import React from "react";
import { useInView } from "react-intersection-observer";

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <h2
      ref={ref}
      className={`section-title fade-up ${inView ? "visible" : ""}`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
