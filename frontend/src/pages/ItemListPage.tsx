import React, { useState, useEffect, useMemo } from "react";
import ItemCard from "../components/ItemCard";
import { useItemsStore } from "../store/useItemsStore";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../constants/routes";

export default function ListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchItems, items } = useItemsStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.city.toLowerCase().includes(lower)
    );
  }, [searchTerm, items]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900">
          Liste des Propriétés
        </h1>

        <button
          onClick={() => navigate(routePaths.itemCreate())}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Ajouter une propriété
        </button>
      </div>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Rechercher par titre ou ville..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={() => {}}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Rechercher
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onDetails={() => navigate(routePaths.itemDetails(item.id))}
          />
        ))}
      </div>
    </div>
  );
}
