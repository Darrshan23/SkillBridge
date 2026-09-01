import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "seeker",
  location: "",
  company: "",
};

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.password || form.password.length < 6)
      next.password = "Password must be at least 6 characters.";
    if (form.role === "employer" && !form.company.trim())
      next.company = "Company or shop name is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;

    const result = signup(form);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    navigate(form.role === "employer" ? "/dashboard" : "/browse");
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Create an account</h1>

        {formError && (
          <p className="form-error" role="alert">
            {formError}
          </p>
        )}

        <fieldset className="form-field">
          <legend>I am a...</legend>
          <label className="radio-option">
            <input
              type="radio"
              name="role"
              value="seeker"
              checked={form.role === "seeker"}
              onChange={(e) => update("role", e.target.value)}
            />
            Job seeker / freelancer
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="role"
              value="employer"
              checked={form.role === "employer"}
              onChange={(e) => update("role", e.target.value)}
            />
            Employer
          </label>
        </fieldset>

        <div className="form-field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
        </div>

        {form.role === "employer" && (
          <div className="form-field">
            <label htmlFor="company">Company / shop name</label>
            <input
              id="company"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? "company-error" : undefined}
            />
            {errors.company && (
              <p id="company-error" className="field-error">{errors.company}</p>
            )}
          </div>
        )}

        <div className="form-field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            placeholder="e.g. Georgetown, Penang"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <p id="password-error" className="field-error">{errors.password}</p>
          )}
        </div>

        <button className="btn btn--primary btn--full" type="submit">
          Sign up
        </button>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
