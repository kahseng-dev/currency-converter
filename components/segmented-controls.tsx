import { Pressable, Text, View } from 'react-native';

import { styles } from '@/constants/styles';

export default function ToggleGroup({ 
    options, 
    setValue, 
    value 
  }: { 
    options: string[], 
    setValue: (value: string) => void, 
    value: string 
  }) {

  const handleChangeOption = (option:string) => {
    return setValue(option);
  }

  return (
    <View className='p-1 flex flex-row bg-neutral-300 rounded-full'>
      { options.map(option => 
        <Pressable 
          onPress={() => handleChangeOption(option)}
          key={option}
          className={`${(value == option) && 'bg-white'} w-1/${options.length} p-2 rounded-full transition duration-300`}>
          <Text 
            style={styles.font_mono}
            className='text-center'>{option}</Text>
        </Pressable>
      )}
    </View>
  )
}
