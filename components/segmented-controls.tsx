import { Pressable, View } from 'react-native';

import CustomText from './custom-text';

interface SegmentedControlsProps { 
  options: string[], 
  setValue: (value: string) => void, 
  value: string 
}

const SegmentedControls = ({ options, setValue, value }:SegmentedControlsProps) => {
  return (
    <View className='p-1 grid grid-flow-col gap-1 bg-neutral-300 rounded-full'>
      { options.map(option =>
        <Pressable 
          onPress={() => setValue(option)}
          key={option}
          className={`p-2 rounded-full transition duration-300 hover:bg-neutral-200`}>
          <CustomText className='text-center'>{option}</CustomText>
        </Pressable>
      )}
    </View>
  )
}

export default SegmentedControls