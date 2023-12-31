import Box from "./components/Box";
import { motion } from "framer-motion";
import { useStore } from "./store";
import Modal from "./components/Modal";

function App() {
  const boxTitles = ["TODO", "DOING", "DONE"];
  const isModalOpen = useStore((state) => state.modalOpen[0]);

  return (
    <>
      <motion.div
        className="w-full min-h-screen flex justify-center items-center gap-x-4 bg-violet-300"
        variants={{
          hidden: {
            opacity: 0,
            y: 100,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <>
          {isModalOpen && <Modal />}
          {boxTitles.map((t, i) => (
            <Box title={t} key={i} />
          ))}
        </>
      </motion.div>
    </>
  );
}

export default App;
