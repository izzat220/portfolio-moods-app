import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

interface indexProps {}

const Layout: React.FC<indexProps> = ({}) => {
	return (
		<Flex direction="column" w="full" alignItems="center">
			<Flex
				direction="row"
				w="full"
				py={5}
				px={"10"}
				bg="white"
				shadow="sm"
				justifyContent="space-between"
				alignItems={"center"}
				position="fixed"
				zIndex={10}
			>
				<Text fontWeight="bold">Moods</Text>

				<HStack spacing={10}>
					<Button variant="link">Home</Button>
					<Button variant="link">Posts</Button>
					<Button variant="link">About Project</Button>
				</HStack>

				<Button variant="outline">Go To Posts</Button>
			</Flex>

			<Flex direction={"column"} w="full" mt={20} alignItems='center'>
				<Outlet />
			</Flex>
		</Flex>
	);
};

export default Layout;
