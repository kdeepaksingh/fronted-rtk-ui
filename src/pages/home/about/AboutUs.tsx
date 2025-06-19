import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaUsers, FaGlobe, FaRegBuilding } from "react-icons/fa";

const stats = [
  { label: "Employees Managed", value: 3500, icon: FaUsers },
  { label: "Clients Worldwide", value: 120, icon: FaGlobe },
  { label: "Global Offices", value: 8, icon: FaRegBuilding },
];

const team = [
  {
    name: "Amit Sharma",
    role: "CEO",
    img: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Priya Mehta",
    role: "CTO",
    img: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    name: "Rahul Sen",
    role: "Product Head",
    img: "https://randomuser.me/api/portraits/men/13.jpg",
  },
];

const RemoteLottie = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("https://assets10.lottiefiles.com/packages/lf20_ydo1amjm.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => {
        console.error("Failed to load Lottie:", err);
      });
  }, []);
  if (!animationData)
    return <p className="text-center">Loading animation...</p>;

  return (
    <Lottie
      animationData={animationData}
      loop
      className="w-2/3 md:w-1/2 mx-auto"
    />
  );
};

const AboutUs = () => (
  <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    {/* Hero Section */}
    <section className="relative h-screen overflow-hidden flex flex-col justify-center items-center text-center px-4">
      <div className="absolute top-0 left-0 w-full h-32 bg-blue-600 opacity-20 transform rotate-6 blur-3xl animate-pulse" />
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        We Are <span className="text-yellow-400">EmpManage</span>
      </motion.h1>
      <RemoteLottie />
    </section>

    {/* Stats */}
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        {stats.map(({ label, value, icon: Icon }, i) => (
          <motion.div
            key={i}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Icon className="mx-auto text-4xl text-blue-600 mb-2" />
            <CountUp
              end={value}
              duration={2.5}
              className="text-3xl font-bold"
            />
            +<p className="mt-2 text-gray-600 dark:text-gray-400">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-14">
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-600">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            To simplify and elevate employee management through seamless
            automation and real-time analytics.
          </p>
        </motion.div>
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-600">Our Vision</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            To become the most trusted HR platform for modern, fast-growing
            organizations across the globe.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Team Section */}
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <motion.h2
          className="text-3xl font-bold text-blue-600"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.h2>
      </div>
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {team.map((m, i) => (
          <motion.div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition transform duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={m.img}
              alt={m.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
            />
            <h4 className="text-lg font-semibold">{m.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{m.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default AboutUs;

// import React from "react";
// import { motion } from "framer-motion";
// import { FaUsers, FaGlobe, FaRegBuilding } from "react-icons/fa";

// const stats = [
//   { label: "Employees Managed", value: 3500, icon: FaUsers },
//   { label: "Clients Worldwide", value: 120, icon: FaGlobe },
//   { label: "Global Offices", value: 8, icon: FaRegBuilding },
// ];

// const team = [
//   {s
//     name: "Amit Sharma",
//     role: "Founder & CEO",
//     img: "https://randomuser.me/api/portraits/men/10.jpg",
//   },
//   {
//     name: "Priya Mehta",
//     role: "CTO",
//     img: "https://randomuser.me/api/portraits/women/11.jpg",
//   },
//   {
//     name: "Rahul Sen",
//     role: "Product Head",
//     img: "https://randomuser.me/api/portraits/men/13.jpg",
//   },
// ];

// const AboutUs = () => {
//   return (
//     <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen overflow-x-hidden">
//       {/* Hero */}
//       <section className="relative px-6 py-20 bg-gradient-to-br from-indigo-700 to-blue-600 text-white text-center">
//         <motion.h1
//           className="text-4xl md:text-5xl font-extrabold mb-4"
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           About <span className="text-yellow-300">EmpManage</span>
//         </motion.h1>
//         <p className="max-w-xl mx-auto text-lg text-indigo-100">
//           Building the future of HR tech — streamlined, automated, and built for
//           scale.
//         </p>
//       </section>

//       {/* Stats */}
//       <section className="py-16 bg-gray-100 dark:bg-gray-800">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
//           {stats.map(({ label, value, icon: Icon }, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.2 }}
//               className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow-md"
//             >
//               <Icon className="text-3xl text-blue-600 dark:text-blue-400 mb-3 mx-auto" />
//               <h2 className="text-3xl font-bold">{value}+</h2>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {label}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Mission */}
//       <section className="py-20 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <motion.h2
//             className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             Our Mission
//           </motion.h2>
//           <motion.p
//             className="text-lg text-gray-700 dark:text-gray-300"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             viewport={{ once: true }}
//           >
//             To empower businesses to manage employees efficiently with modern,
//             secure, and intelligent tools — all in one place.
//           </motion.p>
//         </div>
//       </section>

//       {/* Timeline */}
//       <section className="py-20 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-12 text-blue-700 dark:text-blue-300">
//             Our Journey
//           </h2>
//           <ol className="relative border-l border-blue-300 dark:border-gray-600">
//             {[
//               {
//                 year: "2020",
//                 title: "Founded EmpManage",
//                 desc: "Started as a simple HR tool.",
//               },
//               {
//                 year: "2021",
//                 title: "100+ Clients Onboarded",
//                 desc: "Scaled rapidly with enterprise-grade features.",
//               },
//               {
//                 year: "2023",
//                 title: "AI-driven Insights",
//                 desc: "Introduced automated analytics and alerts.",
//               },
//             ].map((item, i) => (
//               <motion.li
//                 key={i}
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ delay: i * 0.2 }}
//                 viewport={{ once: true }}
//                 className="mb-10 ml-6"
//               >
//                 <span className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 ring-4 ring-white dark:ring-gray-900"></span>
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                   {item.title}
//                 </h3>
//                 <time className="block mb-1 text-sm font-normal text-gray-500 dark:text-gray-400">
//                   {item.year}
//                 </time>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">
//                   {item.desc}
//                 </p>
//               </motion.li>
//             ))}
//           </ol>
//         </div>
//       </section>

//       {/* Team */}
//       <section className="py-20 px-6 bg-white dark:bg-gray-900">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-10">
//             Our Leadership
//           </h2>
//           <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
//             {team.map((member, i) => (
//               <motion.div
//                 key={i}
//                 className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 hover:shadow-xl transition duration-300"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.2 }}
//                 viewport={{ once: true }}
//               >
//                 <img
//                   src={member.img}
//                   alt={member.name}
//                   className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-blue-500"
//                 />
//                 <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
//                   {member.name}
//                 </h4>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   {member.role}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutUs;

// // import { motion } from "framer-motion";

// // const fadeIn = {
// //   hidden: { opacity: 0, y: 30 },
// //   show: (delay = 0) => ({
// //     opacity: 1,
// //     y: 0,
// //     transition: { delay, duration: 0.6, ease: "easeOut" },
// //   }),
// // };

// // const AboutUs = () => {
// //   return (
// //     <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-12">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Page Title */}
// //         <motion.h1
// //           className="text-4xl md:text-5xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400"
// //           variants={fadeIn}
// //           initial="hidden"
// //           animate="show"
// //         >
// //           About EmpManage
// //         </motion.h1>

// //         {/* Intro */}
// //         <motion.p
// //           className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-600 dark:text-gray-300"
// //           variants={fadeIn}
// //           initial="hidden"
// //           animate="show"
// //           custom={0.2}
// //         >
// //           EmpManage is a next-gen employee management platform built to simplify
// //           how modern teams track performance, manage data, and stay connected.
// //         </motion.p>

// //         {/* Mission & Vision */}
// //         <div className="grid md:grid-cols-2 gap-12 mb-20">
// //           <motion.div
// //             variants={fadeIn}
// //             initial="hidden"
// //             whileInView="show"
// //             viewport={{ once: true }}
// //             custom={0.3}
// //           >
// //             <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
// //               Our Mission
// //             </h2>
// //             <p className="text-gray-700 dark:text-gray-300">
// //               To empower organizations with an intuitive and powerful tool that
// //               streamlines workforce management — from hiring and onboarding to
// //               attendance, payroll, and performance insights.
// //             </p>
// //           </motion.div>

// //           <motion.div
// //             variants={fadeIn}
// //             initial="hidden"
// //             whileInView="show"
// //             viewport={{ once: true }}
// //             custom={0.4}
// //           >
// //             <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
// //               Our Vision
// //             </h2>
// //             <p className="text-gray-700 dark:text-gray-300">
// //               To become the leading digital HR partner for modern organizations
// //               by combining automation, analytics, and excellent user experience.
// //             </p>
// //           </motion.div>
// //         </div>

// //         {/* Core Values */}
// //         <motion.div
// //           variants={fadeIn}
// //           initial="hidden"
// //           whileInView="show"
// //           viewport={{ once: true }}
// //           custom={0.5}
// //         >
// //           <h2 className="text-2xl font-semibold text-center text-indigo-600 dark:text-indigo-400 mb-10">
// //             Our Core Values
// //           </h2>
// //           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {[
// //               { title: "Integrity", desc: "We do what’s right — always." },
// //               {
// //                 title: "Innovation",
// //                 desc: "We embrace change and build for the future.",
// //               },
// //               {
// //                 title: "Customer Focus",
// //                 desc: "Our users are our top priority.",
// //               },
// //               { title: "Collaboration", desc: "We thrive as one team." },
// //               { title: "Excellence", desc: "We aim to exceed expectations." },
// //               {
// //                 title: "Transparency",
// //                 desc: "We believe in open communication.",
// //               },
// //             ].map((val, i) => (
// //               <motion.div
// //                 key={i}
// //                 className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
// //                 variants={fadeIn}
// //                 initial="hidden"
// //                 whileInView="show"
// //                 viewport={{ once: true }}
// //                 custom={0.6 + i * 0.1}
// //               >
// //                 <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-300">
// //                   {val.title}
// //                 </h3>
// //                 <p className="text-sm text-gray-600 dark:text-gray-300">
// //                   {val.desc}
// //                 </p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </motion.div>

// //         {/* Team (Optional) */}
// //         <motion.div
// //           variants={fadeIn}
// //           initial="hidden"
// //           whileInView="show"
// //           viewport={{ once: true }}
// //           custom={1.2}
// //           className="mt-20"
// //         >
// //           <h2 className="text-2xl font-semibold text-center text-indigo-600 dark:text-indigo-400 mb-10">
// //             Meet Our Team
// //           </h2>
// //           <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
// //             {[1, 2, 3].map((_, i) => (
// //               <div key={i} className="text-center">
// //                 <img
// //                   src={`https://randomuser.me/api/portraits/men/${30 + i}.jpg`}
// //                   alt={`Team Member ${i}`}
// //                   className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-500"
// //                 />
// //                 <h4 className="text-md font-semibold">Member {i + 1}</h4>
// //                 <p className="text-sm text-gray-500 dark:text-gray-400">
// //                   Role Title
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AboutUs;
