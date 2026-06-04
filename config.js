/**
 * =====================================================
 *  LINDSEY'S DOGGY DAYCARE — SITE CONFIGURATION
 *  Edit this file to update anything on the website.
 *  No HTML/CSS knowledge needed!
 * =====================================================
 */

const SITE_CONFIG = {

  /* -------- BUSINESS DETAILS -------- */
  businessName:   "Lindsey's",
  businessSub:    "Doggy Daycare",
  tagline:        "A Home Away From Home For Your Dog",
  description:    "Safe, supervised and full of fun — daycare and overnight boarding in Blackpool with a personal, loving touch.",
  email:          "lindsey@lindseysdoggydaycare.co.uk",
  phone:          "+44 7908 294 566",
  phoneDisplay:   "07908 294 566",
  address:        "67 Bentinck Ave, Blackpool FY4 1SD",
  hours:          "Open 7 days a week",
  logoEmoji:      "🐾",

  /* -------- SOCIAL LINKS -------- */
  facebook:   "https://www.facebook.com/p/Lindseys-doggy-daycare-100088533541900/",
  whatsapp:   "https://wa.me/447908294566",
  instagram:  "",   // Add your Instagram URL here if you have one

  /* -------- GOOGLE REVIEWS -------- */
  googleRating:     "5.0",
  googleReviews:    "21",
  googleMapsLink:   "https://www.google.com/maps/place/67+Bentinck+Ave,+Blackpool+FY4+1SD",

  /* -------- HERO SECTION -------- */
  heroBadge:    "⭐ 5.0 Google Reviews · 👍 100% Facebook",
  heroStats: [
    { num: "5.0★", label: "Google Rating" },
    { num: "100%", label: "Facebook Rec." },
    { num: "£30",  label: "From per day"  },
  ],

  /* -------- ABOUT SECTION -------- */
  aboutTitle:   "Your Dog Is In Safe Hands",
  aboutText: [
    "Hi, I'm Lindsey! Based in Blackpool, I provide a warm, home-based environment where your dog is treated like one of the family. Every dog in my care receives individual attention, love, and the kind of care I'd want for my own pets.",
    "With a genuine passion for animals and a commitment to their wellbeing, I ensure every dog leaves happy, tired out from play, and ready to do it all again tomorrow.",
  ],
  aboutBadge:   "❤️ Passionate about dogs since day one",
  aboutFeatures: [
    { icon: "🏡", title: "Home Environment",  text: "A cosy, secure home setting — not a kennel" },
    { icon: "👀", title: "Fully Supervised",  text: "Your dog is never left unattended" },
    { icon: "🌿", title: "Garden Access",      text: "Secure outdoor space for play and exercise" },
    { icon: "📱", title: "Regular Updates",    text: "Photo and message updates throughout the day" },
  ],

  /* -------- SERVICES -------- */
  services: [
    {
      icon:     "☀️",
      name:     "Full Day Daycare",
      desc:     "Drop your dog off in the morning and collect them in the evening. A full day of play, walks, socialisation, and TLC in a home environment.",
      includes: [
        "Supervised play all day",
        "Garden play & beach walks",
        "Photo updates sent to you",
        "Socialisation with other dogs",
        "Cosy home environment",
      ],
      price:    "£30",
      priceNote: "per dog / day",
      featured: false,
    },
    {
      icon:     "🌙",
      name:     "Overnight Boarding",
      desc:     "Your dog stays overnight in a warm, loving home environment — perfect for when you're away. They'll sleep comfortably and wake up ready to play!",
      includes: [
        "Overnight stay in our home",
        "Evening & morning walks",
        "Garden play & beach walks",
        "Comfortable sleeping area",
        "Morning update & photos",
      ],
      price:    "£40",
      priceNote: "per dog / night",
      featured: true,
      badge:    "Most Popular",
    },
  ],

  /* -------- PRICING NOTE -------- */
  pricingNote: "💬 Have multiple dogs? Get in touch for a multi-dog discount. We're happy to accommodate families!",

  /* -------- GALLERY CAPTIONS -------- */
  galleryCaptions: [
    "Happy guests! 🐾",
    "Garden playtime 🌿",
    "Lots of love ❤️",
  ],

  /* -------- CONTACT FORM -------- */
  formSubjectPrefix: "Booking Enquiry",

  /* -------- FOOTER -------- */
  footerTagline:  "A safe, loving, home-based daycare and boarding service in Blackpool.",
  copyright:      "© 2026 Lindsey's Doggy Daycare. All rights reserved. | Blackpool, Lancashire",

};
