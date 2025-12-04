import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Item } from "../types/item";
import { useNavigate } from "react-router-dom";
import { useItemsStore } from "../store/useItemsStore";
import ConfirmModal from "../components/ConfirmModal";
import { routePaths } from "../constants/routes";

type ItemCardProps = {
  item: Item;
  onDetails: () => void;
};

export default function ItemCard({ item, onDetails }: ItemCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { deleteItem } = useItemsStore();

  const handleUpdate = () => {
    navigate(routePaths.itemEdit(item.id));
  };

  const handleDeleteConfirm = () => {
    deleteItem(item.id);
    setIsModalOpen(false);
  };

  const defaultImage =
    "https://media.kedge.edu/var/kedge/storage/images/_aliases/blog_article_image_770/1/3/4/5/2495431-1-fre-FR/conseils-exercer-dans-l-immobilier-min.jpg?202511251212";

  return (
    <>
      <motion.div
        className="relative group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <div className="h-48 w-full overflow-hidden relative">
          <img
            src={defaultImage}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-white/20">
            <motion.button
              onClick={onDetails}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              En savoir plus
            </motion.button>
          </div>
        </div>

        <div className="p-4 space-y-1 relative">
          <h2 className="text-lg font-bold text-blue-900 truncate">{item.title}</h2>
          <p className="text-gray-600 text-sm">{item.city}</p>
          <p className="text-gray-600 text-sm">Surface: {item.surface} m²</p>
          <p className="text-blue-700 font-semibold text-lg">{item.price} €</p>

          <div className="absolute top-4 right-4">
            <button
              className="text-gray-500 hover:text-gray-700 font-bold text-xl"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
            >
              &#8230;
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={handleUpdate}
                >
                  Modifier
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 transition-colors"
                  onClick={() => {
                    setIsModalOpen(true);
                    setMenuOpen(false);
                  }}
                >
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <ConfirmModal
        isOpen={isModalOpen}
        title="Supprimer la propriété"
        message="Voulez-vous vraiment supprimer cette propriété ? Cette action est irréversible."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
}
