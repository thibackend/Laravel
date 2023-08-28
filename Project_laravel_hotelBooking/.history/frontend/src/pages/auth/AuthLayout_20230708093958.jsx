import { Box, Flex, Heading, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import Register from "./resgister";
import { LoginForm } from "./login";
import tokenService from "../../services/token.service";
import { Navigate } from "react-router-dom";

const AuthLayout = () => {
  const [login, setLogin] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isAuth = tokenService.getToken() || undefined
  if (isAuth) {
    return <Navigate to="/" />;
  }
  const LoginShow = () => {
    setLogin(true);
  }
  const registerShow = () => {
    setLogin(false);
  }


  if (isAuth) {
    return <Navigate to="/" />;
  }
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      <Flex minHeight={"100vh"} width={"full"} align={"center"} justifyContent={'center'} >
        <Box
          borderWidth={1}
          px={4}
          width={"full"}
          maxWidth={"500px"}
          borderRadius={45}
          textAlign={"center"}
          boxShadow={'lg'}
        >
          <Box textAlign={"center"}
          marginTop={19}
          >
            <Flex align={"center"} justifyContent={'center'} gap={'2'} marginTop={10}>
              <Heading
                onClick={LoginShow}
                onMouseLeave={handleMouseLeave}
                color={login ? "blue" : ''}
                transition="transform 0.2s"
                transform={isHovered ? 'translateY(4px)' : 'none'}
                _active={{ transform: 'translateY(4px)' }}
                _hover={{
                  cursor: 'pointer', transform: 'translateY(4px)'
                }}
              > Sigin </Heading>
              <Heading> / </Heading>
              <Heading
                color={!login ? "blue" : ''}
                onClick={registerShow}
                onMouseLeave={handleMouseLeave}
                transition="transform 0.2s"
                transform={isHovered ? 'translateY(4px)' : 'none'}
                _active={{ transform: 'translateY(4px)' }}
                _hover={{
                  cursor: 'pointer', transform: 'translateY(4px)'
                }}
              > Register </Heading>
            </Flex>
          </Box>
          <Box p={4}>
            {login ? <LoginForm /> : <Box><Register /></Box>}
          </Box>
        </Box>
      </Flex >
    </>
  );
};
export default AuthLayout;



