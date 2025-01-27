import { z } from "zod"

export const TaskStatus = {
    PENDING: "pending",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
} as const

export const TaskSchema = z.object({
    id: z.string(),
    taskName: z.string().min(1, "Task name is required"),
    time: z.string(),
    platform: z.string().min(1, "Platform is required"),
    targetLink: z.string().url("Invalid URL"),
    status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]),
    result: z.string(),
})

export interface TaskScenario {
    id: string
    title: string
    description: string
    icon: string
    iconAlt: string
}

export interface User {
    name: string
    avatar: string
}

export type Task = z.infer<typeof TaskSchema>

