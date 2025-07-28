import * as yup from "yup";

export const coffeeFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .min(0, "Price must be at least 0")
    .required("Price is required")
    .test(
      "decimal-places",
      "Price must have at most 2 decimal places",
      (value) => {
        if (value === undefined || value === null) return true;
        return /^\d{1,8}(\.\d{1,2})?$/.test(value.toString());
      }
    ),
  type: yup
    .string()
    .oneOf(["Arabic", "Robusta"], "Select a type")
    .required("Type is required"),
  image: yup
    .string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  description: yup.string().required("Description is required"),
});
