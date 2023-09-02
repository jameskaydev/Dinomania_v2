import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'


const Learn = () => {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.box}>
        <Text style={styles.title}>
          What is a Dinosaur?
        </Text>
        <Text style={styles.description}>
          Dinosaurs were a group of reptiles that lived millions of years ago during the Mesozoic Era. They were diverse creatures that roamed the Earth for about 165 million years. Dinosaurs come in all shapes and sizes, ranging from small, feathered creatures to massive, long-necked herbivores or fearsome carnivorous predators. They are known for their incredible variety and fascinating features.
        </Text>
      </View>
      
      <View style={styles.box}>
        <Text style={styles.title}>
          When did the dinosaurs live?
        </Text>
        <Text style={styles.description}>
          Dinosaurs lived during a geological time period called the Mesozoic Era, which lasted from around 252 million years ago to 66 million years ago. This era is divided into three periods:

          Triassic period
          Jurassic period
          Cretaceous period.

          The earliest dinosaurs appeared in the Late Triassic period, around 230 million years ago, and they thrived until the end of the Cretaceous period when a mass extinction event occurred, wiping out most dinosaur species. So, in summary, dinosaurs lived from approximately 230 million years ago to 66 million years ago.
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>
          What did dinosaurs eat?
        </Text>
        <Text style={styles.description}>
          Dinosaurs were a diverse group of animals, and their diets varied depending on their species and size. Here are some general categories of dinosaur diets:

          1. Herbivores:
          Many dinosaurs were herbivores, meaning they primarily ate plants. They consumed a variety of vegetation such as ferns, cycads, conifers, and flowering plants. Some herbivorous dinosaurs had specialized teeth and jaws to help them efficiently chew plant material.
          2. Carnivores:
          Some dinosaurs were carnivores, meaning they primarily ate other animals. They hunted and preyed upon smaller dinosaurs, mammals, reptiles, and even other carnivorous dinosaurs. They had sharp teeth, strong jaws, and sometimes claws for capturing and tearing apart their prey.
          3. Omnivores:
          There were also dinosaurs that had a mixed diet, consuming both plants and animals. These omnivorous dinosaurs had adaptations that allowed them to eat a range of food sources, including small animals, insects, and plants.
          It's important to note that the specific dietary preferences and adaptations of dinosaurs varied greatly among different species, just as they do in today's animals.
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>
          Where did dinosaurs live?
        </Text>
        <Text style={styles.description}>
          They inhabited various parts of the world, including what are now the continents of North and South America, Europe, Asia, Africa, and Australia. It's fascinating to think about the different environments and ecosystems in which dinosaurs thrived, from lush forests to vast deserts, and even icy polar regions. Their fossils have been discovered on every continent, giving us valuable insights into their diverse habitats and adaptations.
          Why not use our map feature to find out what Dinosaurs lived near you.
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>
          What size are dinosaurs?
        </Text>
        <Text style={styles.description}>
          Dinosaurs came in a wide range of sizes, from very small to extremely large. Some dinosaurs were as small as chickens, measuring only a few feet long and weighing just a few pounds. Examples of small dinosaurs include Microraptor, Compsognathus, and the famous Velociraptor.
          On the other end of the size spectrum, there were colossal dinosaurs that reached enormous proportions. The largest known dinosaur is Argentinosaurus, which could measure up to 100 feet long and weigh around 70 tons. Other massive dinosaurs include Brachiosaurus, Diplodocus, and Tyrannosaurus rex, which could weigh several tons and reach lengths of up to 40 feet.
          Between these extremes, there were many dinosaurs of varying sizes. Some were medium-sized, comparable to modern-day deer or cows, while others were larger but not as massive as the giants mentioned earlier. The sizes of dinosaurs were incredibly diverse, reflecting the incredible variety that existed within this ancient group of reptiles.
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>
          How did dinosaurs go extinct?
        </Text>
        <Text style={styles.description}>
          The extinction of dinosaurs is believed to have been caused by a catastrophic event known as the Cretaceous-Paleogene (K-Pg) extinction event. This event occurred approximately 66 million years ago.
          The leading hypothesis suggests that a massive asteroid or comet impact was the primary cause of the extinction. This impact is thought to have occurred near what is now the Yucatan Peninsula in Mexico, creating the Chicxulub crater. The impact released an enormous amount of energy, causing widespread devastation. It is estimated that the impact released more energy than billions of atomic bombs.
          The impact would have caused immediate and widespread destruction, triggering wildfires, tsunamis, and a massive release of dust and debris into the atmosphere. The dust and debris would have blocked sunlight, causing a global cooling effect known as an impact winter. This would have severely disrupted ecosystems and led to a decline in photosynthesis, impacting primary producers and subsequently the entire food chain.
          The sudden and dramatic environmental changes caused by the impact likely led to the extinction of many species, including non-avian dinosaurs. However, it is important to note that some smaller dinosaurs, known as birds, survived and evolved into the avian dinosaurs we have today.
          While the impact event is considered the primary cause of dinosaur extinction, other factors such as volcanic activity, climate change, and disease may have also played a role. The exact sequence of events and the relative importance of each factor are still subjects of ongoing scientific research and discussion.
        </Text>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181818',
    height: '100%',
    width: '100%',
    paddingHorizontal: 10,
  },
  box: {
    marginBottom: 20
  },
  title: {
    color: '#d3d3d3',
    fontSize: 28,
    paddingTop: 10,
  },
  description: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 26,
    color: 'lightgray',
  }
})

export default Learn;