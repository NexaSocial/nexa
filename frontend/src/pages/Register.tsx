import { Button, Card, CardBody, CardFooter, CardHeader, Image, Input } from "@nextui-org/react"
import { useMemo, useState } from "react";

function Register() {
    const [isInstitution, setIsInstitution] = useState<boolean>(false);
    const studentColor = useMemo(() => isInstitution ? "default" : "primary", [isInstitution]);
    const institutionColor = useMemo(() => isInstitution ? "primary" : "default", [isInstitution]);

    return (
        <form className="w-1/3">
            <Card >
                <CardHeader>
                    <h1>Create Account</h1>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <div className="flex w-full gap-4 justify-evenly">
                        <Button className="w-full h-fit py-2" color={studentColor} size="lg" onClick={() => setIsInstitution(false)}>
                            <div className="flex flex-col items-center">
                                <Image width={50} alt="student" src="/images/student.png" />
                                <span className="text-wrap text-xs" >I'm a certification receiver</span>
                            </div>
                        </Button>
                        <Button className="w-full h-fit py-2" color={institutionColor} size="lg" onClick={() => setIsInstitution(true)}>
                            <div className="flex flex-col items-center">
                                <Image width={50} alt="institution" src="/images/institution.png" />
                                <span className="text-wrap text-xs" >I'm a certification emmiter</span>
                            </div>
                        </Button>
                    </div>
                    <div className="flex w-full flex-wrap gap-4">
                        <Input type="text" label="Name" />
                        <Input type="text" label="Username" />
                        <Input type="email" label="Email" />
                    </div>
                </CardBody>
                <CardFooter className="flex justify-center">
                    <Button className="w-full" color="primary">Register</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default Register