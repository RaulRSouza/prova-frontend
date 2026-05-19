import { motion } from "framer-motion";

export function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-100" />

      {/* Radial mask — fade grid at edges */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)] bg-page-bg dark:bg-dark-page" />

      {/* Scanline */}
      <motion.div
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-400/40 to-transparent"
      />

      {/* Top-right glow blob */}
      <div
        className="absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full blur-3xl opacity-20 dark:opacity-25"
        style={{ background: "radial-gradient(circle, #00b97c 0%, transparent 70%)" }}
      />

      {/* Bottom-left glow */}
      <div
        className="absolute -bottom-32 -left-32 h-[360px] w-[360px] rounded-full blur-3xl opacity-10 dark:opacity-15"
        style={{ background: "radial-gradient(circle, #00b97c 0%, transparent 70%)" }}
      />
    </div>
  );
}
