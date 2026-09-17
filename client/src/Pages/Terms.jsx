import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFileContract, FaShieldAlt, FaTruck, FaUndo, FaLock, FaGavel } from "react-icons/fa";
import PageTitle from "../Components/PageTitle";

const sections = [
  {
    icon: FaFileContract,
    title: "1. Introduction",
    content: `Welcome to Teyyar Cake. These Terms & Conditions govern your use of our
    website and the purchase of products through our platform. By accessing our
    website or placing an order, you agree to be bound by these terms in full.
    If you disagree with any part of these terms, please do not use our website.`,
  },
  {
    icon: FaFileContract,
    title: "2. Orders & Payment",
    content: `All orders placed through our website are subject to acceptance and
    availability. Prices for products are subject to change without notice.
    Payment must be made in full at the time of ordering through our secure
    payment gateway. We accept major credit/debit cards and other payment
    methods as displayed at checkout.`,
  },
  {
    icon: FaTruck,
    title: "3. Delivery Policy",
    content: `We aim to deliver all orders within the estimated timeframe shown at
    checkout. Delivery times may vary due to weather, traffic, or unforeseen
    circumstances beyond our control. It is the customer's responsibility to
    provide accurate delivery details. Teyyar Cake is not liable for delays
    caused by incorrect address information.`,
  },
  {
    icon: FaUndo,
    title: "4. Cancellations & Returns",
    content: `Due to the perishable nature of our products, cancellations are only
    accepted if requested at least 24 hours before the scheduled delivery time.
    As cakes and flowers are custom-made, we do not accept returns once an
    order has been prepared or dispatched, unless the product arrives damaged
    or does not match the order.`,
  },
  {
    icon: FaShieldAlt,
    title: "5. Product Quality & Images",
    content: `We take great care to ensure our products match the images displayed
    on our website. However, slight variations in cake design, flower
    arrangement, size, or color may occur due to the handcrafted nature of
    our products and ingredient availability.`,
  },
  {
    icon: FaLock,
    title: "6. Privacy & Data Protection",
    content: `We respect your privacy and are committed to protecting your personal
    data. Any information you provide to us — including your name, email,
    address, and payment details — is used solely for processing your orders
    and improving our services. We do not sell or share your data with third
    parties for marketing purposes without your consent.`,
  },
  {
    icon: FaGavel,
    title: "7. Limitation of Liability",
    content: `Teyyar Cake shall not be held liable for any indirect, incidental, or
    consequential damages arising from the use of our website or products.
    Our maximum liability for any claim related to an order shall not exceed
    the total amount paid for that order.`,
  },
  {
    icon: FaFileContract,
    title: "8. Changes to These Terms",
    content: `We reserve the right to update or modify these Terms & Conditions at
    any time without prior notice. Changes will be effective immediately upon
    posting to our website. Continued use of our website after changes are
    posted constitutes your acceptance of the revised terms.`,
  },
];

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageTitle
        title="Terms & Conditions"
        description="Read the Terms & Conditions for using Teyyar Cake's website and ordering our cake and flower delivery services in Dubai, UAE."
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
              Legal
            </span>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              Terms & <span className="text-[#D9A441]">Conditions</span>
            </h1>

            <p className="mt-4 max-w-xl mx-auto text-[#F7F0E7]/65 text-sm sm:text-base leading-7">
              Please read these terms carefully before using our website or
              placing an order.
            </p>

            <p className="mt-3 text-[#F7F0E7]/40 text-xs">
              Last updated: {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </section>

        {/* =====================================================
            CONTENT
        ===================================================== */}
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">

              <div className="space-y-8 sm:space-y-10">
                {sections.map(({ icon: Icon, title, content }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-[#f2dfe2] bg-[#fff7f8] p-6 sm:p-8"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/20 flex items-center justify-center">
                        <Icon className="text-lg text-[#D9A441]" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-[#242124]">
                        {title}
                      </h2>
                    </div>

                    <p className="text-sm sm:text-[15px] text-gray-500 leading-7 whitespace-pre-line">
                      {content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Contact note */}
              <div className="mt-10 rounded-2xl bg-[#2B1B14] p-6 sm:p-8 text-center">
                <h3 className="text-white text-lg sm:text-xl font-serif font-bold">
                  Have Questions?
                </h3>
                <p className="text-[#F7F0E7]/60 text-sm mt-2 max-w-md mx-auto">
                  If you have any questions about these Terms & Conditions,
                  feel free to reach out to our support team.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-lg bg-[#D9A441] text-[#2B1B14] text-sm font-bold hover:bg-[#E8B957] transition-all"
                >
                  Contact Us
                </Link>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default Terms;