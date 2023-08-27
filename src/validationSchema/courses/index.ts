import * as yup from 'yup';

export const courseValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().nullable(),
  organization_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
