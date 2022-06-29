import React, { useEffect, useState } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	Input,
	Textarea,
	VStack,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuOptionGroup,
	useToast,
	Text,
	Alert,
	AlertIcon,
	HStack,
	Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import moods from "./constants/moods";
import useCreatePost from "./hooks/posts/useCreatePost";

interface CreatePostProps {
	refetch: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ refetch }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { error, isLoading, mutate, isSuccess } = useCreatePost();
	const toast = useToast();

	const [postedBy, setPostedBy] = useState<string>("");
	const [text, setText] = useState<string>("");
	const [mood, setMood] = useState<string>("");

	const createPost = async () => {
		mutate({ postedBy, text, mood });
	};

	useEffect(() => {
		if (isSuccess) {
			onClose();
			setPostedBy("");
			setText("");
			setMood("");
			refetch();
			toast({
				title: "Mood Posted.",
				description: "You and others can now view that post.",
				status: "success",
				duration: 9000,
				isClosable: true,
				position: "bottom-right",
				variant: "subtle",
			});
		}
	}, [isSuccess]);

	return (
		<>
			<Button onClick={onOpen} variant="outline" bg="white" maxW="500px" w="full">
				Post Mood
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex direction="column" alignItems="start">
							<HStack mb={1}>
								<Text fontSize={"sm"} fontWeight="medium">
									Posted By
								</Text>
								<Text fontSize={"xs"} color="gray.400">
									Max 30 Characters
								</Text>
							</HStack>
							<Input
								placeholder="Enter name"
								fontSize={"sm"}
								value={postedBy}
								onChange={(e: any) => setPostedBy(e.target.value)}
								mb={4}
							/>

							<HStack mb={1}>
								<Text fontSize={"sm"} fontWeight="medium">
									Mood Context
								</Text>
								<Text fontSize={"xs"} color="gray.400">
									Min 50, Max 500 Characters
								</Text>
							</HStack>

							<Textarea
								rows={7}
								fontSize={"sm"}
								placeholder="Enter text"
								value={text}
								onChange={(e: any) => setText(e.target.value)}
								mb={3}
							/>

							<HStack mb={1}>
								<Text fontSize={"sm"} fontWeight="medium">
									Currently Feeling
								</Text>
							</HStack>

							<Menu>
								<MenuButton
									w="100%"
									textAlign="left"
									as={Button}
									rightIcon={<ChevronDownIcon />}
								>
									{mood ? mood : "Select Mood"}
								</MenuButton>
								<MenuList maxH="400px" overflow="auto" w="100%">
									<MenuOptionGroup type="radio">
										{moods.map((item: string, index: number) => (
											<MenuItemOption
												value={item}
												key={item + index}
												onClick={() => setMood(item)}
											>
												{item}
											</MenuItemOption>
										))}
									</MenuOptionGroup>
								</MenuList>
							</Menu>

							{error && (
								<Alert status="error" borderRadius="10px" fontSize={"sm"}>
									<AlertIcon />
									There was an error processing your request
								</Alert>
							)}
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="gray" mr={3} onClick={onClose} size={"sm"}>
							Close
						</Button>
						<Button
							size={"sm"}
							isLoading={isLoading}
							loadingText="Submitting"
							onClick={createPost}
							bg="black"
							color="white"
							_hover={{ bg: "black" }}
							_active={{ bg: "black" }}
						>
							Post Mood
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreatePost;
