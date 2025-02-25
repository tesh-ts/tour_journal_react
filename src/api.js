const API_URL = "http://localhost:5000/tours";

export async function fetchTours() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function addTour(tour) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tour),
  });
  return response.json();
}

export async function deleteTour(id) {
  console.log("Отправка DELETE запроса для ID:", id); 
  const response = await fetch(`http://localhost:5000/tours/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка удаления: ${response.status} - ${errorText}`);
  }

  return response.json();
}

const API_URL2 = "http://localhost:5000";

export async function registerUser(username, password) {
  const response = await fetch(`${API_URL2}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

export async function loginUser(username, password) {
  const response = await fetch(`${API_URL2}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Неверный логин или пароль");
  }

  return response.json();
}
