import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { RegisterProvider } from "./components/Register.jsx";
import Home from "./pages/Home.jsx";
import Watch from "./pages/Watch.jsx";
import Support from "./pages/Support.jsx";

// Scroll to #section links, or to the top when the page changes.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <RegisterProvider>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </RegisterProvider>
  );
}
