import React from "react";
import { Calendar, CheckCircle2, Circle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useState } from "react";

const TaskCard = ({ task, index, handleTaskChanged }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title || "");

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            toast.success("Công việc đã được xóa!");
            handleTaskChanged();
        } catch (error) {
            console.error("Lỗi khi xóa công việc:", error);
            toast.error("Không thể xóa công việc. Vui lòng thử lại.");
        }
    };

    const updateTask = async () => {
        try {
            await api.put(`/tasks/${task._id}`, {
                title: editedTitle,
            });
            toast.success(`Công việc đã được cập nhật thành ${editedTitle}!`);
            handleTaskChanged();
        } catch (error) {
            console.error("Lỗi khi cập nhật công việc:", error);
            toast.error("Không thể cập nhật công việc. Vui lòng thử lại.");
        }
    };

    const toggleTaskCompleteButton = async () => {
        try {
            if (task.status === "active") {
                await api.put(`/tasks/${task._id}`, {
                    status: "completed",
                    completedAt: new Date().toISOString(),
                });
                toast.success(`Công việc ${task.title} đã được đánh dấu là hoàn thành!`);
                handleTaskChanged();
            } else {
                await api.put(`/tasks/${task._id}`, {
                    status: "active",
                    completedAt: null,
                });
                toast.success(`Công việc ${task.title} đã được đánh dấu là chưa hoàn thành!`);
                handleTaskChanged();
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật công việc:", error);
            toast.error("Không thể cập nhật công việc. Vui lòng thử lại.");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            updateTask();
        }
    };

    return (
        <Card className={cn("p-4 bg-gradient-card border-0 shadow-custom-lg transition-all duration-200 animate-fade-in group dark:bg-gradient-to-br dark:from-slate-800/50 dark:to-slate-900/50 dark:backdrop-blur-sm",
            task.status === "completed" && "opacity-75"
        )}
            style={{ animationDelay: `${index * 50}ms` }}>
            <div className="flex items-center gap-4">
                {/* Nut tron*/}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn("flex-shrink-0 size-8 transition-all duration-200",
                        task.status === "completed" ? "text-success hover:text-success/80" : "text-muted-foreground hover:text-primary"
                    )}
                    onClick={toggleTaskCompleteButton}
                >
                    {task.status === "completed" ? <CheckCircle2 className="size-5" /> : <Circle className="size-5" />}
                </Button>

                {/* Hien thi hoac chinh sua tieu de */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <Input
                            placeholder="Chỉnh sửa công việc"
                            className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-white dark:bg-slate-700"
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={() => {
                                setIsEditing(false);
                                setEditedTitle(task.title || ""); // Hoặc giữ nguyên tiêu đề ban đầu nếu không muốn lưu thay đổi khi mất focus
                                updateTask();
                            }}
                        />
                    ) : (
                        <p className={cn("text-base transition-all duration-200",
                            task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"
                        )}>
                            {task.title}
                        </p>
                    )}
                    {/*ngay tao va ngay hoan thanh */}
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className="size-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleString()}
                        </span>
                        {task.completedAt && (
                            <>
                                <span className="text-ms text-muted-foreground"> - </span>
                                <Calendar className="size-4 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                    {new Date(task.completedAt).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Nút chỉnh sửa và xóa */}
                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                    {/* Nút chỉnh sửa */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                        onClick={() => {
                            setIsEditing(true)
                            setEditedTitle(task.title || "")
                        }}
                    >
                        <SquarePen className="size-4" />
                    </Button>

                    {/* Nút xóa */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteTask(task._id)}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </div>
        </Card>
        );
};

export default TaskCard;
