import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, DimensionValue, StyleSheet } from 'react-native';
import { COLORS } from '../utils/color.ui'; // Assurez-vous que le chemin est bon

interface SkeletonProps {
  width: DimensionValue;
  height: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

const SkeletonItem: React.FC<SkeletonProps> = ({ 
  width, 
  height, 
  borderRadius = 4, 
  style 
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          opacity,
          backgroundColor: '#E2E8F0',
        },
        style,
      ]}
    />
  );
};


export default SkeletonItem