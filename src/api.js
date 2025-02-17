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
