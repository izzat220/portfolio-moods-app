import { Avatar, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import CreatePost from "../../CreatePost";
import api from "../../helpers/api";

interface indexProps {}

const Posts: React.FC<indexProps> = ({}) => {
	const { ref, inView } = useInView();

	const {
		data,
		refetch,
		error,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		"projects",
		async ({ pageParam = 0 }) => {
			const res = await api.get("post/get?cursor=" + pageParam);
			return res.data;
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
		}
	);

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView]);

	return (
		<Flex w="100%" direction="column" justifyContent="center" p={10}>
			<CreatePost refetch={refetch} />

			{data && (
				<VStack spacing={3}>
					{data.pages.map((group: any) => {
						return group.posts.map((item: any) => {
							return (
								<Flex
									direction="column"
									bg="white"
									w="500px"
									p={5}
									borderRadius="10px"
									shadow="md"
								>
									<Flex w="full" justifyContent="space-between" alignItems="center">
										<HStack spacing={3}>
											<Avatar name={item.postedBy} />
											<VStack spacing={0} align="start">
												<Text fontSize="xs">Posted By</Text>
												<Text fontWeight="bold">{item.postedBy}</Text>
											</VStack>
										</HStack>

										<Text fontSize="xs" fontWeight="medium">
											{moment(item.postedOn).format("DD/MM/YYYY HH:mm")}
										</Text>
									</Flex>

									<Text mt={3} fontSize="sm">
										{item.text}
									</Text>

									<Flex direction="row" w="full" justifyContent="end" mt={5}>
										<Text fontSize="sm" fontWeight="semibold" color="gray.400">
											Current mood is {item.mood}
										</Text>
									</Flex>
								</Flex>
							);
						});
					})}
				</VStack>
			)}

			<Button
				ref={ref}
				onClick={() => fetchNextPage()}
				disabled={!hasNextPage || isFetchingNextPage}
			>
				{isFetchingNextPage
					? "Loading more..."
					: hasNextPage
					? "Load Newer"
					: "Nothing more to load"}
			</Button>

			{/* {isLoading && <Text>Loading...</Text>} */}
		</Flex>
	);
};

export default Posts;
