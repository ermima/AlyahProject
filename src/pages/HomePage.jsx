import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Box,
  Button,
  HStack,
  Image,
} from "@chakra-ui/react";
import { PiAirplaneTakeoffFill } from "react-icons/pi"; // Ensure this path is correct

import { useNavigate } from "react-router-dom"; // Import useNavigate

const HomePage = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Box
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          borderWidth={1}
          borderColor="gray.200"
          textAlign="center"
          bg="white"
          width="full"
          color="black"
          _dark={{ bg: "gray.800", color: "white", borderColor: "gray.600" }}
        >
          <Text
            fontSize={30}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            Welcome Back <PiAirplaneTakeoffFill size={20} />
          </Text>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            New For Us😐
          </Text>
          <Text fontWeight="bold" mb={2}>
            Have an account?
          </Text>
          <HStack spacing={2} justifyContent="center">
            <Button
              variant="link"
              color="blue.500"
              _dark={{ color: "blue.300" }}
              onClick={() => navigate("/register")} // Redirect to /register
            >
              Sign Up Here
            </Button>
            <Text fontWeight="bold">|</Text>
            <Button
              variant="link"
              color="blue.500"
              _dark={{ color: "blue.300" }}
              onClick={() => navigate("/login")} // Redirect to /login
            >
              Login
            </Button>
          </HStack>
        </Box>

        {/* Social Login Buttons */}
        <Text fontWeight="bold" mb={2}>
          Or login with:
        </Text>
        <HStack spacing={4} justifyContent="center" width="full">
          <Button
            leftIcon={<Image src="image.png" boxSize={5} />}
            colorScheme="blue"
            width="full"
            variant="solid"
          >
            Google
          </Button>
          <Button
            leftIcon={
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                boxSize={5}
              />
            }
            colorScheme="blue"
            width="full"
            variant="solid"
          >
            Facebook
          </Button>
        </HStack>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w="full"
        ></SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;
