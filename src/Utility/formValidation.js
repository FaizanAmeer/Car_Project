import * as yup from "yup";
const schema = yup.object().shape({
  carModel: yup.string().required("Car model is required").min(3),
  price: yup.number().required("Price is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{11}$/, "Invalid phone number")
    .required("Phone number is required"),
  maxPictures: yup
    .number()
    .min(1, "Min value is 1")
    .max(10, "Max value is 10")
    .required("Max number of pictures is required"),
});

export default schema;
