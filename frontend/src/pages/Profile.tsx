import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Input } from "@nextui-org/react"
import { User } from "../models/UserModel";
import { ChangeEvent, FormEvent, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://alqzijljfvoasmlaghii.supabase.co", import.meta.env.VITE_SUPABASE_KEY);

interface ComponentProps {
    user: User;
}

interface FormErrors {
    name?: string;
    username?: string;
    email?: string;
}

function Profile(props: ComponentProps) {
    const { user } = props;

    const [formData, setFormData] = useState({
        name: user.name ?? '',
        username: user.username ?? '',
        email: user.email ?? '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const [isLoading, setIsLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const showUpdated = () => {
        setIsUpdated(true);
        setTimeout(() => {
            setIsUpdated(false);
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
            setIsUpdated(false);
            const { data: newUser } = await supabase
                .from('users')
                .update(formData)
                .eq('id', user.id)
                .select();

            if (newUser) {
                setFormData(newUser[0]);
                showUpdated();
                // TODO: update user model
            }

            setIsLoading(false);

            setErrors({});
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <div className="flex justify-center">
                            Profile Edit
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="flex justify-center md:justify-start">
                            <div className="w-full md:w-1/4 flex flex-col gap-4">
                                <div className="flex w-full flex-wrap gap-4">
                                    <Input name="name" type="text" label="Name" value={formData.name} onChange={handleChange} />
                                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                                    <Input name="username" type="text" label="Username" value={formData.username} onChange={handleChange} />
                                    {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                                    <Input name="email" type="email" label="Email" value={formData.email} onChange={handleChange} />
                                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="w-full md:w-1/4 flex justify-center flex-wrap gap-4">
                            <Button className="w-full" color="primary" type="submit" isLoading={isLoading} >Save</Button>
                            {isUpdated && (
                                <Chip color="success" radius="md">Updated successfully</Chip>
                            )}
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </>
    )
}

export default Profile