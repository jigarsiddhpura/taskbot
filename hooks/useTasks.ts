import { useState, useCallback, useMemo } from "react"
import { type Task } from "@/types/task"

export function useTasks(initialTasks: Task[]) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")

    // WHY useCallback - useful when passing func as props to child components to prevent unnecessary rerenders || memoizes the func
    // WHY NOT useMemo - want to return `a memoized func ref.` and not the `memoized computed value`
    const addTask = useCallback((task: Task) => {
        setTasks((prev) => [...prev, task])
    }, [])

    const deleteTask = useCallback((taskId: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId))
    }, [])

    // WHY useMemo - memoized the result of the computation
    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch =
                task.taskName.toLowerCase().includes(search.toLowerCase()) ||
                task.platform.toLowerCase().includes(search.toLowerCase())
            const matchesStatus = statusFilter === "all" || task.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [tasks, search, statusFilter])

    return {
        tasks: filteredTasks,
        addTask,
        deleteTask,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
    }
}

