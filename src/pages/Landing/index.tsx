import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import logo from "../../landing_logo.svg";

interface LandingProps {}

const Landing: React.FC<LandingProps> = ({}) => {
	return (
		<Flex
			direction="row"
			w="full"
			maxW="900px"
			justifyContent="space-between"
			p={10}
			mt={20}
		>
			<VStack alignItems={"start"} maxW="400px">
				<Text fontWeight={"bold"} fontSize="4xl">
					Feeling Kept Up?
				</Text>
				<Text fontSize={"xl"} fontWeight="medium">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vero itaque
					soluta reprehenderit ipsam. Quas.
				</Text>

				<Button w="full">Start Posting</Button>
			</VStack>
			<img src={logo} alt="" width="400px" />
		</Flex>
	);
};

export default Landing;
