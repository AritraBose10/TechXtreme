"use client";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Badge,
  BookOpen,
  Brain,
  Camera,
  Code,
  Gift,
  Globe,
  Headphones,
  Heart,
  Laugh,
  Lightbulb,
  MessageCircle,
  Mic,
  Music,
  Plus,
  Rocket,
  Star,
  Ticket,
  Trophy,
  Users,
} from "lucide-react";
import { Audiowide, Play } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
const glitchOffsets = Array.from({ length: 5 }, () => ({
  x: (Math.random() - 0.5) * 100, // Random between -50 to 50
  y: (Math.random() - 0.5) * 100, // Random between -50 to 50
}));

const playFont = Play({ subsets: ["latin"], weight: ["400", "700"] });

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400", // Use the correct weight for your font
});
// Enhanced Animated Background with Particles
import { useAnimation, useMotionValue } from "framer-motion";
import React, { useCallback, useEffect } from "react";

import { useMemo } from "react";

// Constants for better maintainability

const CONSTANTS = {
  BASE_PARTICLES: 75,
  CONSTELLATION_PARTICLES: 15,
  ORBS: 4,
  MOUSE_INFLUENCE_RADIUS: 200,
  GRID_SIZE: 50,
  PARTICLE_ANIMATION_DURATION: {
    MIN: 4,
    MAX: 12,
  },
};

// SSR-safe utility functions
const utils = {
  getRandomPoint: (dimensions) => ({
    x: Math.random() * (dimensions?.width || 1920), // fallback for SSR
    y: Math.random() * (dimensions?.height || 1080), // fallback for SSR
  }),

  getDistance: (p1, p2) => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  },

  getOrbGradient: (index) => ({
    background: `radial-gradient(circle,
      ${index % 2 ? "rgba(34, 211, 238, 0.2)" : "rgba(129, 140, 248, 0.2)"} 0%,
      ${index % 2 ? "rgba(6, 182, 212, 0.1)" : "rgba(67, 56, 202, 0.1)"} 100%)`,
  }),
};

import { Check, Terminal } from "lucide-react";

const CyberpunkSuccess = ({ setSubmitted, setActiveRegistration }) => {
  const [showTerminal, setShowTerminal] = useState(true);
  const [terminalLines, setTerminalLines] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const terminalText = [
    "Initializing quantum protocols...",
    "Synchronizing neural networks...",
    "Encrypting biometric data...",
    "Establishing secure connection...",
    "Validating digital signature...",
    "Registration matrix confirmed.",
    "Access granted. Initializing final sequence...",
  ];

  useEffect(() => {
    let lineIndex = 0;
    const terminalInterval = setInterval(() => {
      if (lineIndex < terminalText.length) {
        setTerminalLines((prev) => [...prev, terminalText[lineIndex]]);
        lineIndex++;

        // Show progress bar after last message
        if (lineIndex === terminalText.length) {
          setShowProgress(true);
          clearInterval(terminalInterval);

          // Start progress bar animation
          let progressValue = 0;
          const progressInterval = setInterval(() => {
            progressValue += 2;
            setProgress(progressValue);

            if (progressValue >= 100) {
              clearInterval(progressInterval);
              setTimeout(() => {
                setShowTerminal(false);
                setShowSuccess(true);
              }, 500);
            }
          }, 30);
        }
      }
    }, 400);

    return () => clearInterval(terminalInterval);
  }, []);

  const ProgressBar = () => (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="mt-4 font-mono text-sm"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-cyan-500"></span>
        <span className="text-cyan-300">System synchronization:</span>
        <span className="text-cyan-400">{progress}%</span>
      </div>
      <div className="h-5 bg-gray-800/50 border border-cyan-500/20 rounded overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
          className="h-full bg-gradient-to-r from-cyan-600/40 to-cyan-400/40 relative"
        >
          {/* Animated scanline effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent w-1/2 animate-[scan_1s_linear_infinite]" />

          {/* Progress segments */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-full w-1 bg-gray-800/20"
              style={{ left: `${i * 2}%` }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {showTerminal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative max-w-2xl w-full"
        >
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-lg border border-cyan-500/20 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-cyan-800/30 bg-cyan-900/20">
              <Terminal size={14} className="text-cyan-500" />
              <span className="text-xs text-cyan-400 font-mono">
                System.Terminal
              </span>
            </div>
            <div className="p-6 font-mono">
              {terminalLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm mb-2"
                >
                  <span className="text-cyan-500"></span>
                  <span className="text-cyan-300">{line}</span>
                </motion.div>
              ))}
              {!showProgress && terminalLines.length < terminalText.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-3 h-5 bg-cyan-400"
                />
              )}
              {showProgress && <ProgressBar />}
            </div>
          </div>
        </motion.div>
      )}

      {showSuccess && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative max-w-2xl w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent blur-2xl" />
          <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-12 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-50" />

            {/* Content */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mx-auto mb-8 w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-400/30"
              >
                <Check className="text-cyan-400" size={40} strokeWidth={1.5} />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-3xl text-center font-light text-cyan-300 mb-6 tracking-wider uppercase">
                  Neural Link Established
                </h2>
                <p className="text-center text-cyan-100/70 mb-8 leading-relaxed">
                  Your digital identity has been synchronized with the
                  mainframe. Welcome to the network, operative.
                </p>

                <div className="flex justify-center">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.reload()}
                    className="group relative px-8 py-3 bg-cyan-500/10 rounded-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 to-cyan-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-2 text-cyan-300 font-medium tracking-wider text-sm">
                      <span>RETURN TO MAINFRAME</span>
                      <ArrowRight size={16} />
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CyberpunkFooter = () => {
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowGlitch(true);
      setTimeout(() => setShowGlitch(false), 150);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 font-mono">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Base text with continuous glow */}
        <motion.div
          className="text-m text-cyan-400 relative z-10"
          animate={{
            textShadow: [
              "0 0 4px #0ff, 0 0 8px rgba(0,255,255,0.3)",
              "0 0 4px #0ff, 0 0 12px rgba(0,255,255,0.5)",
              "0 0 4px #0ff, 0 0 8px rgba(0,255,255,0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.span
            animate={{ skewX: [-0.5, 0.5, -0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            MADE BY ARITRA
          </motion.span>
        </motion.div>

        {/* Glitch effect layers */}
        <AnimatePresence>
          {showGlitch && (
            <>
              <motion.div
                className="absolute inset-0 text-sm text-red-400/50"
                initial={{ x: -2, opacity: 0 }}
                animate={{ x: 2, opacity: 0.5 }}
                exit={{ x: -2, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                MADE BY ARITRA
              </motion.div>
              <motion.div
                className="absolute inset-0 text-sm text-blue-400/50"
                initial={{ x: 2, opacity: 0 }}
                animate={{ x: -2, opacity: 0.5 }}
                exit={{ x: 2, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                MADE BY ARITRA
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Animated decorative lines */}
        <motion.div
          className="absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-full"
          animate={{
            scaleX: [0.9, 1.1, 0.9],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Small scanning line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
          style={{ pointerEvents: "none" }}
        >
          <motion.div
            className="h-[2px] w-full bg-cyan-400/20"
            animate={{
              y: [-20, 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Background subtle flicker */}
        <motion.div
          className="absolute inset-0 bg-cyan-900/5"
          animate={{
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </div>
  );
};

const Orb = ({ index }) => (
  <motion.div
    className="absolute w-96 h-96 rounded-full blur-3xl mix-blend-overlay"
    style={{
      ...utils.getOrbGradient(index),
      top: `${25 + index * 15}%`,
      left: `${20 + index * 20}%`,
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      x: [0, 50, 0],
      y: [0, 30, 0],
    }}
    transition={{
      duration: 10 + index * 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 2,
    }}
  />
);

const GridOverlay = () => (
  <motion.div
    className="absolute inset-0"
    style={{
      background: `linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
      backgroundSize: `${CONSTANTS.GRID_SIZE}px ${CONSTANTS.GRID_SIZE}px`,
    }}
    animate={{
      backgroundPosition: [
        "0px 0px",
        `${CONSTANTS.GRID_SIZE}px ${CONSTANTS.GRID_SIZE}px`,
      ],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

const MouseTrail = ({ mousePosition }) => (
  <motion.div
    className="absolute w-32 h-32 rounded-full pointer-events-none"
    style={{
      background:
        "radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)",
      x: mousePosition.x - 64,
      y: mousePosition.y - 64,
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Utility functions
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// SSR-safe browser detection
const isBrowser = () => typeof window !== "undefined";

const ParticleWithMouseInteraction = React.memo(
  ({ initialPoint, mousePosition, getRandomPoint }) => {
    const controls = useAnimation();

    useEffect(() => {
      const animate = async () => {
        while (true) {
          const targetPoint = getRandomPoint();
          const distance = utils.getDistance(initialPoint, mousePosition);
          const isNearMouse = distance < CONSTANTS.MOUSE_INFLUENCE_RADIUS;

          await controls.start({
            x: isNearMouse
              ? initialPoint.x + (initialPoint.x - mousePosition.x) * 0.1
              : targetPoint.x,
            y: isNearMouse
              ? initialPoint.y + (initialPoint.y - mousePosition.y) * 0.1
              : targetPoint.y,
            opacity: [0, 0.8, 0],
            scale: isNearMouse ? [1, 1.5, 1] : [1, 1.2, 1],
            transition: {
              duration: isNearMouse
                ? 2
                : Math.random() *
                    (CONSTANTS.PARTICLE_ANIMATION_DURATION.MAX -
                      CONSTANTS.PARTICLE_ANIMATION_DURATION.MIN) +
                  CONSTANTS.PARTICLE_ANIMATION_DURATION.MIN,
              ease: isNearMouse ? "easeOut" : "linear",
            },
          });
        }
      };
      animate();
    }, [mousePosition, controls, getRandomPoint, initialPoint]);

    return (
      <motion.div
        className="absolute"
        animate={controls}
        initial={{
          ...initialPoint,
          opacity: 0,
        }}
      >
        <motion.div
          className="w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            boxShadow: "0 0 10px rgba(34, 211, 238, 0.5)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    );
  }
);

const AnimatedBackground = () => {
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({
    width: isBrowser() ? window.innerWidth : 1920,
    height: isBrowser() ? window.innerHeight : 1080,
  });

  const mouseXVelocity = useMotionValue(0);
  const mouseYVelocity = useMotionValue(0);

  // Memoized arrays
  const baseParticles = useMemo(
    () => Array.from({ length: CONSTANTS.BASE_PARTICLES }),
    []
  );
  const constellationParticles = useMemo(
    () => Array.from({ length: CONSTANTS.CONSTELLATION_PARTICLES }),
    []
  );
  const orbs = useMemo(() => Array.from({ length: CONSTANTS.ORBS }), []);

  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Debounced resize handler
  useEffect(() => {
    if (!isBrowser()) return;

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const debouncedHandleResize = debounce(handleResize, 250);

    handleResize();
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  // Throttled mouse movement handler
  useEffect(() => {
    if (!isBrowser()) return;

    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const handleMouseMove = throttle((e) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;

      const velocityX = (e.clientX - lastX) / deltaTime;
      const velocityY = (e.clientY - lastY) / deltaTime;

      mouseXVelocity.set(velocityX);
      mouseYVelocity.set(velocityY);
      setMousePosition({ x: e.clientX, y: e.clientY });

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = currentTime;
    }, 16);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseXVelocity, mouseYVelocity]);

  const getRandomPoint = useCallback(
    () => utils.getRandomPoint(dimensions),
    [dimensions]
  );

  // If not client-side, render minimal content
  if (!isClient) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GridOverlay />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((_, i) => (
        <Orb key={`orb-${i}`} index={i} />
      ))}

      <GridOverlay />

      {constellationParticles.map((_, i) => {
        const initialPoint = getRandomPoint();
        const targetPoint = getRandomPoint();

        return (
          <motion.div
            key={`constellation-${i}`}
            className="absolute w-2 h-2 bg-cyan-300 rounded-full"
            initial={{ ...initialPoint, opacity: 0 }}
            animate={{
              x: [initialPoint.x, targetPoint.x],
              y: [initialPoint.y, targetPoint.y],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <div className="absolute inset-0 blur-sm bg-cyan-300 opacity-50" />
          </motion.div>
        );
      })}

      {baseParticles.map((_, i) => (
        <ParticleWithMouseInteraction
          key={`particle-${i}`}
          initialPoint={getRandomPoint()}
          mousePosition={mousePosition}
          getRandomPoint={getRandomPoint}
        />
      ))}

      <MouseTrail mousePosition={mousePosition} />
    </div>
  );
};

// Enhanced Form Input with Floating Label
const FormInput = ({ label, type = "text", icon: Icon, error, ...props }) => (
  <motion.div
    className="relative"
    // initial={{ opacity: 0, y: 20 }}
    // animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <label className="text-cyan-300 text-sm mb-1 block transform transition-all">
      {label}
    </label>
    <div className="relative group">
      <Icon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 transition-transform group-hover:scale-110"
        size={18}
      />
      <input
        type={type}
        className="w-full bg-gray-900/50 border border-cyan-800/30 rounded-lg py-3 px-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300"
        {...props}
      />
      <motion.div
        className="absolute inset-0 border border-cyan-400 rounded-lg opacity-0 scale-105"
        // animate={props.value ? { opacity: 0.2 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-400 text-xs mt-1"
      >
        {error}
      </motion.p>
    )}
  </motion.div>
);

// Event Card Component with Enhanced Animations
const EventCard = ({
  title,
  description,
  icon: Icon,
  features,
  onClick,
  variant,
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`
      bg-gray-900/40 p-8 rounded-2xl border border-cyan-800/30 backdrop-blur-sm
      hover:bg-gray-900/60 transition-all duration-500 cursor-pointer
      ${
        variant === "primary" ? " border-cyan-500/50 " : "border-purple-500/50 "
      }
    `}
    onClick={onClick}
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center mb-6"
    >
      <div className="relative">
        <Icon
          className={`
            ${variant === "primary" ? "text-cyan-400" : "text-purple-400"}
            transition-all duration-500
          `}
          size={48}
          strokeWidth={1.5}
        />
        <motion.div
          className={`
            absolute -inset-2 rounded-full blur-lg
            ${variant === "primary" ? "bg-cyan-400/20" : "bg-purple-400/20"}
          `}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <h3
        className={`ml-6 text-3xl font-light tracking-wide ${
          variant === "primary" ? "text-cyan-400" : "text-purple-400"
        }`}
      >
        {title}
      </h3>
    </motion.div>
    <p className="text-gray-300 font-light leading-relaxed mb-6">
      {description}
    </p>
    <div className="grid grid-cols-2 gap-4">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-2 text-cyan-200/70"
        >
          <feature.icon size={16} className="flex-shrink-0" />
          <span className="text-sm">{feature.text}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => router.push("/")} // Redirects to home page
        className="relative px-12 py-6 rounded-lg font-medium tracking-wider uppercase text-sm text-white shadow-[0_4px_10px_rgba(128,0,128,0.5)] transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-700 before:to-purple-600 before:opacity-0 before:transition-opacity before:duration-500 before:hover:opacity-100 overflow-hidden"
      >
        <span className="relative z-10 flex items-center">
          Back to Main Page
        </span>
      </button>
    </div>
  );
};
const CyberpunkTitle = () => {
  const [showGlitchEffect, setShowGlitchEffect] = useState(false);
  const [showSliceEffect, setShowSliceEffect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger glitch effect
      setShowGlitchEffect(true);

      // After brief glitch, show slice effect
      setTimeout(() => {
        setShowGlitchEffect(false);
        setShowSliceEffect(true);

        // Remove slice effect after a duration
        setTimeout(() => {
          setShowSliceEffect(false);
        }, 500); // Slice effect duration
      }, 150); // Glitch duration
    }, 1000); // Changed to 1 second cycle

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={audiowide.className}>
      <motion.div className="relative py-8">
        <h1 className="relative text-7xl audiowide">
          <motion.div
            className="relative flex justify-center items-center"
            animate={{
              x: [-1, 1, -1],
            }}
            transition={{
              duration: 0.05,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {/* Base text with glitch effect */}
            {showGlitchEffect && (
              <motion.div
                className="absolute text-cyan-400"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: [0, 1, 0], x: [-5, -2, -5] }}
                transition={{
                  duration: 0.15,
                  times: [0, 0.5, 1],
                }}
              >
                <motion.span
                  animate={{
                    x: [-2, 2, -2],
                    skewX: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  TECH
                </motion.span>
                <motion.span
                  animate={{
                    x: [2, -2, 2],
                    skewX: [5, -5, 5],
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  XTREME
                </motion.span>
              </motion.div>
            )}

            {/* Main text */}
            <div className="relative">
              {/* Static text with basic styling */}
              <motion.div
                className="relative text-cyan-400 font-extrabold text-6xl"
                style={{
                  textShadow: `
                    2px 2px 4px rgba(0, 255, 255, 0.6),   /* Bottom right highlight */
                    -2px -2px 4px rgba(0, 100, 100, 0.8), /* Top left shadow */
                    inset 2px 2px 2px rgba(255, 255, 255, 0.3),  /* Inner highlight */
                    inset -2px -2px 2px rgba(0, 0, 0, 0.7) /* Inner shadow */
                  `,
                }}
              >
                <motion.span>TECH</motion.span>
                <motion.span>XTREME</motion.span>
              </motion.div>

              {/* Slice effect that appears after glitch */}
              {showSliceEffect && (
                <>
                  {glitchOffsets.map((offset, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 text-cyan-400/30 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0.2, 1, 0.5, 1, 0.3], // Flickering effect
                        y: [offset.y * -1, offset.y, offset.y * 1.2], // Moves unpredictably
                        x: [offset.x, offset.x * -1, offset.x * 1.1], // Moves in random directions
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.05,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      style={{
                        clipPath: `polygon(0 ${i * 20}%, 100% ${
                          i * 20
                        }%, 100% ${(i + 1) * 20}%, 0 ${(i + 1) * 20}%)`,
                        transform: `translate(${offset.x}px, ${offset.y}px)`, // Random movement
                      }}
                    >
                      TECHXTREME
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </motion.div>

          {/* Static slice lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-cyan-400/20"
              style={{ top: `${i * 10}%` }}
              animate={{
                scaleX: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </h1>
      </motion.div>
    </div>
  );
};

const IdeathonForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    batchId: "",
    teamName: "",
    projectTitle: "",
    description: "",
  });
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://techxtreme.onrender.com/api/submit",
        {
          formType: "ideathon",
          ...formData,
        }
      );

      console.log(response.data.message);
      setSuccess(true);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  };

  // Enhanced animations
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const formVariants = {
    initial: {
      x: 300,
      opacity: 0,
      rotate: 5,
    },
    animate: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      x: -300,
      opacity: 0,
      rotate: -5,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const inputVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      {success ? (
        <CyberpunkSuccess />
      ) : (
        <>
          <div className={audiowide.className}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="w-full max-w-2xl p-8 rounded-xl backdrop-blur-lg bg-grey/1 border border-cyan-900/70 shadow-xl border-glow "
            >
              <motion.h2
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-3xl mb-8 text-cyan-500 font-[Audiowide] text-center"
              >
                Ideathon Registration
              </motion.h2>

              <form
                onSubmit={handleFormSubmit}
                className="space-y-6"
                autoComplete="off"
              >
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      variants={formVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="flex flex-col gap-6">
                        <motion.div variants={inputVariants}>
                          <label className="block text-cyan-400 mb-2 font-[Audiowide]">
                            Name
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-cyan-900/50 rounded-lg p-3 text-cyan-100 placeholder-cyan-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 transition-all duration-300 autofill:bg-black/50 autofill:text-cyan-100"
                            required
                          />
                        </motion.div>
                        <motion.div variants={inputVariants}>
                          <label className="block text-cyan-400 mb-2 font-[Audiowide]">
                            Email
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-cyan-900/50 rounded-lg p-3 text-cyan-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            required
                          />
                        </motion.div>
                      </div>
                      <motion.div
                        className="flex justify-end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={handleNext}
                          className="relative px-8 py-3 font-[Audiowide] text-cyan-300
                    border border-cyan-500 rounded-lg backdrop-blur-lg
                    bg-black/10 shadow-md shadow-cyan-500/20
                    transition-transform duration-300 ease-in-out"
                        >
                          Proceed
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      variants={formVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="flex flex-col gap-6">
                        <motion.div variants={inputVariants}>
                          <label className="block text-cyan-400 mb-2 font-[Audiowide]">
                            Batch ID
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="batchId"
                            value={formData.batchId}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-cyan-900/50 rounded-lg p-3 text-cyan-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            required
                          />
                        </motion.div>
                        <motion.div variants={inputVariants}>
                          <label className="block text-cyan-400 mb-2 font-[Audiowide]">
                            Team Name
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="teamName"
                            value={formData.teamName}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-cyan-900/50 rounded-lg p-3 text-cyan-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            required
                          />
                        </motion.div>
                      </div>
                      <motion.div
                        className="flex justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={handleBack}
                          className="relative px-8 py-3 font-[Audiowide] text-cyan-300
                    border border-cyan-500 rounded-lg backdrop-blur-lg
                    bg-black/10 shadow-md shadow-cyan-500/20
                    transition-transform duration-300 ease-in-out"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={handleNext}
                          className="relative px-8 py-3 font-[Audiowide] text-cyan-300
                    border border-cyan-500 rounded-lg backdrop-blur-lg
                    bg-black/10 shadow-md shadow-cyan-500/20
                    transition-transform duration-300 ease-in-out"
                        >
                          Proceed
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      variants={formVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="flex flex-col gap-6">
                        <motion.div variants={inputVariants}>
                          <label className="block text-cyan-400 mb-2 font-[Audiowide]">
                            Project Title
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="projectTitle"
                            value={formData.projectTitle}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-cyan-900/50 rounded-lg p-3 text-cyan-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            required
                          />
                        </motion.div>
                        <motion.div variants={inputVariants}>
                          <label className="block text-cyan-400 mb-2 font-[Audiowide]">
                            Brief Description
                          </label>
                          <motion.textarea
                            whileFocus={{ scale: 1.02 }}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-cyan-900/50 rounded-lg p-3 text-cyan-100 focus:outline-none focus:border-cyan-500 transition-colors h-24"
                            required
                          />
                        </motion.div>
                      </div>
                      <motion.div
                        className="flex justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={handleNext}
                          className="relative px-8 py-3 font-[Audiowide] text-cyan-300
                    border border-cyan-500 rounded-lg backdrop-blur-lg
                    bg-black/10 shadow-md shadow-cyan-500/20
                    transition-transform duration-300 ease-in-out"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          className="relative px-8 py-3 font-[Audiowide] text-cyan-300
                    border border-cyan-500 rounded-lg backdrop-blur-lg
                    bg-black/10 shadow-md shadow-cyan-500/20
                    transition-transform duration-300 ease-in-out"
                        >
                          Initialize
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
            <button
              onClick={() => window.location.reload()}
              className="relative mt-6 ml-16 px-12 py-6 rounded-lg font-medium tracking-wider uppercase text-sm text-white shadow-[0_4px_10px_rgba(128,0,128,0.5)] transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-700 before:to-purple-600 before:opacity-0 before:transition-opacity before:duration-500 before:hover:opacity-100 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Back to Main Page
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

import { Bot, ChevronLeft, ChevronRight, Cpu } from "lucide-react";

const GenAIForm = ({ onSubmit }) => {
  const [page, setPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    batch: "",
    id: "",
    cloudUrl: "",
    tshirtSize: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const formFields = [
    [
      { name: "name", label: "Registered Name", type: "text" },
      { name: "email", label: "Email", type: "email" },
    ],
    [
      { name: "batch", label: "Batch", type: "text" },
      { name: "id", label: "ID", type: "text" },
    ],
    [
      { name: "cloudUrl", label: "Cloud Skill Boost URL", type: "url" },
      {
        name: "tshirtSize",
        label: "T-shirt Size",
        type: "select",
        options: ["S", "M", "L", "XL", "XXL"],
      },
    ],
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(page + 1);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(page - 1);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://techxtreme.onrender.com/api/submit",
        {
          formType: "genai",
          ...formData,
        }
      );

      console.log(response.data.message);
      setIsSubmitted(true);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  };

  const getProgressText = (idx) => {
    if (idx < page) return "■ COMPLETE ■";
    if (idx === page) return "► ACTIVE ◄";
    return "□ PENDING □";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      {isSubmitted ? (
        <CyberpunkSuccess />
      ) : (
        <div className="w-full max-w-2xl backdrop-blur-lg bg-black/10 rounded-xl shadow-2xl overflow-hidden border border-cyan-500/20">
          {/* Decorative header */}
          <div className="relative h-16 bg-cyan-500/10 flex items-center justify-center overflow-hidden">
            <button
              onClick={() => setShowCulturalForm(false)}
              className="absolute left-4 top-4 p-2 text-white transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="absolute animate-spin-slow">
              <Cpu className="w-32 h-32 text-cyan-500/20" />
            </div>
            <div className="relative z-10 animate-bounce">
              <Bot className="w-8 h-8 text-cyan-400" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Terminal-style Progress Bar */}
            <div className="bg-gray-900/60 rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-2 text-cyan-400">
                <Terminal className="w-4 h-4" />
                <span className="animate-pulse">
                  {" "}
                  GENAI.FORM.progress_status
                </span>
              </div>
              {formFields.map((_, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`flex items-center gap-2 p-1 ${
                      idx === page
                        ? "text-cyan-300"
                        : idx < page
                        ? "text-green-400"
                        : "text-gray-500"
                    }`}
                  >
                    <div className="w-24 text-right">{`SECTION_${
                      idx + 1
                    }`}</div>
                    <div className="flex-1 flex items-center gap-2">
                      <div
                        className={`h-0.5 flex-1 ${
                          idx <= page ? "bg-cyan-400" : "bg-gray-600"
                        }`}
                      >
                        {idx <= page && (
                          <div className="h-full w-full animate-loading-bar bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                        )}
                      </div>
                      <div
                        className={`text-xs whitespace-nowrap ${
                          idx === page ? "animate-pulse" : ""
                        }`}
                      >
                        {getProgressText(idx)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-2 text-xs text-cyan-400/60 border-t border-cyan-500/20 pt-2">
                {`// Total Progress: ${Math.round(
                  (page / (formFields.length - 1)) * 100
                )}%`}
              </div>
            </div>

            {/* Form fields with transition */}
            <div
              className={`space-y-6 transition-all duration-300 transform
            ${
              isTransitioning
                ? "opacity-0 translate-x-full"
                : "opacity-100 translate-x-0"
            }`}
            >
              {formFields[page].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="block text-cyan-300 text-sm font-medium">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full bg-black text-white border-2 border-cyan-500/30 rounded-lg
                   px-4 py-2 focus:border-cyan-400 focus:ring-cyan-400 transition-colors
                   hover:border-cyan-400/50"
                    >
                      <option value="">Select size</option>
                      {field.options.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="text-white"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full bg-black/5 backdrop-blur-sm border-2 border-cyan-500/30 rounded-lg
                    px-4 py-2 text-white focus:border-cyan-400 focus:ring-cyan-400 transition-colors
                    hover:border-cyan-400/50"
                      required
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4">
              {page > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center px-4 py-2 text-cyan-300 hover:text-cyan-100
                transition-all hover:scale-105 active:scale-95 backdrop-blur-sm bg-white/5
                rounded-lg border border-cyan-500/30"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={
                  page === formFields.length - 1 ? handleSubmit : handleNext
                } // Dynamic function call
                className="flex items-center bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/50
  hover:bg-cyan-400/30 text-cyan-300 px-6 py-2 rounded-lg ml-auto transition-all
  hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-cyan-400/20"
              >
                {page === formFields.length - 1 ? "Submit" : "Next"}
                {page !== formFields.length - 1 && (
                  <ChevronRight className="w-5 h-5 ml-2" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

import { PartyPopper, Sparkles } from "lucide-react";

import { Palette, Theater } from "lucide-react";

const CulturalForm = ({ onSubmit }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    customEvent: "",
    participants: "",
    duration: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Progress icons based on cultural events
  const progressIcons = [
    { icon: Palette, label: "Registration" },
    { icon: Mic, label: "Event Selection" },
    { icon: Theater, label: "Performance Details" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "event" && value !== "other" ? { customEvent: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://techxtreme.onrender.com/api/submit",
        {
          formType: "cultural",
          ...formData,
        }
      );

      console.log(response.data.message);
      setIsSubmitted(true);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className={`${playFont.className} text-xl`}>
      {isSubmitted ? (
        <div className="min-h-screen p-6 flex items-center justify-center bg-black relative overflow-hidden">
          <CyberpunkSuccess />
        </div>
      ) : (
        <div className="min-h-screen p-6 flex items-center justify-center bg-black relative overflow-hidden">
          {/* Cyberpunk Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,0,199,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,0,199,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(99,0,199,0.15),transparent)]" />
          </div>

          {/* Enhanced Floating Elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(18)].map((_, i) => (
              <div
                key={`music-${i}`}
                className="absolute animate-floating"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationName: "float",
                  animationDuration: `${10 + Math.random() * 5}s`,
                  animationIterationCount: "infinite",
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <Music
                  className="text-purple-500/30 drop-shadow-[0_0_10px_rgba(99,0,199,0.5)]"
                  size={40 + Math.random() * 40}
                  style={{ transform: `rotate(${Math.random() * 360}deg)` }}
                />
              </div>
            ))}
            {[...Array(8)].map((_, i) => (
              <div
                key={`party-${i}`}
                className="absolute animate-floating"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationName: "float",
                  animationDuration: `${10 + Math.random() * 5}s`,
                  animationIterationCount: "infinite",
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <PartyPopper
                  className="text-purple-500/30 drop-shadow-[0_0_10px_rgba(99,0,199,0.5)]"
                  size={30 + Math.random() * 30}
                  style={{ transform: `rotate(${Math.random() * 360}deg)` }}
                />
              </div>
            ))}
          </div>

          <div className="w-full max-w-md relative">
            {/* Enhanced Form Container */}
            <div className="backdrop-blur-xl bg-black/10 rounded-2xl p-8 shadow-[0_0_20px_rgba(99,0,199,0.3)] border border-purple-500/30">
              {/* Enhanced Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                  <Sparkles className="w-8 h-8 text-purple-500" />
                  Cultural Fest
                  <Star className="w-8 h-8 text-purple-500" />
                </h2>
                <div className="mt-2 text-purple-400/80">Registration Form</div>
              </div>

              {/* Enhanced Cultural Progress Bar */}
              <div className="mb-12 relative">
                {/* Progress Line */}
                <div className="h-1 bg-purple-900/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${(step + 1) * 25}%`,
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s linear infinite",
                    }}
                  />
                </div>

                {/* Cultural Icons Progress */}
                <div className="absolute -bottom-8 left-0 w-full flex justify-between mt-4">
                  {progressIcons.map((icon, i) => {
                    const Icon = icon.icon;
                    return (
                      <div
                        key={i}
                        className={`flex flex-col items-center transition-all duration-500 ${
                          i <= step ? "text-purple-400" : "text-purple-900"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${
                            i <= step
                              ? "bg-purple-500 shadow-[0_0_10px_rgba(99,0,199,0.5)]"
                              : "bg-purple-900/30"
                          }`}
                        >
                          <Icon
                            size={20}
                            className={
                              i <= step ? "text-black" : "text-purple-700"
                            }
                          />
                        </div>
                        <span className="text-xs mt-1">{icon.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Steps with Enhanced Styling */}
                <div className="relative min-h-[200px]">
                  {/* Step 1 */}
                  <div
                    className={`absolute w-full transition-all duration-500 ${
                      step === 0
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-full pointer-events-none"
                    }`}
                  >
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/30 text-purple-100 placeholder-purple-400/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/30 text-purple-100 placeholder-purple-400/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div
                    className={`absolute w-full transition-all duration-500 ${
                      step === 1
                        ? "opacity-100 translate-x-0"
                        : step < 1
                        ? "opacity-0 -translate-x-full pointer-events-none"
                        : "opacity-0 translate-x-full pointer-events-none"
                    }`}
                  >
                    <div className="space-y-4">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/30 text-purple-100 placeholder-purple-400/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                      <select
                        name="event"
                        value={formData.event}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/30 text-purple-100 placeholder-purple-400/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none"
                      >
                        <option value="" className="bg-black">
                          Select Event
                        </option>
                        <option value="dance" className="bg-black">
                          Classical Dance
                        </option>
                        <option value="music" className="bg-black">
                          Musical Performance
                        </option>
                        <option value="Instrumental" className="bg-black">
                          Instrumental
                        </option>
                        <option value="Standup Comedy" className="bg-black">
                          Standup Comedy
                        </option>
                        <option value="other" className="bg-black">
                          Other
                        </option>
                      </select>
                      {formData.event === "other" && (
                        <input
                          type="text"
                          name="customEvent"
                          placeholder="Enter your event"
                          value={formData.customEvent || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/30 text-purple-100 placeholder-purple-400/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                      )}
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div
                    className={`absolute w-full transition-all duration-500 ${
                      step === 2
                        ? "opacity-100 translate-x-0"
                        : step < 2
                        ? "opacity-0 -translate-x-full pointer-events-none"
                        : "opacity-0 translate-x-full pointer-events-none"
                    }`}
                  >
                    <div className="space-y-4">
                      <input
                        type="number"
                        name="participants"
                        placeholder="Number of Participants"
                        value={formData.participants}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/30 text-purple-100 placeholder-purple-400/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                      <input
                        type="text"
                        name="duration"
                        placeholder="Performance Duration (minutes)"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/30 text-purple-100 placeholder-purple-400/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Step 4 */}
                </div>

                {/* Enhanced Navigation Buttons */}
                <div className="flex justify-between gap-4 pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 0}
                    className={`px-6 py-2 rounded-lg transition-all ${
                      step === 0
                        ? "opacity-50 cursor-not-allowed bg-purple-900/20 text-purple-400/50"
                        : "bg-black border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:shadow-[0_0_10px_rgba(99,0,199,0.3)]"
                    }`}
                  >
                    Back
                  </button>

                  {step === 3 ? (
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-all hover:shadow-[0_0_15px_rgba(99,0,199,0.5)]"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-all hover:shadow-[0_0_15px_rgba(99,0,199,0.5)]"
                    >
                      Next
                    </button>
                  )}
                </div>
              </form>
            </div>
            <BackButton />
          </div>

          <style jsx global>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0) rotate(0deg);
              }
              50% {
                transform: translateY(-20px) rotate(10deg);
              }
            }

            @keyframes shimmer {
              0% {
                background-position: 200% 0;
              }
              100% {
                background-position: -200% 0;
              }
            }

            .animate-floating {
              animation: float 6s ease-in-out infinite;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

import { Music2 } from "lucide-react";

const AudienceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    batchId: "",
    email: "",
    phone: "",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://techxtreme.onrender.com/api/submit",
        {
          formType: "audience",
          ...formData,
        }
      );

      if (response.status === 201) {
        setShowSuccess(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Background floating elements
  const FloatingElement = ({ children, className, style }) => (
    <motion.div
      className={`absolute ${className}`}
      style={style} // Pass the style prop to the motion.div
      animate={{
        y: ["0%", "-20%", "0%"],
        x: ["0%", "10%", "-10%", "0%"],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration: Math.random() * 5 + 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );

  const floatingIcons = [
    { Icon: Ticket, color: "text-purple-400" },
    { Icon: Music, color: "text-blue-400" },
    { Icon: Mic, color: "text-pink-400" },
    { Icon: Sparkles, color: "text-yellow-400" },
    { Icon: Music2, color: "text-green-400" },
    { Icon: Headphones, color: "text-red-400" },
    { Icon: Star, color: "text-orange-400" },
    { Icon: PartyPopper, color: "text-indigo-400" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => {
          const { Icon, color } = floatingIcons[i % floatingIcons.length];
          const top = Math.random() * 100; // Random top position (0% to 100%)
          const left = Math.random() * 100; // Random left position (0% to 100%)
          const size = Math.random() * 2 + 1; // Random size between 1x and 3x

          return (
            <FloatingElement
              key={i}
              className={`${color} opacity-20`}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                transform: `scale(${size})`,
              }}
            >
              <Icon className="w-8 h-8" />
            </FloatingElement>
          );
        })}
      </div>
      <div className="max-w-4xl mx-auto pt-12 px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <CyberpunkTitle></CyberpunkTitle>
          <div className={audiowide.className}>
            <motion.div
              className="text-purple-200 text-2xl font-light font-architype mr-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Two Days. Endless Possibilities.
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="benefits"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="backdrop-blur-xxl bg-black-15 rounded-3xl p-8 mb-8 border border-black/20 shadow-[0_8px_12px_rgba(126,34,206,0.4)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Trophy,
                    title: "SIT and ENJOY",
                    desc: "Get access to the Tickets",
                    color: "bg-purple-400",
                  },
                  {
                    icon: Music,
                    title: "Live Shows",
                    desc: "Your peers perform",
                    color: "bg-blue-500",
                  },
                  {
                    icon: Star,
                    title: "Special Perks",
                    desc: "Exclusive merchandise and swags",
                    color: "bg-cyan-500",
                  },
                  {
                    icon: PartyPopper,
                    title: "Fun Events",
                    desc: "Participate and Enjoy!",
                    color: "bg-purple-500",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className={`p-3 ${item.color} rounded-xl shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-purple-200">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg border border-white/20 backdrop-blur-sm"
                onClick={nextStep}
              >
                Get Your Ticket Now
              </motion.button>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="personal-info"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="backdrop-blur-xl bg-black/10 rounded-3xl p-8 mb-8 border border-black/20 shadow-[0_8px_12px_rgba(126,34,206,0.4)]"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">
                Personal Information
              </h2>
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <label className="block text-purple-200 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/5 border border-purple-500/30 focus:border-purple-500 text-white backdrop-blur-md"
                    placeholder="Enter your full name"
                    required
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <label className="block text-purple-200 mb-2">Batch</label>
                  <input
                    type="text"
                    value={formData.batchId}
                    onChange={(e) => handleChange("batchId", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/5 border border-purple-500/30 focus:border-purple-500 text-white backdrop-blur-md"
                    placeholder="Enter your batch ID"
                    required
                  />
                </motion.div>
              </div>

              <div className="flex gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 backdrop-blur-md bg-white/10 text-white font-semibold py-4 px-6 rounded-xl border border-white/20"
                  onClick={prevStep}
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg border border-white/20"
                  onClick={nextStep}
                >
                  Next
                </motion.button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="contact-info"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="backdrop-blur-xl bg-black/10 rounded-3xl p-8 mb-8 border border-black/20 shadow-[0_8px_12px_rgba(126,34,206,0.4)]"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">
                Contact Details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <label className="block text-purple-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/5 border border-purple-500/30 focus:border-purple-500 text-white backdrop-blur-md"
                    placeholder="Enter your email"
                    required
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <label className="block text-purple-200 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/5 border border-purple-500/30 focus:border-purple-500 text-white backdrop-blur-md"
                    placeholder="Enter your phone number"
                    required
                  />
                </motion.div>

                <div className="flex gap-4 mt-8">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 backdrop-blur-md bg-white/10 text-white font-semibold py-4 px-6 rounded-xl border border-white/20"
                    onClick={prevStep}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg border border-white/20"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <Star className="animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        Complete Registration
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <BackButton />

        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 p-8 rounded-3xl max-w-md w-full mx-4 backdrop-blur-xl border border-white/20 shadow-2xl"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-24 h-24 mx-auto mb-6"
              >
                <Ticket className="w-full h-full text-purple-400" />
              </motion.div>

              <motion.h3
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-3xl font-bold text-white text-center mb-4"
              >
                You're Going to the Festival! 🎉
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-purple-200 text-center mb-8"
              >
                Check your email for your digital ticket and exclusive event
                details.
              </motion.p>

              <motion.div className="space-y-4">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Digital ticket sent to your email</span>
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Event schedule and map included</span>
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Check In will be done at the Venue</span>
                </motion.div>
              </motion.div>

              <div className="mt-8 flex justify-center">
                <motion.div
                  className="relative"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        transform: `rotate(${i * 45}deg) translateY(-40px)`,
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-purple-400/60" />
                    </motion.div>
                  ))}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <PartyPopper className="w-12 h-12 text-purple-400" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const TechXtremeApp = () => {
  const [activeRegistration, setActiveRegistration] = useState(null);
  const [registrationType, setRegistrationType] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showCulturalEvents, setShowCulturalEvents] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const handleSubmit = (formData) => {
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      if (screenWidth < 740) {
        setIsMobile(true);
        router.push("/unsupported");
      }
    }
  }, []);

  if (isMobile) {
    return null;
  }
  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-900
               flex flex-col justify-center items-center overflow-hidden
             "
    >
      <CyberpunkFooter />
      <AnimatedBackground />
      <AnimatePresence>
        {submitted ? (
          <CyberpunkSuccess
            setSubmitted={setSubmitted}
            setActiveRegistration={setActiveRegistration}
          />
        ) : (
          <>
            {!activeRegistration && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 max-w-6xl"
              >
                {!showCulturalEvents ? (
                  <div>
                    <CyberpunkTitle />

                    <div className="grid grid-cols-2 gap-8 mb-16">
                      <EventCard
                        title="IdeaThon"
                        description="Innovative problem-solving marathon. Collaborative tech challenges driving breakthrough solutions across emerging technological domains."
                        icon={Lightbulb}
                        features={[
                          { icon: Code, text: "Coding Challenges" },
                          { icon: Brain, text: "Problem Solving" },
                          { icon: Rocket, text: "Innovation" },
                          { icon: Globe, text: "Global Participation" },
                        ]}
                        onClick={() => setActiveRegistration("ideathon")}
                        variant="primary"
                      />
                      <EventCard
                        title="Cultural Fest"
                        description="A celebration of culture, art, and creativity. Showcase your talents in music, dance, drama, and more."
                        icon={Music}
                        features={[
                          { icon: Ticket, text: "Performances" },
                          { icon: Camera, text: "Photography" },
                          { icon: Heart, text: "Cultural Exchange" },
                          { icon: BookOpen, text: "Storytelling" },
                        ]}
                        onClick={() => setShowCulturalEvents(true)}
                        variant="secondary"
                      />
                    </div>

                    <div className="flex justify-center space-x-8 animate-fade-in-up">
                      <button
                        onClick={() => setActiveRegistration("ideathon")}
                        className="relative px-12 py-6 rounded-lg font-medium tracking-wider uppercase text-sm text-white shadow-[0_4px_10px_rgba(0,255,255,0.5)] transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-700 before:to-cyan-600 before:opacity-0 before:transition-opacity before:duration-500 before:hover:opacity-100 overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center">
                          <Award className="mr-3 inline" strokeWidth={1.5} />
                          Day 1 Registration
                        </span>
                      </button>

                      <button
                        onClick={() => setShowCulturalEvents(true)}
                        className="relative px-12 py-6 rounded-lg font-medium tracking-wider uppercase text-sm text-white shadow-[0_4px_10px_rgba(128,0,128,0.5)] transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-700 before:to-purple-600 before:opacity-0 before:transition-opacity before:duration-500 before:hover:opacity-100 overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center">
                          <Users className="mr-3 inline" strokeWidth={1.5} />
                          Day 2 Registration
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-10">
                      <EventCard
                        title="GenAI Study Jams Swags"
                        description="Distribution of official merchandise from Google for securing Top 80 spot in GenAI Study Jams"
                        icon={Gift}
                        features={[
                          { icon: Trophy, text: "Top 80 Achievers" },
                          { icon: Gift, text: "Exclusive Google Merch" },
                          { icon: Badge, text: "Official Recognition" },
                          { icon: Star, text: "Elite Performer Status" },
                        ]}
                        onClick={() => setActiveRegistration("genai")}
                        variant="primary"
                      />
                      <EventCard
                        title="Cultural Programs"
                        description="Join our vibrant cultural showcases, featuring music, dance, standup, and much more!"
                        icon={Music}
                        features={[
                          { icon: Mic, text: "Live Performances" },
                          { icon: Laugh, text: "Standup Comedy" },
                          { icon: Globe, text: "Open to All" },
                          { icon: Plus, text: "Surprise Events" },
                        ]}
                        onClick={() => setActiveRegistration("cultural")}
                        variant="secondary"
                      />
                      <EventCard
                        title="Attendee Registration"
                        description="Register to be part of the TechXtreme experience as an audience member."
                        icon={Users}
                        features={[
                          { icon: Ticket, text: "Free Entry" },
                          { icon: MessageCircle, text: "Networking" },
                        ]}
                        onClick={() => setActiveRegistration("audience")}
                        variant="primary"
                      />
                    </div>
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={() => setShowCulturalEvents(false)}
                        className="relative px-12 py-6 rounded-lg font-medium tracking-wider uppercase text-sm text-white shadow-[0_4px_10px_rgba(128,0,128,0.5)] transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-700 before:to-purple-600 before:opacity-0 before:transition-opacity before:duration-500 before:hover:opacity-100 overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center">
                          <Users className="mr-3 inline" strokeWidth={1.5} />
                          Back to Main Page
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {activeRegistration && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 w-full h-full z-10"
              >
                {activeRegistration === "ideathon" && (
                  <IdeathonForm onSubmit={handleSubmit} />
                )}
                {activeRegistration === "genai" && (
                  <GenAIForm onSubmit={handleSubmit} />
                )}
                {activeRegistration === "cultural" && (
                  <CulturalForm onSubmit={handleSubmit} />
                )}
                {activeRegistration === "audience" && (
                  <AudienceForm onSubmit={handleSubmit} />
                )}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default TechXtremeApp;
