import { useNavigate } from 'react-router-dom';
import PropertyForm from '../components/PropertyForm';
import { useItemsStore } from '../store/useItemsStore';
import type { CreateItemInput } from '../types/item';
import { routePaths } from '../constants/routes';
export default function CreateItemPage() {
  const { createItem } = useItemsStore();
  const navigate = useNavigate();

  const handleSubmit = (data: CreateItemInput) => {
    createItem(data); 
    navigate(routePaths.listItems()); 
  };

  return (
    <PropertyForm<CreateItemInput>
      submitLabel="Créer la propriété"
      onSubmit={handleSubmit}
    />
  );
}
