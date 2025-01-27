"use client"

import { useState } from "react"
import { Input, Select, SelectItem, Button } from "@heroui/react"
import { Plus } from "lucide-react"
import { TaskTable } from "@/components/task-table"
import { NewTaskModal } from "@/components/new-task-modal"
import { useTasks } from "@/hooks/useTasks"
import { TaskStatus } from "@/types/task"

const initialTasks = [
  {
    id: "1",
    taskName: "Product Scraping",
    time: "Jan 15, 2025 10:30 AM",
    platform: "Amazon",
    targetLink: "https://example.com/products",
    status: TaskStatus.PENDING,
    result: "0/1000",
  },
  {
    id: "2",
    taskName: "Review Collection",
    time: "Jan 15, 2025 09:15 AM",
    platform: "Yelp",
    targetLink: "https://example.com/reviews",
    status: TaskStatus.IN_PROGRESS,
    result: "150/500",
  },
  {
    id: "3",
    taskName: "Price Monitoring",
    time: "Jan 14, 2025 03:45 PM",
    platform: "eBay",
    targetLink: "https://example.com/prices",
    status: TaskStatus.COMPLETED,
    result: "800/800",
  },
]

export default function TaskManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { tasks, addTask, deleteTask, search, setSearch, statusFilter, setStatusFilter } = useTasks(initialTasks)

  return (
    <div className="container mx-auto py-4 px-16">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-semibold">Task Management</h1>
        <Button className="bg-black text-white" onPress={() => setIsModalOpen(true)} startContent={<Plus className="h-4 w-4" />}>
          New Task
        </Button>
      </div>

      <div className="bg-[rgba(229, 231, 235, 1)]">
        <div className="flex justify-between gap-4 mb-6">
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select
            placeholder="All Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="max-w-xs"
          >
            <SelectItem key="all" value="all">
              All Status
            </SelectItem>
            <SelectItem key="pending" value={TaskStatus.PENDING}>
              Pending
            </SelectItem>
            <SelectItem key="in_progress" value={TaskStatus.IN_PROGRESS}>
              In Progress
            </SelectItem>
            <SelectItem key="completed" value={TaskStatus.COMPLETED}>
              Completed
            </SelectItem>
          </Select>
        </div>

        <TaskTable tasks={tasks} onDeleteTask={deleteTask} />

        <NewTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={addTask} />
      </div>

    </div>
  )
}

