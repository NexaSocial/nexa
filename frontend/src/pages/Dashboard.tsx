import { Button, Tab, Tabs, useDisclosure, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, Chip } from "@nextui-org/react"
import Home from "./Home"
import Profile from "./Profile"
import { User } from "../models/UserModel";
import HomeUser from "./HomeUser";
import { ChangeEvent, FormEvent, useState } from "react";
import { useWriteContract } from "wagmi";
import deployedContracts from "../../generated/deployedContracts"

// const supabase = createClient("https://alqzijljfvoasmlaghii.supabase.co", import.meta.env.VITE_SUPABASE_KEY);

interface DashboardProps {
    user: User;
    supabase: any;
}

interface FormErrors {
    username?: string,
    course_name?: string,
    cource_description?: string,
    workload?: string,
    start_date?: string,
    conclusion_date?: string,
}

function Dashboard(props: DashboardProps) {
    const { user, supabase } = props;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { data: hash, isPending, writeContract } = useWriteContract()

    const [formData, setFormData] = useState({
        username: '',
        course_name: '',
        cource_description: '',
        workload: '',
        start_date: '',
        conclusion_date: '',
    });

    const [selectedUser, setSelectedUser] = useState<User | null>();

    const [errors, setErrors] = useState<FormErrors>({});

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (selectedUser && name === 'username') {
            setSelectedUser(null);
        }
    };

    const handleFindUser = async () => {
        const { data: users } = await supabase
            .from('users')
            .select('*').eq('username', formData.username);
        if (users && users?.length > 0) {
            setSelectedUser(User.fromJson(users[0]));
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors: FormErrors = {};

        if (!selectedUser) {
            formErrors.username = 'Valid user is required';
        }
        if (!formData.course_name.trim()) {
            formErrors.course_name = 'Cource name is required';
        }
        if (!formData.cource_description.trim()) {
            formErrors.cource_description = 'Cource description is required';
        }
        if (!formData.workload.trim()) {
            formErrors.workload = 'Workload is required';
        }
        if (!formData.start_date.trim()) {
            formErrors.start_date = 'Start Date is required';
        }
        if (!formData.conclusion_date.trim()) {
            formErrors.conclusion_date = 'Date of the conclusion is required';
        }

        if (Object.keys(formErrors).length === 0) {
            setIsLoading(true);

            const jsonData = {
                name: formData.course_name,
                description: formData.cource_description,
                image: "https://blue-recent-gorilla-290.mypinata.cloud/ipfs/QmXvHPSY2sMdDfTp7uwmCvZQMst6XpezgjZhDWELbKG5Ko",
                attributes: [
                    {
                        trait_type: "Issuer",
                        value: user.name
                    },
                    {
                        trait_type: "Issuer Email",
                        value: user.email
                    },
                    {
                        trait_type: "Name",
                        value: selectedUser?.name
                    },
                    {
                        trait_type: "Username",
                        value: selectedUser?.username
                    },
                    {
                        trait_type: "Email",
                        value: selectedUser?.email
                    },
                    {
                        trait_type: "Start Date",
                        value: formData.start_date
                    },
                    {
                        trait_type: "End Date",
                        value: formData.conclusion_date
                    },
                    {
                        trait_type: "Workload",
                        value: formData.workload
                    }
                ]
            };

            try {
                // Convertendo o JSON para uma string
                const jsonString = JSON.stringify(jsonData, null, 2);
                // Criando um objeto Blob
                const blob = new Blob([jsonString], { type: 'application/json' });

                // Save Image
                const currentDate = new Date();
                const timestamp = currentDate.getTime();
                const formData = new FormData();
                formData.append("file", blob);
                const metadata = JSON.stringify({
                    name: `${timestamp}-${selectedUser?.address}.json`,
                });
                formData.append("pinataMetadata", metadata);

                const options = JSON.stringify({
                    cidVersion: 0,
                });
                formData.append("pinataOptions", options);

                const res = await fetch(
                    "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
                        },
                        body: formData,
                    }
                );
                const resData = await res.json();
                const to = selectedUser?.address as `0x${string}`;

                writeContract({
                    ...deployedContracts,
                    functionName: 'safeMint',
                    args: [to, `ipfs://${resData.IpfsHash}`],
                })

            } catch (error) {
                console.log(error);
            }

            // setIsLoading(true);
            // setIsCreated(false);
            // const { data: newUser, error } = await supabase
            //     .from('users')
            //     .insert({ ...formData })
            //     .select()

            // if (newUser) {
            //     setFormData(newUser[0]);
            //     showCreated();
            //     // TODO: update user model
            // }

            // console.log("Create Error: ", error);

            setIsLoading(false);

            setErrors({});
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div id="dashboard" className="flex flex-col gap-6 items-start w-full justify-start">
            <div className="w-full flex justify-between items-center flex-wrap">
                <h1 className="text-5xl text-slate-50 font-bold mb-4 md:mb-auto">{user?.name}</h1>

                {!user.is_user ?
                    <Button onPress={onOpen} color="primary" size="lg">Issue NFT Certificates</Button>
                    : <div></div>
                }

            </div>
            <div className="w-full">
                <Tabs>
                    <Tab key="home" title="Home">
                        {user.is_user ? <HomeUser /> : <Home />}
                    </Tab>
                    <Tab key="profile" title="Profile">
                        <Profile user={user} supabase={supabase} />
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
                        <form onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1 text-white">NFT certificate issuance</ModalHeader>
                            <ModalBody className="text-white">
                                <div className="flex gap-2 items-start">
                                    <Input
                                        name="username"
                                        label="Username"
                                        placeholder="Enter the username and find"
                                        value={formData.username}
                                        onChange={handleChange}
                                        errorMessage={errors.username}
                                    />
                                    <Button onClick={handleFindUser} size="lg" >Find</Button>
                                </div>
                                {selectedUser && (
                                    <div className="text-xs">
                                        Name: {selectedUser.name} | Email: {selectedUser.email}
                                    </div>
                                )}
                                <Input
                                    name="course_name"
                                    label="Course name"
                                    placeholder="Enter the name of the course or lecture"
                                    value={formData.course_name}
                                    onChange={handleChange}
                                    errorMessage={errors.course_name}
                                // variant="bordered"
                                />
                                <Textarea
                                    name="cource_description"
                                    label="Description"
                                    placeholder="Enter the cource description"
                                    value={formData.cource_description}
                                    onChange={handleChange}
                                    errorMessage={errors.cource_description}
                                // variant="bordered"
                                />
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        name="workload"
                                        type="number"
                                        label="Workload"
                                        placeholder="Enter cource duration in hours"
                                        value={formData.workload}
                                        onChange={handleChange}
                                        errorMessage={errors.workload}
                                    // variant="bordered"
                                    />
                                    <Input
                                        name="start_date"
                                        type="date"
                                        label="Start Date"
                                        value={formData.start_date}
                                        onChange={handleChange}
                                        errorMessage={errors.start_date}
                                    // variant="bordered"
                                    />
                                    <Input
                                        name="conclusion_date"
                                        type="date"
                                        label="Date of the conclusion"
                                        value={formData.conclusion_date}
                                        onChange={handleChange}
                                        errorMessage={errors.conclusion_date}
                                    // variant="bordered"
                                    />
                                </div>
                                {hash && (
                                    <Chip color="success" radius="md">Minted successfully. Transaction Hash: {hash}</Chip>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" type="submit" isLoading={isLoading || isPending}>
                                    Mint
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Dashboard