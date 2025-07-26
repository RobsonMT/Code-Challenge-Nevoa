import * as yup from "yup";

const createCourseSchema = yup.object().shape({
  title: yup
    .string()
    .transform((value) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    })
    .required(),
  description: yup.string().required(),
  imageUrl: yup.string().required(),
  duration: yup.string().required(),
  status: yup.boolean().required(),
});

export { createCourseSchema };
