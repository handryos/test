import React, { useEffect, useState } from "react";
import { Coffee } from "@/features/coffee/services/api";
import { useAppDispatch } from "@/store/hooks";
import {
  fetchCoffeeById,
  createCoffee,
  updateCoffee,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const { id, createdAt, updatedAt, ...payload } = form;
    payload.price = Math.max(Number(payload.price), 0.01);
    setLoading(true);
    try {
      let result;
      if (coffeeId) {
        result = await dispatch(
          updateCoffee({ id: coffeeId, payload })
        ).unwrap();
      } else {
        result = await dispatch(createCoffee(payload)).unwrap();
      }
      onClose();
    } catch (err) {
      setError("Failed to save coffee");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="bg-[#181818] rounded-2xl shadow-2xl p-0 w-full max-w-5xl relative flex flex-col items-stretch"
        style={{ minHeight: 700 }}
      >
        <img
          src="/form-image.png"
          alt="Coffee beans"
          className="absolute mr-4 left-0 bottom-0 z-10 w-48 h-auto object-contain pointer-events-none select-none"
          style={{ marginRight: 24, marginTop: 24 }}
        />
        <div className="flex-1 flex flex-col items-center justify-center p-10 relative z-20">
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
                    placeholder="Name your coffee here"
                    className="bg-[#232323] text-white border border-[#333] rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:border-coffee-primary w-full"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col items-start">
                  <label className="text-white mb-2 text-sm font-semibold text-left w-full">
                    Price
                  </label>
                  <div className="relative w-full">
                    <input
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="bg-[#232323] text-white border border-[#333] rounded-lg p-3 pr-10 placeholder-gray-400 w-full focus:outline-none focus:border-coffee-primary"
                      required
                    />
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
                  placeholder="Paste image URL here"
                  className="bg-[#232323] text-white border border-[#333] rounded-lg p-3 placeholder-gray-400 w-full focus:outline-none focus:border-coffee-primary"
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <label className="text-white mb-2 text-sm font-semibold text-left w-full">
                  Description
                </label>
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Add a description"
                  className="bg-[#232323] text-white border border-[#333] rounded-lg p-3 placeholder-gray-400 w-full focus:outline-none focus:border-coffee-primary resize-none"
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div className="flex gap-2 mt-6 justify-center">
                <button
                  type="button"
                  className="flex-1 py-3 rounded-full border-2 border-coffee-primary text-white font-semibold bg-transparent hover:bg-coffee-primary hover:text-white transition-colors"
                  onClick={onClose}
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-coffee-primary text-white font-semibold border-2 border-coffee-primary hover:bg-opacity-90 transition-colors"
                  disabled={loading}
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
