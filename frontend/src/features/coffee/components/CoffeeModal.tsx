import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import * as yup from "yup";
import { Coffee } from "@/features/coffee/services/api";
import { useAppDispatch } from "@/store/hooks";
import {
  fetchCoffeeById,
  createCoffee,
  updateCoffee,
  fetchCoffees,
} from "@/store/slices/coffeeSlice";

interface CoffeeModalProps {
  open: boolean;
  onClose: () => void;
  coffeeId?: number | null;
  onSave?: (coffee: Coffee) => void;
}

export const CoffeeModal: React.FC<CoffeeModalProps> = ({
  open,
  onClose,
  coffeeId,
  onSave,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Coffee | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const coffeeSchema = yup.object().shape({
    name: yup.string().required("Field is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .min(0.01, "Price must be at least 0.01")
      .required("Field is required"),
    type: yup
      .string()
      .oneOf(["Arabic", "Robusta"])
      .required("Field is required"),
    image_url: yup
      .string()
      .url("Image must be a valid URL")
      .required("Field is required"),
    description: yup.string().required("Field is required"),
  });

  const handleOverflowWhenOpen = (open: boolean) => {
    const html = document.documentElement;
    if (open) {
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      html.style.overflow = "";
    }
  };
  useEffect(() => {
    handleOverflowWhenOpen(open);
  }, [open]);

  useEffect(() => {
    if (open && coffeeId) {
      setLoading(true);
      dispatch(fetchCoffeeById(coffeeId))
        .unwrap()
        .then((data) => setForm(data))
        .catch(() => setError("Failed to fetch coffee details"))
        .finally(() => setLoading(false));
    } else if (open) {
      setForm({
        id: 0,
        name: "",
        description: "",
        type: "Arabic",
        price: 0,
        image_url: "",
        createdAt: "",
        updatedAt: "",
      });
    }
  }, [open, coffeeId, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = async (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!form) return;
    try {
      await coffeeSchema.validateAt(e.target.name, form);
      setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    } catch (validationError: any) {
      setFormErrors((prev) => ({
        ...prev,
        [e.target.name]: validationError.message,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setFormErrors({});
    const { id, createdAt, updatedAt, ...payload } = form;
    payload.price = Math.max(Number(payload.price), 0.01);
    try {
      await coffeeSchema.validate(payload, { abortEarly: false });
    } catch (validationError: any) {
      if (validationError.inner) {
        const errors: Record<string, string> = {};
        validationError.inner.forEach((err: any) => {
          if (err.path) errors[err.path] = err.message;
        });
        setFormErrors(errors);
        return;
      }
    }
    setLoading(true);
    try {
      let result;
      if (coffeeId) {
        result = await dispatch(
          updateCoffee({ id: coffeeId, payload })
        ).unwrap();
      } else {
        result = await dispatch(createCoffee(payload)).unwrap();
        await dispatch(fetchCoffees({ page: 1, limit: 6, reset: true }));
      }
      if (onSave) onSave(result);
      if (result && !error) {
        onClose();
      }
    } catch (err) {
      setError("Failed to save coffee");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center p-4   md:p-4  justify-center bg-black bg-opacity-40">
      <div
        className="bg-[#181818] rounded-2xl shadow-2xl w-full max-w-5xl relative flex flex-col items-stretch"
        style={{ minHeight: "90dvh" }}
      >
        <img
          src="/form-image.png"
          alt="Coffee beans"
          className={`absolute left-0 bottom-0 z-10 w-48 h-auto object-contain pointer-events-none select-none hidden md:block`}
          style={{ marginRight: 24, marginTop: 24 }}
        />
        <div className="flex-1 flex flex-col items-center justify-center p-2 md:p-10 relative z-20">
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-coffee-primary"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-center text-4xl font-title font-bold text-white mb-10 tracking-wide">
            {coffeeId ? "EDIT COFFEE" : "CREATE NEW"}
          </h2>
          {loading || !form ? (
            <div className="text-white text-center">Loading...</div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 w-full max-w-md mx-auto"
            >
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col items-start">
                  <label className="text-white mb-2 text-sm font-semibold text-left w-full">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Name your coffee here"
                    className={`bg-[#232323] text-white border rounded-lg p-3 placeholder-gray-400 focus:outline-none w-full ${
                      formErrors.name
                        ? "border-red-500"
                        : "border-[#333] focus:border-coffee-primary"
                    }`}
                  />
                  {formErrors.name && (
                    <span className="text-red-500 text-xs mt-1">
                      {formErrors.name}
                    </span>
                  )}
                </div>
                <div className="flex-1 flex flex-col items-start">
                  <label className="text-white mb-2 text-sm font-semibold text-left w-full">
                    Price
                  </label>
                  <div className="relative w-full">
                    <NumericFormat
                      name="price"
                      value={form.price}
                      onValueChange={(values) => {
                        if (!form) return;
                        setForm({ ...form, price: values.floatValue ?? 0 });
                      }}
                      onBlur={handleBlur}
                      placeholder="0,00"
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      fixedDecimalScale
                      onFocus={(e) => {
                        setTimeout(() => {
                          (e.target as HTMLInputElement).setSelectionRange(
                            0,
                            0
                          );
                        }, 0);
                      }}
                      allowNegative={false}
                      className={`bg-[#232323] text-white border rounded-lg p-3 pr-10 placeholder-gray-400 w-full focus:outline-none ${
                        formErrors.price
                          ? "border-red-500"
                          : "border-[#333] focus:border-coffee-primary"
                      }`}
                      autoComplete="off"
                    />
                    {formErrors.price && (
                      <span className="text-red-500 text-xs mt-1">
                        {formErrors.price}
                      </span>
                    )}
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      €
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <label className="text-white mb-2 text-sm font-semibold text-left w-full">
                  Type
                </label>
                <div className="flex gap-4 mt-2 w-full">
                  <button
                    type="button"
                    className={`flex-1 py-2 rounded-lg border-2 font-semibold text-white transition-colors ${
                      form.type === "Arabic"
                        ? "border-coffee-primary bg-[#232323]"
                        : "border-[#333] bg-transparent"
                    }`}
                    onClick={() => setForm({ ...form, type: "Arabic" })}
                  >
                    Arabic
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 rounded-lg border-2 font-semibold text-white transition-colors ${
                      form.type === "Robusta"
                        ? "border-coffee-primary bg-[#232323]"
                        : "border-[#333] bg-transparent"
                    }`}
                    onClick={() => setForm({ ...form, type: "Robusta" })}
                  >
                    Robusta
                  </button>
                  {formErrors.type && (
                    <span className="text-red-500 text-xs mt-1">
                      {formErrors.type}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <label className="text-white mb-2 text-sm font-semibold text-left w-full">
                  Upload image
                </label>
                <input
                  name="image_url"
                  value={form.image_url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Paste image URL here"
                  className={`bg-[#232323] text-white border rounded-lg p-3 placeholder-gray-400 w-full focus:outline-none ${
                    formErrors.image_url
                      ? "border-red-500"
                      : "border-[#333] focus:border-coffee-primary"
                  }`}
                />
                {formErrors.image_url && (
                  <span className="text-red-500 text-xs mt-1">
                    {formErrors.image_url}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start w-full">
                <label className="text-white mb-2 text-sm font-semibold text-left w-full">
                  Description
                </label>
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Add a description"
                  className={`bg-[#232323] text-white border rounded-lg p-3 placeholder-gray-400 w-full focus:outline-none resize-none ${
                    formErrors.description
                      ? "border-red-500"
                      : "border-[#333] focus:border-coffee-primary"
                  }`}
                />
                {formErrors.description && (
                  <span className="text-red-500 text-xs mt-1">
                    {formErrors.description}
                  </span>
                )}
              </div>
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-6 justify-center w-full">
                <button
                  type="button"
                  className="w-full md:w-auto px-6 py-3 rounded-full border-2 border-coffee-primary text-white font-semibold bg-transparent hover:bg-coffee-primary hover:text-white transition-colors"
                  onClick={onClose}
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 rounded-full bg-coffee-primary text-white font-semibold border-2 border-coffee-primary hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    loading ||
                    !form?.name ||
                    !form?.price ||
                    !form?.type ||
                    !form?.image_url ||
                    !form?.description ||
                    !!Object.values(formErrors).filter(Boolean).length
                  }
                >
                  Confirm
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
