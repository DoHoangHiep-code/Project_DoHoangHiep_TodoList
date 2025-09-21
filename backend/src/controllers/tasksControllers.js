import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  const {filter = 'today'} = req.query; 
  const now = new Date();
  let startDate;

  switch (filter) {
    case 'today':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'week':
      const firstDayOfWeek = now.getDate() - (now.getDay()-1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'all':
    default:
      startDate = null;
      break;
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
          completedCount: [{ $match: { status: 'completed' } }, { $count: 'count' }],
        }
      }
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0] ? result[0].activeCount[0].count : 0;
    const completedCount = result[0].completedCount[0] ? result[0].completedCount[0].count : 0;

    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error("Loi khi goi getAllTasks:", error.message);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Loi khi goi createTask:", error.message);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
}

// Chức năng cập nhật task
export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status, completedAt },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task không tồn tại' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Loi khi goi updateTask:", error.message);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
}

// Chức năng xóa task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task không tồn tại' });
    }
    res.status(200).json({ message: 'Xóa task thành công' });
  } catch (error) {
    console.error("Loi khi goi deleteTask:", error.message);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
}