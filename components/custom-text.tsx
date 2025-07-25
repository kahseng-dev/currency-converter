import { ReactNode } from "react";
import { Text } from "react-native";

import { styles } from "@/constants/styles";

interface CustomTextProps {
    children:ReactNode,
    className?:string,
}

const CustomText = ({ children, className }: CustomTextProps) => {
    return (
        <Text 
            className={`${className}`}
            style={styles.font_mono}>
            {children}
        </Text>
    )
}

export default CustomText;