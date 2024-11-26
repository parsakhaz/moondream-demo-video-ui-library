import { motion } from "framer-motion";

export function Usage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 text-white"
    >
      <h1 className="text-3xl font-bold">Usage</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recording Components</h2>
        <ol className="list-decimal list-inside space-y-4 text-white/80">
          <li>Enable desired components using the sidebar toggles</li>
          <li>
            Position your recording software to capture the component area
          </li>
          <li>
            Use the &quot;Reset Animations&quot; button to restart animations
          </li>
          <li>Key out the blue background (#0000FF) in your video editor</li>
        </ol>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Component Configuration</h2>
        <p className="text-white/80">
          Each component can be configured through the UI:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-white/80">
          <li>
            Click the &quot;Edit Config&quot; button next to any component
          </li>
          <li>Modify the JSON configuration</li>
          <li>Save changes to see immediate updates</li>
        </ol>
        <p className="text-white/80">
          Configurations are organized into sections for content, animations,
          and visual styling. All settings persist in localStorage.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-white/80">
          <li>Record at 60fps for smooth animations</li>
          <li>Use high-quality chroma key settings in your editor</li>
          <li>Enable one component at a time for best results</li>
          <li>Consider recording at a higher resolution and scaling down</li>
          <li>Adjust component configurations to match your needs</li>
        </ul>
      </div>

      <div className="p-4 bg-white/10 rounded-lg">
        <h3 className="font-semibold mb-2">Pro Tip</h3>
        <p className="text-white/80">
          For the cleanest key, ensure your recording software is set to capture
          in the highest quality possible, and use a codec that maintains color
          accuracy. Take time to experiment with component configurations to
          achieve your desired effect.
        </p>
      </div>
    </motion.div>
  );
}
