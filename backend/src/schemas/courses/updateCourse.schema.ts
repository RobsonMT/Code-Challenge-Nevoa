import { title } from "process";
import * as yup from "yup";

const updateCourseSchema = yup.object().shape({
  title: yup
    .string()
    .transform((value) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    })
    .optional(),
  description: yup.string().optional(),
  imageUrl: yup.string().optional(),
  duration: yup.string().optional(),
  status: yup.boolean().optional(),
});

export { updateCourseSchema };
