import React from 'react'
import { motion } from 'framer-motion';

function FadeInAnimation({ children, index }) {

    const slideAnimation = {
        initial: {
            opacity: 0,
            y: 100
        },
        animate: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2 * index
            }
        })
    }

    return (
        <motion.div
            key={index}
            variants={slideAnimation}
            initial="initial"
            whileInView="animate"
            custom={index}
            viewport={{ once: true }}
            style={{ height: '100%' }}
        >
            {children}
        </motion.div>
    )
}

export default FadeInAnimation