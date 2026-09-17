import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShippingFast, FaAward, FaUsers } from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import PageTitle from "../Components/PageTitle";

const stats = [
  { icon: GiCakeSlice, value: "10,000+", label: "Cakes Delivered" },
  { icon: FaUsers, value: "8,000+", label: "Happy Customers" },
  { icon: FaAward, value: "5+", label: "Years of Experience" },
  { icon: FaShippingFast, value: "50+", label: "Areas Covered" },
];

const values = [
  {
    icon: FaHeart,
    title: "Made With Love",
    desc: "Every cake is handcrafted with fresh ingredients and genuine care, made specially for your moment.",
  },
  {
    icon: FaShippingFast,
    title: "Fast & Reliable Delivery",
    desc: "We ensure your order reaches you fresh and on time, anywhere across Dubai and the UAE.",
  },
  {
    icon: FaAward,
    title: "Premium Quality",
    desc: "We use only the finest ingredients to create cakes that taste as good as they look.",
  },
  {
    icon: BiSupport,
    title: "24/7 Customer Support",
    desc: "Our team is always here to help you choose the perfect cake for every occasion.",
  },
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageTitle
        title="About Us"
        description="Learn more about Teyyar Cake — Dubai's trusted florist and cake delivery service, crafting sweet moments since day one."
      />

      <main className="w-full bg-[#fffafa]">

        {/* =====================================================
            HERO SECTION
        ===================================================== */}
        <section className="relative bg-[#2B1B14] overflow-hidden">

          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#D9A441]/10" />
          <div className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-[#D9A441]/10" />

          <div className="container relative z-10 py-16 sm:py-20 lg:py-24 text-center">

            <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#D9A441]/30 bg-[#D9A441]/10 text-[#D9A441] text-xs font-medium uppercase tracking-wider">
              About Teyyar Cake
            </span>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              Crafting Sweet Moments
              <br />
              <span className="text-[#D9A441]">Since Day One</span>
            </h1>

            <p className="mt-5 max-w-2xl mx-auto text-[#F7F0E7]/65 text-sm sm:text-base leading-7">
              We are Dubai's trusted florist and cake delivery service, dedicated
              to making your celebrations unforgettable with handcrafted cakes
              and fresh flowers delivered right to your door.
            </p>
          </div>
        </section>

        {/* =====================================================
            STATS
        ===================================================== */}
        <section className="bg-white border-b border-[#f3e5e7]">
          <div className="container py-10 sm:py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#D9A441]/10 border border-[#D9A441]/20 flex items-center justify-center mb-3">
                    <Icon className="text-2xl text-[#D9A441]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#2B1B14]">
                    {value}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            OUR STORY
        ===================================================== */}
        <section className="bg-[#fff5f6] py-14 sm:py-16 lg:py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#f2dfe2] h-[320px] sm:h-[400px] bg-[#2B1B14] flex items-center justify-center">
                <GiCakeSlice className="text-[120px] text-[#D9A441]/30" />
              </div>

              <div>
                <p className="text-[#d94667] uppercase tracking-[2px] text-xs font-semibold mb-2">
                  Our Story
                </p>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#242124] leading-tight">
                  A Passion for Baking,
                  <br />
                  Built Into a Promise
                </h2>

                <p className="text-gray-500 text-sm sm:text-base leading-7 mt-5">
                  Teyyar Cake started with one simple idea — every celebration
                  deserves a cake made with genuine care. What began as a small
                  passion for baking has grown into Dubai's go-to destination
                  for premium cakes, flowers and gifts.
                </p>

                <p className="text-gray-500 text-sm sm:text-base leading-7 mt-4">
                  Today, our team of expert bakers and florists work every day
                  to create beautiful, delicious moments for birthdays,
                  anniversaries, weddings, and every special occasion in
                  between — delivered fresh, right on time, across Dubai and
                  the UAE.
                </p>

                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-[#2B1B14] text-white text-sm font-semibold hover:bg-[#3A241B] transition-all"
                >
                  Explore Our Products
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            OUR VALUES
        ===================================================== */}
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="container">

            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <p className="text-[#d94667] uppercase tracking-[2px] text-xs font-semibold mb-2">
                Why Choose Us
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#242124]">
                What Makes Us Different
              </h2>
              <div className="w-12 h-[3px] bg-[#d94667] rounded-full mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-[#f2dfe2] bg-[#fff7f8] p-6 text-center hover:bg-[#2B1B14] transition-all duration-300"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#D9A441]/10 border border-[#D9A441]/20 flex items-center justify-center mb-4 group-hover:bg-[#D9A441] transition-all duration-300">
                    <Icon className="text-2xl text-[#D9A441] group-hover:text-[#2B1B14] transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-[#242124] group-hover:text-white transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-[#F7F0E7]/70 mt-2 leading-6 transition-colors">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ===================================================== */}
        <section className="bg-[#2B1B14] py-14 sm:py-16">
          <div className="container text-center">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Ready to Order Something Sweet?
            </h2>
            <p className="text-[#F7F0E7]/60 mt-3 max-w-xl mx-auto text-sm sm:text-base">
              Browse our collection of handcrafted cakes and fresh flowers,
              made just for you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-7">
              <Link
                to="/products"
                className="px-7 py-3 rounded-lg bg-[#D9A441] text-[#2B1B14] text-sm font-bold hover:bg-[#E8B957] transition-all"
              >
                Shop Now
              </Link>
              <Link
                to="/contact"
                className="px-7 py-3 rounded-lg border border-white/20 text-white text-sm font-semibold hover:bg-white/5 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default About;