import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../components/ButtonComp";
import ModalComp from "../../components/ModalComp";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Button,
    useDisclosure,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MainContainer } from "../../components/ButtonComp/styles";

const Home = () => {
    const { signout } = useAuth();
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState({});

    useEffect(() => {
        const db_costumer = localStorage.getItem("cad_cliente")
            ? JSON.parse(localStorage.getItem("cad_cliente"))
            : [];

        setData(db_costumer);
    }, [setData]);

    const handleRemove = (email) => {
        const newArray = data.filter((item) => item.email !== email);

        setData(newArray);

        localStorage.setItem("cad_cliente", JSON.stringify(newArray));
    };

    return (
        <C.Container>
            <Flex
                h="100vh"
                align="center"
                justify="center"
                fontSize="20px"
            >
                <Box maxW={800} w="100%" py={10} px={2}>
                    <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
                        NOVO CADASTRO
                    </Button>

                    <Box overflowY="auto" height="100%">
                        <Table mt="6">
                            <Thead>
                                <Tr>
                                    <Th fontSize="15px">
                                        Nome
                                    </Th>
                                    <Th fontSize="15px">
                                        Sobrenome
                                    </Th>
                                    <Th fontSize="15px">
                                        E-Mail
                                    </Th>
                                    <Th fontSize="15px">
                                        Telefone
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map(({ name, surname, email, phone }, index) => (
                                    <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                                        <Td>{name}</Td>
                                        <Td>{surname}</Td>
                                        <Td>{email}</Td>
                                        <Td>{phone}</Td>
                                        <Td p={0}>
                                            <EditIcon
                                                fontSize={20}
                                                onClick={() => [
                                                    setDataEdit({ name, surname, email, phone, index }),
                                                    onOpen(),
                                                ]}
                                            />
                                        </Td>
                                        <Td p={0}>
                                            <DeleteIcon
                                                fontSize={20}
                                                onClick={() => handleRemove(email)}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
                {isOpen && (
                    <ModalComp
                        isOpen={isOpen}
                        onClose={onClose}
                        data={data}
                        setData={setData}
                        dataEdit={dataEdit}
                        setDataEdit={setDataEdit}
                    />
                )}
            </Flex>
            <MainContainer>
                <ButtonComp Text='Sair' onClick={() => [signout(), navigate('/')]}>
                    Sair
                </ButtonComp>
            </MainContainer>
        </C.Container>
    );
};

export default Home;