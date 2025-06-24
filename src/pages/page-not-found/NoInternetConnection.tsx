import { motion } from "framer-motion";
import MainButton from "../../components/buttons/MainButton";
import Text from "../../components/typography/Text";
import Icon from "../../components/icon/Icon";
import colors from "../../color";

export default function NoInternetConnection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-pink-100 dark:bg-gray-900 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <Icon
          name={"WifiOff"}
          style={{
            width: "100px",
            height: "100px",
            color: `${colors["ui-brown"]}`,
          }}
        />
        <Text
          text={"Typo.WifiHeading"}
          size={35}
          className={`font-upag-sans-pro !text-orange-900  text-2xl text-center font-semibold !mb-3`}
        />
        <Text
          text={"Typo.WifiContent"}
          size={20}
          className={`!text-orange-400 text-center !mb-3`}
        />
        <Text
          text={"Typo.WifiContent1"}
          size={20}
          className={`!text-orange-800 text-center mb-3`}
        />

        <MainButton
          ButtonName="Action.Retry"
          type="button"
          className="inline-block bg-gradient-to-r from-[#09756f] to-[#1c3409] !px-3 !py-2 !rounded-lg !font-semibold hover:!bg-orange-700 !transition"
          onClick={() => window.location.reload()}
        />
      </motion.div>
    </section>
  );
}
