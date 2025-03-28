import React from 'react';
import { User, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const userName = localStorage.getItem('userName') || 'User';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-md px-6 py-4 flex justify-between items-center"
    >
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Builder</h1>
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Bell size={20} />
        </motion.button>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <span className="font-medium">{userName}</span>
        </motion.div>
      </div>
    </motion.header>
  );
};