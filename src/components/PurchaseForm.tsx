import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookItem } from "@/app/types";
import { BookCover } from "./BookTile";

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
  book: BookItem;
  onSubmit(): void;
}> = ({ book, onSubmit }) => {
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
    <div style={{ width: "30em" }}>
      <h3>Buy - {book.volumeInfo.title}</h3>
      <form onSubmit={handleSubmit(_onSubmit)}>
        <div style={{ display: "flex", gap: "1em" }}>
          <BookCover
            imageUrl={book.volumeInfo.imageLinks?.thumbnail}
            title={book.volumeInfo.title}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              flexGrow: 1,
            }}
          >
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
    <div
      style={{
        display: "flex",

        textAlign: "left",
        flexDirection: "column",
      }}
    >
      <div>{label}</div>
      <input style={{ fontSize: "1.25em" }} {...register(name)} />
      {error && <div style={{ fontSize: "0.75em", color: "red" }}>{error}</div>}
    </div>
  );
};
