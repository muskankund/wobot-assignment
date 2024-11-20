const API_BASE_URL = "https://api-app-staging.wobot.ai/app/v1";
const AUTH_TOKEN = "4ApVMIn5sTxeW7GQ5VWeWiy";

export const fetchCameras = async () => {
  const response = await fetch(`${API_BASE_URL}/fetch/cameras`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.message}`);
  }

  return response.json();
};


export const updateCameraStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/update/camera/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify({ id, status }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.message}`);
  }

  return response.json();
};
