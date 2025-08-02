import { groq } from "next-sanity";

export const ctaQuery = groq`
  *[_type == "nav"][0] {
    ctaButton,
    ctaLink,
  }
`;

export const navQuery = groq`
  *[_type == "nav"][0] {
    "logo": logo.asset->url,
    "logoMobile": logoMobile.asset->url,
    connexionLink,
    ctaButton,
    ctaLink,
  }
`;

export const homeQuery = groq`*[_type == "home"][0] {
  subtitle,
  subtitleMobile,
  title,
  titleMobile,
  title2,
  description,
  buttonDemo,
  blocks[] {
    tooltip,
    "image": image.asset->url,
    text,
    link
  }
}`;

export const featuresQuery = groq`*[_type == "features"][0] {
  title,
  description,
  featuresList[] {
    title,
    description,
    "icon": icon.asset->url,
    "imageMobile": imageMobile.asset->url,
    "imageDesktop": imageDesktop.asset->url
  }
}`;

export const organizationQuery = groq`*[_type == "organization"][0] {
  title,
  description,
  featuresList[] {
    title,
    description,
    "icon": icon.asset->url,
    "image": image.asset->url
  },
  "clientImage": clientImage.asset->url,
  clientText
}`;

export const iaQuery = groq`*[_type == "ia"][0] {
  title,
  placeholder,
  "image": image.asset->url
}`;

export const tripsQuery = groq`*[_type == "trips"][0] {
  title,
  tripsList[] {
    firstName,
    "profileImage": profileImage.asset->url,
    "tripImage": tripImage.asset->url,
    description
  }
}`;

export const logicielQuery = groq`*[_type == "logiciel"][0] {
  title,
  "image": image.asset->url
}`;

export const avisQuery = groq`*[_type == "avis"][0] {
  title,
  testimonials[] {
    description,
    name,
    "profileImage": profileImage.asset->url
  }
}`;

export const faqQuery = groq`*[_type == "faq"][0] {
  title,
  questions[] {
    question,
    answer
  }
}`;

export const footerQuery = groq`*[_type == "footer"][0] {
  title,
  subtitle
}`;
