import yup from "yup"

export const productoSchema = yup.object({
    name: yup.string().required(),
    price: yup.number().required().positive(),
    description: yup.string().min(2).max(20),
    categoria: yup.string()
})