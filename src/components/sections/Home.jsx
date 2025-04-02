import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import SocialMediaIcon from "../SocialMediaIcon";
import { useProfile } from "../../contexts/Profile";

function SocialLinks() {
  const { socialMedias } = useProfile(); // State to store social media data

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {socialMedias.map((social, index) => (
        <span className="p-1" key={index}>
          <SocialMediaIcon icon={social.icon_class} url={social.url} />
        </span>
      ))}
    </div>
  );
}

function TextTransition({ roleIndex, roles }) {
  return (
    <span className={`inline-block ${styles.animateFadeInBounce}`}>
      {roles[roleIndex]}
    </span>
  );
}

function HireMeButton() {
  return (
    <a href="#contact" className={styles.hireMeButton}>
      Hire Me
    </a>
  );
}

function Roles({ roles }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [roles]);

  return (
    <span className="text-rotating">
      I'm a <TextTransition roleIndex={index} roles={roles} />
    </span>
  );
}

function Intro() {
  const { about } = useProfile();
  const name = about.name;
  const roles = about.roles;
  return (
    <div className={styles.intro}>
      <h1>{name}</h1>
      <Roles roles={roles} />
      <SocialLinks />
      <HireMeButton />
    </div>
  );
}

function ScrollDownButton() {
  return (
    <div className={styles.scrollDownButton}>
      <a href="#about" className={styles.mouseWrapper}>
        <span className="text-white">Scroll Down</span>
        <span className={styles.mouse}>
          <span className={styles.wheel}></span>
        </span>
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <section id="home" className={`${styles.home} items-center flex`}>
      <div className="container mb-15">
        <Intro />
        <ScrollDownButton />
      </div>
    </section>
  );
}
