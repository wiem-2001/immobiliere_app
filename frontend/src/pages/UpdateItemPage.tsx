import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PropertyForm from '../components/PropertyForm';
import { useItemsStore } from '../store/useItemsStore';
import type { UpdateItemInput } from '../types/item';
import { routePaths } from '../constants/routes';
function UpdateItemPage() {
 const { id } = useParams<{ id: string }>();
  const { item, fetchOneItem, updateItem } = useItemsStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchOneItem(id); 
  }, [id, fetchOneItem]);

  if (!item) return <p>Chargement...</p>;

  const handleSubmit = (data: UpdateItemInput) => {
    updateItem(id!, data); 
    navigate(routePaths.listItems());
  };

  return <PropertyForm initialData={item} submitLabel="Mettre à jour la propriété" onSubmit={handleSubmit} />;
}
export default UpdateItemPage
