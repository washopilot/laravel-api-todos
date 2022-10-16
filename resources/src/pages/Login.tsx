/* eslint-disable react/no-children-prop */
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Button,
    Flex,
    FormControl,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link,
    Stack,
    useColorModeValue
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Avatar bg="blue.400" />
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    {/* <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                    </Text> */}
                </Stack>
                <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" children={<AtSignIcon color="gray.300" />} />
                                <Input type="email" placeholder="email address" />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="password">
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.300" />} />
                                <Input type={showPassword ? 'text' : 'password'} placeholder="Password" />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'end'}>
                                {/* <Checkbox>Remember me</Checkbox> */}
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500'
                                }}>
                                Sign in
                            </Button>
                            <Link as={ReactRouterLink} to="/" sx={{ textDecoration: 'underline' }} color={'blue.400'}>
                                Link to App
                            </Link>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Login;
