export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  category: 'hair' | 'beauty' | 'occasions' | 'family';
  categoryLabel: string;
  description: string;
  details: string;
  image?: string;
  highlights?: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  service?: string;
}

export const SALON_INFO = {
  name: "Infinity the unisex salon",
  brandName: "INFINITY",
  subtitle: "THE UNISEX SALON",
  category: "Unisex Salon / Hairdresser",
  phone: "+91 90338 10121",
  phoneRaw: "+919033810121",
  address: "1st Floor, BLOCK-A, Vrundavan Trade Center, Shop No. 106, Reliance Cross Rd, VTC, Kudasan, Gandhinagar, Gujarat 382421",
  addressShort: "Shop No. 106, Block-A, Vrundavan Trade Center, Kudasan, Gandhinagar",
  landmark: "Vrundavan Trade Center (VTC), Kudasan",
  plusCode: "5JJH+RG, Gandhinagar, Gujarat",
  hoursStatus: "Open · Closes 9 PM",
  hoursDetail: "Monday – Sunday: 10:00 AM – 9:00 PM",
  rating: 4.8,
  reviewCount: 1639,
  happyClients: "47,000+",
  servicesCount: "34+",
  googleMapsUrl: "https://maps.app.goo.gl/i9Y5J3sMF1pETqNx7",
  officialWebsite: "https://infinity-the-unisex.grexa.site/",
  coordinates: {
    lat: 23.1874,
    lng: 72.6288
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: "haircut",
    number: "01",
    name: "Haircut",
    category: "hair",
    categoryLabel: "Hair",
    description: "Fresh cuts designed around your unique style and facial structure.",
    details: "Precision unisex haircut tailored to your preferences, hair texture, and daily lifestyle. Includes consultation, gentle hair wash, precision scissor and razor styling, and a professional blowout finish.",
    highlights: ["Personal face-shape consultation", "Precision detailing", "Blowout styling included"]
  },
  {
    id: "hair-styling",
    number: "02",
    name: "Hair Styling",
    category: "hair",
    categoryLabel: "Hair",
    description: "Effortless everyday styles or glamorous looks for your special events.",
    details: "From tousled waves and sleek straight looks to modern textured volume. We use salon-grade heat protectants and high-performance styling formulas.",
    highlights: ["Heat damage protection", "Long-lasting hold", "Custom volume & texture"]
  },
  {
    id: "hair-coloring",
    number: "03",
    name: "Hair Coloring",
    category: "hair",
    categoryLabel: "Hair",
    description: "Vibrant global shades, seamless gray coverage, and rich tones.",
    details: "Expert color formulations using top-tier professional color bars like L'Oréal Professionnel. Designed to protect hair fiber while delivering luminous, enduring color reflection.",
    highlights: ["L'Oréal ColorBar formulation", "100% gray blending", "Deep shine finish"]
  },
  {
    id: "highlighting",
    number: "04",
    name: "Highlighting",
    category: "hair",
    categoryLabel: "Hair",
    description: "Multidimensional highlights that bring dimension, lift, and radiance.",
    details: "Fine babylights, face-framing ribbons, or classic foil highlights curated to illuminate your natural hair color with soft dimension.",
    highlights: ["Seamless blend", "Face-framing glow", "Toning treatment"]
  },
  {
    id: "ombre",
    number: "05",
    name: "Ombre & Balayage",
    category: "hair",
    categoryLabel: "Hair",
    description: "Hand-painted gradients transitioning naturally from roots to tips.",
    details: "Artisanal freehand placement that creates an effortless sun-kissed gradient. Grows out naturally with low maintenance.",
    highlights: ["Natural soft grow-out", "Gentle lightening", "Custom gloss glaze"]
  },
  {
    id: "blowouts",
    number: "06",
    name: "Blowouts",
    category: "hair",
    categoryLabel: "Hair",
    description: "Bouncy, silky volume that gives hair instant runway energy.",
    details: "Invigorating scalp wash paired with round-brush blow drying technique for maximum movement, mirror shine, and touchable softness.",
    highlights: ["Lightweight bounce", "Frizz resistance", "Lasts for days"]
  },
  {
    id: "perms",
    number: "07",
    name: "Perms & Texture",
    category: "hair",
    categoryLabel: "Hair",
    description: "Defined curls, modern beach waves, or soft body-building texture.",
    details: "Gentle contemporary wave systems that impart long-lasting movement without compromising hair integrity.",
    highlights: ["Modern loose waves", "Gentle chemical process", "Effortless morning routine"]
  },
  {
    id: "hair-treatments",
    number: "08",
    name: "Hair Treatments",
    category: "hair",
    categoryLabel: "Hair",
    description: "Deep restorative care for dry, stressed, or color-treated strands.",
    details: "Intensive nourishing masks, molecular repair, and scalp rejuvenation therapies to restore softness and elasticity from root to tip.",
    highlights: ["Moisture infusion", "Split-end strengthening", "Scalp detox"]
  },
  {
    id: "keratin-treatment",
    number: "09",
    name: "Keratin Treatment",
    category: "hair",
    categoryLabel: "Hair",
    description: "Smooth, manageable and beautifully finished hair that resists humidity.",
    details: "Infuses natural keratin deep into the cuticle to banish unruly frizz, seal split ends, and cut daily styling time in half.",
    highlights: ["Zero humidity frizz", "Glass-like reflection", "Silky soft texture"]
  },
  {
    id: "facials",
    number: "10",
    name: "Facials & Skin Rituals",
    category: "beauty",
    categoryLabel: "Beauty",
    description: "Revitalizing skin treatments for healthy clarity and radiant glow.",
    details: "Deep pore cleansing, gentle exfoliation, pressure-point facial massage, and customized hydrating masks designed for unisex skin needs.",
    highlights: ["Instant skin radiance", "Relaxing lymphatic massage", "Suitable for sensitive skin"]
  },
  {
    id: "threading",
    number: "11",
    name: "Eyebrow Threading & Shaping",
    category: "beauty",
    categoryLabel: "Beauty",
    description: "Clean, precise lines tailored to enhance your natural facial contours.",
    details: "Gentle, accurate hair removal practiced by experienced beauty artists for crisp, defined arch and symmetrical brow framing.",
    highlights: ["Ultra-sharp definition", "Minimal skin irritation", "Fast & clean"]
  },
  {
    id: "shaving",
    number: "12",
    name: "Beard Grooming & Shaving",
    category: "beauty",
    categoryLabel: "Beauty",
    description: "Classic straight-edge razor shaping, warm towels, and soothing balms.",
    details: "Traditional luxury grooming experience featuring hot towels, precision beard edge shaping, exfoliating lather, and cooling skin treatment.",
    highlights: ["Hot towel prep", "Sharp razor detailing", "Post-shave hydration"]
  },
  {
    id: "bridal-services",
    number: "13",
    name: "Bridal Hair & Services",
    category: "occasions",
    categoryLabel: "Occasions",
    description: "Elegant styling and curated beauty preparation for your special day.",
    details: "Comprehensive wedding hair and beauty styling for brides and groom parties. Focuses on photogenic longevity, veil setting, and bespoke elegance.",
    highlights: ["Long-lasting occasion hold", "Veil & ornament setting", "Pre-event consultation"]
  },
  {
    id: "kids-haircuts",
    number: "14",
    name: "Kids Haircuts",
    category: "family",
    categoryLabel: "Family",
    description: "Patient, gentle haircuts in a fun, friendly, stress-free setting.",
    details: "Our stylists make young guests feel comfortable and relaxed, turning haircut appointments into a quick and enjoyable experience.",
    highlights: ["Gentle approach", "Comfortable chairs", "Trendy & neat styles"]
  }
];

export const FEATURED_SERVICES = [
  {
    title: "HAIR COLOUR",
    tagline: "Refresh your look with a colour made for you.",
    description: "From warm balayage and sunlit blondes to rich chocolate brunettes and seamless gray blending.",
    image: "/src/assets/images/infinity_hair_color_1790420058500.jpg",
    number: "01"
  },
  {
    title: "KERATIN",
    tagline: "Smooth, manageable and beautifully finished hair.",
    description: "Eliminate stubborn frizz and lock in mirror-like shine for weeks of effortless styling.",
    image: "/src/assets/images/infinity_salon_interior_1790420024360.jpg",
    number: "02"
  },
  {
    title: "BRIDAL",
    tagline: "Elegant styling for your special moments.",
    description: "Timeless hair designs, radiant bridal grooming, and complete occasion elegance tailored for you.",
    image: "/src/assets/images/infinity_bridal_look_1790420075472.jpg",
    number: "03"
  }
];

export const WHY_INFINITY = [
  {
    number: "01",
    title: "Skilled Styling",
    description: "Professional attention to your look and preferences. Our stylists stay ahead of modern trends and techniques."
  },
  {
    number: "02",
    title: "Friendly Experience",
    description: "A comfortable, welcoming salon atmosphere where you can genuinely unwind and enjoy your session."
  },
  {
    number: "03",
    title: "Modern Services",
    description: "From everyday haircuts and beard grooming to advanced hair treatments, coloring, and occasion styling."
  },
  {
    number: "04",
    title: "Personal Attention",
    description: "Your style comes first. We listen to what you want and offer practical advice tailored to your hair type."
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Infinity Salon Floor",
    category: "Interior",
    tag: "interior",
    image: "/src/assets/images/infinity_salon_interior_1790420024360.jpg",
    aspect: "tall"
  },
  {
    id: "g2",
    title: "Modern Haircut & Styling",
    category: "Hair Styles",
    tag: "hairstyles",
    image: "/src/assets/images/infinity_hero_styling_1790420043245.jpg",
    aspect: "wide"
  },
  {
    id: "g3",
    title: "Dimensional Hair Colour",
    category: "Hair Colour",
    tag: "haircolour",
    image: "/src/assets/images/infinity_hair_color_1790420058500.jpg",
    aspect: "square"
  },
  {
    id: "g4",
    title: "Bridal Elegance",
    category: "Bridal",
    tag: "bridal",
    image: "/src/assets/images/infinity_bridal_look_1790420075472.jpg",
    aspect: "tall"
  },
  {
    id: "g5",
    title: "L'Oréal Professional Bar",
    category: "Interior",
    tag: "interior",
    image: "/src/assets/images/infinity_salon_interior_1790420024360.jpg",
    aspect: "square"
  },
  {
    id: "g6",
    title: "Precision Cut & Finish",
    category: "Hair Styles",
    tag: "hairstyles",
    image: "/src/assets/images/infinity_hero_styling_1790420043245.jpg",
    aspect: "wide"
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    author: "Pratik Patel",
    rating: 5,
    date: "Google Review",
    text: "Great work, good environment, polite staff, reasonable rates and discounts! Truly satisfied with the haircut and styling.",
    service: "Haircut & Styling"
  },
  {
    id: "r2",
    author: "Bhavin Shah",
    rating: 5,
    date: "Google Review",
    text: "Great experience... Got my hair cut, colour and beard set. Super service! Very professional team in Kudasan.",
    service: "Haircut, Colour & Beard"
  },
  {
    id: "r3",
    author: "Nisha Sharma",
    rating: 5,
    date: "Google Review",
    text: "We had such a beautiful experience at the salon! The stylists are attentive, courteous and understand exactly what you need.",
    service: "Hair Treatment & Styling"
  },
  {
    id: "r4",
    author: "Aakash Mehta",
    rating: 5,
    date: "Google Review",
    text: "Clean, hygienic and stylish salon. The chairs are super comfortable and the team takes great care with every detail.",
    service: "Grooming & Haircut"
  },
  {
    id: "r5",
    author: "Ritu Desai",
    rating: 5,
    date: "Google Review",
    text: "Loved my keratin treatment here! Hair feels silky smooth, frizz-free and so manageable. Highly recommend Infinity to everyone in Gandhinagar.",
    service: "Keratin Treatment"
  }
];
