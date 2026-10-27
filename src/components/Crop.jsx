// An image placed exactly as it was cropped in Figma.
export default function Crop({ src, crop, alt = "" }) {
  const [l, t, w, h] = crop;
  return <img className="crop" src={`/assets/${encodeURIComponent(src)}`} alt={alt} style={{ "--l": `${l}%`, "--t": `${t}%`, "--w": `${w}%`, "--h": `${h}%` }} />;
}
