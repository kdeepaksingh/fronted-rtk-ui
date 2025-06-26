import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserTie,
} from "react-icons/fa";

const profile = {
  name: "Deepak Singh",
  role: "Frontend Developer",
  department: "IT",
  email: "deepak.singh@example.com",
  phone: "+91 9876543210",
  address: "Varanasi, Uttar Pradesh, India",
  joined: "12 March 2022",
  profileImage: "https://i.pravatar.cc/150?img=65",
};

const UserProfile = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 flex justify-center items-center gap-2">
            <FaUserTie />
            Employee Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage your personal details
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col md:flex-row gap-8 items-center"
        >
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-36 h-36 rounded-full border-4 border-blue-500 shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="flex-grow text-center md:text-left space-y-2">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {profile.name}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {profile.role} — {profile.department}
            </p>
            <div className="text-gray-600 dark:text-gray-300 space-y-1 mt-3">
              <p className="flex items-center gap-2">
                <FaEnvelope /> {profile.email}
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt /> {profile.phone}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> {profile.address}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Joined: {profile.joined}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UserProfile;
