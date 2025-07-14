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
    profile:
      "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/510731823_1912849806132300_8659332937727609290_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFUfUf3PEN-3fDU3LPIPfSxjeL_6ilqnvCN4v_qKWqe8GnW2KEENNR7byaZjjl3tx0n-YJMhrRPvR4bwNgL-lDY&_nc_ohc=u8g51LbHYE4Q7kNvwENrB-F&_nc_oc=AdmlA7ruuH7Nln6LVTTgiaZw578mB4dbWJBSGgLv64LnpXamY_lFZ4-UxPVoIu5gDVw&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=5_sqGkjHKAVB7MmKEUhBCA&oh=00_AfPKX9rHZMYCIxOBGmGugPIwWD2TsWE9HsgCH4fAfC77YA&oe=686B3595",
    userName: "Christian mark Sison",
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
      "https://scontent.fmnl30-1.fna.fbcdn.net/v/t39.30808-6/387796844_122139023186012095_6216133341806444080_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG90CvzJgnJqUxz48bRe7AF7hELd5sTE3HuEQt3mxMTcT1OEyOEvZ-EFAWZ1aAT1IpEQu1yRk7LE8yvXAFzKSmg&_nc_ohc=uLdLrCJkwE8Q7kNvwHBDYcc&_nc_oc=Adl52A9JRQnrWCLVvdXTz-6P860AR_v89kDAyAyMSwqmOgHzyUpV7L82nYynq4Rxg5w&_nc_zt=23&_nc_ht=scontent.fmnl30-1.fna&_nc_gid=wAoxO4G390GloOGj8o-PyA&oh=00_AfPAvel2WwXc9crQvVMNjNL9W-bc4disgY0ZfhIyGor8oQ&oe=686B1E3E",
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
      "https://scontent.fmnl30-3.fna.fbcdn.net/v/t39.30808-6/487372510_1403565374415126_7762573952745755776_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFmxaxTg4J0Rf2D7r2K_6GbbjqwNQuKeuRuOrA1C4p65BdDvEmVZvWQskcs_Z8SImOfYwOLj-pDmvhkxvxPht8A&_nc_ohc=2zAx8cf7yXgQ7kNvwHM-PsX&_nc_oc=AdmXDFPR0L-uDjGEQU4-uULTtXFWZghTZmlotR_qOeoBMzA6hGh2d4isNgLScRgzVKo&_nc_zt=23&_nc_ht=scontent.fmnl30-3.fna&_nc_gid=ymHhQcfsC0qAw0KD-aR23Q&oh=00_AfNQstfcAaHT9Q0Ecm_FdRpUkInBvv6q_-NowVlwMwm7SA&oe=686B4A4C",
    userName: "Christian mark Sison",
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
      "https://scontent.fmnl30-1.fna.fbcdn.net/v/t39.30808-1/512306417_122213633786093695_3939180514747435032_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGFgZ0ioIKDCOq9Vxfog88Wzl3Hy8FF3GjOXcfLwUXcaFPwOlwbDj-JwEDsIw8T4LmIudqjUFsdnnewz6jzM8Oi&_nc_ohc=bnZ1btrgOSsQ7kNvwE1a9EQ&_nc_oc=Adl69xGchTwR_UMQ1ghw3yvPaufqeYAkB28xQ31G1toOEC7_zXMRs-_gsD2xPbU9HC8&_nc_zt=24&_nc_ht=scontent.fmnl30-1.fna&_nc_gid=P4GZevKbXLzNI3MHwbO9PA&oh=00_AfPbQvuKFg5UL8ZR7GA7EKDeGiS_9781J2uneQKWsIiOYg&oe=686B1BB1",
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
      "https://scontent.fmnl30-1.fna.fbcdn.net/v/t39.30808-6/509100986_1907888919961722_6956547700439134285_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGMBAP_TpkfrNXy6YSUbDVznqdqjlD5cHeep2qOUPlwdxB1CP9ANyiDUMj64J24nnWj7Rjj5jpgDfWEdezhzmBL&_nc_ohc=RtfeWdnAAogQ7kNvwFwWuMn&_nc_oc=AdlbnCJJf1gvPDva0Dm6lxUIU9Ys2h-oymK20LraWb1Nj-GbIG-OLMKf_1chm6aMDJc&_nc_zt=23&_nc_ht=scontent.fmnl30-1.fna&_nc_gid=vlFELQ1E5As2fBVX4s4v8A&oh=00_AfOafl4OMRfjH9-V1P6kZhuaQ-FzqkAQNN2LnwNUTdZugg&oe=686B28B1",
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
      "https://scontent.fmnl30-3.fna.fbcdn.net/v/t39.30808-6/485307527_1837155717035043_6417412198269944528_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGMA0rqKI4o_4Y6NEp_om2IOBd9ft2Czp44F31-3YLOnlbYWTOn4a_gRiLsy6k0qrM8XxeM6AxO88jkqVrnYShO&_nc_ohc=4xNw8UW0h-oQ7kNvwFzmFo4&_nc_oc=AdnSRuc4U42NFVvGHoGpdPGktlmfN_0s5ZqQwn1DvTqQeH9cCpS7P2JsqPsZlH2aG0g&_nc_zt=23&_nc_ht=scontent.fmnl30-3.fna&_nc_gid=qXc0G4_8h0oLFAY8emSIOw&oh=00_AfOwlTQyUq3T3GSKM657CHPL-uC_7cS8pSN8mP91_5baxA&oe=686B41F7",
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
      "https://scontent.fmnl30-3.fna.fbcdn.net/v/t39.30808-6/488586502_1849676482449633_5763359186367880904_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEtDNtHYl_EJzd9O-YLQHgz1WugjJhH39DVa6CMmEff0M9PBPLdaqeKfodobSf8K44TjBVBTyjI0gUVk4l8Wdib&_nc_ohc=hf29R3pgXHYQ7kNvwHA4KFE&_nc_oc=AdlygW-vG_ydcRGRfBYh-4zxz-dLrZENjXVhko4kre6VV5ucRKvLU6BqdNgUoSjL5rw&_nc_zt=23&_nc_ht=scontent.fmnl30-3.fna&_nc_gid=vKapHVLFm6pxg4oJl9scqg&oh=00_AfNKsjWUSGNTHm7BvT11x-a_cAKRs2LubgBtaYIFYgTxKQ&oe=686B42C8",
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
      "https://scontent.fmnl30-1.fna.fbcdn.net/v/t39.30808-6/486690197_1840080276742587_5857774859639688958_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeH7dy7AZ-Rw7Txf4UO6mJcgmV-bWEPCTlCZX5tYQ8JOUKdr-xM9oyggQKpyHOgfn98ezfObxTsjEkr6Ins4Hous&_nc_ohc=2ZuZ0dPj3_sQ7kNvwEPM1WM&_nc_oc=Adnm5PRusVbcikQ9iHxQcEmXq5IsOk5cNaVjXnch-kCLsz7beF5OnfRnGVZ4Gx_sSFo&_nc_zt=23&_nc_ht=scontent.fmnl30-1.fna&_nc_gid=HgbEPPYaBG_7n7l3CKNn1A&oh=00_AfNKxD2q_gLxWRWEjidNjWIIbvApwZJpno_Toq0CR0GiKw&oe=686B3B3F",
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
      "https://scontent.fmnl30-3.fna.fbcdn.net/v/t39.30808-6/486508949_1840077230076225_7917634137963896236_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeG24ZzY-L1jgLu99oWPDLz4bP5NNGnpveBs_k00aem94JiikTf4i__XJx12wAEzQyuUeK2ime-PH7Ru7lxz_kjk&_nc_ohc=GIfoJdxQcXwQ7kNvwFNOmd9&_nc_oc=AdlgfAQ5ykO3oNo6-3mL0gySAYckPpvBfjJ5VwciAFqqIf9lautuLaiCUApUD23rbMc&_nc_zt=23&_nc_ht=scontent.fmnl30-3.fna&_nc_gid=sputhhUkzV_aDqHexJY9IA&oh=00_AfNjcWam_CnqJwaqrVGwOTvxHfWr-alwWQJQBI0yQZvwyw&oe=686B4D10",
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
      "https://scontent.fmnl30-3.fna.fbcdn.net/v/t39.30808-6/482323004_1839714866779128_6856086361730451175_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEQf5J5I5LT-mknJRbxfSWOPe1zDErBCEg97XMMSsEISJ873L8sVz6ZWCUb-evgcf3PxynYiQh4DDQlxl2-qGmR&_nc_ohc=SHftSIp9k-QQ7kNvwH94EUn&_nc_oc=Adm9MVMGAFKH8tRwWxMPmaQTgnFQWrurC_-uvcSwGj_TWtENvjDbsBWX2LCOt8zIwbY&_nc_zt=23&_nc_ht=scontent.fmnl30-3.fna&_nc_gid=2kR-lgKkQ5vUirGVZ8V1Tw&oh=00_AfP5a1LAPaCJwWoYg6nzJZRTaIrwt8R-tkxtI7l09vuEEA&oe=686B4A31",
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
      "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/486093074_1839688940115054_1051802868195127562_n.jpg?stp=dst-jpg_tt6&cstp=mx960x966&ctp=s960x966&_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGo4I9iPjZ65qXjMF0tKpxENhCo1hYTTFs2EKjWFhNMW2M9uLW0y1JcXWcirECt7e3T6V6aXZpmnxL0Eqe9lM8l&_nc_ohc=_9-qdzbe7AcQ7kNvwGGOFWR&_nc_oc=Adldm4DErNRqAFBI2Z18BX5asVRnAcRZqu1vQmQbPONldACqeGT1VmJPniFeOky5E-w&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=FQJIWoU6rG8G-3F8cf38Fw&oh=00_AfPzzxMO8wd0SSTJntm-p_6KMtpG3hBqkVpiNfPA5r9hhg&oe=686B29A7",
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
