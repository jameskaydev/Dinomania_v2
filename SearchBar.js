import { TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const SearchBar = ({ handleSearch, cleanSearch, search, setDinos }) => {
  const handleSelectedCategory = async selected => {
    const data = await fetch(`http://89.117.36.161/api/cat/${selected}`, {
      method: "GET",
      headers: {
        auth: "H3l5b1T5YRAD156iXNJO",
      },
    })
    const main = await data.json();
    setDinos(main)
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>

        <TextInput
          placeholder="Search"
          onChangeText={handleSearch}
          placeholderTextColor='#fff'
          value={search}
          style={styles.searchInput}
        />
        <SelectDropdown
          buttonStyle={styles.dropdown}
          buttonTextStyle={styles.dropdownText}
          rowStyle={{backgroundColor: '#181818', borderBottomWidth: 0, height: 40}}
          rowTextStyle={{color: '#fff', fontSize: 16}}
          dropdownStyle={{borderRadius: 10}}
          data={['All', 'Dinosaurs', 'Pterosaurs', 'Marine reptiles', 'Mammals', 'Other']}
          defaultButtonText='Dinosaurs'
          onSelect={ selectedItem => handleSelectedCategory(selectedItem.toLowerCase()) }
        />
      </View>
      {search ? (
        <TouchableOpacity onPress={cleanSearch}>
          <Text style={{ color: '#fff', fontSize: 12, position: 'absolute', left: '46%', top: -6 }}>❌</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 6,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  searchInput: {
    color: '#fff',
    width: '50%',
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#ffffff20',
    borderRadius: 10,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40
  },
  dropdown: {
    width: '40%',
    borderRadius: 10,
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#ffffff20',
    height: 40
  },
  dropdownText: {
    color: '#fff',
    fontSize: 14
  }
})

export default SearchBar;