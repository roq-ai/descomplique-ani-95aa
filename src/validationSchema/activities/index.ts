import * as yup from 'yup';

export const activityValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().nullable(),
  course_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
