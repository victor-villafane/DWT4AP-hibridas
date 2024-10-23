import yup from "yup"

export const productoSchema = yup.object({
    name: yup.string().required(),
    price: yup.number().positive().required(),
    description: yup.string().min(2).max(20).required(),
    categoria: yup.string()
})