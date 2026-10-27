import { Link } from "react-router-dom";
import { SITE } from "../config.js";
import { useRegister } from "./Register.jsx";
import { ArrowUpRight } from "lucide-react";

// Lucide dropped brand logos, so these two are drawn in the same stroke style.
const SocialIcon = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const Instagram = () => (
  <SocialIcon><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></SocialIcon>
);
const Youtube = () => (
  <SocialIcon><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></SocialIcon>
);

export default function Footer() {
  const openRegister = useRegister();
  return (
    <footer className="site-footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <img src="/assets/FIRM-Church.png" alt="" />
          <p>Laboring till Christ is formed in every heart!</p>
          <p>Ilorin, Kwara State, Nigeria</p>
        </div>
        <div>
          <h3 className="footer__heading">FIRM CAMP 2026</h3>
          <ul className="footer__links">
            <li><Link to="/#gathering">The Meeting</Link></li>
            <li><Link to="/#leaders">Leading the Way</Link></li>
            <li><Link to="/#schedule">Schedule</Link></li>
            <li><Link to="/#faqs">FAQs</Link></li>
            <li><Link to="/watch">Watch Live</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer__heading">Socials</h3>
          <ul className="footer__links">
            <li><a className="footer__social" href={SITE.instagramUrl} target="_blank" rel="noopener" aria-label="Instagram: @firmchurchglobal"><Instagram />@firmchurchglobal</a></li>
            <li><a className="footer__social" href={SITE.youtubeChannelUrl} target="_blank" rel="noopener" aria-label="YouTube: @firmchurchglobal"><Youtube />@firmchurchglobal</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>FIRM CAMP 2026 is an initiative of FIRM Church Global</p>
        <button className="footer__register" onClick={openRegister}>Register <ArrowUpRight /></button>
      </div>
    </footer>
  );
}
