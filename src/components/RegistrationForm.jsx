import {
  Box,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  Input,
  Button,
  Select,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "", // Laravel expects 'name', not 'username'
    email: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({}); // State for form validation errors
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading state
  const toast = useToast(); // Chakra UI toast for notifications
  const navigate = useNavigate(); // React Router navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when the user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if there are validation errors
    }

    setIsSubmitting(true); // Start loading state

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registration successful:", response.data);

      // Show success toast
      toast({
        title: "Registration successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data);

      // Handle errors properly
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      // Show error toast
      toast({
        title: "Registration failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false); // End loading state
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
        <Heading as={"h2"} size={"xl"} textAlign={"center"} mb={6}>
          Register
        </Heading>
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          {/* Name Field */}
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          {/* Email Field */}
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          {/* Password Field */}
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          {/* Role Field */}
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </Select>
          </FormControl>

          {/* Submit Button */}
          <Button
            colorScheme="blue"
            type="submit"
            w={"full"}
            isLoading={isSubmitting} // Show loading spinner
          >
            Register
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
