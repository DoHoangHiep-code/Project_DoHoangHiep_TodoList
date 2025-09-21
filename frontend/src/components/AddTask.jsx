import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const handleAddTask = async () => {
        if (newTaskTitle.trim()) {
            try {
                await api.post("/tasks", { title: newTaskTitle });
                toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm!`);
                handleNewTaskAdded();

            } catch (error) {
                console.error("Lỗi khi thêm công việc:", error);
                toast.error("Không thể thêm công việc. Vui lòng thử lại.");
            }
            setNewTaskTitle("");

        } else {
            toast.error("Tiêu đề công việc không được để trống.");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    };

    return (
        <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg dark:bg-gradient-to-br dark:from-slate-800/50 dark:to-slate-900/50 dark:backdrop-blur-sm">
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                    type="text"
                    placeholder="Cần làm gì?"
                    className="h12 text-base bg-slate-50 dark:bg-slate-700 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                />

                <Button
                    variant="gradient"
                    size="xl"
                    className="px-6"
                    onClick={handleAddTask}
                    disabled={!newTaskTitle.trim()}
                >
                    <Plus className="size-5" />
                    Thêm việc
                </Button>
            </div>
        </Card>
    );
};

export default AddTask;