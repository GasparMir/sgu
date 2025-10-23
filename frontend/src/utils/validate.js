export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const isValidPhone = (phone) => /^\d{10}$/.test(phone);
export const isNonEmptyString = (str) => typeof str === 'string' && str.trim().length > 0;
export const isValidFullName = (name) => isNonEmptyString(name) && name.split(' ').length >= 2;
export const validateUser = (user) => {
    const errors = {};
    if (!isValidFullName(user.fullName)) {
        errors.fullName = 'El nombre completo es obligatorio y debe contener al menos dos palabras.';
    }
    if (!isValidEmail(user.email)) {
        errors.email = 'El email no es válido.';
    }
    if (!isValidPhone(user.phone)) {
        errors.phone = 'El teléfono debe tener 10 dígitos numéricos.';
    }
    return errors;
}
export default validateUser;