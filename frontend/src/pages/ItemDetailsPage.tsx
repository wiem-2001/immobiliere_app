import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useItemsStore } from "../store/useItemsStore";
import ConfirmModal from "../components/ConfirmModal";
import { routePaths } from "../constants/routes";
const ItemDetailsPage: React.FC = () => {
  const { item, fetchOneItem, deleteItem } = useItemsStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultImage =
    "https://media.kedge.edu/var/kedge/storage/images/_aliases/blog_article_image_770/1/3/4/5/2495431-1-fre-FR/conseils-exercer-dans-l-immobilier-min.jpg?202511251212";

  useEffect(() => {
    if (id) fetchOneItem(id);
  }, [fetchOneItem, id]);

  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Chargement des détails...</p>
      </div>
    );
  }

  const handleDeleteConfirm = () => {
    if (id) {
      deleteItem(id);
      setIsModalOpen(false);
      navigate(routePaths.listItems());
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Bouton Retour */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        ← Retour
      </button>

      <div className="relative">
        <img
          src={defaultImage}
          alt={item.title}
          className="w-full h-96 object-cover rounded-2xl shadow-lg"
        />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-3">
        <h1 className="text-2xl font-bold text-blue-900">{item.title}</h1>
        <p className="text-gray-600">{item.city}</p>
        <p className="text-gray-600">Surface: {item.surface} m²</p>
        <p className="text-green-700 font-semibold text-2xl">{item.price} €</p>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => navigate(routePaths.itemEdit(item.id))}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Modifier
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>

      {/* Functional Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Supprimer la propriété"
        message="Voulez-vous vraiment supprimer cette propriété ? Cette action est irréversible."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ItemDetailsPage;
