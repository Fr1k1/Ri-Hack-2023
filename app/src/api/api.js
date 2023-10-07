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

export const getAllTasks = () => {
  return fetch(`${api}/v1/tasks`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
      return [];
    });
};

export const getTaskById = (taskId) => {
  return fetch(`${api}/v1/tasks/${taskId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(`Error fetching task ${taskId}:`, error);
      return [];
    });
};

let otherParam = { credentials: "include" };

export async function getLoggedUser() {
  const response = await fetch(`${api}/v1/users/current`, otherParam, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // const cookies = response.headers.get("set-cookie");
  // // Set the cookie in the browser's cookie storage
  // document.cookie = cookies;

  const responseData = await response.json();

  console.log("Uspjesna dobivanja usera");

  if (!response.ok) {
    throw new Error("Failed to get logged user");
  }

  return responseData;
}
