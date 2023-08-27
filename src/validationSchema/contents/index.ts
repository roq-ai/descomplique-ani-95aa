import * as yup from 'yup';

export const contentValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().nullable(),
  type: yup.string().required(),
  course_id: yup.string().nullable().required(),
});
