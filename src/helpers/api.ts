import axios from "axios";

export default axios.create({
	baseURL: "https://portfolio-moods-server.herokuapp.com",
	withCredentials: true,
});
