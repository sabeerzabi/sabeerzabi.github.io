
import { useInView } from "react-intersection-observer";
import { useFetchData } from "@/hooks/useFetchData";
import { useLanguage } from "@/context/LanguageContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = () => {
  const { data: aboutData } = useFetchData<AboutResponse>(
    "/data/en/about.json"
  );
  const { data: configData } =
    useFetchData<ConfigResponse>("/data/config.json");
  const { translations, currentLanguage } = useLanguage();
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const t = translations?.contact || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "68c91983-f329-46e5-99a1-f2918e4b2508",
          subject: data.subject,
          email: aboutData?.data?.email || "sabeerzabi@gmail.com",
          replyto: data.email,
          message: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\nMessage: ${data.message}`,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: t.message_sent || "Message Sent!",
          description: t.thank_you || "Thank you for your message. I'll get back to you soon!",
        });
        reset();
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast({
        title: t.error || "Error",
        description: t.sending_failed || "Failed to send message. Please try again later.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-gray-700 font-medium block mb-2"
                  >
                    {t.name || "Your Name"}
                  </label>
                  <Input
                    id="name"
                    placeholder={t.name || "Your Name"}
                    {...register("name", { required: true })}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-1">
                      {t.name_required || "Name is required"}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-gray-700 font-medium block mb-2"
                  >
                    {t.email || "Your Email"}
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder={t.email || "Your Email"}
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {t.valid_email || "Valid email is required"}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="text-gray-700 font-medium block mb-2"
                >
                  {t.subject || "Subject"}
                </label>
                <Input
                  id="subject"
                  placeholder={t.subject || "Subject"}
                  {...register("subject", { required: true })}
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && (
                  <span className="text-red-500 text-sm mt-1">
                    {t.subject_required || "Subject is required"}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-gray-700 font-medium block mb-2"
                >
                  {t.message || "Your Message"}
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder={t.message || "Your Message"}
                  {...register("message", { required: true })}
                  className={`resize-none ${errors.message ? "border-red-500" : ""}`}
                />
                {errors.message && (
                  <span className="text-red-500 text-sm mt-1">
                    {t.message_required || "Message is required"}
                  </span>
                )}
              </div>

              <button 
                type="submit" 
                className="btn-primary flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.sending || "Sending..."}
                  </>
                ) : (
                  t.send_message || "Send Message"
                )}
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
