import { ArrowUpIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Button,
	Flex,
	HStack,
	IconButton,
	Text,
	VStack,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import CreatePost from "../../CreatePost";
import useGetPosts from "../../hooks/posts/useGetPosts";
import useGetPostsStats from "../../hooks/posts/useGetPostStats";

interface indexProps {}

const Posts: React.FC<indexProps> = ({}) => {
	const { ref, inView } = useInView();
	const { ref: mainRef, inView: mainInView } = useInView();

	const {
		data,
		refetch,
		error,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useGetPosts();

	const { data: statData } = useGetPostsStats();

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView]);

	return (
		<Flex
			w="100%"
			direction="column"
			justifyContent="center"
			alignItems="center"
			p={10}
		>
			{!mainInView && (
				<IconButton
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
					}}
					position={"fixed"}
					right="25px"
					bottom="25px"
					bg="black"
					color="white"
					_hover={{ bg: "black" }}
					_active={{ bg: "black" }}
					aria-label="Call Segun"
					size="lg"
					icon={<ArrowUpIcon />}
				/>
			)}

			<VStack w="500px" mb={10} ref={mainRef}>
				<HStack w="full" spacing={5}>
					<Flex
						direction={"column"}
						w="full"
						bg="white"
						shadow="sm"
						p={5}
						borderRadius="10px"
					>
						<Text fontWeight={"bold"} fontSize="xl">
							Posts Today
						</Text>
						<Text w={"full"} align="right" fontSize="lg" fontWeight={"medium"}>
							{statData?.todaysMoods}
						</Text>
					</Flex>
					<Flex
						direction={"column"}
						w="full"
						bg="white"
						shadow="sm"
						p={5}
						borderRadius="10px"
					>
						<Text fontWeight={"bold"} fontSize="xl">
							Total Posts
						</Text>
						<Text w={"full"} align="right" fontSize="lg" fontWeight={"medium"}>
							{statData?.totalMoods}
						</Text>
					</Flex>
				</HStack>

				<CreatePost refetch={refetch} />
			</VStack>

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
		</Flex>
	);
};

export default Posts;
