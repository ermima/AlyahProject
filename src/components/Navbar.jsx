/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [language, setLanguage] = useState("en");

  // Translations for the navbar
  const translations = {
    en: {
      title: "ALYAH SOFTWARE",
      settings: "Settings",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      language: "Language",
    },
    am: {
      title: "አልያህ ሶፍትዌር",
      settings: "ማሰናጃ",
      darkMode: "ጨለማ ሞድ",
      lightMode: "ብርሃን ሞድ",
      language: "ቋንቋ",
    },
  };

  return (
    <Flex
      w="full"
      position="fixed"
      top={0}
      left={0}
      zIndex={1000}
      bg={
        colorMode === "light"
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(26, 32, 44, 0.9)"
      }
      backdropFilter="blur(10px)"
      borderBottom="1px"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
    >
      <Container maxW="1140px" px={4}>
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          flexDir={{ base: "row", sm: "row" }}
          py={{ base: 2, sm: 0 }}
        >
          {/* App Title */}
          <Text
            fontSize={{ base: 22, sm: 28 }}
            fontWeight="bold"
            textTransform="uppercase"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
          >
            <Link to="/">{translations[language].title}</Link>
          </Text>

          {/* Settings Dropdown for Small Screens */}
          <Menu autoSelect={false}>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              display={{ base: "flex", md: "none" }} // Show only on small screens
            />
            <MenuList>
              <MenuItem onClick={toggleColorMode}>
                {colorMode === "light"
                  ? translations[language].darkMode
                  : translations[language].lightMode}
              </MenuItem>
              <Box px={4} py={2}>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  width="full"
                  aria-label="Select Language"
                >
                  <option value="en">English</option>
                  <option value="am">አማርኛ</option>
                </Select>
              </Box>
            </MenuList>
          </Menu>

          {/* Settings for Large Screens */}
          <HStack spacing={4} display={{ base: "none", md: "flex" }}>
            <Button onClick={toggleColorMode} variant="ghost">
              {colorMode === "light" ? (
                <IoMoon size={20} />
              ) : (
                <LuSun size={20} />
              )}
            </Button>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              width="120px"
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="am">አማርኛ</option>
            </Select>
          </HStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
