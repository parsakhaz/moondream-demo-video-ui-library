import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import Typewriter from "typewriter-effect";
import MacWindow from "../MacWindow";
import type { DemoComponent } from "@/types/demo";
import { useConfig } from "@/context/ConfigContext";
import { ConfigEditor } from "@/components/ConfigEditor";

const inter = Inter({ subsets: ["latin"] });

const TerminalDemo: DemoComponent = () => {
  const { config } = useConfig();

  return (
    <MacWindow className="max-w-2xl">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`font-terminal px-4 text-3xl md:text-4xl text-medium !leading-normal text-white flex items-center justify-center font-terminal`}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-[#64ff9e] font-terminal mr-2"
          >
            {config.terminal.prompt}
          </motion.span>
          <Typewriter
            options={{
              strings: config.terminal.commands,
              autoStart: true,
              loop: true,
              delay: config.terminal.typingSpeed,
              deleteSpeed: config.terminal.deleteSpeed,
              cursor: "▋",
              wrapperClassName: "text-white",
            }}
          />
        </motion.div>
      </div>
    </MacWindow>
  );
};

TerminalDemo.title = "Terminal Animation";

export default TerminalDemo;
