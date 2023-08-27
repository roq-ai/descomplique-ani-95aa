import * as yup from 'yup';

export const achievementValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
