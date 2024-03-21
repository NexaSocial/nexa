import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react"

function Profile() {
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
                                <Input type="text" label="Name" />
                                <Input type="text" label="Username" />
                                <Input type="email" label="Email" />
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    <div className="w-full md:w-1/4">
                        <Button className="w-full" color="primary" >Save</Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

export default Profile