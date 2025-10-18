
import "./Waves.css";

// A lightweight animated background using CSS gradients and floating blobs.
export default function AnimatedBg() {
  return (
    <div className="animated-bg" aria-hidden="true">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <div className="grain" />
    </div>
  );
}
