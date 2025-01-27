"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button } from "@heroui/react"
import { Download, Trash2 } from "lucide-react"
import { type Task, TaskStatus } from "@/types/task"
import Image from "next/image"

interface TaskTableProps {
    tasks: Task[]
    onDeleteTask: (taskId: string) => void
}

export function TaskTable({ tasks, onDeleteTask }: TaskTableProps) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case TaskStatus.COMPLETED:
                return <Image src="/completed.svg" alt="Completed" width={16} height={16} />
            case TaskStatus.IN_PROGRESS:
                return <Image src="/inProgress.svg" alt="In Progress" width={16} height={16} />
            default:
                return <Image src="/pending.svg" alt="Pending" width={16} height={16} />
        }
    }

    return (
        <Table aria-label="Tasks table">
            <TableHeader>
                <TableColumn>Task Name</TableColumn>
                <TableColumn>Time</TableColumn>
                <TableColumn>Platform</TableColumn>
                <TableColumn>Target Link</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Result</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {tasks.map((task) => (
                    <TableRow key={task.id}>
                        <TableCell>{task.taskName}</TableCell>
                        <TableCell>{task.time}</TableCell>
                        <TableCell>{task.platform}</TableCell>
                        <TableCell>
                            <a
                                href={task.targetLink}
                                className="text-blue-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {task.targetLink}
                            </a>
                        </TableCell>
                        <TableCell>
                            <Chip size="sm" startContent={getStatusIcon(task.status)}>
                                {task.status.replace("_", " ")}
                            </Chip>
                        </TableCell>
                        <TableCell>{task.result}</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                {task.status === TaskStatus.COMPLETED && (
                                    <Button isIconOnly size="sm" variant="light">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                )}
                                <Button isIconOnly size="sm" variant="light" onPress={() => onDeleteTask(task.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

