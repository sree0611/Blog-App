export const validateInputs = (inputs) => {
  const newErrors = {};

  if (!inputs.username) {
    newErrors.username = "Username is required";
  }

  if (!inputs.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
    newErrors.email = "Email address is invalid";
  }

  if (!inputs.password) {
    newErrors.password = "Password is required";
  } else if (inputs.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  return newErrors;
};

export function truncateString(str, length) {
  if (str && str.length > length) {
    return str.substring(0, length) + "...";
  }

  return str;
}
