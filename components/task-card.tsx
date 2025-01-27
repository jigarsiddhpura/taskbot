"use client"

import { Card, CardBody, CardFooter, Button } from "@heroui/react"
import Image from "next/image"
import type { TaskScenario } from "@/types/task"

interface TaskCardProps {
    task: TaskScenario
    onSelect: (taskId: string) => void
}

export function TaskCard({ task, onSelect }: TaskCardProps) {
    return (
        <Card className="group hover:shadow-lg transition-shadow duration-200" shadow="sm">
            <CardBody className="gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                    <Image
                        src={task.icon || "/placeholder.svg"}
                        alt={task.iconAlt}
                        width={24}
                        height={24}
                        className="group-hover:scale-110 transition-transform duration-200"
                    />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-500">{task.description}</p>
                </div>
            </CardBody>
            <CardFooter>
                <Button className="w-full" color="default" variant="flat" onPress={() => onSelect(task.id)}>
                    Select
                </Button>
            </CardFooter>
        </Card>
    )
}

