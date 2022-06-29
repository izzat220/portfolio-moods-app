import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import api from "../../helpers/api";

interface IStat {
	todaysMoods: number;
	totalMoods: number;
}

const useGetPostsStats = (): UseQueryResult<IStat, AxiosError> => {
	return useQuery(
		"useGetPostsStats",
		async () => {
			const res = await api.get("post/getStats");
			return res.data;
		},
		{
			initialData: {
				todaysMoods: 0,
				totalMoods: 0,
			},
		}
	);
};

export default useGetPostsStats;
