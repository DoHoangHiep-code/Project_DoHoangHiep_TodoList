import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

const TaskList = ({ filteredTasks, filter, handleTaskChanged}) => {



    if (!filteredTasks || filteredTasks.length === 0) {
        return <TaskEmptyState filter={filter} />
    }
    return (
        <div className="space-y-3">
            {Array.isArray(filteredTasks) ? filteredTasks.map((task, index) => {
                return (
                    <TaskCard
                        key={task._id ?? index}
                        task={task}
                        index={index}
                        handleTaskChanged={handleTaskChanged}
                    />
                );
            }) : <p>Không có dữ liệu hợp lệ</p>}
        </div>
    );
};

export default TaskList;
