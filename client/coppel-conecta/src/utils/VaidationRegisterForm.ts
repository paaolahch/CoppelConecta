import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().min(4, "El nombre requiere al menos 4 caracteres").required('El nombre es requerido.'),
  sucursal: Yup.string().min(10, "El nombre de la sucursal requiere al menos 10 caracteres").required('La sucursal es requerida.'),
  numEmployee: Yup.string().matches(/^\d{6}$/, 'Tienen que ser 6 numeros.').required('El número de empleado es requerido.'),
  email: Yup.string().email('Correo inválido.').required('El correo es requerido.'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe tener al menos un caracter especial")
    .required('La contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña.'),
  postalCode: Yup.string().matches(/^\d{5}$/, 'Debe ser un código postal válido de 5 dígitos').required('El código postal es requerido.'),
  phoneNumber: Yup.string()
    .matches(/^\+?\d{1,4}?\s?\(?\d{1,4}?\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/, 'Número de teléfono inválido')
    .required('El número de celular es requerido.'),
  acceptedTerms: Yup.bool().oneOf([true], 'Debes aceptar los términos.')
});
