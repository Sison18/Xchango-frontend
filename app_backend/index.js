const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const products = [
  {
    id: "p1",
    title: "iPhone 13",
    description:
      "Looking to trade my iPhone 13 (128GB, Midnight Black) for another smartphone, gadget, or item of similar value. I’m open to reasonable offers, preferably higher-end Android phones, tablets, or gaming consoles—but feel free to message your trade!",
    image: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=765&auto=format",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=765&auto=format",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=765&auto=format",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    tradeOption: [
      "Meet-up",
      "Shipping Available",
      "Meet-up/Shipping Available",
    ],
    category: "electronics",
    condition: "Used",
    location: "Quezon City",
    estimatedPrice: "₱10,000",
    userId: "u01",
    userName: "Christian mark Sison",
    profile:
      "https://scontent.fmnl17-4.fna.fbcdn.net/v/t39.30808-6/510731823_1912849806132300_8659332937727609290_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFUfUf3PEN-3fDU3LPIPfSxjeL_6ilqnvCN4v_qKWqe8GnW2KEENNR7byaZjjl3tx0n-YJMhrRPvR4bwNgL-lDY&_nc_ohc=R1MzNaBSO9gQ7kNvwHkzLu0&_nc_oc=AdmJz6JXla2-8VAfNAPUrz9Q_I8DrMJ-vbpOjJjBMT7yuJdqgTbBiH8C6ixcjbx_veg&_nc_zt=23&_nc_ht=scontent.fmnl17-4.fna&_nc_gid=SVxPH5QY-hhuIsXgMKn8lg&oh=00_AfTiIoDunNDDa08vqwCyaOuStNrCNxqhSst7B2pUFp7-dw&oe=68758955",
    firstname: "Christian mark",
    lastname: "Sison",
    phoneNumber: "09948721614",
    birthday: "2003-09-18",
    address: [
      {
        street: "15 Saint Mark Street",
        barangay: "Central Signal Village",
        city: "Taguig City",
        regionProvince: "Metro Manila",
        postalCode: 1637,
      },
    ],
    rating: 4.9,
    status: "Available",
    wishlist: [
      "gaming console",
      "high-end Android",
      "tablet",
      "smartwatch",
      "Bluetooth headphones",
      "gaming keyboard",
      "mechanical mouse",
      "LED monitor",
      "VR headset",
      "external hard drive",
    ],
    latitude: 14.6514,
    longitude: 121.0492,
    verification: false,
    message: "Hey! I’m interested how much can you offer for the item? 😄",
    time: "16 min",
  },
  {
    id: "p2",
    title: "Mountain Bike 27-speed",
    description: "Trail-ready MTB, aluminum frame with disc brakes.",
    image: [
      "https://images.unsplash.com/photo-1706090609578-0ea26cfeea5e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    tradeOption: [
      "Meet-up",
      "Shipping Available",
      "Meet-up/Shipping Available",
    ],
    category: "sports_outdoors",
    condition: "Like New",
    location: "Taguig",
    estimatedPrice: "₱6,000",
    userId: "u02",
    profile:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userName: "Christian mark Sison",
    rating: 4,
    status: "Available",
    wishlist: ["gaming console", "high-end Android", "tablet"],
    latitude: 14.5547,
    longitude: 121.0244,
    verification: false,
    message: "G na ba?",
    time: "16 min",
  },
  {
    id: "p3",
    title: "Harry Potter Book Set",
    description: "Complete 7-book set in great condition, original cover.",
    image: [
      "https://plus.unsplash.com/premium_photo-1682125776589-e899882259c3?q=80&w=742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    tradeOption: [
      "Meet-up",
      "Shipping Available",
      "Meet-up/Shipping Available",
    ],
    category: "books_art",
    condition: "Used",
    location: "Pasig",
    estimatedPrice: "₱1,200",
    userId: "u03",
    profile:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userName: "Christian Sison",
    rating: 4,
    status: "Available",
    wishlist: ["gaming console", "high-end Android", "tablet"],
    latitude: 14.5243,
    longitude: 121.0794,
    verification: false,
    message: "Sa BGC nalang tayo meet up",
    time: "16 min",
  },
  {
    id: "p4",
    title: "PlayStation 4 Slim (500GB)",
    description: "Comes with 2 controllers and 3 games.",
    image: [
      "https://images.unsplash.com/photo-1731834452303-d1e397e4eb80?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    tradeOption: [
      "Meet-up",
      "Shipping Available",
      "Meet-up/Shipping Available",
    ],
    category: "electronics",
    condition: "Good",
    location: "Makati",
    estimatedPrice: "₱8,500",
    userId: "u04",
    profile:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userName: "Christian mark Sison",
    rating: 4,
    status: "Available",
    wishlist: ["gaming console", "high-end Android", "tablet"],
    latitude: 14.5764,
    longitude: 121.0851,
    verification: false,
    message: "Hey! I’m interested how much can you offer for the item? 😄",
    time: "16 min",
  },
  {
    id: "p5",
    title: "Guitar Yamaha F310",
    description: "Perfect for beginners. Great sound, minor scratches.",
    image: [
      "https://images.unsplash.com/photo-1681573236774-09d52987b885?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    tradeOption: [
      "Meet-up",
      "Shipping Available",
      "Meet-up/Shipping Available",
    ],
    category: "toys_hobbies",
    condition: "Good",
    location: "Marikina",
    estimatedPrice: "₱3,000",
    userId: "u05",
    profile:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userName: "Christian mark Sison",
    rating: 4,
    status: "Available",
    wishlist: ["gaming console", "high-end Android", "tablet"],
    latitude: 14.6042,
    longitude: 121.0301,
    verification: false,
    message: "Good na good pa condition neto",
    time: "16 min",
  },
  {
    id: "p6",
    title: "Kitchen Blender",
    description: "Powerful 6-speed blender. Barely used.",
    image: [
      "https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?q=80&w=955&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    tradeOption: [
      "Meet-up",
      "Shipping Available",
      "Meet-up/Shipping Available",
    ],
    category: "home_living",
    condition: "Like New",
    location: "San Juan",
    estimatedPrice: "₱900",
    userId: "u06",
    profile:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userName: "Christian mark Sison",
    rating: 4,
    status: "Available",
    wishlist: ["gaming console", "high-end Android", "tablet"],
    latitude: 14.6507,
    longitude: 121.1029,
    verification: true,
    message: "Ano bro?",
    time: "16 min",
  },
  {
    id: "p7",
    title: "Men's Leather Shoes",
    description: "Size 9. Office leather shoes, worn once.",
    image: [
      "https://images.unsplash.com/photo-1595388710140-e7b90300ec73?q=80&w=766&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    tradeOption: [
      "Meet-up",
      "Shipping Available",
      "Meet-up/Shipping Available",
    ],
    category: "fashion",
    condition: "Like New",
    location: "Manila",
    estimatedPrice: "₱1,500",
    userId: "u07",
    profile:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userName: "Christian mark Sison",
    rating: 4,
    status: "Available",
    wishlist: ["gaming console", "high-end Android", "tablet"],
    latitude: 14.5995,
    longitude: 120.9842,
    verification: true,
    message: "Meet up nalang tayo",
    time: "16 min",
  },
  {
    id: "p8",
    title: "Smartwatch Fitbit Inspire 2",
    description: "Tracks steps, heart rate, and sleep.",
    image: [
      "https://images.unsplash.com/photo-1541195942158-ccbd892c4673?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    tradeOption: [
      "Meet-up",
      "Shipping Available",
      "Meet-up/Shipping Available",
    ],
    category: "electronics",
    condition: "Used",
    location: "Mandaluyong",
    estimatedPrice: "₱2,800",
    userId: "u08",
    profile:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userName: "Christian mark Sison",
    rating: 4,
    status: "Available",
    wishlist: ["gaming console", "high-end Android", "tablet"],
    latitude: 14.5794,
    longitude: 121.0359,
    verification: true,
    message: "Hey! I’m interested how much can you offer for the item? 😄",
    time: "16 min",
  },
  {
    id: "p9",
    title: "Mini Cactus Collection (5 pcs)",
    description: "Low-maintenance plants in pots. Great for desk decor.",
    image: [
      "https://images.unsplash.com/photo-1711893748861-9a3e11dbe500?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    tradeOption: [
      "Meet-up",
      "Shipping Available",
      "Meet-up/Shipping Available",
    ],
    category: "plants_gardening",
    condition: "New",
    location: "Caloocan",
    estimatedPrice: "₱500",
    userId: "u09",
    profile:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userName: "andrei custudio",
    rating: 4,
    status: "Pending Trade",
    wishlist: ["helmet", "bike light", "GoPro"],
    latitude: 14.6595,
    longitude: 120.9842,
    verification: true,
    message: "Di ko alam doon eh hahaha",
    time: "16 min",
  },
  {
    id: "p10",
    title: "Pet Cage (Medium)",
    description: "Used once for transporting a cat. Foldable.",
    image: [
      "https://images.unsplash.com/photo-1626246703612-53b076a26edc?q=80&w=755&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    tradeOption: [
      "Meet-up",
      "Shipping Available",
      "Meet-up/Shipping Available",
    ],
    category: "pets_animals",
    condition: "Good",
    location: "Las Piñas",
    estimatedPrice: "₱850",
    userId: "u010",
    profile:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userName: "Bianca Sofia",
    rating: 4,
    status: "Pending Trade",
    wishlist: ["helmet", "bike light", "GoPro"],
    latitude: 14.45,
    longitude: 120.9833,
    verification: true,
    message: "Ano gusto mo?",
    time: "16 min",
  },
  {
    id: "p11",
    title: "Power Drill with Bits",
    description: "Heavy-duty drill for home repairs. Still works great.",
    image: [
      "https://images.unsplash.com/photo-1540104539488-92a51bbc0410?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    tradeOption: [
      "Meet-up",
      "Shipping Available",
      "Meet-up/Shipping Available",
    ],
    category: "tools_diy",
    condition: "Used",
    location: "Valenzuela",
    estimatedPrice: "₱1,700",
    userId: "u011",
    profile:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    userName: "shane agor",
    rating: 4,
    status: "Pending Trade",
    wishlist: ["helmet", "bike light", "GoPro"],
    latitude: 14.7,
    longitude: 120.95,
    verification: true,
    message: "Hey! I’m interested how much can you offer for the item? 😄",
    time: "16 min",
  },
];

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the XChango API!");
});

// GET all products or filtered by query (category, location, status)
app.get("/products", (req, res) => {
  const { category, location, status } = req.query;
  let filtered = products;

  if (category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (location) {
    filtered = filtered.filter(
      (p) => p.location.toLowerCase() === location.toLowerCase()
    );
  }

  if (status) {
    filtered = filtered.filter(
      (p) => p.status.toLowerCase() === status.toLowerCase()
    );
  }

  res.json(filtered);
});

// GET single product by ID
app.get("/products/:id", (req, res) => {
  const product = products.find((item) => item.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Search products by keyword in title
app.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Missing search query" });
  }

  const result = products.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase())
  );

  res.json(result);
});

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
