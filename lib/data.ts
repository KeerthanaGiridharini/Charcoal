export interface MenuItem {
  id: string;
  name: string;
  japaneseName: string;
  category: "starters" | "signatures" | "seafood" | "desserts" | "cocktails" | "wine";
  description: string;
  price: string;
  tags: string[];
  image: string;
  calories?: string;
  chefNote?: string;
  pairing?: string;
  isPopular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "culinary" | "atmosphere" | "cocktails" | "kitchen";
  image: string;
  caption: string;
  aspect: "tall" | "wide" | "square";
}

export interface DiningSpace {
  id: string;
  name: string;
  tagline: string;
  capacity: string;
  description: string;
  image: string;
}

export const RESTAURANT_INFO = {
  name: "CHARCOAL",
  tagline: "ARTISANAL BINCHOTAN & OMAKASE",
  subtitle: "Three Michelin Stars • Kyoto & Tokyo Heritage",
  chef: "Executive Chef Kenzo Takahashi",
  michelinStars: 3,
  yearsExcellence: 14,
  phone: "+1 (555) 892-4272",
  email: "reservations@charcoal-dining.com",
  address: "50th Floor, 24 Staple St,\nColombo 00200,\nSri Lanka",
  hours: [
    { day: "Monday – Thursday", dinner: "5:30 PM – 10:30 PM", lunch: "Closed" },
    { day: "Friday – Saturday", dinner: "5:00 PM – 11:30 PM", lunch: "12:00 PM – 2:30 PM" },
    { day: "Sunday", dinner: "5:00 PM – 10:00 PM", lunch: "12:00 PM – 3:00 PM" },
  ],
  awards: [
    { year: "2025", title: "Three Michelin Stars", org: "Michelin Guide Global" },
    { year: "2024", title: "World's 50 Best Restaurants #4", org: "S.Pellegrino" },
    { year: "2024", title: "Best Interior Architectural Design", org: "Awwwards Hospitality" },
    { year: "2023", title: "Grand Sommelier Excellence", org: "Wine Spectator" }
  ]
};

export const MENU_CATEGORIES = [
  { id: "signatures", label: "Chef's Signatures" },
  { id: "starters", label: "Artisanal Starters" },
  { id: "seafood", label: "Land & Ocean" },
  { id: "desserts", label: "Pastry & Confections" },
  { id: "cocktails", label: "Smoked Mixology" },
  { id: "wine", label: "Reserve Sommelier" },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "wagyu-binchotan",
    name: "A5 Miyazaki Wagyu Strip",
    japaneseName: "宮崎牛備長炭焼き",
    category: "signatures",
    description: "Charcoal-grilled over Kishu Binchotan, black truffle reduction, smoked sea salt, and micro shiso.",
    price: "$165",
    tags: ["Signature", "Gluten-Free", "Chef's Choice"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    chefNote: "Grilled at 1,000°C on authentic Kishu oak charcoal for an irreplaceable caramelized crust.",
    pairing: "2018 Domaine Marquis d'Angerville Volnay 1er Cru"
  },
  {
    id: "omakase-nigiri",
    name: "Grand Omakase Nigiri Flight",
    japaneseName: "極上握り五種",
    category: "signatures",
    description: "Otoro with Ossetra caviar, Hokkaido Uni, Seared Kinmedai, Botan Ebi, and Smoked Eel.",
    price: "$195",
    tags: ["Raw", "Chef's Choice", "Daily Import"],
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85",
    chefNote: "Fish flown in daily from Tokyo's Toyosu Market, paired with aged Red Vinegar Akashari rice.",
    pairing: "Dassai 23 Junmai Daiginjo Sake"
  },
  {
    id: "ise-lobster",
    name: "Smoked Ise Lobster & Yuzu Emulsion",
    japaneseName: "伊勢海老の煙薫",
    category: "seafood",
    description: "Butter-poached Japanese spiny lobster, smoked yuzu beurre blanc, sea asparagus, and coral crisp.",
    price: "$140",
    tags: ["Seafood", "Signature"],
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=85",
    chefNote: "Infused with cherry blossom wood smoke in a crystal cloche at your table.",
    pairing: "2020 Meursault Clos des Perrières"
  },
  {
    id: "charcoal-tartare",
    name: "Smoked Toro Tartare & Rice Crisp",
    japaneseName: "トロタルタル備長炭香",
    category: "starters",
    description: "Fatty tuna tartare, smoked dashi jelly, pickled Wasabi root, served on handcrafted nori tempura.",
    price: "$58",
    tags: ["Raw", "Gluten-Free Option"],
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85",
    chefNote: "Pair with an ice-cold draft sake or dry sparkling wine."
  },
  {
    id: "miso-black-cod",
    name: "Saikyo Miso Black Cod",
    japaneseName: "銀鱈西京焼き",
    category: "seafood",
    description: "Aged 72 hours in Kyoto Saikyo miso, charred bamboo shoot, ginger flower, and hajikami.",
    price: "$82",
    tags: ["Seafood", "Gluten-Free"],
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=85",
    chefNote: "Flaky caramelization with rich umami depth."
  },
  {
    id: "truffle-chawanmushi",
    name: "Winter Black Truffle Chawanmushi",
    japaneseName: "黒トリュフ茶碗蒸し",
    category: "starters",
    description: "Silken savory egg custard, wild matsutake mushrooms, king crab leg, and shaved Périgord truffle.",
    price: "$48",
    tags: ["Gluten-Free"],
    image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=1200&q=85",
    chefNote: "Poured warm tableside."
  },
  {
    id: "matcha-gold-ganache",
    name: "Kyoto Uji Matcha & Gold Sphere",
    japaneseName: "宇治抹茶と24K金箔スフィア",
    category: "desserts",
    description: "Dark Valrhona 70% chocolate dome, molten Uji matcha ganache, roasted sesame gelato, and 24K gold leaf.",
    price: "$34",
    tags: ["Vegetarian", "Signature Dessert"],
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85",
    chefNote: "Cracked open with hot smoked white chocolate drizzle."
  },
  {
    id: "yuzu-souffle",
    name: "Charcoal Yuzu & Shiso Soufflé",
    japaneseName: "柚子紫蘇スフレ",
    category: "desserts",
    description: "Warm puffed soufflé infused with candied Yuzu citrus, shiso flower cream, and black sesame dust.",
    price: "$30",
    tags: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "smoked-old-fashioned",
    name: "Binchotan Smoked Old Fashioned",
    japaneseName: "備長炭スモーク・オールドファッション",
    category: "cocktails",
    description: "Yamazaki 12yr Single Malt, Kuromitsu black sugar syrup, Okinawa bitters, smoked under oak coals.",
    price: "$38",
    tags: ["Signature Cocktail", "Smoked"],
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "kyoto-mist-cocktail",
    name: "Kyoto Mist Highball",
    japaneseName: "京都ミスト・ハイボール",
    category: "cocktails",
    description: "Roku Gin, clarified white peach nectar, sparkling green tea tonic, hand-carved crystal ice sphere.",
    price: "$32",
    tags: ["Refreshing"],
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "dassai-23",
    name: "Dassai 23 Junmai Daiginjo",
    japaneseName: "獺祭 磨き二割三分",
    category: "wine",
    description: "Milled down to 23% of the rice grain. Notes of delicate white peach, melon, and velvet purity.",
    price: "$280 / Bottle",
    tags: ["Ultra Premium Sake"],
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "dom-perignon",
    name: "Dom Pérignon Vintage 2013",
    japaneseName: "ドン・ペリニヨン 2013",
    category: "wine",
    description: "Elegantly creamy champagne with citrus zest, toasted brioche, and smoky minerality.",
    price: "$450 / Bottle",
    tags: ["Champagne"],
    image: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=1200&q=85"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Master Chef Plating A5 Wagyu",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85",
    caption: "Chef Kenzo Takahashi applying final shiso micro-leaves under spotlight.",
    aspect: "tall"
  },
  {
    id: "gal-2",
    title: "Omakase Counter Dining Room",
    category: "atmosphere",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85",
    caption: "Handcrafted 24-seat Hinoki wood counter with ambient glass illumination.",
    aspect: "wide"
  },
  {
    id: "gal-3",
    title: "Smoked Old Fashioned Presentation",
    category: "cocktails",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85",
    caption: "Crystal glass decanted tableside with aromatic Kishu oak charcoal mist.",
    aspect: "square"
  },
  {
    id: "gal-4",
    title: "Grand Toro Caviar Nigiri Flight",
    category: "culinary",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85",
    caption: "Daily imported Bluefin tuna with Ossetra Caviar and gold dust.",
    aspect: "tall"
  },
  {
    id: "gal-5",
    title: "The Binchotan Hearth Flame",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85",
    caption: "1,000°C Kishu Binchotan oak coals radiating clean, flame-free heat.",
    aspect: "wide"
  },
  {
    id: "gal-6",
    title: "Private Garden Pavilion",
    category: "atmosphere",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    caption: "Exclusive private glass pavilion overlooking serene Kyoto stone gardens.",
    aspect: "square"
  }
];

export const DINING_SPACES: DiningSpace[] = [
  {
    id: "omakase",
    name: "The Hinoki Omakase Counter",
    tagline: "Front Row to Culinary Mastery",
    capacity: "Up to 12 Guests • 2 Daily Seatings",
    description: "An intimate 200-year-old Hinoki wood counter where Chef Kenzo serves an exclusive 18-course tasting menu directly to guests.",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "main-dining",
    name: "Main Dining Room",
    tagline: "Cinematic Atmosphere & Ambient Lighting",
    capacity: "Up to 45 Guests",
    description: "Floating acoustic glass panels, soft ambient bronze light, and private leather booths designed for unhurried conversations.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "garden-pavilion",
    name: "Kyoto Zen Garden Pavilion",
    tagline: "Private Sanctuary & Water Features",
    capacity: "Private Parties up to 16 Guests",
    description: "Enclosed glass sanctuary suspended over trickling waterfall pools, featuring dedicated sommelier and private chef service.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85"
  }
];
