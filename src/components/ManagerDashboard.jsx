/* eslint-disable no-unused-vars */
import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // Ensure this path is correct

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <Box minH="100vh" bg={bg}>
      <Flex
        p={4}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="md"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="lg">Manager Dashboard</Heading>
        <Button colorScheme="red" onClick={() => navigate("/login")}>
          Logout
        </Button>
      </Flex>

      <VStack spacing={4} p={8} align="start">
        <Text fontSize="xl" fontWeight="bold">
          Welcome, Manager!
        </Text>

        <Flex gap={4} flexWrap="wrap">
          <Box
            p={6}
            bg={useColorModeValue("white", "gray.700")}
            borderRadius="lg"
            boxShadow="md"
            w="300px"
            textAlign="center"
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Project Management
            </Text>
            <Button colorScheme="blue" as={Link} to="/manager/projects">
              Manage Projects
            </Button>
          </Box>

          <Box
            p={6}
            bg={useColorModeValue("white", "gray.700")}
            borderRadius="lg"
            boxShadow="md"
            w="300px"
            textAlign="center"
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Reports
            </Text>
            <Button colorScheme="blue" as={Link} to="/manager/reports">
              View Reports
            </Button>
          </Box>

          <Box
            p={6}
            bg={useColorModeValue("white", "gray.700")}
            borderRadius="lg"
            boxShadow="md"
            w="300px"
            textAlign="center"
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Operational Data
            </Text>
            <Button colorScheme="blue" as={Link} to="/manager/operations">
              Manage Operations
            </Button>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ManagerDashboard;
