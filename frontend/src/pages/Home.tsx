import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"

function Home() {
    return (
        <div className="flex flex-col gap-6 items-end">
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>STUDENT</TableColumn>
                    <TableColumn>COURSE</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>Alex Rogaleski Marques</TableCell>
                        <TableCell>NEXA</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Marcos David</TableCell>
                        <TableCell>Technical Lead</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>Bruno Robson</TableCell>
                        <TableCell>Senior Developer</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Pagination isCompact showControls total={10} initialPage={1} />
        </div>
    )
}

export default Home