import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

// don't say React.StyleSheet, import StyleSheet from 'react-native' instead
const styles = StyleSheet.create({
   // styles.container
   container: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#E7E7E7',
      padding: 20,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
   },
   // styles.label
   label: {
      fontSize: 20,
      fontWeight: '300',
   },
   doneButton: {
      borderRadius: 5,
      backgroundColor: '#EAEAEA',
      padding: 5,
   },
});

class TaskRow extends React.Component {

   onDonePressed() {
      this.props.onDone(this.props.todo);
   }
   render() {
      return (
         // {styles.container}: the style explained above
         // {styles.label}: also above
         <View style={styles.container}>
            <Text style={styles.label}>
               {this.props.todo.task}
            </Text>
            <TouchableHighlight onPress={this.onDonePressed.bind(this)} style={styles.doneButton}>
               <Text>Done</Text>
            </TouchableHighlight>
         </View>
      );
   }
}

TaskRow.propTypes = {
   onDone: React.PropTypes.func.isRequired,
   todo: React.PropTypes.shape({
      // says that the propType is a string, and is also required
      task: React.PropTypes.string.isRequired,
   }).isRequired, // this isRequired means the shape is required
};

// you need to export the name of the class at the bottom
export default TaskRow;
