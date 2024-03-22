import { Button, Tab, Tabs, useDisclosure, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, Autocomplete, AutocompleteItem, } from "@nextui-org/react"
import Home from "./Home"
import Profile from "./Profile"
import {User} from "../models/UserModel";
import HomeUser from "./HomeUser";

interface DashboardProps {
    user: User;
}

function Dashboard(props: DashboardProps) {
    const { user } = props;
    console.log('Dash', user);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const animals = [
        { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
        { label: "Dog", value: "dog", description: "The most popular pet in the world" },
        { label: "Elephant", value: "elephant", description: "The largest land animal" },
        { label: "Lion", value: "lion", description: "The king of the jungle" },
        { label: "Tiger", value: "tiger", description: "The largest cat species" },
        { label: "Giraffe", value: "giraffe", description: "The tallest land animal" },
    ];

    return (
        <div id="dashboard" className="flex flex-col gap-6 items-start w-full justify-start">
            <div className="w-full flex justify-between items-center flex-wrap">
                <h1 className="text-5xl text-slate-50 font-bold mb-4 md:mb-auto">{user?.name}</h1>

                {!user.is_user ?
                    <Button onPress={onOpen} color="primary" size="lg">Issue NFT Certificates</Button>
                    :<div></div>
                }
                
            </div>
            <div className="w-full">
                <Tabs>
                    <Tab key="home" title="Home">
                        {user.is_user ? <HomeUser/> : <Home />}
                    </Tab>
                    <Tab key="profile" title="Profile">
                        <Profile user={user} />
                    </Tab>
                </Tabs>
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className="dark"
                size="4xl"
                isDismissable={false}
                isKeyboardDismissDisabled={true}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-white">NFT certificate issuance</ModalHeader>
                            <ModalBody className="text-white">
                                {/* Aluno
                                Nome do curso
                                Descrição
                                Carga Horária
                                Data de Início
                                Data de Conclusão
                                Instituição */}
                                <Autocomplete
                                    label="Select an student"
                                // variant="bordered"
                                // autoFocus
                                >
                                    {animals.map((animal) => (
                                        <AutocompleteItem key={animal.value} value={animal.value}>
                                            {animal.label}
                                        </AutocompleteItem>
                                    ))}
                                </Autocomplete>
                                <Input
                                    label="Course name"
                                    placeholder="Enter the name of the course or lecture"
                                // variant="bordered"
                                />
                                <Textarea
                                    label="Description"
                                    placeholder="Enter the cource description"
                                // variant="bordered"
                                />
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        type="number"
                                        label="Workload"
                                        placeholder="Enter cource duration in hours"
                                    // variant="bordered"
                                    />
                                    <Input
                                        type="date"
                                        label="Start Date"
                                    // variant="bordered"
                                    />
                                    <Input
                                        type="date"
                                        label="Date of the conclusion"
                                    // variant="bordered"
                                    />
                                </div>
                                <label className="text-sm">Upload the certificate image</label>
                                <Input
                                    type="file"
                                    label=" "
                                // variant="bordered"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Mint
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Dashboard