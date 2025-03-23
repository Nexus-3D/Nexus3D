import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 dark:bg-indigo-600 text-white">
          {feature.icon}
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.title}</p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">{feature.description}</dd>
    </motion.div>
  );
};

export default FeatureCard; 