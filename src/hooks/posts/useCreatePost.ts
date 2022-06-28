import { AxiosError } from "axios";
import { useMutation, UseMutationResult } from "react-query";
import api from "../../helpers/api";
import IPost from "../../interfaces/Post";

const useCreatePost = (): UseMutationResult<IPost, AxiosError> => {
	return useMutation((create) => {
		return api.post("post/create", create).then((response: any) => response.data);
	});
};

export default useCreatePost;
