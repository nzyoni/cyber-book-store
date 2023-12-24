import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookItem } from "@/components/types";
import { BookCover } from "./BookTile";
import React from "react";

type FormFields = {
  name: string;
  phone: number;
  email: string;
  address: string;
};
type fieldNames = "name" | "phone" | "email" | "address";

const validationSchema = yup
  .object({
    name: yup.string().required(),
    phone: yup.number().positive().integer().required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
  })
  .required();

export const PurchaseForm: React.FC<{
  books: BookItem[];
  onSubmit(): void;
}> = ({ books, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(validationSchema),
  });
  const _onSubmit: SubmitHandler<FormFields> = (data) => {
    onSubmit();
    alert("Yay you bought a new book!");
  };

  return (
    <div className="form-container">
      <h3>Please fill in the form to purchase</h3>
      <form onSubmit={handleSubmit(_onSubmit)}>
        <div style={{ display: "flex", gap: "1em" }}>
          <BooksPreview books={books} />
          <div className="form-fields-wrapper">
            <Field
              name="name"
              label={"Name"}
              error={errors.name?.message}
              register={register}
            />
            <Field
              name="phone"
              label={"Phone"}
              error={errors.phone?.message}
              register={register}
            />
            <Field
              name="email"
              label={"Email"}
              error={errors.email?.message}
              register={register}
            />
            <Field
              name="address"
              label={"Address"}
              error={errors.address?.message}
              register={register}
            />
            <div>
              <input value="Buy now" type="submit" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

interface IFieldProps {
  name: fieldNames;
  register: UseFormRegister<FormFields>;
  error?: string;
  label: string;
}

const Field: React.FC<IFieldProps> = ({ name, register, error, label }) => {
  return (
    <div className="form-field">
      <div>{label}</div>
      <input style={{ fontSize: "1.25em" }} {...register(name)} />
      {error && <div className="form-field-error">{error}</div>}
    </div>
  );
};

const BooksPreview: React.FC<{ books: BookItem[] }> = ({ books }) => {
  return (
    <div>
      <p>You are about to buy</p>
      {books.length === 1 ? (
        <BookCover
          imageUrl={books[0].volumeInfo.imageLinks?.thumbnail}
          title={books[0].volumeInfo.title}
        />
      ) : (
        <div>
          <ul>
            {books?.map((book) => (
              <li key={book.id}>{book.volumeInfo.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
