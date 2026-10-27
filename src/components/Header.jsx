import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useRegister } from "./Register.jsx";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LINKS = [
  { to: "/#schedule", label: "Schedule" },
  { to: "/watch", label: "Watch" },
  { to: "/#faqs", label: "FAQs" },
  { to: "/support", label: "Support" },
];

export default function Header({ dark = false }) {
  const [open, setOpen] = useState(false);
  const openRegister = useRegister();
  const links = LINKS.map((l) => (
    <li key={l.label}>
      {l.to.includes("#") ? <Link to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
        : <NavLink to={l.to} onClick={() => setOpen(false)}>{l.label}</NavLink>}
    </li>
  ));
  return (
    <header className={`site-header${dark ? " site-header--dark" : ""}`}>
      {dark && <Glow />}
      <div className="site-header__bar">
        <nav className="site-nav" aria-label="Main">
          <Link className="site-nav__logo" to="/"><img src={'/assets/logo.svg'} alt="FIRM CAMP home" /></Link>
          <ul className="site-nav__links">{links}</ul>
        </nav>
        <div className="header-actions">
          <button className="btn-register" onClick={openRegister}>Register <ArrowUpRight /></button>
          <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      <div className="mobile-menu" id="mobile-menu" hidden={!open}><ul>{links}</ul></div>
    </header>
  );
}

export function Glow() {
  return <div className="glow" aria-hidden="true"><span className="g1" /><span className="g2" /><span className="g3" /></div>;
}
