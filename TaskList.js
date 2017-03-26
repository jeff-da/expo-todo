import React from 'react';
import { StyleSheet, View, ListView, TouchableHighlight, Text } from 'react-native';
import { LinearGradient } from 'expo';

import TaskRow from './TaskRow';

const styles = StyleSheet.create({
   container: {
      paddingTop: 40,
      backgroundColor: '#F7F7F7',
      // flex: makes the container a flexbox. 1 is yes, 0 is no.
      // it makes the "backgroundColor" fill up the whole screen instead of only
      // the task part
      flex: 1,
      justifyContent: 'flex-start',
   },
   button: {
      height: 60,
      borderColor: '#05A5D1',
      borderWidth: 2,
      backgroundColor: '#333',
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center',
   },
   buttonText: {
      color: '#FAFAFA',
      fontSize: 20,
      fontWeight: '600',
   },
});

class TaskList extends React.Component {
   constructor(props, context) {
      super(props, context);

      const ds = new ListView.DataSource({
         // checks if the reference has changed
         rowHasChanged: (r1, r2) => r1 !== r2,
      });

      // sets the state of the class
      this.state = {
         dataSource: ds.cloneWithRows(props.todos),
      };
   }

   // React looks for componentWillRecieveProps when updating state
   componentWillReceiveProps(nextProps) {
      const dataSource = this
         .state
         .dataSource
         .cloneWithRows(nextProps.todos);

         this.setState({ dataSource });
   }
   // RenderRow is called for each todo in the list
   renderRow(todo) {
      return (
         <TaskRow onDone={this.props.onDone} todo={todo}/>
      );
   }
   render() {
      return (
         // TouchableHighlight is the button
         // a "style prop" tells it what style to use
         // TouchableHighlight buttons allow onPress events
         <View style={styles.container}>
            <ListView
              dataSource = {this.state.dataSource}
              key = {this.props.todos}
              renderRow = {this.renderRow.bind(this)}
            />
            <TouchableHighlight
              onPress={this.props.onAddStarted}
              style={styles.button}
            >
               <Text style={styles.buttonText}>
                  Add one
               </Text>
            </TouchableHighlight>
         </View>
      );
   }
}

// need a propType for each of the props used
TaskList.propTypes = {
   // func: expecting a function for this prop
   // isRequired: wont allow null and undefined to be passed through.
   // this is prop validation
   onAddStarted: React.PropTypes.func.isRequired,
   onDone: React.PropTypes.func.isRequired,
   todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default TaskList;
