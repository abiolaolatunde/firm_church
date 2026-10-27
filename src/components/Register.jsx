import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const RegisterContext = createContext(() => {});
export const useRegister = () => useContext(RegisterContext);

/** Any element can open the form: const openRegister = useRegister(); */
export function RegisterProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openRegister = useCallback((e) => { e?.preventDefault?.(); setOpen(true); }, []);
  return (
    <RegisterContext.Provider value={openRegister}>
      {children}
      {open && <RegisterModal onClose={() => setOpen(false)} />}
    </RegisterContext.Provider>
  );
}

const EMPTY = { email: "", firstName: "", lastName: "", phone: "", area: "", transport: "", company: "" };

function RegisterModal({ onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [message, setMessage] = useState("");
  const [emailed, setEmailed] = useState(true);
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Lock page scroll, focus the first field, close on Escape, keep Tab inside the form.
  useEffect(() => {
    const previous = document.activeElement;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const nodes = dialogRef.current.querySelectorAll("button, input, a[href]");
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); previous?.focus?.(); };
  }, [onClose]);

  const set = (key) => (e) => { setForm((f) => ({ ...f, [key]: e.target.value })); setErrors((er) => ({ ...er, [key]: undefined })); };

  const validate = () => {
    const er = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) er.email = "Enter an email address like name@example.com.";
    if (!form.firstName.trim()) er.firstName = "Enter your first name.";
    if (!form.lastName.trim()) er.lastName = "Enter your last name.";
    if (form.phone && !/^[\d\s-]{7,15}$/.test(form.phone.trim())) er.phone = "Enter a phone number using digits only.";
    return er;
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) { dialogRef.current.querySelector(`[name="${Object.keys(er)[0]}"]`)?.focus(); return; }
    setStatus("sending");
    try {
      let res;
      try {
        res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      } catch {
        throw new Error("We couldn't reach the server. Check your internet connection and try again.");
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "We couldn't complete your registration. Try again in a few minutes.");
      setEmailed(data.emailed !== false);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__card" role="dialog" aria-modal="true" aria-labelledby="register-title" ref={dialogRef}>
        <button className="modal__close" onClick={onClose} aria-label="Close"><X /></button>

        {status === "done" ? (
          <div className="reg-done" aria-live="polite">
            <h2 id="register-title" className="reg-title">You’re registered.</h2>
            {emailed
              ? <p>We’ve sent a confirmation to <strong>{form.email}</strong>. If it isn’t in your inbox in a few minutes, check your spam folder.</p>
              : <p>We’ve saved your registration for <strong>{form.email}</strong>.</p>}
            <p>See you on December 3 at Umari Audi Road, Fate Roundabout, Ilorin.</p>
            <button className="reg-submit" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form className="reg-form" onSubmit={submit} noValidate>
            <h2 id="register-title" className="reg-title">Be a part of<br />the gathering.</h2>

            <Field label="Email Address" required error={errors.email} id="reg-email">
              <input ref={firstFieldRef} id="reg-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={set("email")} aria-invalid={!!errors.email} />
            </Field>

            <div className="reg-row">
              <Field label="First Name" required error={errors.firstName} id="reg-first">
                <input id="reg-first" name="firstName" autoComplete="given-name" placeholder="First Name" value={form.firstName} onChange={set("firstName")} aria-invalid={!!errors.firstName} />
              </Field>
              <Field label="Last Name" required error={errors.lastName} id="reg-last">
                <input id="reg-last" name="lastName" autoComplete="family-name" placeholder="Last Name" value={form.lastName} onChange={set("lastName")} aria-invalid={!!errors.lastName} />
              </Field>
            </div>

            <Field label="Phone Number" error={errors.phone} id="reg-phone">
              <div className="reg-phone">
                <span className="reg-phone__cc" aria-hidden="true">NG&nbsp;&nbsp;+234</span>
                <input id="reg-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Phone number" value={form.phone} onChange={set("phone")} aria-invalid={!!errors.phone} />
              </div>
            </Field>

            <Field label="Which part of Ilorin do you stay?" id="reg-area">
              <input id="reg-area" name="area" placeholder="Neighborhood / Area" value={form.area} onChange={set("area")} />
            </Field>

            <fieldset className="reg-field reg-radios">
              <legend className="reg-label">Do you need help with transportation to church?</legend>
              <div className="reg-radios__opts">
                {["Yes", "No"].map((v) => (
                  <label key={v}><input type="radio" name="transport" value={v} checked={form.transport === v} onChange={set("transport")} /> {v}</label>
                ))}
              </div>
            </fieldset>

            {/* Hidden from people; bots fill it in, and the server ignores those submissions. */}
            <input className="reg-trap" name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={set("company")} aria-hidden="true" />

            {status === "error" && <p className="reg-alert" role="alert">{message}</p>}
            <button className="reg-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Registering…" : "Register"}</button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, error, id, children }) {
  return (
    <div className="reg-field">
      <label className="reg-label" htmlFor={id}>{label}{required && <span className="reg-req" aria-hidden="true"> *</span>}</label>
      {children}
      {error && <p className="reg-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
