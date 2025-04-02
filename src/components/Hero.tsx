
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Define hero images with responsive options and proper fallbacks
const heroImages = [
  {
    url: "/lovable-uploads/72b10879-41a6-463e-8e85-2d5a0b42fcb3.png",
    alt: "Woman with flowing dark hair on light background",
    position: "center center",
  },
  {
    url: "/lovable-uploads/8386bfe9-9e0a-461f-ace2-682af9504539.png",
    alt: "Side profile of woman with long flowing dark hair",
    position: "center center",
  },
  {
    url: "/lovable-uploads/e915892f-039f-48d8-8508-7516a007136e.png",
    alt: "Woman with dark hair on warm gold background",
    position: "center center",
  }
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const whatsappNumber = "+919071331124";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  // Improved image preloading with tracking
  useEffect(() => {
    // Initialize loaded status array
    if (imagesLoaded.length === 0) {
      setImagesLoaded(new Array(heroImages.length).fill(false));
    }
    
    // Create an array to store the image elements
    const imageElements: HTMLImageElement[] = [];
    
    // Preload all images and track loading status
    heroImages.forEach((image, index) => {
      const img = new Image();
      
      img.onload = () => {
        // Update the loaded status for this image
        setImagesLoaded(prev => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      };
      
      img.onerror = () => {
        console.error(`Failed to load image: ${image.url}`);
        // Mark as loaded anyway to avoid blocking the UI
        setImagesLoaded(prev => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      };
      
      // Start loading the image
      img.src = image.url;
      imageElements.push(img);
    });
    
    // Set up image rotation timer only after first image is loaded
    const checkAndStartTimer = () => {
      if (imagesLoaded[0]) {
        // Clear any existing timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        
        // Start a new timer
        timerRef.current = setInterval(() => {
          setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
      }
    };
    
    // Check if first image is already loaded
    if (imagesLoaded[0]) {
      checkAndStartTimer();
    } else {
      // Set up a watcher for when the first image loads
      const watcherId = setInterval(() => {
        if (imagesLoaded[0]) {
          checkAndStartTimer();
          clearInterval(watcherId);
        }
      }, 200);
      
      // Clean up watcher after 10 seconds if image never loads
      const timeoutId = setTimeout(() => {
        clearInterval(watcherId);
        // If images don't load, still show something
        setImagesLoaded(prev => prev.map(() => true));
      }, 10000);
      
      return () => {
        clearInterval(watcherId);
        clearTimeout(timeoutId);
      };
    }
    
    // Clean up timer on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [imagesLoaded]);

  // Determine if hero should display based on first image loaded
  const shouldShowHero = imagesLoaded[0] || imagesLoaded.some(loaded => loaded);

  return (
    <div className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Render a lightweight placeholder while images are loading */}
      {!shouldShowHero && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 animate-pulse" />
      )}
      
      {heroImages.map((image, index) => (
        <motion.div
          key={image.url}
          initial={false}
          animate={{ 
            opacity: currentImage === index && imagesLoaded[index] ? 1 : 0,
            scale: currentImage === index ? 1 : 1.1
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              style={{ objectPosition: image.position }}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <div 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)"
              }}
            />
          </div>
        </motion.div>
      ))}
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: shouldShowHero ? 1 : 0, y: shouldShowHero ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-libre mb-4 md:mb-6 leading-tight font-bold">
            Elevate Your Style
          </h1>
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 max-w-2xl mx-auto font-libre"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldShowHero ? 1 : 0 }}
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
