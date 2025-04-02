
import { motion } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const whatsappNumber = "+919071331124";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <img
            src="/lovable-uploads/b0fbf4d9-3076-42b2-8a35-0140e2283ab2.png"
            alt="Woman with long flowing dark hair on light background"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
            loading="eager"
            decoding="async"
          />
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)"
            }}
          />
        </div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-libre mb-4 md:mb-6 leading-tight font-bold">
            Elevate Your Style
          </h1>
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 max-w-2xl mx-auto font-libre"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Experience premium hair care and styling at Trends Unisex Salon
          </motion.p>
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white/10 backdrop-blur-md text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-lg md:text-xl font-libre border border-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group"
            style={{
              background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'
            }}
            whileHover={{ 
              y: -4,
              transition: { duration: 0.2 }
            }}
            whileTap={{ y: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Book Appointment</span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
