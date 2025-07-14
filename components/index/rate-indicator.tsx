import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { styles } from '@/constants/styles';
import { Rate } from '@/types/rate';

interface RateIndicatorProps { 
    isLoading: boolean,
    rate: Rate,
}

export default function RateIndicator({ isLoading, rate, ...props }: RateIndicatorProps) {
    const handleViewDetails = (from: string, into: string) => {
        return router.push({ pathname: '/details', params: { from, into } });
    }

    return <>
        { isLoading ? 
        <View className='p-4 flex-row gap-4 duration-300 transition'>
            <View className='w-8 mt-1.5 items-center justify-center'>
                <View className='absolute outline-2 outline-white size-5 animate-pulse bg-gray-200 rounded-full' />
                <View className='relative bottom-2 right-2 size-5 animate-pulse bg-gray-200 rounded-full' />
            </View>
            <View  className='w-24 flex gap-2'>
                <View className='h-3 animate-pulse bg-gray-200 rounded' />
                <View className='h-3 animate-pulse bg-gray-200 rounded' />
            </View>
        </View>
        :
        <Pressable
            onPress={() => handleViewDetails(rate.from, rate.into)}
            className='p-4 flex flex-row gap-4 duration-300 transition hover:bg-neutral-300'>
            <View>
                <Text style={styles.font_mono}>{rate.from}</Text>
                <Text style={styles.font_mono}>{rate.into}</Text>
            </View>
            <View>
                <Text style={styles.font_mono}>{rate.from} to {rate.into}</Text>
                <Text 
                    className='text-neutral-500'
                    style={styles.font_mono}>
                    1 {rate.from} = {rate.rate.toFixed(4)} {rate.into}
                </Text>
            </View>
        </Pressable>
        }
    </>
}
