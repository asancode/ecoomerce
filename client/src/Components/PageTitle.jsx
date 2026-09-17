import React from "react";
import { Helmet } from "react-helmet-async";

const PageTitle = ({  title,
  description,
  keywords,
  image,
  canonical, }) => {
  const siteName = "Teyyar Cake & Flowers";
  const finalTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} | Online Shopping`;
  return (
   <Helmet>
      {/* Browser Title */}
      <title>{finalTitle}</title>

      {/* Meta Description */}
      {description && (
        <meta
          name="description"
          content={description}
        />
      )}

      {/* Keywords */}
      {keywords && (
        <meta
          name="keywords"
          content={keywords}
        />
      )}

      {/* Canonical */}
      {canonical && (
        <link
          rel="canonical"
          href={canonical}
        />
      )}

      {/* Open Graph */}
      <meta
        property="og:title"
        content={finalTitle}
      />

      {description && (
        <meta
          property="og:description"
          content={description}
        />
      )}

      {image && (
        <meta
          property="og:image"
          content={image}
        />
      )}

      <meta
        property="og:type"
        content="website"
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={finalTitle}
      />

      {description && (
        <meta
          name="twitter:description"
          content={description}
        />
      )}

      {image && (
        <meta
          name="twitter:image"
          content={image}
        />
      )}
    </Helmet>
  );
};

export default PageTitle;