import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native'

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';

import styles from './styles';

function Favorites(){
    const [favorites, setFavorites] = useState([]);

    function loadFavorite(){
        AsyncStorage.getItem('favorites').then(response =>{
            if(response){
                const favoritedTeachers = JSON.parse(response);
                
                setFavorites(favoritedTeachers);
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
               loadFavorite();
        }, [] )
      );

    return (
        <View style = {styles.container} >
            <PageHeader title= 'Meus proffys favoritos '/>
            <ScrollView 
             style={styles.teacherList}
             contentContainerStyle={{
                 paddingHorizontal: 16,
                 paddingBottom: 16,
             }}
            >
                {favorites.map((teacher: Teacher)=>{
                    return (
                        <TeacherItem 
                        key ={teacher.id}
                        teacher={teacher}
                        favorited
                        />
                    )
                })}
            </ScrollView>
        </View>
    );
}

export default Favorites;
