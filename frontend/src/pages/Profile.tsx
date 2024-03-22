import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react"
import { User } from "../models/UserModel";

interface ComponentProps {
    user: User;
}

function Profile(props: ComponentProps) {
    const { user } = props;

    return (
        <>
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
                                <Input name="name" type="text" label="Name" value={user.name} />
                                <Input name="username" type="text" label="Username" value={user.username} />
                                <Input name="email" type="email" label="Email" value={user.email} />
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    <div className="w-f ull md:w-1/4">
                        <Button className="w-full" color="primary" >Save</Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

export default Profile