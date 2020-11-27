export const validacionesMixin = {
  data: () => ({
    valid: true,
    campoRequerido: [
      (v) => !!v || 'El campo es requerido',
      (v) =>
        (v && v.length > 4) || 'El campo debe de tener más de 4 caracteres',
    ],
    emailRules: [
      (v) => !!v || 'E-mail es requerido',
      (v) => /.+@.+\..+/.test(v) || 'Ingrese un e-mail válido',
    ],
    passwordRules: [
      (v) => !!v || 'La contraseña es requerido',
      (v) =>
        (v && v.length >= 6) ||
        'La contraseña debe de tener 6 o más caracteres',
    ],
  }),
};
