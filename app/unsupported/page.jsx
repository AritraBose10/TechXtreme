"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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
          className="text-sm text-cyan-400 relative z-10"
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

const TypingText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [displayText, text]);

  return <span>{displayText}</span>;
};

const Unsupported = () => {
  const [particles, setParticles] = useState([]);
  const [terminalLines, setTerminalLines] = useState([
    "DEVICE NOT SUPPORTED",
    "DESKTOP VIEW REQUIRED",
    "SWITCH TO PC OR DESKTOP VIEW",
  ]);
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 150 }, () => ({
        id: Math.random().toString(36).substr(2, 9),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3,
        speed: Math.random() * 3 + 0.5,
        opacity: Math.random(),
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const particleInterval = setInterval(generateParticles, 4000);

    return () => clearInterval(particleInterval);
  }, []);

  useEffect(() => {
    if (terminalLines.length > 0) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) =>
          prev.length < terminalLines.length
            ? [...prev, terminalLines[prev.length]]
            : prev
        );
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [terminalLines, visibleLines]);

  return (
    <div className="relative min-h-screen bg-black text-cyan-400 overflow-hidden flex items-center justify-center p-4 font-mono">
      {/* Grid and Particle Background */}
      <div
        className="absolute inset-0 pointer-events-none animate-glitch-grid"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.3,
        }}
      />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-cyan-500 rounded-full"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: particle.opacity,
          }}
          animate={{
            y: [particle.y, particle.y + 200],
            opacity: [particle.opacity, 0],
            x: [particle.x, particle.x + (Math.random() * 100 - 50)],
          }}
          transition={{
            duration: particle.speed * 3,
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-xl w-full p-8 bg-gray-900/80 rounded-xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
        <div className="text-4xl font-bold mb-8 text-cyan-200 animate-glitch">
          MOBILE ACCESS DENIED
        </div>

        {/* Terminal Lines */}
        <div className="terminal-container text-left mb-8 space-y-2 h-36">
          <AnimatePresence>
            {visibleLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="text-cyan-400 text-lg tracking-wider"
              >
                &gt; <TypingText text={line} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-xl text-cyan-300 animate-pulse">
            IMMEDIATE ACTION REQUIRED
          </p>
          <p className="text-cyan-500">
            If facing issues, complete registration via Google Form
          </p>
        </div>

        <div className="space-x-4">
          <a
            href="https://linktr.ee/techxtreme2025"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded-lg transition-all hover:scale-105 hover:shadow-cyan-500/50 hover:shadow-lg"
          >
            GOOGLE FORM
          </a>
        </div>

        <div className="mt-6 text-xs text-cyan-400 opacity-60 tracking-widest">
          ERROR: MOB-UNSUP-PROTO-v2.4 | DESKTOP ENFORCEMENT
        </div>
      </div>
      <CyberpunkFooter />
    </div>
  );
};

export default Unsupported;
