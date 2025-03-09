/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  VStack,
  useColorModeValue,
  Text,
  useToast,
} from "@chakra-ui/react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();
  const toast = useToast(); // For displaying messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful:", response.data);

      const { token, role } = response.data; // Extract token & role

      if (!token) {
        throw new Error("Invalid response from server.");
      }

      // Store token in localStorage & set authorization header
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "manager") {
        navigate("/manager");
      } else {
        navigate("/user");
      }

      // Show success message
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Login failed:", error.response?.data);

      // Handle possible errors
      const errorMessage =
        error.response?.data?.message || "Invalid email or password";
      setError(errorMessage);

      // Show error message
      toast({
        title: "Login failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Container
      maxW={"container.sm"}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        p={8}
        rounded={"lg"}
        shadow={"md"}
      >
        <Heading
          as={"h2"}
          size={"xl"}
          textAlign={"center"}
          mb={6}
          color={useColorModeValue("black", "white")}
        >
          Login
        </Heading>
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
          <Button
            type="submit"
            colorScheme="blue"
            w={"full"}
            isLoading={isLoading} // Show loading spinner
          >
            Login
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default LoginForm;
