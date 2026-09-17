import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import { MyContext } from "../App";
import PageTitle from "../Components/PageTitle";
const API_URL = import.meta.env.VITE_API_URL
const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: "Our Location",
    lines: ["Dubai, United Arab Emirates"],
  },
  {
    icon: FaPhoneAlt,
    title: "Call Us",
    lines: ["+971 4 325 6782"],
    href: "tel:+97143256782",
  },
  {
    icon: FaEnvelope,
    title: "Email Us",
    lines: ["orders@te.com"],
    href: "mailto:orders@te.com",
  },
  {
    icon: FaClock,
    title: "Working Hours",
    lines: ["Mon - Sun: 9:00 AM - 11:00 PM"],
  },
];

const Contact = () => {
  const context = useContext(MyContext);

  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formFields.name.trim()) {
      context.openAlertBox("error", "Please enter your name.");
      return;
    }
    if (!formFields.email.trim()) {
      context.openAlertBox("error", "Please enter your email.");
      return;
    }
    if (!formFields.message.trim()) {
      context.openAlertBox("error", "Please enter your message.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${API_URL}/api/contact/send`,
        formFields
      );

      if (res?.data?.error === true) {
        context.openAlertBox(
          "error",
          res?.data?.message || "Unable to send message."
        );
        return;
      }

      context.openAlertBox(
        "success",
        res?.data?.message || "Your message has been sent successfully!"
      );

      setFormFields({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      context.openAlertBox(
        "error",
        error?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageTitle
        title="Contact Us"
        description="Get in touch with Teyyar Cake. Reach out for orders, custom cakes, or any queries — we're here to help across Dubai, UAE."
      />

      <main className="w-full bg-[#fffafa]">

        {/* =====================================================
            HERO
        ===================================================== */}
        <section className="relative bg-[#2B1B14] overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#D9A441]/10" />
          <div className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-[#D9A441]/10" />

          <div className="container relative z-10 py-14 sm:py-16 lg:py-20 text-center">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#D9A441]/30 bg-[#D9A441]/10 text-[#D9A441] text-xs font-medium uppercase tracking-wider">
              Get In Touch
            </span>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              Contact <span className="text-[#D9A441]">Us</span>
            </h1>

            <p className="mt-4 max-w-xl mx-auto text-[#F7F0E7]/65 text-sm sm:text-base leading-7">
              Have a question or a custom cake request? We'd love to hear
              from you.
            </p>
          </div>
        </section>

        {/* =====================================================
            CONTACT INFO CARDS
        ===================================================== */}
        <section className="bg-white border-b border-[#f3e5e7]">
          <div className="container py-10 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {contactInfo.map(({ icon: Icon, title, lines, href }) => {
                const CardInner = (
                  <div className="h-full rounded-2xl border border-[#f2dfe2] bg-[#fff7f8] p-5 sm:p-6 text-center hover:bg-[#2B1B14] transition-all duration-300 group">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#D9A441]/10 border border-[#D9A441]/20 flex items-center justify-center mb-3 group-hover:bg-[#D9A441] transition-all">
                      <Icon className="text-lg text-[#D9A441] group-hover:text-[#2B1B14] transition-colors" />
                    </div>
                    <h3 className="text-sm font-bold text-[#242124] group-hover:text-white transition-colors">
                      {title}
                    </h3>
                    {lines.map((line) => (
                      <p
                        key={line}
                        className="text-sm text-gray-500 group-hover:text-[#F7F0E7]/70 mt-1 transition-colors"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                );

                return href ? (
                  <a key={title} href={href}>
                    {CardInner}
                  </a>
                ) : (
                  <div key={title}>{CardInner}</div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            FORM + MAP
        ===================================================== */}
        <section className="bg-[#fff5f6] py-14 sm:py-16 lg:py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

              {/* ============ FORM ============ */}
              <div className="rounded-2xl bg-white border border-[#f2dfe2] p-6 sm:p-8 lg:p-10 shadow-sm">

                <p className="text-[#d94667] uppercase tracking-[2px] text-xs font-semibold mb-2">
                  Send a Message
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#242124]">
                  We'd Love to Hear From You
                </h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#242124] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formFields.name}
                        onChange={onChangeInput}
                        disabled={isLoading}
                        placeholder="John Doe"
                        className="w-full h-12 rounded-xl border border-[#e6d7da] bg-[#fffafa] px-4 text-sm outline-none focus:border-[#d94667] focus:ring-2 focus:ring-[#d94667]/10 transition-all disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#242124] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formFields.phone}
                        onChange={onChangeInput}
                        disabled={isLoading}
                        placeholder="+971 5X XXX XXXX"
                        className="w-full h-12 rounded-xl border border-[#e6d7da] bg-[#fffafa] px-4 text-sm outline-none focus:border-[#d94667] focus:ring-2 focus:ring-[#d94667]/10 transition-all disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#242124] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formFields.email}
                      onChange={onChangeInput}
                      disabled={isLoading}
                      placeholder="you@example.com"
                      className="w-full h-12 rounded-xl border border-[#e6d7da] bg-[#fffafa] px-4 text-sm outline-none focus:border-[#d94667] focus:ring-2 focus:ring-[#d94667]/10 transition-all disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#242124] mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formFields.subject}
                      onChange={onChangeInput}
                      disabled={isLoading}
                      placeholder="Custom cake order, delivery query, etc."
                      className="w-full h-12 rounded-xl border border-[#e6d7da] bg-[#fffafa] px-4 text-sm outline-none focus:border-[#d94667] focus:ring-2 focus:ring-[#d94667]/10 transition-all disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#242124] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formFields.message}
                      onChange={onChangeInput}
                      disabled={isLoading}
                      rows={5}
                      placeholder="Write your message here..."
                      className="w-full rounded-xl border border-[#e6d7da] bg-[#fffafa] px-4 py-3 text-sm outline-none focus:border-[#d94667] focus:ring-2 focus:ring-[#d94667]/10 transition-all resize-none disabled:opacity-60"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-13 py-3.5 rounded-xl bg-[#2B1B14] text-white text-sm font-bold hover:bg-[#3A241B] active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <CircularProgress size={20} sx={{ color: "#D9A441" }} />
                    ) : (
                      <>
                        <FaPaperPlane className="text-sm" />
                        Send Message
                      </>
                    )}
                  </button>

                </form>
              </div>

              {/* ============ MAP ============ */}
              <div className="rounded-2xl overflow-hidden border border-[#f2dfe2] shadow-sm min-h-[400px] lg:min-h-full">
                <iframe
                  title="Teyyar Cake Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.9!2d55.1562!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d1a1a1a1a1a%3A0x1a1a1a1a1a1a1a1a!2sDubai%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ===================================================== */}
        <section className="bg-[#2B1B14] py-12 sm:py-14">
          <div className="container text-center">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Prefer to Order Directly?
            </h2>
            <p className="text-[#F7F0E7]/60 mt-2 text-sm">
              Browse our full collection of cakes and flowers.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-lg bg-[#D9A441] text-[#2B1B14] text-sm font-bold hover:bg-[#E8B957] transition-all"
            >
              Shop Now
            </Link>
          </div>
        </section>

      </main>
    </>
  );
};

export default Contact;