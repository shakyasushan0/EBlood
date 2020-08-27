export const nameValidator = (name) => {
  return name.length != 0 && name.length >= 3;
};

export const emailValidator = (email) => {
  var regx = /^([a-z 0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
  return regx.test(email);
};

export const passwordValidator = (pword) => {
  return pword.length != 0;
};
export const ageValidator = (age) => {
  return age >= 17 && age <= 50;
};
export const bloodGroupValidator = (bg) => {
  const regx = /(A|B|AB|O)[+-]/;
  return regx.test(bg);
};
export const contactValidator = (contact) => {
  return contact.length >= 10;
};
export const validateAll = (name, email, pword, age, bg, contact) => {
  return (
    nameValidator(name) &&
    emailValidator(email) &&
    passwordValidator(pword) &&
    ageValidator(age) &&
    contactValidator(contact) &&
    bloodGroupValidator(bg)
  );
};
