import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import {
  Send,
  Mail,
  MapPin,
  MessageCircle,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";

interface ContactProps {
  mode: "creative" | "tech";
}

export function Contact({ mode }: ContactProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // --- SINGLE CORRECTED SUBMIT HANDLER ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const SERVICE_ID = "service_hlgamvi";
    const TEMPLATE_ID = "template_18vzjlp";
    const PUBLIC_KEY = "3a4rymRtPrnqlccmO";

    const templateParams = {
      name: formData.name,      // Matches {{name}} in your dashboard
      email: formData.email,    // Matches {{email}} in your dashboard
      message: formData.message, // Matches {{message}} in your dashboard
      title: "New Signal"      // Matches {{title}} in your subject line
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("EmailJS Error:", error);
        alert("Failed to send message. Please check the browser console for details.");
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const accentColor =
    mode === "creative" ? "hsl(340,100%,50%)" : "hsl(187,100%,50%)";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden bg-black text-white"
    >
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full blur-[220px] ${
            mode === "creative"
              ? "bg-[hsl(340,100%,50%)]/10"
              : "bg-[hsl(187,100%,50%)]/10"
          }`}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span
            className={`inline-block px-4 py-2 rounded-full text-xs font-medium uppercase mb-4 ${
              mode === "creative"
                ? "bg-[hsl(340,100%,50%)]/10 text-[hsl(340,100%,50%)]"
                : "bg-[hsl(187,100%,50%)]/10 text-[hsl(187,100%,50%)]"
            }`}
          >
            Get in Touch
          </span>

          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4`}>
            Send a Signal
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto">
            Have a project in mind? Let’s build something extraordinary
            together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* FORM */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none transition-all duration-300 placeholder:text-gray-500 text-white"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address"
                  className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none transition-all duration-300 placeholder:text-gray-500 text-white"
                />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl resize-none focus:outline-none transition-all duration-300 placeholder:text-gray-500 text-white"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-lg ${
                  mode === "creative"
                    ? "bg-[hsl(340,100%,50%)] text-white hover:shadow-[hsl(340,100%,50%)]/30"
                    : "bg-[hsl(187,100%,50%)] text-black hover:shadow-[hsl(187,100%,50%)]/30"
                } ${isSubmitting && "opacity-70"}`}
              >
                <span className="text-sm">
                  {isSubmitting
                    ? "Transmitting..."
                    : submitted
                      ? "Message Sent"
                      : "Send Message"}
                </span>
                {!submitted && <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>

          {/* INFO SECTION */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="bg-white/5 border border-white/10 p-6 space-y-5 rounded-3xl backdrop-blur-sm">
              {[
                { icon: Mail, label: "Email", value: "rushikeshmalganwork@gmail.com", link: "mailto:rushikeshmalganwork@gmail.com" },
                { icon: MessageCircle, label: "WhatsApp", value: "+91 9359859985", link: "https://wa.me/919359859985" },
                { icon: MapPin, label: "Location", value: "Pune", link: "#" },
              ].map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/5">
                    <item.icon className="w-5 h-5" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-medium group-hover:text-white transition">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                {[
                  { icon: Github, link: "https://github.com/rushikeshmalgan" },
                  { icon: Linkedin, link: "https://www.linkedin.com/in/rushikesh-malgan-010756319" },
                  { icon: Instagram, link: "https://www.instagram.com/rushikesh.malgan/" },
                ].map((social, i) => (
                  <a key={i} href={social.link} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}