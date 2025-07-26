import { useTheme } from '@react-navigation/native';
import { ReactNode } from "react";
import { Text } from "react-native";

import { styles } from '@/constants/styles';

interface CustomTextProps {
    children:ReactNode,
    className?:string,
}

const CustomText = ({ children, className }: CustomTextProps) => {

    const { colors } = useTheme()
    
    return (
        <Text 
            className={className}
            style={{
                fontFamily: styles.font_mono,
                color: colors.text,
                borderColor: colors.border, }}>
            {children}
        </Text>
    )
}

export default CustomText;