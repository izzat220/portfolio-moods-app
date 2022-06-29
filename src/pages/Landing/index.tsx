import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../landing_logo.svg";

interface LandingProps {}

const Landing: React.FC<LandingProps> = ({}) => {
	let navigate = useNavigate();

	return (
		<Flex
			direction="row"
			w="full"
			maxW="1000px"
			justifyContent="space-between"
			p={10}
			mt={20}
		>
			<Flex direction={"column"}>
				<VStack alignItems={"start"} maxW="700px">
					<Text fontWeight={"bold"} fontSize="4xl">
						Get Your Mood Out There
					</Text>
					<Text fontSize={"xl"} fontWeight="medium" color={"gray.500"}>
						1. Give yourself a pseudonym
					</Text>
					<Text fontSize={"xl"} fontWeight="medium" color={"gray.500"}>
						2. Describe your mood's context
					</Text>
					<Text fontSize={"xl"} fontWeight="medium" color={"gray.500"}>
						3. Specify your mood
					</Text>
					<Text fontSize={"xl"} fontWeight="medium" color={"gray.500"}>
						4. Share with the world
					</Text>
				</VStack>

				<Button
					w="full"
					mt={10}
					bg="black"
					color="white"
					_hover={{ bg: "black" }}
					_active={{ bg: "black" }}
					onClick={() => {
						navigate("/posts");
					}}
				>
					Share Your Mood
				</Button>
			</Flex>
			<img src={logo} alt="" width="400px" />
		</Flex>
	);
};

export default Landing;
