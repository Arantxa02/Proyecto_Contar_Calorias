import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons';

const staticInfo = {
  name: 'Arantxa Medina Santana',
  uri: 'https://www.nuevamujer.com/resizer/XEaX6z31yxlXN0iAo7g45UVO_To=/800x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/HKWO3H66KBDA7ERMI26MWXR74M.jpg',
}

const Header = () => {
  const { canGoBack, goBack } = useNavigation();

  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.arrowContainer}>
          <View style={styles.buttonCircle}>
            <Button icon={<Icon name="arrow-back" size={20} />}
              radius="lg"
              color="#ad5cff"
              onPress={() => goBack()}
              containerStyle={{ padding: 10 }}
            />
          </View>
        </View>
      ) : undefined}
      <View style={styles.rightContainer}>
        <Image source={{ uri: staticInfo.uri }} style={styles.profileImage} />
      </View>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{`Hola ${staticInfo.name}`}</Text>
        <Text style={styles.subtitle}>Bienvenida de nuevo!</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 2,
    right: 2,
    flexDirection: 'row',
    alignContent: 'center',
    paddingHorizontal: 10,
    marginTop: 25,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  rightContainer: {
    flex: 0,
    width: 45,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  subtitle: {
    fontSize: 15,
    color: '#808080',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 24,
  },
  arrowContainer: {
    flex: 0,
    width: 65,
    borderRadius: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: -5,
  },
  buttonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default Header;