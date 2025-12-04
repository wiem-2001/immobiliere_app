export type FormData<T> = Partial<T>;

export type PropertyFormProps<T> = {
  initialData?: Partial<T>;
  submitLabel?: string;
  onSubmit: (data: T) => void;
};
