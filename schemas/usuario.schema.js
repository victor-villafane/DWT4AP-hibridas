import yup from "yup";

export const usuarioSchema = yup.object({
  email: yup.string().email("El email debe ser valido").required("El email es requerido"),
  password: yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").matches(/[0-9]/, "La contraseña debe tener al menos un numero").matches(/[A-Z]/,"La contraseña debe contener al menos una letra mayuscula").required(),
});
