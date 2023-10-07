let api = "http://localhost:3000/api";

export async function addNewUser(userData) {
  const response = await fetch(`${api}/v1/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const responseData = await response.json();

  console.log("Uspjesna registracija");

  if (!response.ok) {
    throw new Error("Failed to add new staff");
  }

  return responseData;
}

export async function loginUser(userData) {
  const response = await fetch(`${api}/v1/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const responseData = await response.json();

  console.log("Uspjesna prijava");

  if (!response.ok) {
    throw new Error("Failed to add new staff");
  }

  return responseData;
}
