import registerOptions from "../utils/formValidations";
import React from "react";

function FormValidator({ isSignIn, formData, setErrors, children }) {
  const performValidation = () => {
    const validationErrors = {};

    if (!isSignIn) {
      const emailValidation = registerOptions.email.validate;
      const emailValue = formData.email.trim();
      if (emailValidation.maxLength && emailValue.length > 50) {
        validationErrors.email = emailValidation.maxLength;
      }
      if (
        emailValidation.matchPattern &&
        !emailValidation.matchPattern(emailValue)
      ) {
        validationErrors.email = emailValidation.matchPattern;
      }
    }

    const passwordValidation = registerOptions?.password.validate;
    const passwordValue = formData.password;
    if (passwordValidation.minLength && passwordValue.length < 6) {
      validationErrors.password = passwordValidation.minLength;
    }
    if (
      passwordValidation.matchPattern &&
      !passwordValidation.matchPattern(passwordValue)
    ) {
      validationErrors.password = passwordValidation.matchPattern;
    }

    const usernameValidation = registerOptions?.username.validate;
    const usernameValue = formData.username.trim();
    if (usernameValidation.minLength && usernameValue.length < 5) {
      validationErrors.username = usernameValidation.minLength;
    }
    if (
      usernameValidation.matchPattern &&
      !usernameValidation.matchPattern(usernameValue)
    ) {
      validationErrors.username = usernameValidation.matchPattern;
    }

    setErrors(validationErrors);
  };

  React.useEffect(() => {
    performValidation();
  }, [isSignIn, formData]);

  return <>{children}</>;
}

export default FormValidator;
