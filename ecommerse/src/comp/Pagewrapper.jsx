import { animate,motion } from "framer-motion";


const varients={
    initial:{opacity:0,x:-1530},
    animate:{opacity:1,x:0},
    exit:{opacity:0,x:1530},
};

export default function Pagewrapper({children}){
    return(
        <motion.div 
        variants={varients}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{duration:0.4,ease:"easeOut"}}
        >
            {children}
        </motion.div>
    )
}