import Expo from 'expo';
import React from 'react';
import { StyleSheet, View, Component, Navigator, Text } from 'react-native';

import TaskForm from './TaskForm';
import TaskList from './TaskList';

// you can use "debug JS remotely" to open a chrome tab which will
// allow you to use console.log() just like system.out.println()

// for the render method...
// 1. create a view to wrap everything
// 2. create each < >
// 3. style each < >

// for the buttons to react to presses
// 1. create a prop validation
// 2. create a method in main
// 3. bind the method to some < >
// 4. add onPress to the TouchableHighlight
// 5. if you want to gather input: use onChangeText and make a method to
//    save the text

// my question:
// how do props work? what does "bubbled up" a prop mean?

class Todo extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
         todos: [
            {
               task: 'Learn React Native',
            },
            {
               task: 'Learn Redux',
            },
         ],
      };
   }

   // push expects a new root to be passed
   onAddStarted() {
      this.nav.push({
         name: 'taskform',
      });
   }

   // nav.pop() tells the navigator to hide the current view displayed, going back to the
   // previous view.
   onCancel() {
      console.log('canceled');
      this.nav.pop();
   }

   // when done is pressed
   // used the todo passed in to compare to the other todos in the array,
   // readding everything that is not the todo passed in.
   // sets the state to the new todo array.
   onDone(todo) {
      console.log('task was completed', todo.task);
      const filteredTodos =
         this.state.todos.filter((filterTodo) => {
            return filterTodo !== todo;
         });
      this.setState({ todos: filteredTodos });
   }

   /*
   this.state.todos.push({
      task: task,
   });
   pushes the state to the array
   */
   onAdd(task) {
      console.log('task added ', task);
      this.state.todos.push({ task });
      this.setState({
         todo: this.state.todos,
      });
      this.nav.pop();
   }

   configureScene() {
      return Navigator.SceneConfigs.FloatFromBottom;
   }
   renderScene(root, nav) {
      switch (root.name) {
      case 'taskform':
         return (
            <TaskForm
              onAdd={this.onAdd.bind(this)}
              onCancel={this.onCancel.bind(this)}
            />
            );
      default:
         return (
            <TaskList
              onAddStarted={this.onAddStarted.bind(this)}
              onDone={this.onDone.bind(this)}
              todos={this.state.todos}
            />
         );
      }
   }

   // "bind class methods onto event handelers"
   // ref: stores a reference to some function
   // configureScene: tells it to come up from the bottom.
   // initialRoute: what the app opens in the beginning, as default
   //    (for example, 'tasklist' for the list of tasks, 'taskform' for the add/cancel menu)
   // Navigator: allows for multiple screens (important!!)
   render() {
      return (
         <Navigator
           configureScene={this.configureScene}
           initialRoute={{ name: 'tasklist', index: 0 }}
           ref={((nav) => {
             this.nav = nav;
           })}
           renderScene={this.renderScene.bind(this)}
         />
      );
   }
}

Expo.registerRootComponent(Todo);
