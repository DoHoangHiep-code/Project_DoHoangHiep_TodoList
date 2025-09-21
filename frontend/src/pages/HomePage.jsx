import { Header } from "@/components/Header";
import React, { useEffect, useState } from "react";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFileter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import api from "@/lib/axios";
import { TaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState('today');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);

      // Kiểm tra cấu trúc dữ liệu trả về từ API
      if (res.data && res.data.tasks) {
        // Cập nhật state với dữ liệu từ API
        setTaskBuffer(res.data.tasks);
        setActiveCount(res.data.activeCount || 0);
        setCompletedCount(res.data.completedCount || 0);
      } else {
        console.error("Dữ liệu API không đúng định dạng:", res.data);
        setTaskBuffer([]);
        setActiveCount(0);
        setCompletedCount(0);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setTaskBuffer([]);
      setActiveCount(0);
      setCompletedCount(0);
    }
  };

  const handleTaskChanged = () => {
    fetchTasks();
  }

  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "ACTIVE":
        return task.status === "active";
      case "COMPLETED":
        return task.status === "completed";
      default:
        return true;
    }
  }
  );

  const totalPages = Math.ceil(filteredTasks.length / TaskLimit);

  const paginatedTasks = filteredTasks.slice(
    (page - 1) * TaskLimit,
    page * TaskLimit
  );

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => (prev + 1));
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => (prev - 1));
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (paginatedTasks.length === 0){
    handlePrevPage();
  }

  return (<div className="min-h-screen w-full bg-white dark:bg-[#0a0a0a] relative">
    {/* Light mode background */}
    <div
      className="absolute inset-0 z-0 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 dark:hidden"
    />
    
    {/* Dark mode - Cosmic Aurora */}
    <div
      className="absolute inset-0 z-0 hidden dark:block"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
          radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
          radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
        `,
      }}
    />
    
    {/* Your Content/Components */}
    <div className="container pt-8 mx-auto relative z-10">
      <div className="w-full max-w-2xl p-6 mx-auto space-y-6">

        {/* Header */}
        <Header />

        {/* Add Task */}
        <AddTask handleNewTaskAdded={handleTaskChanged} />

        {/* Stats and Filters */}
        <StatsAndFilters
          filter={filter}
          setFilter={setFilter}
          activeTasksCount={activeCount}
          completedTasksCount={completedCount}
        />

        {/* Task List */}
        <TaskList
          filteredTasks={paginatedTasks}
          filter={filter}
          handleTaskChanged={handleTaskChanged}
        />

        {/* Pagination and DateTimeFileter */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <TaskListPagination
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPages}
          />

          <DateTimeFileter
            dateQuery={dateQuery}
            setDateQuery={setDateQuery}
          />
        </div>

        {/* Footer */}
        <Footer
          activeTaskCount={activeCount}
          competedTaskCount={completedCount}
        />

      </div>
    </div>
  </div>
  );
};

export default HomePage;