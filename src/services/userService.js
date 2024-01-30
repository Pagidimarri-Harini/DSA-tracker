// services/userService.js

export const postSignupData = async (formData) => {
  try {
    const { name, email, password } = formData;

    const response = await fetch(`${process.env.REACT_APP_DOMAIN}/signupadd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to post signup data');
    }
  } catch (error) {
    throw error;
  }
};

export const checkLoginData = async (email, password) => {
  try {
    const checkResponse = await fetch(`${process.env.REACT_APP_DOMAIN}/signupcheck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (checkResponse.ok) {
      const checkData = await checkResponse.json();
      return checkData;
    } else {
      throw new Error('Failed to check login credentials');
    }
  } catch (error) {
    throw error
  }
};
