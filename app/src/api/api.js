let api = "http://localhost:3000/api";

export async function addNewUser(staffData) {
  const response = await fetch(`${api}/v1/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staffData),
  });

  const responseData = await response.json();

  console.log("Uspjesna registracija");

  if (!response.ok) {
    throw new Error("Failed to add new staff");
  }

  return responseData;
}
