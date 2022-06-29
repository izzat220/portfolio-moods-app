import { AxiosError } from "axios";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import api from "../../helpers/api";
import IPost from "../../interfaces/Post";

const useGetPosts = (): UseInfiniteQueryResult<IPost[], AxiosError> => {
	return useInfiniteQuery(
		"useGetPosts",
		async ({ pageParam = 0 }) => {
			const res = await api.get("post/get?cursor=" + pageParam);
			return res.data;
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
		}
	);
};

export default useGetPosts;
