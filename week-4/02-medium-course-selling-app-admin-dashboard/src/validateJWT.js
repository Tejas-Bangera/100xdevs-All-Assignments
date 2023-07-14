import axios from "axios";

const validateJWT = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:3000/admin/validatejwt", {
    headers: {
      Authorization: token,
    },
  });
  return response;
};
export default validateJWT;
