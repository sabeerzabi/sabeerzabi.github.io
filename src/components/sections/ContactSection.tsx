
import { MapPin, Mail, Phone } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { useFetchData } from '@/hooks/useFetchData';
import { Skeleton } from '@/components/ui/skeleton';

interface AboutData {
  adress: string;
  email: string;
  phone: string;
}

interface AboutResponse {
  success: boolean;
  data: AboutData;
}

const ContactSection = () => {
  const { data: aboutData, status } = useFetchData<AboutResponse>('/data/about.json');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData);
    
    // Show success message
    toast.success("Message sent successfully!");
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-portfolio-purple relative flex items-center">
          <span className="relative w-8 h-8 mr-3">
            <img src="/icons/dots-bg.svg" alt="dots" className="absolute -left-1 -top-1 w-full h-full" />
          </span>
          Get In Touch
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-portfolio-purple">Let's talk about your project</h3>
            <p className="text-gray-700 mb-8">
              Feel free to reach out if you want to collaborate with me, or simply have a chat.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 flex items-center justify-center bg-portfolio-purple/10 rounded-full text-portfolio-purple">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Address</h4>
                  {status === 'loading' ? (
                    <Skeleton className="h-4 w-full" />
                  ) : (
                    <p className="text-gray-600">{aboutData?.data?.adress || "123 Web Dev Street, New York, NY 10001"}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 flex items-center justify-center bg-portfolio-purple/10 rounded-full text-portfolio-purple">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  {status === 'loading' ? (
                    <Skeleton className="h-4 w-full" />
                  ) : (
                    <p className="text-gray-600">{aboutData?.data?.email || "sabeer@example.com"}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 flex items-center justify-center bg-portfolio-purple/10 rounded-full text-portfolio-purple">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  {status === 'loading' ? (
                    <Skeleton className="h-4 w-full" />
                  ) : (
                    <p className="text-gray-600">{aboutData?.data?.phone || "+1 234 567 890"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  className="contact-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  className="contact-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="Subject" 
                  className="contact-input"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <textarea 
                  name="message" 
                  rows={5} 
                  placeholder="Your Message" 
                  className="contact-input resize-none"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div className="text-center md:text-left">
                <button type="submit" className="btn-primary">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
