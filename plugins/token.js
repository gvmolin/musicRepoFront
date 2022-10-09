export default function ({ app: { $axios }, redirect }) {
  $axios.onRequest((config) => {
    // check if the user is authenticated
    const token = localStorage.getItem("token");
    if (token && token != null && token != "") {
      // set the Authorization header using the access token
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  });

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      localStorage.setItem("token", "");
      // window.location.reload();
    }
  });
}
