"use client"

import { useState } from "react"
import { Button } from "@heroui/react"
import { TaskBotNavbar } from "@/components/navbar"
import { TaskCard } from "@/components/task-card"
import type { TaskScenario } from "@/types/task"
import { useRouter } from "next/navigation"

const taskScenarios: TaskScenario[] = [
    {
        id: "social-media",
        title: "Social Media Scraping",
        description: "Scrape data from social media platforms like Facebook, Instagram, and Twitter",
        icon: "/social-media.svg",
        iconAlt: "Social Media Icon",
    },
    {
        id: "company-search",
        title: "Finding People within a Company",
        description: "Search for people based on a specific company and position",
        icon: "/company.svg",
        iconAlt: "Company Search Icon",
    },
    {
        id: "job-search",
        title: "Job Search with Icebreaker",
        description: "Search job listings and generate icebreaker messages",
        icon: "/job-search.svg",
        iconAlt: "Job Search Icon",
    },
    {
        id: "data-enrichment",
        title: "Personal Data Enrichment",
        description: "Input personal details and enrich data (email, phone)",
        icon: "/data-enrichment.svg",
        iconAlt: "Data Enrichment Icon",
    },
    {
        id: "database-search",
        title: "Database Search and Filtering",
        description: "Search and filter through databases to find people or companies",
        icon: "/database.svg",
        iconAlt: "Database Search Icon",
    },
]

const user = {
    name: "John Doe",
    avatar: "/avatar.svg",
}

export default function TaskSelection() {
    const router = useRouter()
    const [selectedTask, setSelectedTask] = useState<string | null>(null)

    const handleTaskSelect = (taskId: string) => {
        setSelectedTask(taskId)
    }

    const handleCreateTask = () => {
        if (selectedTask) {
            console.log("Creating task with scenario:", selectedTask)
            router.push('/workspace')
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <TaskBotNavbar user={user} />
            <main className="flex-1 bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-7xl mx-auto ">
                        <h1 className="text-2xl font-semibold mb-2">Select Task Scenario</h1>
                        <p className="text-gray-500 mb-8">Choose a scenario to create a new task</p>

                        <div className="grid gap-6 md:grid-cols-3 mb-8">
                            {taskScenarios.map((task) => (
                                <TaskCard key={task.id} task={task} onSelect={handleTaskSelect} 
                                className={`${selectedTask === task.id ? "bg-gray-200" : ""}`}
                                />
                            ))}
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button variant="flat" color="default">
                                Cancel
                            </Button>
                            <Button className={"bg-black text-white"} isDisabled={!selectedTask} onPress={handleCreateTask}>
                                Create Task
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

