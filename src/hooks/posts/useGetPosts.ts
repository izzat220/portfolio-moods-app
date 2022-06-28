import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import api from "../../helpers/api";
import IPost from "../../interfaces/Post";

const useGetPosts = (): UseQueryResult<IPost[], AxiosError> => {
	return useQuery("useProfileQuery", () =>
		api.get("post/get").then((response: any) => response.data)
	);
};

export default useGetPosts;
