import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PropertyFormProps } from "../types/forms";

export default function PropertyForm<T extends { title?: string; city?: string; surface?: number; price?: number }>({
  initialData = {},
  submitLabel = "Enregistrer",
  onSubmit,
}: PropertyFormProps<T>) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(initialData.title || "");
  const [city, setCity] = useState(initialData.city || "");
  const [surface, setSurface] = useState(initialData.surface || 0);
  const [price, setPrice] = useState(initialData.price || 0);

  const [errors, setErrors] = useState<{ title?: string; city?: string; surface?: string; price?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Le titre est obligatoire";
    if (!city.trim()) newErrors.city = "La ville est obligatoire";
    if (surface <= 0) newErrors.surface = "La surface doit être supérieur 0";
    if (price <= 0) newErrors.price = "Le prix doit être supérieur 0";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({ title, city, surface, price } as T);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl mb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Retour
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-white shadow-lg rounded-2xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-blue-900 text-center">{submitLabel}</h1>

        <div>
          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        <div>
          <input
            type="number"
            placeholder="Surface (m²)"
            value={surface}
            onChange={(e) => setSurface(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.surface && <p className="text-red-500 text-sm mt-1">{errors.surface}</p>}
        </div>

        <div>
          <input
            type="number"
            placeholder="Prix (€)"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
