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
				title: "Post created.",
				description: "We've created your account for you.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		}
	}, [isSuccess]);

	return (
		<>
			<Button onClick={onOpen}>Open Modal</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={3} direction="column">
							<Input
								placeholder="Enter name"
								value={postedBy}
								onChange={(e: any) => setPostedBy(e.target.value)}
							/>
							<Textarea
								placeholder="Enter text"
								value={text}
								onChange={(e: any) => setText(e.target.value)}
							/>

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
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button
							isLoading={isLoading}
							loadingText="Submitting"
							onClick={createPost}
						>
							Secondary Action
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreatePost;
