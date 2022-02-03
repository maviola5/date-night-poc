import {
  addDoc,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { collection, db, query, where } from '../../firebase/config';
import styles from './styles';

const HomeScreen = (props) => {
  const [entityText, setEntityText] = useState('');
  const [entities, setEntities] = useState([] as any[]);

  const userId = props.extraData.id;

  useEffect(() => {
    const entityRef = collection(db, 'entities');
    const q = query(
      entityRef,
      where('authorID', '==', userId),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(
      q,
      (snapshot) => {
        const newEntities = [] as any[];
        snapshot.forEach((doc) => {
          const entity = doc.data();
          entity.id = doc.id;
          newEntities.push(entity);
        });
        setEntities(newEntities);
      },
      (e) => console.log(e)
    );
  }, []);

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timestamp = serverTimestamp();
      const data = {
        text: entityText,
        authorID: userId,
        createdAt: timestamp,
      };
      addDoc(collection(db, 'users'), data)
        .then((_doc) => {
          setEntityText('');
          Keyboard.dismiss();
        })
        .catch((e) => alert(e));
    }
  };

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {index}. {item.text}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new entity"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEntityText(text)}
          value={entityText}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
