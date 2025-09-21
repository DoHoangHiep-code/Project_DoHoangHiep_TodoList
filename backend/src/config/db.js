import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING
    );
    console.log('CSDL connected');
  } catch (error) {
    console.error("Loi ket noi CSDL:", error.message);
    process.exit(1);// Thoat khoi ung dung neu khong ket noi duoc CSDL
  }
};