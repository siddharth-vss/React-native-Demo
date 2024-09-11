import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // Splash screen will disappear after 3 seconds

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.logoText}>Your Logo</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Text style={styles.logoText}>Your page</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SplashScreen;
