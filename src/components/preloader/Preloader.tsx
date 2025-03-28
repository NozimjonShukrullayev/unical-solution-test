// import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Preloader = () => {
  return (
    <DotLottieReact
    src="https://lottie.host/38c2184c-a1ac-4457-b270-ee923e8032d5/5dav8Nd12n.lottie"
    loop
    autoplay
    className='bg-gray-800 fixed inset-0 z-50 flex items-center justify-center'
  />
  );
};