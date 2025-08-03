"use client";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  Transition,
} from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";

const animeList = [
  {
    title: "Berserk",
    image:
      "https://preview.redd.it/what-deluxe-volume-is-the-famous-panel-of-the-eclipse-v0-h8pmalb7w0jc1.jpg?width=768&format=pjpg&auto=webp&s=26994415b54e803de0f3a5e99015e139e1bb5e48",
    id: "801513ba-a712-498c-8f57-cae55b38cc92",
  },
  {
    title: "Vinland Saga",
    image: "https://images3.alphacoders.com/137/thumb-1920-1372691.png",
    id: "5d1fc77e-706a-4fc5-bea8-486c9be0145d",
  },
  {
    title: "Vagabond",
    image: "https://images5.alphacoders.com/133/thumb-1920-1334103.jpeg",
    id: "d1a9fdeb-f713-407f-960c-8326b586e6fd",
  },
  {
    title: "Tokyo Ghoul",
    image: "https://i.ytimg.com/vi/OQKN1Aqe69k/maxresdefault.jpg",
    id: "6a1d1cb1-ecd5-40d9-89ff-9d88e40b136b",
  },
  {
    title: "Jujutsu Kaisen",
    image: "https://images5.alphacoders.com/136/1364638.jpeg",
    id: "c52b2ce3-7f95-469c-96b0-479524fb7a1a",
  },
];

const DRAG_BUFFER = 50;
const SPRING: Transition = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const ONE_SECOUND = 1000;
const AUTO_DELAY = ONE_SECOUND * 20;

export default function Carousel() {
  const dragX = useMotionValue(0);
  const dragXProgess = useMotionValue(0);

  useMotionValueEvent(dragX, "change", (latest) => {
    if (typeof latest === "number" && dragging) {
      dragXProgess.set(latest);
    } else {
      dragXProgess.set(0);
    }
  });
  const [imgIndex, setImgIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragXProgess.get();

      if (x === 0) {
        setImgIndex((prev) => {
          if (prev === animeList.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  });

  const onDrageStart = () => {
    setDragging(true);
  };

  const handlePrev = () => {
    if (imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (imgIndex < animeList.length - 1) {
      setImgIndex((prev) => prev + 1);
    }
  };

  const onDrageEnd = () => {
    setDragging(false);

    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < animeList.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <AnimatePresence>
        <div className="relative min-h-auto overflow-hidden bg-neutral-950 py-8">
          <motion.div
            drag="x"
            dragConstraints={{
              right: 0,
              left: 0,
            }}
            transition={SPRING}
            style={{
              x: dragX,
            }}
            onDragStart={onDrageStart}
            onDragEnd={onDrageEnd}
            animate={{
              translateX: `-${imgIndex * 100}%`,
            }}
            className="curser-grab active:cursor-grabbing flex items-center"
          >
            <Images
              imgIndex={imgIndex}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </motion.div>
          <GradientEdges />
        </div>
      </AnimatePresence>
    </>
  );
}

const Images = ({
  imgIndex,
  handlePrev,
  handleNext,
}: {
  imgIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
}) => {
  return (
    <>
      {animeList.map((anime, index) => (
        <motion.div
          key={index}
          style={{
            backgroundImage: `url(${anime.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            scale: imgIndex === index ? 0.95 : 0.85,
          }}
          transition={SPRING}
          className="aspect-video sm:h-[300px] md:h-[500px] lg:h-[600px] w-screen shrink-0 rounded-xl bg-neutral-800 object-cover relative"
        >
          <div className="flex justify-between h-full items-center">
            <button onClick={handlePrev}>
              <MdNavigateBefore
                className={`text-5xl rounded-lg ${
                  imgIndex === 0 ? "hidden" : "block"
                }`}
              />
            </button>
            <button onClick={handleNext}>
              <MdNavigateNext
                className={`text-5xl rounded-lg ${
                  imgIndex < animeList.length - 1 ? "block" : "hidden"
                }`}
              />
            </button>
          </div>
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/30 z-0" />

            {/* Bottom-left container with title + button */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-4 pointer-events-auto">
              <div className="text-white text-xl font-semibold bg-black/60 px-4 py-2 rounded">
                {anime.title}
              </div>

              <Link
                href={`/manga/${anime.id}`}
                className="bg-white text-black text-xl font-semibold px-4 py-2 rounded hover:bg-zinc-100 transition-colors"
              >
                Read Now
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
};
