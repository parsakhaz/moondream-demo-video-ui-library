import { motion } from "framer-motion";

export function Overview() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 text-white"
    >
      <h1 className="text-3xl font-bold">Overview</h1>

      <p className="text-white/80 leading-relaxed">
        This UI Component Library is designed specifically for video content
        creators who need high-quality, animated UI components for their
        productions. Each component is built with a chroma key background
        (#0000FF) for easy keying in video editing software.
      </p>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-white/80">
          <li>Pre-built animated components</li>
          <li>Chroma key ready (#0000FF background)</li>
          <li>Individual component controls</li>
          <li>Animation reset functionality</li>
          <li>Responsive design</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-white/80">
          <li>Tutorial videos</li>
          <li>Product demonstrations</li>
          <li>Technical presentations</li>
          <li>Educational content</li>
          <li>Software showcases</li>
        </ul>
      </div>
    </motion.div>
  );
}
