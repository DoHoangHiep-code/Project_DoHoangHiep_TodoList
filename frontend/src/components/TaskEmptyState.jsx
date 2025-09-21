import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmptyState = ({ filter }) => {
    return (
        <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
            <div className="space-y-3">
                <Circle className="mx-auto size-12 text-muted-foreground" />
                <div>
                    <h3 className="font-medium text-foreground">
                        {
                            filter === "ACTIVE"
                                ? "Chưa có công việc nào đang làm."
                                : filter === "COMPLETED"
                                    ? "Chưa có công việc đã hoàn thành."
                                    : "Chưa có công việc."
                        }
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {filter === "all" ? "Hãy thêm công việc để bắt đầu!" :
                            `Chuyển sang bộ lọc 'Tất cả' để xem những công việc ${filter === 'ACTIVE' ? 'đã hoàn thành' : 'đang làm'}`}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default TaskEmptyState;
