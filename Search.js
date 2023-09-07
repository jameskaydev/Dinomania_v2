import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import SearchBar from './SearchBar';
import { SERVER, API_KEY } from '@env'

const Search = ({ setDinos }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [countRes, setCountRes] = useState(0);
  const timeout = useRef(null);

  const navigation = useNavigation()

  const handleSearch = (text) => {
    if (text) {
      setSearch(text);
      clearTimeout(timeout.current);
      timeout.current = setTimeout( async () => {
        const data = await fetch(`${SERVER}/api/dino?s=${search}`, {
          method: 'GET',
          headers: {
            auth: API_KEY,
          },
        })
        const main = await data.json();
        setSearchResults(main)
        setCountRes(main.length);
      }, 1000);
    } else {
      setSearch(text);
      clearTimeout(timeout.current);
      setCountRes(0)
      setSearchResults([]);
    }
  };

  const cleanSearchArea = () => {
    setSearchResults([]);
    setCountRes(0)
    setSearch(null);
  };

  return (
    <View style={{ height: countRes ? (countRes > 2 ? (countRes*50) : 100) : 0, paddingBottom: countRes ? 0 : 25  , ...styles.container }}>
      <SearchBar 
        handleSearch={handleSearch} 
        cleanSearch={cleanSearchArea} 
        search={search} 
        setDinos={setDinos}
      />
      <View style={styles.searchResults}>
        {searchResults && searchResults.map((result) => (
        <TouchableOpacity 
          key={result._id} 
          onPress={() => navigation.navigate("Info", { dinosaur: result })} 
          style={styles.resContainer}
        >
          <Image 
            style={{width: 40, height: 40}} 
            source={{ uri: `${SERVER}/${result.img}`}} 
          />
          <Text style={styles.res}>{result.name}</Text>
        </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#181818',
  },
  searchResults: {
    paddingLeft: 10,
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  resContainer: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 80,
  },
  res: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6
  },
});


export default Search;