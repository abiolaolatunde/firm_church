import { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Check, Copy } from "lucide-react";

const ACCOUNT = { name: "The Calledout Place", bank: "Moniepoint", number: "4373660383" };

export default function Support() {
  const [label, setLabel] = useState("Copy");
  const copy = async () => {
    try { await navigator.clipboard.writeText(ACCOUNT.number); setLabel("Copied"); }
    catch { setLabel(ACCOUNT.number); }
    setTimeout(() => setLabel("Copy"), 2000);
  };
  return (
    <>
      <Header dark />
      <main className="page page--support">
        <h1 className="page__title">Support</h1>
        <p className="page__lede">FIRM CAMP 2026 is made possible by the generosity of people who believe in this movement. Thank you for giving.</p>
        <section className="give">
          <div>
            <h2>FIRM Church Global</h2>
            <p className="give__note">Give towards the life and mission of FIRM CHURCH GLOBAL, Ilorin, Kwara State.</p>
          </div>
          <dl className="account">
            <dt>{ACCOUNT.name}</dt>
            <dd className="account__bank">{ACCOUNT.bank}</dd>
            <dd className="account__number">{ACCOUNT.number}</dd>
            <dd><button className="copy-btn" onClick={copy} aria-label="Copy account number">{label === "Copied" ? <Check /> : <Copy />}{label}</button></dd>
          </dl>
        </section>
      </main>
      <Footer />
    </>
  );
}
