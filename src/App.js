import React, { useEffect, useState } from "react";
import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {

  const [repository, setProjects] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);

  /*async function handleAddProject() {
    const response = api.post('repositories', {

      title: `Novo Projeto ${Date.now()}`,
      owner: 'Raffael Schemmer'

    });

    const project = response.data;
    setProjects([...projects], project);

  }*/

  async function handleLikeRepository(id) {
    const response = await api.post(
      
      'repositories/'+id+'/like',

    );
    
    if(response.status === 200){
      const repositoriesIndex = repository.findIndex(project => project.id === id);
        
      if (repositoriesIndex <= 0){
        
        repository[repositoriesIndex].likes = response.data.likes;
        setProjects([...repository]);
        
      }
    }
   

  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList

          data={repository}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (

            <View style={styles.repositoryContainer}>
                  <Text style={styles.repository}>{repository.title}</Text>

                  { repository.techs.map(tech =>  
                    
                    (
                      <View style={styles.techsContainer} key={tech}>
                        
                        <Text style={styles.tech}>
                          {tech}
                        </Text>

                      </View>

                    ))}

                  <View style={styles.likesContainer}>
                    <Text
                      style={styles.likeText}
                      // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                      testID={`repository-likes-${repository.id}`}
                    >
                      {repository.likes} curtidas
                </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleLikeRepository(repository.id)}
                    // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                    testID={`like-button-${repository.id}`}
                  >
                    <Text style={styles.buttonText}>Curtir</Text>
                  </TouchableOpacity>
            </View>
          )}

        />

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: "#8159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius:20
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
    borderRadius:20
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    flexDirection: "row",

  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius:20
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
