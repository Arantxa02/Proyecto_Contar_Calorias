import react from 'react'
import {View, StyleSheet, Text, Image} from 'react-native'

const staticInfo = {
  name: 'Arantxa Medina Santana',
  uri: 'https://www.nuevamujer.com/resizer/XEaX6z31yxlXN0iAo7g45UVO_To=/800x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/HKWO3H66KBDA7ERMI26MWXR74M.jpg',
}

const Header = () => {

  return(
    <View style={styles.container}>
    <View style={styles.rightContainer}>
      <Image source={{uri: staticInfo.uri}} style={styles.profileImage}/>
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
        top: 40,
        left: 2,
        right: 2,
        flexDirection: 'row',
        alignContent: 'center', 
        paddingHorizontal: 10,
        marginTop: 20,
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    rightContainer: {
        flex: 0,
        width: 40,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    subtitle: {
        fontSize: 15,
        color: '#808080'
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 24,
    },
});

export default Header;