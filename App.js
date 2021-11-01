import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Button, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';


export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [
      ...courseGoals,
      { uid: Math.random().toString(), value: goalTitle }
    ]);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.uid !== goalId);
    });
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} />

      <FlatList
        keyExtractor={(item, index) => item.uid}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            id={itemData.item.uid}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />
        )} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
