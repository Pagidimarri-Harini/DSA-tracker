// services/userService.js
const API_BASE_URL = 'http://localhost:3001';

export const postSignupData = async (formData) => {
  try {
    const { name, email, password } = formData;

    // Check if the account already exists
    const checkResponse = await fetch(`${API_BASE_URL}/signupcheck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (checkResponse.ok) {
      const checkData = await checkResponse.json();

      if (checkData.success && checkData.message === 'User already exists. Please log in.') {
        return { success: false, message: 'User already exists. Please log in.' };
      } else if (!checkData.success) {
        // If the account doesn't exist, proceed with signup
        const response = await fetch(`${API_BASE_URL}/signupadd`, {
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
      }
    } else {
      throw new Error('Failed to check account existence');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const checkLoginData = async (email, password) => {
  try {
    // Check if the account exists and password is correct
    const checkResponse = await fetch(`${API_BASE_URL}/signupcheck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (checkResponse.ok) {
      const checkData = await checkResponse.json();

      if (checkData.success) {
        return { success: true, message: 'Login successful!', user: checkData.user };
      } else if (checkData.message === 'Incorrect password') {
        return { success: false, message: 'Incorrect password' };
      } else {
        return { success: false, message: 'Email not found' };
      }
    } else {
      throw new Error('Failed to check login credentials');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
