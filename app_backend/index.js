const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const products = [
  // {
  //   id: "p1",
  //   title: "iPhone 13",
  //   description:
  //     "Looking to trade my iPhone 13 (128GB, Midnight Black) for another smartphone, gadget, or item of similar value. I’m open to reasonable offers, preferably higher-end Android phones, tablets, or gaming consoles—but feel free to message your trade!",
  //   image: [
  //     "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=765&auto=format",
  //     "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=765&auto=format",
  //     "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=765&auto=format",
  //     "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   ],
  //   tradeOption: [
  //     "Meet-up",
  //     "Shipping Available",
  //     "Meet-up/Shipping Available",
  //   ],
  //   category: "electronics",
  //   condition: "Used",
  //   location: "Manila City",
  //   estimatedPrice: "₱10,000",
  //   userId: "u01",
  //   userName: "Christian mark Sison",
  //   profile: "https://randomuser.me/api/portraits/men/32.jpg",
  //   firstname: "Christian mark",
  //   lastname: "Sison",
  //   phoneNumber: "09948721614",
  //   birthday: "2003-09-18",
  //   address: [
  //     {
  //       street: "15 Saint Mark Street",
  //       barangay: "Central Signal Village",
  //       city: "Taguig City",
  //       regionProvince: "Metro Manila",
  //       postalCode: 1637,
  //     },
  //   ],
  //   rating: 4.9,
  //   status: "Available",
  //   wishlist: [
  //     "gaming console",
  //     "high-end Android",
  //     "tablet",
  //     "smartwatch",
  //     "Bluetooth headphones",
  //     "gaming keyboard",
  //     "mechanical mouse",
  //     "LED monitor",
  //     "VR headset",
  //     "external hard drive",
  //   ],
  //   latitude: 14.6514,
  //   longitude: 121.0492,
  //   verification: true,
  //   message: "Hey! I’m interested how much can you offer for the item? 😄",
  //   time: "16 min",
  //   comment: "Maayos at mabilis ang palitan. Pareho kaming satisfied!",
  //   commentImgs: [
  //     "https://img.freepik.com/free-vector/business-agreement-concept-illustration_114360-7584.jpg",
  //     "https://img.freepik.com/free-vector/business-agreement-concept-illustration_114360-7584.jpg",
  //     "https://img.freepik.com/free-vector/business-agreement-concept-illustration_114360-7584.jpg",
  //     "https://img.freepik.com/free-vector/business-agreement-concept-illustration_114360-7584.jpg",
  //     "https://img.freepik.com/free-vector/business-agreement-concept-illustration_114360-7584.jpg",
  //     "https://img.freepik.com/free-vector/business-agreement-concept-illustration_114360-7584.jpg",
  //   ],
  //   status2: "In-Progress",
  //   receiverPreference: ["Children", "Adult", "Senior Citizen"],
  //   donationDescription: "Donation for children's education and welfare.",
  //   donations: 4,
  //   notifTitle: "Maintenance Scheduled",
  //   notifMessage: "System maintenance on July 24 from 1 AM to 3 AM.",
  //   notifTimestamp: "2025-07-22T10:00:00Z",
  //   read: false,
  // },
  // {
  //   id: "p2",
  //   title: "Mountain Bike 27-speed",
  //   description: "Trail-ready MTB, aluminum frame with disc brakes.",
  //   image: [
  //     "https://images.unsplash.com/photo-1706090609578-0ea26cfeea5e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   ],
  //   tradeOption: [
  //     "Meet-up",
  //     "Shipping Available",
  //     "Meet-up/Shipping Available",
  //   ],
  //   category: "sports_outdoors",
  //   condition: "Like New",
  //   location: "Pasay",
  //   estimatedPrice: "₱6,000",
  //   userId: "u02",
  //   profile: "https://randomuser.me/api/portraits/women/44.jpg",
  //   userName: "Christian mark Sison",
  //   rating: 2.5,
  //   status: "Available",
  //   wishlist: ["gaming console", "high-end Android", "tablet"],
  //   latitude: 14.5547,
  //   longitude: 121.0244,
  //   verification: false,
  //   message: "G na ba?",
  //   time: "16 min",
  //   comment:
  //     "Hindi ko inakala na may gusto palang makipagpalit ng lumang bike ko. Sulit!",
  //   commentImgs: null,
  //   status2: "Donated",
  //   receiverPreference: "Elderly",
  //   donationDescription: "Donation to support elderly care and services.",
  //   address: [
  //     {
  //       street: "15 Saint Mark Street",
  //       barangay: "Central Signal Village",
  //       city: "Pasay City",
  //       regionProvince: "Metro Manila",
  //       postalCode: 1637,
  //     },
  //   ],
  //   donations: 14,
  //   notifTitle: "Report Ready",
  //   notifMessage: "Your weekly activity report is now available.",
  //   notifTimestamp: "2025-07-22T06:00:00Z",
  //   read: true,
  // },
  // {
  //   id: "p3",
  //   title: "Harry Potter Book Set",
  //   description: "Complete 7-book set in great condition, original cover.",
  //   image: [
  //     "https://plus.unsplash.com/premium_photo-1682125776589-e899882259c3?q=80&w=742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   ],
  //   tradeOption: [
  //     "Meet-up",
  //     "Shipping Available",
  //     "Meet-up/Shipping Available",
  //   ],
  //   category: "books_art",
  //   condition: "Used",
  //   location: "Pasig",
  //   estimatedPrice: "₱1,200",
  //   userId: "u03",
  //   profile:
  //     "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   userName: "Christian Sison",
  //   rating: 3.1,
  //   status: "Available",
  //   wishlist: ["gaming console", "high-end Android", "tablet"],
  //   latitude: 14.5243,
  //   longitude: 121.0794,
  //   verification: false,
  //   message: "Sa BGC nalang tayo meet up",
  //   time: "16 min",
  //   comment: "Medyo matagal lang ang usapan, pero naging okay din ang kapalit.",
  //   commentImgs:
  //     "https://img.freepik.com/free-vector/transaction-complete-concept-illustration_114360-4865.jpg",
  //   status2: "In-Progress",
  //   receiverPreference: "Students",
  //   donationDescription: "Funds for student scholarships and school supplies.",
  //   address: [
  //     {
  //       street: "15 Saint Mark Street",
  //       barangay: "Central Signal Village",
  //       city: "Pasig City",
  //       regionProvince: "Metro Manila",
  //       postalCode: 1637,
  //     },
  //   ],
  //   donations: 44,
  //   notifTitle: "Package Shipped",
  //   notifMessage: "Your order #12345 has been shipped.",
  //   notifTimestamp: "2025-07-22T19:40:00Z",
  //   read: false,
  // },
  // {
  //   id: "p4",
  //   title: "PlayStation 4 Slim (500GB)",
  //   description: "Comes with 2 controllers and 3 games.",
  //   image: [
  //     "https://images.unsplash.com/photo-1731834452303-d1e397e4eb80?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   ],
  //   tradeOption: [
  //     "Meet-up",
  //     "Shipping Available",
  //     "Meet-up/Shipping Available",
  //   ],
  //   category: "electronics",
  //   condition: "Good",
  //   location: "Makati",
  //   estimatedPrice: "₱8,500",
  //   userId: "u04",
  //   profile: "https://randomuser.me/api/portraits/men/71.jpg",
  //   userName: "Christian mark Sison",
  //   rating: 1.9,
  //   status: "Available",
  //   wishlist: ["gaming console", "high-end Android", "tablet"],
  //   latitude: 14.5764,
  //   longitude: 121.0851,
  //   verification: false,
  //   message: "Hey! I’m interested how much can you offer for the item? 😄",
  //   time: "16 min",
  //   comment:
  //     "Napakaganda ng konsepto ng barter. Nung una, nag-aalangan ako, pero nung natuloy ang palitan ng lumang cellphone kapalit ng oven, pareho kaming natuwa. Walang cash involved, pero pareho kaming panalo.",
  //   commentImgs:
  //     "https://img.freepik.com/free-vector/invoice-paid-concept-illustration_114360-7940.jpg",
  //   status2: "In-Progress",
  //   receiverPreference: "Families in need",
  //   donationDescription: "Assistance for low-income families.",
  //   address: [
  //     {
  //       street: "15 Saint Mark Street",
  //       barangay: "Central Signal Village",
  //       city: "Makati City",
  //       regionProvince: "Metro Manila",
  //       postalCode: 1637,
  //     },
  //   ],
  //   donations: 2,
  //   notifTitle: "New Comment",
  //   notifMessage: "Alex commented on your post.",
  //   notifTimestamp: "2025-07-22T18:25:00Z",
  //   read: true,
  // },
  // {
  //   id: "p5",
  //   title: "Guitar Yamaha F310",
  //   description: "Perfect for beginners. Great sound, minor scratches.",
  //   image: [
  //     "https://images.unsplash.com/photo-1681573236774-09d52987b885?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   ],
  //   tradeOption: [
  //     "Meet-up",
  //     "Shipping Available",
  //     "Meet-up/Shipping Available",
  //   ],
  //   category: "toys_hobbies",
  //   condition: "Good",
  //   location: "Marikina",
  //   estimatedPrice: "₱3,000",
  //   userId: "u05",
  //   profile: "https://randomuser.me/api/portraits/women/68.jpg",
  //   userName: "Christian mark Sison",
  //   rating: 3.2,
  //   status: "Available",
  //   wishlist: ["gaming console", "high-end Android", "tablet"],
  //   latitude: 14.6042,
  //   longitude: 121.0301,
  //   verification: false,
  //   message: "Good na good pa condition neto",
  //   time: "16 min",
  //   comment:
  //     "Nakakatuwa kasi bukod sa pagtipid, nakakatulong din sa kapwa. Nung pandemic, naging malaking bagay ang barter para makuha ko ang basic needs nang hindi na kailangan gumastos.",
  //   commentImgs: null,
  //   status2: "In-Progress",
  //   receiverPreference: "Homeless",
  //   donationDescription: "Support for homeless shelters and food.",
  //   address: [
  //     {
  //       street: "15 Saint Mark Street",
  //       barangay: "Central Signal Village",
  //       city: "Marikina City",
  //       regionProvince: "Metro Manila",
  //       postalCode: 1637,
  //     },
  //   ],
  //   donations: 52,
  //   notifTitle: "Subscription Expiring",
  //   notifMessage: "Your premium subscription expires in 5 days.",
  //   notifTimestamp: "2025-07-22T17:10:00Z",
  //   read: true,
  // },
  // {
  //   id: "p6",
  //   title: "Kitchen Blender",
  //   description: "Powerful 6-speed blender. Barely used.",
  //   image: [
  //     "https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?q=80&w=955&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   ],
  //   tradeOption: [
  //     "Meet-up",
  //     "Shipping Available",
  //     "Meet-up/Shipping Available",
  //   ],
  //   category: "home_living",
  //   condition: "Like New",
  //   location: "San Juan",
  //   estimatedPrice: "₱900",
  //   userId: "u06",
  //   profile: "https://randomuser.me/api/portraits/men/1.jpg",
  //   userName: "Christian mark Sison",
  //   rating: 4,
  //   status: "Available",
  //   wishlist: ["gaming console", "high-end Android", "tablet"],
  //   latitude: 14.6507,
  //   longitude: 121.1029,
  //   verification: true,
  //   message: "Ano bro?",
  //   time: "16 min",
  //   comment: "Medyo matagal lang ang usapan, pero naging okay din ang kapalit.",
  //   commentImgs: [
  //     "https://img.freepik.com/free-vector/order-confirmed-concept-illustration_114360-5162.jpg",
  //     "https://img.freepik.com/free-vector/order-confirmed-concept-illustration_114360-5162.jpg",
  //     "https://img.freepik.com/free-vector/order-confirmed-concept-illustration_114360-5162.jpg",
  //   ],
  //   status2: "Cancelled",
  //   receiverPreference: "Victims of Calamities",
  //   donationDescription: "Relief funds for victims of natural disasters.",
  //   address: [
  //     {
  //       street: "15 Saint Mark Street",
  //       barangay: "Central Signal Village",
  //       city: "San Juan City",
  //       regionProvince: "Metro Manila",
  //       postalCode: 1637,
  //     },
  //   ],
  //   donations: 76,
  //   notifTitle: "Password Changed",
  //   notifMessage: "Your account password was changed successfully.",
  //   notifTimestamp: "2025-07-22T16:05:00Z",
  //   read: false,
  // },
  // {
  //   id: "p7",
  //   title: "Men's Leather Shoes",
  //   description: "Size 9. Office leather shoes, worn once.",
  //   image: [
  //     "https://images.unsplash.com/photo-1595388710140-e7b90300ec73?q=80&w=766&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   ],
  //   tradeOption: [
  //     "Meet-up",
  //     "Shipping Available",
  //     "Meet-up/Shipping Available",
  //   ],
  //   category: "fashion",
  //   condition: "Like New",
  //   location: "Manila",
  //   estimatedPrice: "₱1,500",
  //   userId: "u07",
  //   profile: "https://randomuser.me/api/portraits/men/10.jpg",
  //   userName: "Christian mark Sison",
  //   rating: 4,
  //   status: "Available",
  //   wishlist: ["gaming console", "high-end Android", "tablet"],
  //   latitude: 14.5995,
  //   longitude: 120.9842,
  //   verification: true,
  //   message: "Meet up nalang tayo",
  //   time: "16 min",
  //   comment:
  //     "Ginamit ko ang platform para ipagpalit ang lumang printer ko. Nakahanap ako ng estudyanteng nangangailangan at napalitan ito ng ilang school supplies para sa anak ko. Bukod sa practical, parang may sense of community rin.",
  //   commentImgs:
  //     "https://img.freepik.com/free-vector/payment-success-illustration_23-2148574227.jpg",
  //   status2: "Pending",
  //   receiverPreference: "Orphanages",
  //   donationDescription: "Donation to orphanages for children's welfare.",
  //   address: [
  //     {
  //       street: "15 Saint Mark Street",
  //       barangay: "Central Signal Village",
  //       city: "Manila City",
  //       regionProvince: "Metro Manila",
  //       postalCode: 1637,
  //     },
  //   ],
  //   donations: 10,
  //   notifTitle: "Special Offer",
  //   notifMessage: "Get 15% off on your next order—this week only!",
  //   notifTimestamp: "2025-07-22T15:20:00Z",
  //   read: false,
  // },
  // {
  //   id: "p8",
  //   title: "Smartwatch Fitbit Inspire 2",
  //   description: "Tracks steps, heart rate, and sleep.",
  //   image: [
  //     "https://images.unsplash.com/photo-1541195942158-ccbd892c4673?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   ],
  //   tradeOption: [
  //     "Meet-up",
  //     "Shipping Available",
  //     "Meet-up/Shipping Available",
  //   ],
  //   category: "electronics",
  //   condition: "Used",
  //   location: "Mandaluyong",
  //   estimatedPrice: "₱2,800",
  //   userId: "u08",
  //   profile: "https://randomuser.me/api/portraits/women/1.jpg",
  //   userName: "Christian mark Sison",
  //   rating: 2,
  //   status: "Available",
  //   wishlist: ["gaming console", "high-end Android", "tablet"],
  //   latitude: 14.5794,
  //   longitude: 121.0359,
  //   verification: true,
  //   message: "Hey! I’m interested how much can you offer for the item? 😄",
  //   time: "16 min",
  //   comment: "Nagkapalitan kami ng gamit na walang labas na pera. Panalo!",
  //   commentImgs:
  //     "https://img.freepik.com/free-vector/online-payment-concept-illustration_114360-489.jpg",
  //   status2: "Donated",
  //   receiverPreference: "Persons with disabilities (PWD)",
  //   donationDescription: "Support and resources for people with disabilities.",
  //   address: [
  //     {
  //       street: "15 Saint Mark Street",
  //       barangay: "Central Signal Village",
  //       city: "Mandaluyong City",
  //       regionProvince: "Metro Manila",
  //       postalCode: 1637,
  //     },
  //   ],
  //   donations: 21,
  //   notifTitle: "Report Ready",
  //   notifMessage: "Your weekly sales report is now available.",
  //   notifTimestamp: "2025-07-22T14:45:00Z",
  //   read: true,
  // },
  // {
  //   id: "p9",
  //   title: "Mini Cactus Collection (5 pcs)",
  //   description: "Low-maintenance plants in pots. Great for desk decor.",
  //   image: [
  //     "https://images.unsplash.com/photo-1711893748861-9a3e11dbe500?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   ],
  //   tradeOption: [
  //     "Meet-up",
  //     "Shipping Available",
  //     "Meet-up/Shipping Available",
  //   ],
  //   category: "plants_gardening",
  //   condition: "New",
  //   location: "Caloocan",
  //   estimatedPrice: "₱500",
  //   userId: "u09",
  //   profile: "https://randomuser.me/api/portraits/women/10.jpg",
  //   userName: "andrei custudio",
  //   rating: 1,
  //   status: "Pending Trade",
  //   wishlist: ["helmet", "bike light", "GoPro"],
  //   latitude: 14.6595,
  //   longitude: 120.9842,
  //   verification: true,
  //   message: "Di ko alam doon eh hahaha",
  //   time: "16 min",
  //   comment: "Safe ang transaksyon at may tiwala sa kausap. Good job!",
  //   commentImgs: [
  //     "https://img.freepik.com/free-vector/payment-confirmation-concept-illustration_114360-7357.jpg",
  //     "https://img.freepik.com/free-vector/payment-confirmation-concept-illustration_114360-7357.jpg",
  //     "https://img.freepik.com/free-vector/payment-confirmation-concept-illustration_114360-7357.jpg",
  //     "https://img.freepik.com/free-vector/payment-confirmation-concept-illustration_114360-7357.jpg",
  //   ],
  //   status2: "Pending",
  //   receiverPreference: "Anyone",
  //   donationDescription: "Open donations for anyone in need.",
  //   address: [
  //     {
  //       street: "15 Saint Mark Street",
  //       barangay: "Central Signal Village",
  //       city: "Caloocan City",
  //       regionProvince: "Metro Manila",
  //       postalCode: 1637,
  //     },
  //   ],
  //   donations: 1,
  //   notifTitle: "Event Reminder",
  //   notifMessage: "Team meeting starts in 30 minutes.",
  //   notifTimestamp: "2025-07-22T13:00:00Z",
  //   read: false,
  // },
  // {
  //   id: "p10",
  //   title: "Pet Cage (Medium)",
  //   description: "Used once for transporting a cat. Foldable.",
  //   image: [
  //     "https://images.unsplash.com/photo-1626246703612-53b076a26edc?q=80&w=755&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   ],
  //   tradeOption: [
  //     "Meet-up",
  //     "Shipping Available",
  //     "Meet-up/Shipping Available",
  //   ],
  //   category: "pets_animals",
  //   condition: "Good",
  //   location: "Las Piñas",
  //   estimatedPrice: "₱850",
  //   userId: "u010",
  //   profile: "https://randomuser.me/api/portraits/women/30.jpg",
  //   userName: "Bianca Sofia",
  //   rating: 1,
  //   status: "Pending Trade",
  //   wishlist: ["helmet", "bike light", "GoPro"],
  //   latitude: 14.45,
  //   longitude: 120.9833,
  //   verification: true,
  //   message: "Ano gusto mo?",
  //   time: "16 min",
  //   comment:
  //     "Minsan may mga hindi seryoso—nangako na makikipagkita pero hindi sumipot. Mas okay sana kung may rating system para malaman kung sino ang trustworthy.",
  //   commentImgs:
  //     "https://img.freepik.com/free-vector/contactless-payment-illustration_114360-5133.jpg",
  //   status2: "Donated",
  //   receiverPreference: "Low-income families",
  //   donationDescription: "Support for families in financial distress.",
  //   address: [
  //     {
  //       street: "15 Saint Mark Street",
  //       barangay: "Central Signal Village",
  //       city: "Las Piñas City",
  //       regionProvince: "Metro Manila",
  //       postalCode: 1637,
  //     },
  //   ],
  //   donations: 15,
  //   notifTitle: "Friend Request",
  //   notifMessage: "Michael has sent you a friend request.",
  //   notifTimestamp: "2025-07-22T12:30:00Z",
  //   read: false,
  // },
  // {
  //   id: "p11",
  //   title: "Power Drill with Bits",
  //   description: "Heavy-duty drill for home repairs. Still works great.",
  //   image: [
  //     "https://images.unsplash.com/photo-1540104539488-92a51bbc0410?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   ],
  //   tradeOption: [
  //     "Meet-up",
  //     "Shipping Available",
  //     "Meet-up/Shipping Available",
  //   ],
  //   category: "tools_diy",
  //   condition: "Used",
  //   location: "Valenzuela",
  //   estimatedPrice: "₱1,700",
  //   userId: "u011",
  //   profile: "https://randomuser.me/api/portraits/men/90.jpg",
  //   userName: "shane agor",
  //   rating: 5,
  //   status: "Pending Trade",
  //   wishlist: ["helmet", "bike light", "GoPro"],
  //   latitude: 14.7,
  //   longitude: 120.95,
  //   verification: true,
  //   message: "Hey! I’m interested how much can you offer for the item? 😄",
  //   time: "16 min",
  //   comment:
  //     "Medyo mahirap lang sa umpisa maghanap ng tamang kapalit. Pero kung patient ka, makakahanap ka rin ng willing makipagbarter. Sana lang mas maraming active users para mas mabilis ang match.",
  //   commentImgs: null,
  //   status2: "Cancelled",
  //   receiverPreference: "Refugees",
  //   donationDescription: "Donations for refugees and displaced persons.",
  //   address: [
  //     {
  //       street: "15 Saint Mark Street",
  //       barangay: "Central Signal Village",
  //       city: "Valenzuela City",
  //       regionProvince: "Metro Manila",
  //       postalCode: 1637,
  //     },
  //   ],
  //   donations: 54,
  //   notifTitle: "Friend Request",
  //   notifMessage: "Michael has sent you a friend request.",
  //   notifTimestamp: "2025-07-22T12:30:00Z",
  //   read: true,
  // },
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
