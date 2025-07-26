import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CreateCoffeeButton } from "./CreateCoffeeButton";
import { Typography } from "@/shared/components/ui/Typography";

export const ShowcaseHeader: React.FC = () => (
  <motion.div
    className="relative w-full md:mb-12 h-[70vh] md:h-[100vh] min-h-[500px]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <div className="absolute inset-0 z-0">
      <Image
        src="/header-image.png"
        alt="Coffee background"
        width={1920}
        height={500}
        className="object-cover w-full h-full opacity-90"
      />
    </div>
    <div className="relative z-10 h-full w-full max-w-[1440px] mx-auto grid grid-cols-12 px-4 md:px-12">
      <motion.div
        className="col-span-12 flex justify-between items-start mb-6 py-4 md:py-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Image
          src="/mvst-coffee-small-logo.png"
          alt="MVST Logo"
          width={166}
          height={25}
        />
        <CreateCoffeeButton
          label="Create"
          onClick={() => alert("Create coffee!")}
        />
      </motion.div>
      <div className="col-span-12 md:col-span-6 flex flex-col justify-center md:justify-start">
        <div className="relative w-full md:ml-14 min-h-[200px] md:min-h-[350px] flex-1">
          <motion.p
            className="font-title w-2 md:w-fit text-6xl md:text-9xl justify-center md:justify-start text-ui-white tracking-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            ROASTED COFFEE
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Typography className="text-ui-inputText mt- justify-center text-base md:text-lg mb-6 text-start">
              Choose a coffee from below or create your own.
            </Typography>
          </motion.div>
          <motion.div
            className="w-full flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <CreateCoffeeButton
              label="Create your own coffee"
              onClick={() => alert("Create coffee!")}
            />
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);
