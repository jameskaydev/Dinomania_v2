import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import SearchBar from './SearchBar';

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
        const data = await fetch(`http://89.117.36.161/api/dino?s=${search}`, {
          method: 'GET',
          headers: {
            auth: "H3l5b1T5YRAD156iXNJO",
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
            source={{ uri: `http://89.117.36.161/${result.img}`}} 
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
    // flex: 1,
    // flexDirection: 'column',
    // height: ( cc * 30 ) + 400,
    paddingTop: 20,
    // paddingBottom: 25,
    backgroundColor: '#181818',
    // marginTop: 100,
    // height: 'auto',
    // position: 'relative'
  },
  searchResults: {
    paddingLeft: 10,
    // height: 100,
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  resContainer: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'rgba(24,24,24,0.1)',
    width: '100%',
    height: 80,
    // borderWidth: 5,
    // borderColor: 'red',
    // position: 'absolute',
    // top: 20
  },
  res: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6
  },
});


export default Search;