import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Image, Input } from "@nextui-org/react"
import { createClient } from "@supabase/supabase-js";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

const supabase = createClient("https://alqzijljfvoasmlaghii.supabase.co", import.meta.env.VITE_SUPABASE_KEY);

interface ComponentProps {
    address: string;
}

interface FormErrors {
    name?: string;
    username?: string;
    email?: string;
}

function Register(props: ComponentProps) {
    const address = props;

    const [isUser, setIsUser] = useState<boolean>(true);
    const userColor = useMemo(() => isUser ? "primary" : "default", [isUser]);
    const institutionColor = useMemo(() => isUser ? "default" : "primary", [isUser]);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const [isLoading, setIsLoading] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const showCreated = () => {
        setIsCreated(true);
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors: FormErrors = {};
        if (!formData.name.trim()) {
            formErrors.name = 'Name is required';
        }
        if (!formData.username.trim()) {
            formErrors.username = 'Username is required';
        }
        if (!formData.email.trim()) {
            formErrors.email = 'Email is required';
        }
        // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        //     formErrors.email = 'Invalid email format';
        // }

        if (Object.keys(formErrors).length === 0) {
            // Aqui você pode adicionar a lógica para enviar os dados do formulário
            console.log(formData);
            setIsLoading(true);
            setIsCreated(false);
            const { data: newUser, error } = await supabase
                .from('users')
                .insert({ ...formData, ...address, is_user: isUser, is_validated: true })
                .select()

            if (newUser) {
                setFormData(newUser[0]);
                showCreated();
                // TODO: update user model
            }

            console.log("Create Error: ", error);

            setIsLoading(false);

            setErrors({});
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <form className="w-1/3" onSubmit={handleSubmit}>
            <Card >
                <CardHeader>
                    <h1>Create Account</h1>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <div className="flex w-full gap-4 justify-evenly">
                        <Button className="w-full h-fit py-2" color={userColor} size="lg" onClick={() => setIsUser(true)}>
                            <div className="flex flex-col items-center">
                                <Image width={50} alt="student" src="/images/student.png" />
                                <span className="text-wrap text-xs" >I'm a certification receiver</span>
                            </div>
                        </Button>
                        <Button className="w-full h-fit py-2" color={institutionColor} size="lg" onClick={() => setIsUser(false)}>
                            <div className="flex flex-col items-center">
                                <Image width={50} alt="institution" src="/images/institution.png" />
                                <span className="text-wrap text-xs" >I'm a certification emmiter</span>
                            </div>
                        </Button>
                    </div>
                    <div className="flex w-full flex-wrap gap-4">
                        <Input name="name" type="text" label="Name" value={formData.name} onChange={handleChange} />
                        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                        <Input name="username" type="text" label="Username" value={formData.username} onChange={handleChange} />
                        {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                        <Input name="email" type="email" label="Email" value={formData.email} onChange={handleChange} />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                    </div>
                </CardBody>
                <CardFooter className="flex justify-center flex-wrap gap-4">
                    <Button className="w-full" color="primary" type="submit" isLoading={isLoading} >Register</Button>
                    {isCreated && (
                        <Chip color="success" radius="md">Successfully registered</Chip>
                    )}
                </CardFooter>
            </Card>
        </form>
    )
}

export default Register