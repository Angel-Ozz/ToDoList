import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/taskService";
import { Task } from "../types/Task";
import { DataTable } from "../tasks/data-table";
import { columns } from "../tasks/columns";
import { InputForm } from "../tasks/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "@radix-ui/react-label";

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [filters, setFilters] = useState<{
    taskName?: string;
    priority?: string;
    completed?: boolean;
  }>({});

  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks(
          page,
          10, // Tamaño de página
          undefined, // Orden (sortBy)
          filters.taskName, // Tarea por nombre
          filters.priority, // Prioridad
          filters.completed // Estado completado
        );
        setTasks(data);
      } catch (err) {
        setError("Error fetching tasks");
        console.error(err);
      }
    };

    loadTasks();
  }, [isDialogOpen, page, filters]); // Dependencias

  const closeDialog = () => setDialogOpen(false);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto py-15 items-center px-10 pb-20">
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger
          className="p-3 text-white bg-black dark:text-white dark:bg-gray-500 rounded-lg mb-2"
          onClick={() => setDialogOpen(true)}
        >
          Add New Task
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New task</DialogTitle>
            <DialogDescription>Create a new task</DialogDescription>
          </DialogHeader>
          <InputForm onClose={closeDialog} />{" "}
        </DialogContent>
      </Dialog>

      <DataTable
        columns={columns}
        data={tasks}
        pageI={setPage}
        onFilterChange={setFilters}
      />
      <Label className="flex justify-center items-center">{page}</Label>
    </div>
  );
};

export default TaskListPage;
