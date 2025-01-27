"use client"

import { useState } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    // Select,
    // SelectItem,
} from "@heroui/react"
import { TaskSchema, TaskStatus, type Task } from "@/types/task"
import { z } from "zod"

interface NewTaskModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (task: Task) => void
}

export function NewTaskModal({ isOpen, onClose, onSubmit }: NewTaskModalProps) {
    const [formData, setFormData] = useState({
        taskName: "",
        platform: "",
        targetLink: "",
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleSubmit = () => {
        try {
            const task = TaskSchema.parse({
                id: crypto.randomUUID(),
                ...formData,
                time: new Date().toLocaleString(),
                status: TaskStatus.PENDING,
                result: "0/1000",
            })
            onSubmit(task)
            onClose()
            setFormData({ taskName: "", platform: "", targetLink: "" })
            setErrors({})
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {}
                error.errors.forEach((err) => {
                    if (err.path) {
                        newErrors[err.path[0]] = err.message
                    }
                })
                setErrors(newErrors)
            }
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Add New Task</ModalHeader>
                <ModalBody>
                    <div className="space-y-4">
                        <Input
                            label="Task Name"
                            value={formData.taskName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, taskName: e.target.value }))}
                            errorMessage={errors.taskName}
                        />
                        <Input
                            label="Platform"
                            value={formData.platform}
                            onChange={(e) => setFormData((prev) => ({ ...prev, platform: e.target.value }))}
                            errorMessage={errors.platform}
                        />
                        <Input
                            label="Target Link"
                            value={formData.targetLink}
                            onChange={(e) => setFormData((prev) => ({ ...prev, targetLink: e.target.value }))}
                            errorMessage={errors.targetLink}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onPress={handleSubmit}>
                        Add Task
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

