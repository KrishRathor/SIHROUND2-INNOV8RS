import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// @ts-ignore
const TrafficLightCarAnimation = ({time}) => {
  const [lightColor, setLightColor] = useState('red');
  const carControls = useAnimation();

  useEffect(() => {
    // Animate the car's movement when the traffic light is green
    if (lightColor === 'green') {
      carControls.start({ x: '100%', transition: { duration: time, ease: 'linear' } });
    } else {
      carControls.stop();
      carControls.set({ x: 0 });
    }

    // Create a loop for the traffic light
    const trafficLightInterval = setInterval(() => {
      setLightColor((prevColor) => {
        if (prevColor === 'red') return 'green';
        if (prevColor === 'green') return 'orange';
        return 'red';
      });
    }, time*1000); // Change traffic light every 5 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(trafficLightInterval);
  }, [lightColor]);

  return (
    <div>
      <div className="road">
        <motion.div className="car" style={{ width: '50px', height: '50px', backgroundColor: 'black', marginTop: '10vh' }} animate={carControls} />
        <div className={`traffic-light ${lightColor}`} />
      </div>

      <style jsx>{`
        .road {
          width: 400px;
          height: 400px;
          background-color: #ddd;
          position: relative;
        }

        .traffic-light {
          width: 30px;
          height: 100px;
          background-color: #333;
          position: absolute;
          top: 10px;
          right: 10px;
          border-radius: 5px;
        }

        .traffic-light.red {
          background-color: red;
        }

        .traffic-light.orange {
          background-color: orange;
        }

        .traffic-light.green {
          background-color: green;
        }
      `}</style>
    </div>
  );
};

export default TrafficLightCarAnimation;
