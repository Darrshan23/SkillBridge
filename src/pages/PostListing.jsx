import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

const initialForm = {
  title: "",
  description: "",
  tags: "",
  location: "",
  payMin: "",
  payMax: "",
  payUnit: "hour",
  type: "Part-time",
};

export default function PostListing() {
  const { currentUser } = useAuth();
  const { addListing } = useData();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.description.trim()) next.description = "Description is required.";
    if (!form.location.trim()) next.location = "Location is required.";
    if (!form.payMin || Number(form.payMin) < 0) next.payMin = "Enter a minimum pay.";
    if (!form.payMax || Number(form.payMax) < Number(form.payMin))
      next.payMax = "Max pay must be greater than or equal to min pay.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const newListing = addListing({
      employerId: currentUser.id,
      company: currentUser.company ?? currentUser.name,
      title: form.title,
      description: form.description,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      location: form.location,
      payMin: Number(form.payMin),
      payMax: Number(form.payMax),
      payUnit: form.payUnit,
      type: form.type,
    });

    navigate(`/listing/${newListing.id}`);
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Post a gig</h1>

        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && <p id="title-error" className="field-error">{errors.title}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? "description-error" : undefined}
          />
          {errors.description && (
            <p id="description-error" className="field-error">{errors.description}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="tags">Skill tags (comma-separated)</label>
          <input
            id="tags"
            placeholder="React, Remote-friendly"
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? "location-error" : undefined}
          />
          {errors.location && (
            <p id="location-error" className="field-error">{errors.location}</p>
          )}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="payMin">Min pay (RM)</label>
            <input
              id="payMin"
              type="number"
              min="0"
              value={form.payMin}
              onChange={(e) => update("payMin", e.target.value)}
              aria-invalid={Boolean(errors.payMin)}
              aria-describedby={errors.payMin ? "payMin-error" : undefined}
            />
            {errors.payMin && (
              <p id="payMin-error" className="field-error">{errors.payMin}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="payMax">Max pay (RM)</label>
            <input
              id="payMax"
              type="number"
              min="0"
              value={form.payMax}
              onChange={(e) => update("payMax", e.target.value)}
              aria-invalid={Boolean(errors.payMax)}
              aria-describedby={errors.payMax ? "payMax-error" : undefined}
            />
            {errors.payMax && (
              <p id="payMax-error" className="field-error">{errors.payMax}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="payUnit">Per</label>
            <select
              id="payUnit"
              value={form.payUnit}
              onChange={(e) => update("payUnit", e.target.value)}
            >
              <option value="hour">Hour</option>
              <option value="month">Month</option>
              <option value="project">Project</option>
            </select>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="type">Listing type</label>
          <select id="type" value={form.type} onChange={(e) => update("type", e.target.value)}>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Freelance</option>
            <option>Full-time</option>
          </select>
        </div>

        <button className="btn btn--primary btn--full" type="submit">
          Publish listing
        </button>
      </form>
    </div>
  );
}
