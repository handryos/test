import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { coffeeFormSchema } from "./coffeeFormSchema";
import { Typography } from "@/shared/components/ui/Typography";

const types = [
  { label: "Arabic", value: "Arabic" },
  { label: "Robusta", value: "Robusta" },
];

export type CoffeeFormValues = {
  name: string;
  price: number;
  type: "Arabic" | "Robusta";
  image: string;
  description: string;
};

interface CoffeeFormProps {
  onSubmit: (data: CoffeeFormValues) => void;
  onDiscard?: () => void;
  loading?: boolean;
}

export const CoffeeForm: React.FC<CoffeeFormProps> = ({
  onSubmit,
  onDiscard,
  loading,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CoffeeFormValues>({
    resolver: yupResolver(coffeeFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      type: undefined,
      image: "",
      description: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto bg-ui-black rounded-xl p-6 flex flex-col gap-4 shadow-lg"
      style={{ minWidth: 320 }}
    >
      <Typography className="font-title text-3xl md:text-4xl text-ui-white mb-2 text-center">
        CREATE NEW
      </Typography>
      <div>
        <Typography className="text-ui-inputText mb-1 text-sm">Name</Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Name your coffee here"
              className={
                "w-full rounded-md px-4 py-2 bg-ui-inputBg text-ui-white border border-ui-inputBorder focus:outline-none" +
                (errors.name ? " border-ui-error" : "")
              }
            />
          )}
        />
        {errors.name && (
          <span className="text-ui-error text-xs mt-1">
            {errors.name.message}
          </span>
        )}
      </div>
      <div>
        <Typography className="text-ui-inputText mb-1 text-sm">
          Price
        </Typography>
        <div className="flex items-center gap-2">
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className={
                  "w-full rounded-md px-4 py-2 bg-ui-inputBg text-ui-white border border-ui-inputBorder focus:outline-none" +
                  (errors.price ? " border-ui-error" : "")
                }
              />
            )}
          />
          <span className="text-ui-inputText">€</span>
        </div>
        {errors.price && (
          <span className="text-ui-error text-xs mt-1">
            {errors.price.message}
          </span>
        )}
      </div>
      <div>
        <Typography className="text-ui-inputText mb-1 text-sm">Type</Typography>
        <div className="flex gap-2">
          {types.map((t) => (
            <Controller
              key={t.value}
              name="type"
              control={control}
              render={({ field }) => (
                <button
                  type="button"
                  className={
                    "px-6 py-2 rounded-md border border-ui-inputBorder text-ui-white bg-transparent transition-colors duration-150" +
                    (field.value === t.value ? " bg-ui-inputBg" : "")
                  }
                  onClick={() => field.onChange(t.value)}
                >
                  {t.label}
                </button>
              )}
            />
          ))}
        </div>
        {errors.type && (
          <span className="text-ui-error text-xs mt-1">
            {errors.type.message}
          </span>
        )}
      </div>
      <div>
        <Typography className="text-ui-inputText mb-1 text-sm">
          Upload image
        </Typography>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="url"
              placeholder="Paste image URL here"
              className={
                "w-full rounded-md px-4 py-2 bg-ui-inputBg text-ui-white border border-ui-inputBorder focus:outline-none" +
                (errors.image ? " border-ui-error" : "")
              }
            />
          )}
        />
        {errors.image && (
          <span className="text-ui-error text-xs mt-1">
            {errors.image.message}
          </span>
        )}
      </div>
      <div>
        <Typography className="text-ui-inputText mb-1 text-sm">
          Description
        </Typography>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Add a description"
              className={
                "w-full rounded-md px-4 py-2 bg-ui-inputBg text-ui-white border border-ui-inputBorder focus:outline-none" +
                (errors.description ? " border-ui-error" : "")
              }
            />
          )}
        />
        {errors.description && (
          <span className="text-ui-error text-xs mt-1">
            {errors.description.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <button
          type="button"
          onClick={onDiscard}
          className="w-full rounded-md border border-ui-inputBorder py-2 text-ui-white bg-transparent hover:bg-ui-inputBg transition-colors"
        >
          Discard
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md py-2 text-ui-white bg-ui-brown hover:bg-ui-brown-dark transition-colors disabled:opacity-60"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};
