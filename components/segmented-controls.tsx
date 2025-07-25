import { Pressable, Text, View } from 'react-native';

import { styles } from '@/constants/styles';

interface SegmentedControlsProps { 
  options: string[], 
  setValue: (value: string) => void, 
  value: string 
}

export default function SegmentedControls({ options, setValue, value }: SegmentedControlsProps) {
  return (
    <View className='p-1 grid grid-flow-col gap-1 bg-neutral-300 rounded-full'>
      { options.map(option =>
        <Pressable 
          onPress={() => setValue(option)}
          key={option}
          className={`p-2 rounded-full transition duration-300 hover:bg-neutral-200`}>
          <Text 
            style={styles.font_mono}
            className='text-center'>
            {option}
          </Text>
        </Pressable>
      )}
    </View>
  )
}
