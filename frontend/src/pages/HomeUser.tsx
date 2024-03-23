import { Card, CardBody, CardFooter, Image } from "@nextui-org/react"

function HomeUser() {
    const list = [
        {
            title: "NEXA Certificate",
            img: "https://blue-recent-gorilla-290.mypinata.cloud/ipfs/QmXvHPSY2sMdDfTp7uwmCvZQMst6XpezgjZhDWELbKG5Ko",
        },
        {
            title: "NEXA Certificate",
            img: "https://blue-recent-gorilla-290.mypinata.cloud/ipfs/QmXvHPSY2sMdDfTp7uwmCvZQMst6XpezgjZhDWELbKG5Ko",
        },
        {
            title: "NEXA Certificate",
            img: "https://blue-recent-gorilla-290.mypinata.cloud/ipfs/QmXvHPSY2sMdDfTp7uwmCvZQMst6XpezgjZhDWELbKG5Ko",
        },
        {
            title: "NEXA Certificate",
            img: "https://blue-recent-gorilla-290.mypinata.cloud/ipfs/QmXvHPSY2sMdDfTp7uwmCvZQMst6XpezgjZhDWELbKG5Ko",
        },
    ];

    return (
        <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
            {list.map((item, index) => (
                <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                    <CardBody className="overflow-visible p-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={item.title}
                            className="w-full object-cover h-[140px]"
                            src={item.img}
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>{item.title}</b>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default HomeUser