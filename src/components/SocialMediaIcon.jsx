import {
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaPinterest,
  FaGithub,
  FaMediumM,
  FaStackOverflow,
  FaStackExchange,
  FaTwitter,
} from "react-icons/fa";

const iconMap = {
  "fa-linkedin": FaLinkedin,
  "fa-whatsapp": FaWhatsapp,
  "fa-instagram": FaInstagram,
  "fa-facebook": FaFacebook,
  "fa-x": FaTwitter,
  "fa-pinterest": FaPinterest,
  "fa-github": FaGithub,
  "fa-medium": FaMediumM,
  "fa-stack-overflow": FaStackOverflow,
  "fa-stack-exchange": FaStackExchange,
};

const SocialMediaIcon = ({ url, icon }) => {
  const IconComponent = iconMap[icon];
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white"
    >
      {IconComponent && <IconComponent size={24} />}
    </a>
  );
};

export default SocialMediaIcon;
