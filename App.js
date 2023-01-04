import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Permission, PERMISSION_TYPE} from './AppPermission';

const App = () => {
  useEffect(() => {
    Permission.checkPermission(PERMISSION_TYPE.location);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello React Native - Shudhanshu Raj</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
