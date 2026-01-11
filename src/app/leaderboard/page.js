import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function Leaderboard() {
    return (
        <main className="max-w-7xl p-8 m-auto">
            <h2 className="text-4xl font-bold mb-8 font-hungry text-center">
                Le Leaderboard
            </h2>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center w-20">
                                Classement
                            </TableHead>
                            <TableHead className="text-center">
                                Nom de l'équipe
                            </TableHead>
                            <TableHead className="text-center">
                                Nombre de points
                            </TableHead>
                            <TableHead className="text-center">
                                Nombre de tâches faites
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="text-center">
                            <TableCell>1</TableCell>
                            <TableCell>Les machines a tuer</TableCell>
                            <TableCell>581</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </main>
    );
}
